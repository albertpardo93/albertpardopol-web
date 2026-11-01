import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyTouch, sanitizeAttribution, touchLabel } from '../lib/attribution.ts';

const host = 'https://cirujanodemano.es';
test('Google click IDs take precedence over search referrers and conflicting UTMs', () => {
  for (const key of ['gclid', 'gbraid', 'wbraid']) {
    const touch = classifyTouch(`${host}/es?${key}=ABC_123&utm_source=google&utm_medium=organic`, 'https://www.google.es/');
    assert.equal(touch.channel, 'paid');
    assert.equal(touch.source, 'google');
    assert.equal(touch.clickIdType, key);
    assert.equal(touch.landingPath, '/es');
  }
});
test('organic search, paid UTMs, referrals and direct remain distinct', () => {
  assert.equal(classifyTouch(`${host}/es`, 'https://www.google.es/search?q=private').channel, 'organic');
  assert.equal(classifyTouch(`${host}/ca`, 'https://bing.com/search').source, 'bing');
  assert.equal(classifyTouch(`${host}/es?utm_source=google&utm_medium=cpc&utm_campaign=Vic`, '').channel, 'paid');
  assert.equal(classifyTouch(`${host}/es`, 'https://chatgpt.com/c/private').channel, 'referral');
  assert.equal(classifyTouch(`${host}/es`, `${host}/ca`).channel, 'direct');
  assert.match(touchLabel(classifyTouch(`${host}/es`, '')), /no identificable/);
});
test('untrusted attribution cannot inject HTML, form fields, URLs or click IDs', () => {
  const touch = classifyTouch(`${host}/es?gclid=abc&utm_campaign=Vic`, '');
  const safe = sanitizeAttribution({ consent: 'accepted', session: { ...touch, name: 'Patient', message: 'Private diagnosis', landingPath: '/es?email=patient@example.com', campaign: '<script>', clickId: 'abc<script>' } });
  assert.equal(safe.session.landingPath, '/');
  assert.equal(safe.session.campaign, undefined);
  assert.equal(safe.session.clickId, undefined);
  assert.equal('name' in safe.session, false);
  assert.deepEqual(sanitizeAttribution({ consent: 'unavailable', session: touch }), { consent: 'unavailable' });
});
function storage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key), values };
}
test('consent and attribution survive navigation without exposing tracking in WhatsApp', async () => {
  const lib = await import(`../lib/attribution.ts?journey=${Date.now()}`);
  const local = storage(); const session = storage();
  globalThis.window = { localStorage: local, sessionStorage: session, location: { href: `${host}/es?gclid=abc&utm_campaign=Vic` } };
  globalThis.document = { referrer: 'https://google.es/' };
  assert.deepEqual(lib.captureAttribution(), { consent: 'unavailable' });
  assert.equal(session.values.size, 0);
  assert.equal(local.values.size, 0);
  local.setItem('cookie-consent', 'accepted');
  assert.equal(lib.captureAttribution().session.channel, 'paid');
  window.location.href = `${host}/es/sobre-mi`;
  const nextDocument = await import(`../lib/attribution.ts?next=${Date.now()}`);
  document.referrer = `${host}/es`;
  const result = nextDocument.captureAttribution();
  assert.equal(result.session.source, 'google');
  assert.equal(result.firstTouch.clickId, 'abc');
  const whatsapp = nextDocument.whatsappHref('https://wa.me/34600000000');
  assert.equal(new URL(whatsapp.href).searchParams.get('text'), 'Hola, me gustaría solicitar información.');
  assert.equal(whatsapp.attribution.session.channel, 'paid');
  assert.match(whatsapp.reference, /^W-[A-F0-9]{8}$/);
  assert.equal(new URL(whatsapp.href).searchParams.get('text').includes('abc'), false);
  local.setItem('cookie-consent', 'rejected');
  nextDocument.clearAttribution();
  assert.equal(session.getItem(lib.SESSION_KEY), null);
  assert.equal(local.getItem(lib.FIRST_KEY), null);
  assert.equal(nextDocument.leadEventParams().lead_channel, 'unknown');
  delete globalThis.window; delete globalThis.document;
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';
import * as attribution from '../lib/attribution.ts';

function handler(providerResult = { data: { id: 'test-email-id' }, error: null }) {
  const sent = [];
  const source = readFileSync(new URL('../app/api/budget/route.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, process: { env: {} }, console: { error() {} },
    require(name) {
      if (name === 'next/server') return { NextResponse: { json: (body, options) => Response.json(body, options) } };
      if (name === 'resend') return { Resend: class { emails = { send: async message => { sent.push(message); return providerResult; } }; } };
      if (name === '@/lib/attribution') return attribution;
      throw new Error(`Unexpected dependency ${name}`);
    },
  });
  return { post: exports.POST, sent };
}
const payload = {
  name: 'TEST', email: 'test@example.com', message: '<b>TEST ONLY</b>', condition: 'Consulta en Vic',
  diagnosisStatus: 'diagnosis-confirmed', preferredCenter: 'vic', privacyConsent: true,
  attribution: { consent: 'accepted', session: attribution.classifyTouch('https://cirujanodemano.es/es?gclid=test-id&utm_campaign=Vic', '') },
};
const request = body => new Request('http://localhost/api/budget', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
test('successful email includes observed origin and returns provider ID for success-only tracking', async () => {
  const { post, sent } = handler();
  const response = await post(request(payload));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).id, 'test-email-id');
  assert.equal(sent.length, 1);
  assert.match(sent[0].html, /Pago · google \/ cpc · Vic/);
  assert.match(sent[0].html, /test-id/);
  assert.match(sent[0].html, /&lt;b&gt;TEST ONLY&lt;\/b&gt;/);
});
test('no measurement consent remains unknown; failed delivery never returns a success ID', async () => {
  const { post, sent } = handler();
  await post(request({ ...payload, attribution: { consent: 'unavailable', session: payload.attribution.session } }));
  assert.match(sent[0].html, /Origen desconocido/);
  assert.equal(sent[0].html.includes('test-id'), false);
  const failed = handler({ data: null, error: { message: 'TEST provider failure' } });
  const response = await failed.post(request(payload));
  assert.equal(response.status, 500);
  assert.equal((await response.json()).id, undefined);
  const invalid = handler();
  assert.equal((await invalid.post(request({ ...payload, privacyConsent: false }))).status, 400);
  assert.equal(invalid.sent.length, 0);
});

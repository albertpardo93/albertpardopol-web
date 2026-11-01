# Origen de presupuestos y WhatsApp

## Qué se registra

- `budget_form_open`: apertura, nunca presupuesto recibido.
- `budget_form_submit`: solo después de respuesta satisfactoria de `/api/budget` con ID de Resend.
- `whatsapp_click`: clic para abrir WhatsApp; no confirma envío ni conversación.
- Los eventos de contacto llevan `lead_channel`, `lead_source` y `lead_medium`.
- El correo de presupuesto contiene la sesión del envío, la primera visita registrada, la página de entrada sin consulta y, si existe, el identificador publicitario.
- El enlace de WhatsApp abre el chat sin mensaje preestablecido. El origen y la referencia aleatoria permanecen en el evento interno, sin mostrarse al paciente. No hay webhook de conversaciones recibidas y no se pueden asociar automáticamente chats reales a clics.

## Atribución y límites

Se priorizan gclid/gbraid/wbraid de Google y msclkid de Microsoft, después UTMs y después el dominio del referente. Una búsqueda orgánica se identifica por el referente del buscador cuando no hay señales de pago. Las señales son observadas en el navegador, no verificación del cobro publicitario. Directo significa origen no identificable; nunca se reasigna a orgánico.

Solo se conserva atribución tras aceptar cookies: sesión con 30 minutos de inactividad y primera visita durante 90 días en ese navegador. Al rechazar se borra la atribución guardada. Sin consentimiento, con almacenamiento bloqueado, cambio de dispositivo o eliminación de parámetros puede no existir atribución. No se puede reconstruir retrospectivamente lo no registrado.

No se envían campos del formulario, diagnóstico ni descripción a Analytics como parámetros de los eventos de presupuesto. Las pruebas locales no cargan etiquetas de Google. No registrar `submission_id` ni `contact_reference` como dimensiones personalizadas de alta cardinalidad.

## Informe de GA4

Propiedad actual: 557307635; etiqueta G-SGZFVTFE7C.

Informes → Adquisición de tráfico → Fuente/medio de la sesión → columna Número de eventos → seleccionar `budget_form_submit` o `whatsapp_click`.

Opcionalmente registrar dimensiones de evento `lead_channel`, `lead_source` y `lead_medium` para comparar la clasificación explícita. Marcar `budget_form_submit` como evento clave y tratar WhatsApp como clic, nunca como contacto confirmado. No duplicar importación GA4 y conversión directa de Ads para un mismo objetivo principal.

## Validación

`node --test tests/*.test.mjs` (Node 24+), `npx tsc --noEmit`, `npm run build`.

Las pruebas del endpoint sustituyen Resend y no envían correos. La comprobación manual de WhatsApp abre el enlace sin enviar el mensaje. La recepción real del correo y el procesamiento de eventos por Google deben comprobarse tras desplegar, sin confundir las pruebas con pacientes reales.

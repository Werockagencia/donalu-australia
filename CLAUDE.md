# Doña Lú · Australia — contexto para Claude

Este repositorio es el **contexto compartido** del equipo y sus asistentes Claude:

- **David Higuera** (`DH`, We Rock, Colombia): agencia de Doña Lú, hace la marca, la web y la pauta. Arma la base de prospectos y el CRM.
- **Juan Carlos Higuera** (`JC`, Sídney, Australia): distribuidor de Doña Lú en Australia. E-commerce, anuncios, LinkedIn y trámites en Australia.
- **Katherine Valbuena** (`KV`, Sídney, Australia): experta en café (tostión, variedades, cata). Degustaciones, cafés, mercados y contenido de cata.

Léelo completo antes de actuar. Lo que está aquí es la fuente de verdad.

## Qué vendemos

Café **Doña Lú**, de una finca familiar en Arabia, Risaralda (Eje Cafetero, Colombia). Marca: *Café que se honra*. Tres cafés de la finca Danubio: **Lavado** (limpio y brillante), **Honey** (dulce, con cuerpo) y **Natural** (frutal y profundo). 100 % arábica, tostado en grano, bolsas de 250 g y 500 g. También kits de regalo (cesta o caja de madera pino con termo), útiles para regalos de empresa.

- Precio de proveedor (Doña Lú a Juan Carlos): COP 15.000 + IVA 5 % la bolsa de 250 g; COP 28.000 + IVA la de 500 g.
- Precio de venta de referencia en Australia: AUD 18–24 la bolsa de 250 g al público; ≈ AUD 14 a cafés y tiendas.
- Fase 1 (viaje a Colombia 10 dic 2026 – 10 ene 2027): **40 bolsas de 250 g** (20 por persona, 10 kg en total) en maleta, declaradas como mercancía comercial con factura de Doña Lú. Reparto sugerido: 14 Lavado, 13 Honey, 13 Natural. Preventa online antes de regresar. Fase 2: courier (cajas de 10–12 kg). Fase 3: carga aérea / café verde.
- Decisión clave el **30 abr 2027**: seguir o no, y si se mantiene la marca Doña Lú o se pasa a marca propia con Doña Lú como primera finca.
- Documentos: `docs/guia-arranque-australia.pdf` (permisos, logística, costos, proyección 2027) y `docs/kit-marca-dona-lu.pdf` (historia, manifiesto, tono, textos en inglés).

## Cómo está organizado

```
crm/index.html        App del CRM (GitHub Pages). Lee data/prospectos.json.
data/prospectos.json  LA BASE DE DATOS. Un objeto por local/prospecto.
data/schema.md        Campos, categorías, estados y prioridades.
data/_fuentes/        JSON crudos de investigación por categoría (no editar a mano).
tools/merge.cjs       Une _fuentes → prospectos.json (dedupe, slugs, prioridad).
plantillas/           Mensajes en inglés por canal y guion de visita.
docs/                 Guía de arranque y kit de marca.
```

## Reglas para cualquier Claude que trabaje aquí

1. **La base vive en `data/prospectos.json`.** Toda gestión (contacto hecho, respuesta, muestra entregada, pedido) se registra en el `log` del prospecto, con fecha ISO y quién lo hizo (`JC`, `DH` o `KV`). Actualiza `estado`, `nextAction` y `nextDate`.
2. **Nunca inventes contactos.** Correos, teléfonos e Instagram solo si están publicados por el propio negocio. Si no hay, se deja vacío y la acción es "conseguir canal".
3. **Un prospecto, un dueño.** El campo `owner` (`JC`, `DH` o `KV`) dice quién lo está trabajando. No le escribas a un local que está trabajando el otro.
4. **Mensajes en frío: pocos y espaciados.** Máximo 10 por día por canal, en horario hábil de Sídney, nunca en ráfaga. Primero muestra y conversación, nunca precio en el primer mensaje. Sin descuentos agresivos.
   - **Spam Act 2003 (aplica a email, SMS y WhatsApp, también entre negocios):** escribir solo a direcciones que el negocio publica, sin aviso de "no marketing", y con un mensaje relevante para su negocio. Cada mensaje identifica quién escribe y da forma de darse de baja. Nunca usar listas hechas con software que cosecha direcciones. Para newsletters y SMS masivos: solo con consentimiento expreso (formulario con casilla) y guardar quién, cuándo y cómo aceptó.
   - **LinkedIn:** solo mensajes escritos y enviados a mano. Su User Agreement (8.2) prohíbe bots o herramientas que envíen mensajes o agreguen contactos automáticamente.
5. **Tono de marca** (ver `docs/kit-marca-dona-lu.pdf`): calma, escenas concretas, orgullo por la gente de la finca. Nunca "humildes campesinos", nunca "premium/exquisito", nunca presión. En inglés: *coffee from our family farm in Colombia; I can tell you who picked it.*
6. **Antes de enviar algo externo** (correo, DM, WhatsApp) muéstrale el borrador a la persona con la que trabajas. No envíes nada en nombre del otro hermano.
7. **Commits pequeños y descriptivos**, en español: `Prospectos: +12 cafés Inner West`, `Log: Reuben Hills, muestra entregada`. Haz `git pull` antes de editar y `git push` al terminar, para que el otro Claude vea lo último.
8. **Lo legal manda.** Café tostado: sin permiso de importación, arancel 0 % (ABF, 0901.21: Free). **GST: el ATO clasifica el café en grano (verde, tostado o molido) como GST-free**, así que no debería cobrarse GST al importarlo ni al venderlo en bolsa. Viajeros: hasta 10 kg de café tostado por persona; la franquicia de AUD 900 no cubre mercancía comercial. Etiqueta en inglés con *Product of Colombia*, peso, lote, fecha y nombre del importador. Nada de café verde sin permiso. Detalles en la guía.
9. **No toques el diseño del CRM sin motivo.** Si hace falta un campo nuevo, agrégalo en `schema.md`, en el JSON y en la app, en ese orden.

## Cómo editar la base

- Desde la app (GitHub Pages): los cambios quedan en el navegador y se exportan con **Exportar JSON**; ese archivo reemplaza `data/prospectos.json` y se hace commit.
- Desde Claude Code: edita el JSON directamente (es texto) o usa `node tools/merge.cjs` si agregas fuentes nuevas en `data/_fuentes/`.
- Para ver la app en local: cualquier servidor estático en la raíz del repo (`npx serve .`) y abrir `/crm/`.

## Pipeline

`nuevo → contactado → respondió → muestra → negociando → cliente → pausado/descartado`. Definiciones en `data/schema.md`.

En el CRM, la vista **Pipeline** muestra una columna por estado: se arrastra una tarjeta (o se usan las flechas ‹ ›) para cambiar el estado, y queda anotado en el `log`.

## Negocio en Australia

- Juan Carlos opera como **sole trader** con el **ABN 91 675 014 684** (nombre registrado WE ROCK DIGITAL). No hace falta otro ABN: se agrega "importación y venta de café" como actividad adicional en el ABR (dentro de 28 días de empezar a vender) y, si se decide la marca, un segundo nombre de negocio en ASIC.
- Pendiente: reunión con contador (sole trader o sociedad con Katherine; separar gastos de diseño y café; pérdidas no comerciales).

## Dónde está cada cosa

- **Tareas y cronograma (Asana):** proyecto "Doña Lu - Australia" — https://app.asana.com/1/982337099972350/project/1220922552672418/list/1220922521095016
- **Plan y benchmarking:** https://claude.ai/artifact/DbiaAxdUNXi9L51ZZQpQwX
- **CRM:** https://werockagencia.github.io/donalu-australia/crm/

## Contactos

- David: WhatsApp +57 312 576 6056 · werockagencia@gmail.com
- Juan Carlos: higueradiaz.juancarlos@gmail.com
- Doña Lú (proveedor): Diana Zamudio · WhatsApp tienda +57 322 470 2667 · donalu.com.co · @donalucoffee

# Doña Lú · Australia — contexto para Claude

Este repositorio es el **contexto compartido** entre dos personas y sus asistentes Claude:

- **David Higuera** (We Rock, Colombia): agencia de Doña Lú, hace la marca, la web y la pauta.
- **Juan Carlos Higuera** (Sídney, Australia): distribuidor de Doña Lú en Australia. Vende las primeras bolsas de prueba y abre el mercado.

Léelo completo antes de actuar. Lo que está aquí es la fuente de verdad.

## Qué vendemos

Café **Doña Lú**, de una finca familiar en Arabia, Risaralda (Eje Cafetero, Colombia). Marca: *Café que se honra*. Tres cafés de la finca Danubio: **Lavado** (limpio y brillante), **Honey** (dulce, con cuerpo) y **Natural** (frutal y profundo). 100 % arábica, tostado en grano, bolsas de 250 g y 500 g. También kits de regalo (cesta o caja de madera pino con termo), útiles para regalos de empresa.

- Precio de proveedor (Doña Lú a Juan Carlos): COP 15.000 + IVA 5 % la bolsa de 250 g; COP 28.000 + IVA la de 500 g.
- Precio de venta de referencia en Australia: AUD 18–24 la bolsa de 250 g al público; ≈ AUD 14 a cafés y tiendas.
- Fase 1 (dic 2026): ~80 bolsas de 250 g llevadas en maleta, declaradas como mercancía. Fase 2: courier. Fase 3: carga aérea / café verde.
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

1. **La base vive en `data/prospectos.json`.** Toda gestión (contacto hecho, respuesta, muestra entregada, pedido) se registra en el `log` del prospecto, con fecha ISO y quién lo hizo (`JC` o `DH`). Actualiza `estado`, `nextAction` y `nextDate`.
2. **Nunca inventes contactos.** Correos, teléfonos e Instagram solo si están publicados por el propio negocio. Si no hay, se deja vacío y la acción es "conseguir canal".
3. **Un prospecto, un dueño.** El campo `owner` dice quién lo está trabajando. No le escribas a un local que está trabajando el otro.
4. **Mensajes en frío: pocos y espaciados.** Máximo 10 por día por canal, en horario hábil de Sídney, nunca en ráfaga. Primero muestra y conversación, nunca precio en el primer mensaje. Sin descuentos agresivos.
5. **Tono de marca** (ver `docs/kit-marca-dona-lu.pdf`): calma, escenas concretas, orgullo por la gente de la finca. Nunca "humildes campesinos", nunca "premium/exquisito", nunca presión. En inglés: *coffee from our family farm in Colombia; I can tell you who picked it.*
6. **Antes de enviar algo externo** (correo, DM, WhatsApp) muéstrale el borrador a la persona con la que trabajas. No envíes nada en nombre del otro hermano.
7. **Commits pequeños y descriptivos**, en español: `Prospectos: +12 cafés Inner West`, `Log: Reuben Hills, muestra entregada`. Haz `git pull` antes de editar y `git push` al terminar, para que el otro Claude vea lo último.
8. **Lo legal manda.** Café tostado: sin permiso de importación, arancel 0 %, GST 10 %. Etiqueta en inglés con *Product of Colombia*, peso, lote, fecha y nombre del importador. Nada de café verde sin permiso. Detalles en la guía.
9. **No toques el diseño del CRM sin motivo.** Si hace falta un campo nuevo, agrégalo en `schema.md`, en el JSON y en la app, en ese orden.

## Cómo editar la base

- Desde la app (GitHub Pages): los cambios quedan en el navegador y se exportan con **Exportar JSON**; ese archivo reemplaza `data/prospectos.json` y se hace commit.
- Desde Claude Code: edita el JSON directamente (es texto) o usa `node tools/merge.cjs` si agregas fuentes nuevas en `data/_fuentes/`.
- Para ver la app en local: cualquier servidor estático en la raíz del repo (`npx serve .`) y abrir `/crm/`.

## Pipeline

`nuevo → contactado → respondió → muestra → negociando → cliente → pausado/descartado`. Definiciones en `data/schema.md`.

## Contactos

- David: WhatsApp +57 312 576 6056 · werockagencia@gmail.com
- Juan Carlos: higueradiaz.juancarlos@gmail.com
- Doña Lú (proveedor): Diana Zamudio · WhatsApp tienda +57 322 470 2667 · donalu.com.co · @donalucoffee

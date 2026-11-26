# Doña Lú · Australia

Base de prospectos y CRM para vender el café **Doña Lú** (finca Danubio, Arabia, Risaralda, Colombia) en Sídney. Lo trabajan **Juan Carlos Higuera** (Sídney) y **David Higuera / We Rock** (Colombia), cada uno con su Claude. Este repo es el contexto compartido: lo que está aquí es lo que vale.

- **CRM:** https://werockagencia.github.io/donalu-australia/crm/
- **Base de datos:** [`data/prospectos.json`](data/prospectos.json) · esquema en [`data/schema.md`](data/schema.md)
- **Instrucciones para Claude:** [`CLAUDE.md`](CLAUDE.md)
- **Mensajes por canal (EN/ES):** [`plantillas/mensajes.md`](plantillas/mensajes.md)
- **Guía de arranque** (permisos, logística, costos, proyección 2027): [`docs/guia-arranque-australia.pdf`](docs/guia-arranque-australia.pdf)
- **Kit de marca** (historia, manifiesto, tono, textos en inglés): [`docs/kit-marca-dona-lu.pdf`](docs/kit-marca-dona-lu.pdf)

## Cómo se usa

1. Abre el CRM. Filtra por región, categoría, prioridad o estado. Empieza por los **A** de tu zona.
2. Antes de escribir, lee la ficha: canal, por qué encaja y el log.
3. Registra cada gestión en el log (fecha, quién, qué pasó), cambia el estado y pon el próximo paso con fecha.
4. **Exportar JSON** descarga la base con tus cambios. Reemplaza `data/prospectos.json` y haz commit (o pídeselo a tu Claude).
5. `git pull` antes de empezar, `git push` al terminar.

## Pipeline

`nuevo → contactado → respondió → muestra → negociando → cliente` (también `pausado` y `descartado`).

## Para desarrolladores y Claude

- La app es un solo archivo estático: `crm/index.html`. Lee `../data/prospectos.json`. Sin dependencias ni build.
- `node tools/merge.cjs` reconstruye `prospectos.json` a partir de `data/_fuentes/*.json` conservando estados y logs.
- Para probar en local: `npx serve .` y abrir `/crm/`.

## Marca

Doña Lú · *Café que se honra*. Verde #0F3B26, costal #D3BD93, papel #EEE5D2, tinta #1B1915, barro #9A4A2E, azul tinta #2B4C6F. Tipografías: Bitter, Archivo, Saira Stencil One. Manual completo: https://werockagencia.github.io/propuestas/donalu/marca/

Hecho por We Rock · werock.space

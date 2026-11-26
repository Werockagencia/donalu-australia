# Esquema de `prospectos.json`

Arreglo de objetos. Un objeto por local o contacto. Campos:

| Campo | Tipo | Notas |
|---|---|---|
| `slug` | string | Único, kebab-case, derivado del nombre. No cambia. |
| `nombre` | string | Nombre del negocio como aparece públicamente. |
| `categoria` | string | Ver lista abajo. |
| `zona` | string | Barrio o zona de Sídney (Surry Hills, Newtown, Manly, Parramatta…). |
| `region` | string | `inner-city`, `inner-west`, `eastern`, `north-shore`, `northern-beaches`, `south`, `west`, `online`. |
| `direccion` | string | Dirección pública. |
| `web`, `instagram`, `facebook`, `linkedin` | string | URL o `@usuario`. Vacío si no hay. |
| `email`, `telefono` | string | Solo si son públicos. `telefono` en formato +61 cuando se pueda. |
| `whatsapp` | string | Solo si el negocio lo publica como WhatsApp. |
| `porque` | string | Una frase: por qué encaja con Doña Lú. |
| `prioridad` | `A`/`B`/`C` | A = ir primero (tienda de retail, origen rotativo, dueños latinos, comunidad). |
| `estado` | string | Ver pipeline. |
| `owner` | `JC`/`DH`/`KV`/`` | Quién lo trabaja (KV = Katherine). |
| `canal` | string | Canal preferido para el primer contacto: `visita`, `instagram`, `email`, `whatsapp`, `web`. |
| `nextAction` | string | Próximo paso concreto. |
| `nextDate` | string | `YYYY-MM-DD`. |
| `log` | array | `{ "fecha": "YYYY-MM-DD", "quien": "JC", "nota": "..." }` ordenado del más viejo al más nuevo. |
| `fuente` | string | URL donde se verificó el contacto. |
| `extra` | object | Campos sueltos por categoría: `how_to_apply`, `fees`, `fechas` (festivales). |

## Categorías

`cafe` · `roaster-cafe` · `cafe-restaurante` · `restaurante-latino` · `tienda-latina` · `panaderia` · `tienda-gourmet` · `deli` · `organico` · `regalos` · `mercado` · `hampers` · `regalos-corporativos` · `marketplace` · `hotel` · `coworking` · `camara` · `agencia-regalos` · `catering` · `venue` · `inmobiliaria` · `empresa-colombiana` · `festival` · `asociacion` · `escuela` · `medio` · `iglesia` · `otro`

## Pipeline (campo `estado`)

| Estado | Significa |
|---|---|
| `nuevo` | Está en la base, nadie le ha escrito. |
| `contactado` | Se envió el primer mensaje o se hizo la visita. Pendiente de respuesta. |
| `respondio` | Respondieron. Hay conversación. |
| `muestra` | Se entregó o envió muestra. Esperando prueba. |
| `negociando` | Hablan de precio, cantidades o fechas. |
| `cliente` | Hizo un pedido. |
| `pausado` | Interesados pero no ahora. `nextDate` dice cuándo volver. |
| `descartado` | No encaja o dijeron que no. Se deja el motivo en el log. |

## Prioridad

- **A**: tienda de retail visible, origen rotativo o filtro, dueños o baristas latinos, comunidad colombiana, mercados con cupo, regalos corporativos de fin de año.
- **B**: café con buen perfil pero sin señal de retail; tiendas gourmet generales; hoteles boutique.
- **C**: grandes, lejanos o con proceso de compra largo. Se trabajan cuando haya volumen.

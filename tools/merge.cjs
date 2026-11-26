// Une los JSON de data/_fuentes/*.json en data/prospectos.json.
// Conserva estado, owner, log, nextAction y nextDate de los prospectos que ya existían (misma slug).
// Uso: node tools/merge.cjs
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'data', '_fuentes'), OUT = path.join(ROOT, 'data', 'prospectos.json');

const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const REGION = [
  [/surry hills|darlinghurst|redfern|alexandria|waterloo|chippendale|ultimo|cbd|haymarket|potts point|pyrmont|barangaroo|the rocks|millers point|circular quay|woolloomooloo|elizabeth bay|zetland|rosebery|mascot|botany|kensington|kingsford/i, 'inner-city'],
  [/newtown|enmore|marrickville|glebe|balmain|rozelle|leichhardt|annandale|camperdown|erskineville|st peters|sydenham|tempe|dulwich hill|summer hill|ashfield|petersham|stanmore|lewisham|haberfield|five dock|drummoyne|concord|strathfield|burwood|homebush|olympic park|earlwood|campsie|bankstown/i, 'inner-west'],
  [/bondi|bronte|coogee|randwick|maroubra|paddington|woollahra|double bay|rose bay|vaucluse|clovelly|tamarama|waverley/i, 'eastern'],
  [/north sydney|crows nest|neutral bay|cremorne|mosman|lane cove|chatswood|st leonards|willoughby|artarmon|cammeray|kirribilli|milsons point/i, 'north-shore'],
  [/manly|freshwater|dee why|brookvale|mona vale|avalon|newport|narrabeen|collaroy|curl curl|balgowlah|fairlight/i, 'northern-beaches'],
  [/hurstville|kogarah|rockdale|brighton|cronulla|miranda|caringbah|sutherland|sans souci|ramsgate|arncliffe/i, 'south'],
  [/parramatta|harris park|westmead|rydalmere|ryde|macquarie|epping|castle hill|baulkham|rouse hill|blacktown|penrith|liverpool|fairfield|cabramatta|campbelltown|camden|granville|auburn|lidcombe|merrylands/i, 'west'],
];
const region = z => { for (const [re, r] of REGION) if (re.test(z || '')) return r; return /online|web/i.test(z || '') ? 'online' : ''; };
const PRIO_A = /retail|shelf|estante|single origin|origen|filtro|filter|latin|colomb|comunidad|mercado|market|regalo|gift|hamper|rotat/i;
const prio = e => PRIO_A.test((e.porque || '') + ' ' + (e.categoria || '') + ' ' + (e.why || '')) ? 'A' : 'B';
const canal = e => e.whatsapp ? 'whatsapp' : e.instagram ? 'instagram' : e.email ? 'email' : (e.categoria === 'cafe' || e.categoria === 'roaster-cafe' || e.categoria === 'cafe-restaurante') ? 'visita' : 'web';
const clean = v => (v == null ? '' : String(v).trim());
const ig = v => { v = clean(v); if (!v) return ''; const m = v.match(/instagram\.com\/([A-Za-z0-9._]+)/); if (m) return '@' + m[1]; return v.startsWith('@') ? v : '@' + v.replace(/^https?:\/\//, ''); };

let prev = {}; try { for (const p of JSON.parse(fs.readFileSync(OUT, 'utf8'))) prev[p.slug] = p; } catch (e) {}
const out = {}, files = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter(f => f.endsWith('.json')).sort() : [];
let n = 0;
for (const f of files) {
  let arr; try { arr = JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')); } catch (e) { console.error('JSON inválido:', f, e.message); continue; }
  if (!Array.isArray(arr)) continue;
  for (const r of arr) {
    const nombre = clean(r.nombre || r.name); if (!nombre) continue;
    const slug = slugify(nombre); n++;
    const e = {
      slug, nombre,
      categoria: clean(r.categoria || r.category || 'otro'),
      zona: clean(r.zona || r.zone), region: '',
      direccion: clean(r.direccion || r.address),
      web: clean(r.web), instagram: ig(r.instagram), facebook: clean(r.facebook), linkedin: clean(r.linkedin),
      email: clean(r.email).toLowerCase(), telefono: clean(r.telefono || r.phone), whatsapp: clean(r.whatsapp),
      porque: clean(r.porque || r.why),
      prioridad: 'B', estado: 'nuevo', owner: '', canal: '',
      nextAction: '', nextDate: '', log: [],
      fuente: clean(r.fuente || r.source),
      extra: {},
    };
    for (const k of ['how_to_apply', 'fees', 'fechas', 'dates']) if (clean(r[k])) e.extra[k] = clean(r[k]);
    e.region = region(e.zona + ' ' + e.direccion); e.prioridad = prio(e); e.canal = canal(e);
    e.nextAction = e.canal === 'visita' ? 'Visitar con muestra y presentarse' : e.canal === 'web' && !e.email && !e.instagram ? 'Conseguir canal de contacto' : 'Primer mensaje con muestra';
    if (out[slug]) { // misma slug desde otra fuente: completar vacíos
      const o = out[slug]; for (const k of Object.keys(e)) if (!o[k] && e[k] && k !== 'extra') o[k] = e[k]; Object.assign(o.extra, e.extra); continue;
    }
    if (prev[slug]) { const p = prev[slug]; for (const k of ['estado', 'owner', 'log', 'nextAction', 'nextDate', 'prioridad', 'canal', 'whatsapp']) if (p[k] && (!Array.isArray(p[k]) || p[k].length)) e[k] = p[k]; }
    out[slug] = e;
  }
}
const list = Object.values(out).sort((a, b) => a.prioridad.localeCompare(b.prioridad) || a.region.localeCompare(b.region) || a.nombre.localeCompare(b.nombre));
fs.writeFileSync(OUT, JSON.stringify(list, null, 1) + '\n');
const by = k => list.reduce((m, e) => (m[e[k]] = (m[e[k]] || 0) + 1, m), {});
console.log(`fuentes: ${files.length} · filas: ${n} · prospectos únicos: ${list.length}`);
console.log('por categoría:', by('categoria')); console.log('por región:', by('region')); console.log('por prioridad:', by('prioridad'));
console.log('con email:', list.filter(e => e.email).length, '· con instagram:', list.filter(e => e.instagram).length, '· con teléfono:', list.filter(e => e.telefono).length);

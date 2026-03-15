// ═══════════════════════════════════════════
//  FruitBlast — data.js
//  Shared game data, shapes, objectives
// ═══════════════════════════════════════════
 
const FRUITS = ['🍉','🍋','🍇','🍓','🍊','🥝','🍑','🫐'];
const SPEC = { bomb:'💣', lightH:'⚡', lightV:'🌩️', ice:'❄️' };
 
// ── SHAPES ──
// Pool separati per dimensione — genShapes garantisce mix 1 piccola + 1 media + 1 grande
// Tiny 1-2 celle
const S_TINY = [
  {c:[[0,0]]},
  {c:[[0,0],[1,0]]},
  {c:[[0,0],[0,1]]},
];
// Small 3 celle
const S_SMALL = [
  {c:[[0,0],[1,0],[2,0]]},
  {c:[[0,0],[0,1],[0,2]]},
  {c:[[0,0],[1,0],[1,1]]},
  {c:[[0,0],[0,1],[1,1]]},
  {c:[[1,0],[0,1],[1,1]]},
  {c:[[0,0],[1,0],[0,1]]},
];
// Medium 4 celle
const S_MED = [
  {c:[[0,0],[1,0],[2,0],[3,0]]},
  {c:[[0,0],[0,1],[0,2],[0,3]]},
  {c:[[0,0],[1,0],[0,1],[1,1]]},
  {c:[[0,0],[1,0],[2,0],[1,1]]},
  {c:[[1,0],[0,1],[1,1],[2,1]]},
  {c:[[0,0],[1,0],[1,1],[2,1]]},
  {c:[[0,1],[1,0],[1,1],[2,0]]},
  {c:[[0,0],[1,0],[2,0],[2,1]]},
  {c:[[0,0],[1,0],[2,0],[0,1]]},
  {c:[[0,0],[0,1],[0,2],[1,2]]},
  {c:[[0,0],[0,1],[0,2],[1,0]]},
];
// Big 5 celle
const S_BIG = [
  {c:[[0,0],[1,0],[2,0],[3,0],[4,0]]},
  {c:[[0,0],[0,1],[0,2],[0,3],[0,4]]},
  {c:[[0,0],[1,0],[2,0],[2,1],[2,2]]},
  {c:[[0,0],[1,0],[2,0],[0,1],[0,2]]},
  {c:[[1,0],[0,1],[1,1],[2,1],[1,2]]},
  {c:[[0,0],[1,0],[1,1],[1,2],[2,2]]},
  {c:[[0,2],[1,0],[1,1],[1,2],[2,0]]},
  {c:[[0,0],[1,0],[2,0],[1,1],[1,2]]},
  {c:[[0,0],[0,1],[1,1],[2,1],[2,0]]},
  {c:[[0,0],[1,0],[2,0],[0,1],[1,1]]},
];
// XLarge 6-7 celle — solo difficile
const S_XLARGE = [
  {c:[[0,0],[1,0],[2,0],[3,0],[2,1],[2,2]]},
  {c:[[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[2,2]]},
  {c:[[0,0],[1,0],[2,0],[2,1],[2,2],[1,2],[0,2]]},
  {c:[[0,0],[0,1],[0,2],[0,3],[1,3],[2,3]]},
  {c:[[1,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]},
  {c:[[0,0],[1,0],[2,0],[1,1],[0,2],[1,2],[2,2]]},
];

// pool per genShapes (mix garantito per difficolta)
const POOL_E = { tiny:S_TINY, small:S_SMALL, med:S_MED };
const POOL_M = { tiny:S_TINY, small:S_SMALL, med:S_MED, big:S_BIG };
const POOL_H = { small:S_SMALL, med:S_MED, big:S_BIG, xlarge:S_XLARGE };

const DCFG = {
  easy:   { gs:8,  sh:[...S_TINY,...S_SMALL,...S_MED], pool:POOL_E, sc:0.08, lbl:'🌱 Facile',    col:'#2ecc71', ms:8  },
  medium: { gs:8,  sh:[...S_TINY,...S_SMALL,...S_MED,...S_BIG], pool:POOL_M, sc:0.15, lbl:'🔥 Medio',     col:'#f1c40f', ms:10 },
  hard:   { gs:10, sh:[...S_SMALL,...S_MED,...S_BIG,...S_XLARGE], pool:POOL_H, sc:0.22, lbl:'💀 Difficile',  col:'#e74c3c', ms:12 },
};
// ── OBJECTIVES per difficulty ──
// Each has: id, icon, name, desc, type, target, reward
// type values: lines|score|combo|useBomb|useLH|useLV|useIce|placed|bigShape|multiLine|turns
 
const OBJECTIVES = {
  easy: [
    // ── Livello 1-5: primissimi passi ──
    { id:'e1',  icon:'📏', name:'Prime linee',        desc:'Cancella 5 linee in una partita',              type:'lines',    target:5,    reward:300  },
    { id:'e2',  icon:'⭐', name:'Primo punteggio',    desc:'Raggiungi 500 punti',                           type:'score',    target:500,  reward:250  },
    { id:'e3',  icon:'🔥', name:'Primo combo',        desc:'Fai un combo x2',                               type:'combo',    target:2,    reward:300  },
    { id:'e4',  icon:'🧱', name:'Muratore junior',    desc:'Piazza 20 blocchi',                             type:'placed',   target:20,   reward:200  },
    { id:'e5',  icon:'💣', name:'Prima bomba',        desc:'Usa una bomba',                                 type:'useBomb',  target:1,    reward:200  },
    // ── Livello 6-10: primi speciali ──
    { id:'e6',  icon:'⚡', name:'Fulminante',         desc:'Usa il fulmine orizzontale 2 volte',            type:'useLH',    target:2,    reward:250  },
    { id:'e7',  icon:'❄️', name:'Ghiacciato',         desc:'Usa il ghiaccio 2 volte',                      type:'useIce',   target:2,    reward:200  },
    { id:'e8',  icon:'🎯', name:'Doppio colpo',       desc:'Cancella 2 linee in un singolo piazzamento',   type:'multiLine',target:2,    reward:350  },
    { id:'e9',  icon:'🔄', name:'In ritmo',           desc:'Completa 5 turni (set di 3 forme)',             type:'turns',    target:5,    reward:200  },
    { id:'e10', icon:'🏅', name:'Campione facile',    desc:'Raggiungi 1.500 punti',                        type:'score',    target:1500, reward:500  },
    // ── Livello 11-15: prendere confidenza ──
    { id:'e11', icon:'🌱', name:'Piccolo costruttore',desc:'Piazza 50 blocchi in totale',                   type:'placed',   target:50,   reward:350  },
    { id:'e12', icon:'🎪', name:'Spettacolo doppio',  desc:'Cancella 8 linee in una partita',              type:'lines',    target:8,    reward:400  },
    { id:'e13', icon:'💨', name:'Fulmine rapido',     desc:'Usa il fulmine verticale 2 volte',             type:'useLV',    target:2,    reward:300  },
    { id:'e14', icon:'🍀', name:'Colpo di fortuna',   desc:'Fai un combo x3',                              type:'combo',    target:3,    reward:450  },
    { id:'e15', icon:'🎠', name:'Giocatore costante', desc:'Completa 10 turni',                            type:'turns',    target:10,   reward:350  },
    // ── Livello 16-20: sfide crescenti ──
    { id:'e16', icon:'💫', name:'Esplosivo',          desc:'Usa 3 bombe in partite diverse',               type:'useBomb',  target:3,    reward:400  },
    { id:'e17', icon:'🧊', name:'Gelo totale',        desc:'Usa il ghiaccio 5 volte',                      type:'useIce',   target:5,    reward:400  },
    { id:'e18', icon:'📦', name:'Grande forma',       desc:'Piazza una forma da 5+ blocchi',               type:'bigShape', target:5,    reward:450  },
    { id:'e19', icon:'🎖️', name:'Veterano facile',    desc:'Raggiungi 3.000 punti',                        type:'score',    target:3000, reward:600  },
    { id:'e20', icon:'🌟', name:'Stella nascente',    desc:'Cancella 3 linee in un solo piazzamento',      type:'multiLine',target:3,    reward:700  },
    // ── Livello 21-25: quasi medio ──
    { id:'e21', icon:'🏠', name:'Architetto base',    desc:'Piazza 100 blocchi in totale',                 type:'placed',   target:100,  reward:500  },
    { id:'e22', icon:'⚡', name:'Fulmine doppio',     desc:'Usa fulmine H e V nella stessa partita',       type:'useLH',    target:3,    reward:550  },
    { id:'e23', icon:'🎯', name:'Precisione',         desc:'Cancella 12 linee in una partita',             type:'lines',    target:12,   reward:550  },
    { id:'e24', icon:'🔮', name:'Combo maestro',      desc:'Fai un combo x4',                              type:'combo',    target:4,    reward:650  },
    { id:'e25', icon:'⏱️', name:'Maratoneta',         desc:'Completa 18 turni',                            type:'turns',    target:18,   reward:550  },
    // ── Livello 26-30: finale facile ──
    { id:'e26', icon:'💣', name:'Bombardiere',        desc:'Usa 5 bombe in totale',                        type:'useBomb',  target:5,    reward:600  },
    { id:'e27', icon:'❄️', name:'Re del ghiaccio jr', desc:'Usa il ghiaccio 8 volte',                     type:'useIce',   target:8,    reward:600  },
    { id:'e28', icon:'🔷', name:'Forma XXL',          desc:'Piazza una forma da 6+ blocchi',               type:'bigShape', target:6,    reward:650  },
    { id:'e29', icon:'🥇', name:'Primo posto',        desc:'Raggiungi 5.000 punti',                        type:'score',    target:5000, reward:800  },
    { id:'e30', icon:'👑', name:'Re del facile',      desc:'Cancella 20 linee in una partita',             type:'lines',    target:20,   reward:1000 },
    // ── Livello 31-60: sfide estese ──
    { id:'e31', icon:'🚂', name:'Treno in corsa',      desc:'Completa 25 turni',                            type:'turns',    target:25,   reward:600  },
    { id:'e32', icon:'🌈', name:'Arcobaleno',           desc:'Cancella 15 linee in una partita',             type:'lines',    target:15,   reward:650  },
    { id:'e33', icon:'🔩', name:'Meccanico',            desc:'Piazza 150 blocchi in totale',                 type:'placed',   target:150,  reward:600  },
    { id:'e34', icon:'🎸', name:'Rock star',            desc:'Fai un combo x5',                              type:'combo',    target:5,    reward:750  },
    { id:'e35', icon:'🌪️', name:'Turbine',              desc:'Usa 8 bombe in totale',                        type:'useBomb',  target:8,    reward:700  },
    { id:'e36', icon:'🦅', name:'Aquila',               desc:'Raggiungi 7.000 punti',                        type:'score',    target:7000, reward:900  },
    { id:'e37', icon:'🧲', name:'Magnetico',            desc:'Usa il ghiaccio 12 volte',                     type:'useIce',   target:12,   reward:700  },
    { id:'e38', icon:'⚡', name:'Scarica elettrica',    desc:'Usa 8 fulmini in totale (H+V)',                type:'useLH',    target:8,    reward:750  },
    { id:'e39', icon:'🎻', name:'Virtuoso',             desc:'Cancella 4 linee in un solo piazzamento',      type:'multiLine',target:4,    reward:900  },
    { id:'e40', icon:'🧗', name:'Scalatore',            desc:'Completa 35 turni',                            type:'turns',    target:35,   reward:750  },
    { id:'e41', icon:'🦁', name:'Leone',                desc:'Piazza 200 blocchi in totale',                 type:'placed',   target:200,  reward:800  },
    { id:'e42', icon:'🌙', name:'Notturno',             desc:'Raggiungi 9.000 punti',                        type:'score',    target:9000, reward:1000 },
    { id:'e43', icon:'🎯', name:'Tiratore scelto',      desc:'Cancella 20 linee in una partita',             type:'lines',    target:20,   reward:850  },
    { id:'e44', icon:'🔥', name:'Inferno',              desc:'Fai un combo x6',                              type:'combo',    target:6,    reward:1000 },
    { id:'e45', icon:'🏋️', name:'Peso massimo',         desc:'Usa 10 bombe in totale',                       type:'useBomb',  target:10,   reward:900  },
    { id:'e46', icon:'🧊', name:'Iceberg',              desc:'Usa il ghiaccio 15 volte',                     type:'useIce',   target:15,   reward:900  },
    { id:'e47', icon:'🌊', name:'Onda anomala',         desc:'Cancella 5 linee in un solo piazzamento',      type:'multiLine',target:5,    reward:1200 },
    { id:'e48', icon:'🦋', name:'Metamorfosi',          desc:'Piazza 300 blocchi in totale',                 type:'placed',   target:300,  reward:950  },
    { id:'e49', icon:'💡', name:'Illuminato',           desc:'Raggiungi 12.000 punti',                       type:'score',    target:12000,reward:1200 },
    { id:'e50', icon:'🚀', name:'Lancio orbitale',      desc:'Completa 50 turni',                            type:'turns',    target:50,   reward:1000 },
    { id:'e51', icon:'🐉', name:'Drago giovane',        desc:'Fai un combo x7',                              type:'combo',    target:7,    reward:1300 },
    { id:'e52', icon:'⚔️', name:'Guerriero',            desc:'Usa 12 fulmini in totale (H+V)',               type:'useLH',    target:12,   reward:1000 },
    { id:'e53', icon:'🏰', name:'Castello',             desc:'Piazza 400 blocchi in totale',                 type:'placed',   target:400,  reward:1100 },
    { id:'e54', icon:'🌋', name:'Vulcano',              desc:'Cancella 25 linee in una partita',             type:'lines',    target:25,   reward:1100 },
    { id:'e55', icon:'💎', name:'Diamante facile',      desc:'Raggiungi 15.000 punti',                       type:'score',    target:15000,reward:1400 },
    { id:'e56', icon:'🔮', name:'Oracolo',              desc:'Usa il ghiaccio 20 volte',                     type:'useIce',   target:20,   reward:1100 },
    { id:'e57', icon:'🌟', name:'Superstella',          desc:'Completa 70 turni',                            type:'turns',    target:70,   reward:1200 },
    { id:'e58', icon:'🏆', name:'Trofeo dorato',        desc:'Raggiungi 20.000 punti',                       type:'score',    target:20000,reward:1800 },
    { id:'e59', icon:'🌠', name:'Meteora',              desc:'Cancella 30 linee in una partita',             type:'lines',    target:30,   reward:1500 },
    { id:'e60', icon:'⚡', name:'Il Fulmine',           desc:'Fai un combo x8',                              type:'combo',    target:8,    reward:2000 },
  ],
  medium: [
    // ── Livello 1-5: entrata nel medio ──
    { id:'m1',  icon:'📐', name:'In serie',           desc:'Cancella 15 linee in una partita',             type:'lines',    target:15,   reward:500  },
    { id:'m2',  icon:'🌟', name:'In forma',           desc:'Raggiungi 3.000 punti',                        type:'score',    target:3000, reward:600  },
    { id:'m3',  icon:'💥', name:'Triplice fuoco',     desc:'Fai un combo x3',                              type:'combo',    target:3,    reward:600  },
    { id:'m4',  icon:'🏗️', name:'Architetto',         desc:'Piazza 80 blocchi',                            type:'placed',   target:80,   reward:500  },
    { id:'m5',  icon:'💣', name:'Artificiere',        desc:'Usa 3 bombe in una partita',                   type:'useBomb',  target:3,    reward:450  },
    // ── Livello 6-10: specializzazione ──
    { id:'m6',  icon:'🌩️', name:'Colpo verticale',    desc:'Usa il fulmine verticale 3 volte',             type:'useLV',    target:3,    reward:450  },
    { id:'m7',  icon:'❄️', name:'Glaciatore',         desc:'Usa il ghiaccio 4 volte',                      type:'useIce',   target:4,    reward:400  },
    { id:'m8',  icon:'🔷', name:'Grande piazzata',    desc:'Piazza una forma da 6+ blocchi',               type:'bigShape', target:6,    reward:400  },
    { id:'m9',  icon:'⏳', name:'Resistente',         desc:'Completa 20 turni',                            type:'turns',    target:20,   reward:450  },
    { id:'m10', icon:'🏆', name:'Campione medio',     desc:'Raggiungi 6.000 punti',                        type:'score',    target:6000, reward:900  },
    // ── Livello 11-15: pressione vera ──
    { id:'m11', icon:'🌪️', name:'Vortice di linee',   desc:'Cancella 25 linee in una partita',             type:'lines',    target:25,   reward:700  },
    { id:'m12', icon:'🚀', name:'Accelerazione',      desc:'Fai un combo x4',                              type:'combo',    target:4,    reward:750  },
    { id:'m13', icon:'🏋️', name:'Powerlifter',        desc:'Piazza 150 blocchi in totale',                 type:'placed',   target:150,  reward:700  },
    { id:'m14', icon:'🌩️', name:'Tempesta elettrica', desc:'Usa fulmine H e V 3 volte ciascuno',           type:'useLV',    target:5,    reward:700  },
    { id:'m15', icon:'🎯', name:'Cecchino',           desc:'Cancella 4 linee in un solo piazzamento',      type:'multiLine',target:4,    reward:800  },
    // ── Livello 16-20: sfide avanzate ──
    { id:'m16', icon:'💎', name:'Diamante grezzo',    desc:'Raggiungi 9.000 punti',                        type:'score',    target:9000, reward:1000 },
    { id:'m17', icon:'🧊', name:'Tundra',             desc:'Usa il ghiaccio 7 volte',                      type:'useIce',   target:7,    reward:700  },
    { id:'m18', icon:'💣', name:'Artificiere pro',    desc:'Usa 6 bombe in totale',                        type:'useBomb',  target:6,    reward:750  },
    { id:'m19', icon:'⏰', name:'Ultra resistente',   desc:'Completa 35 turni',                            type:'turns',    target:35,   reward:800  },
    { id:'m20', icon:'🔶', name:'Forma colossale',    desc:'Piazza una forma da 7+ blocchi',               type:'bigShape', target:7,    reward:800  },
    // ── Livello 21-25: quasi difficile ──
    { id:'m21', icon:'🌊', name:'Marea di linee',     desc:'Cancella 35 linee in una partita',             type:'lines',    target:35,   reward:900  },
    { id:'m22', icon:'⚡', name:'Fulmine x5',         desc:'Fai un combo x5',                              type:'combo',    target:5,    reward:1000 },
    { id:'m23', icon:'🏰', name:'Fortezza',           desc:'Piazza 220 blocchi in totale',                 type:'placed',   target:220,  reward:900  },
    { id:'m24', icon:'🎆', name:'Fuochi dartificio',desc:'Usa 8 bombe in totale',                        type:'useBomb',  target:8,    reward:900  },
    { id:'m25', icon:'🌡️', name:'Zero assoluto',      desc:'Usa il ghiaccio 10 volte',                     type:'useIce',   target:10,   reward:850  },
    // ── Livello 26-30: finale medio ──
    { id:'m26', icon:'🎖️', name:'Veterano',           desc:'Completa 50 turni',                            type:'turns',    target:50,   reward:1000 },
    { id:'m27', icon:'🌠', name:'Stelle filanti',     desc:'Cancella 5 linee in un solo piazzamento',      type:'multiLine',target:5,    reward:1200 },
    { id:'m28', icon:'💰', name:'Tesoriere',          desc:'Raggiungi 12.000 punti',                       type:'score',    target:12000,reward:1300 },
    { id:'m29', icon:'⚡', name:'Maestro del fulmine',desc:'Usa fulmini 12 volte in totale',               type:'useLV',    target:12,   reward:1100 },
    { id:'m30', icon:'👑', name:'Re del medio',       desc:'Raggiungi 18.000 punti',                       type:'score',    target:18000,reward:2000 },
    // ── Livello 31-60: sfide estese ──
    { id:'m31', icon:'🚂', name:'Espresso',             desc:'Completa 60 turni',                            type:'turns',    target:60,   reward:1100 },
    { id:'m32', icon:'🌈', name:'Prisma',               desc:'Cancella 40 linee in una partita',             type:'lines',    target:40,   reward:1200 },
    { id:'m33', icon:'🔩', name:'Ingegnere',             desc:'Piazza 280 blocchi in totale',                 type:'placed',   target:280,  reward:1000 },
    { id:'m34', icon:'🎸', name:'Heavy metal',           desc:'Fai un combo x6',                              type:'combo',    target:6,    reward:1300 },
    { id:'m35', icon:'🌪️', name:'Ciclone',               desc:'Usa 10 bombe in totale',                       type:'useBomb',  target:10,   reward:1100 },
    { id:'m36', icon:'🦅', name:'Rapace',                desc:'Raggiungi 16.000 punti',                       type:'score',    target:16000,reward:1400 },
    { id:'m37', icon:'🧲', name:'Calamita',              desc:'Usa il ghiaccio 13 volte',                     type:'useIce',   target:13,   reward:1000 },
    { id:'m38', icon:'⚡', name:'Tempesta di fulmini',   desc:'Usa 15 fulmini in totale (H+V)',               type:'useLH',    target:15,   reward:1200 },
    { id:'m39', icon:'🎻', name:'Maestro',               desc:'Cancella 6 linee in un solo piazzamento',      type:'multiLine',target:6,    reward:1600 },
    { id:'m40', icon:'🧗', name:'Alpinista',             desc:'Completa 75 turni',                            type:'turns',    target:75,   reward:1300 },
    { id:'m41', icon:'🦁', name:'Re leone',              desc:'Piazza 350 blocchi in totale',                 type:'placed',   target:350,  reward:1200 },
    { id:'m42', icon:'🌙', name:'Luna piena',            desc:'Raggiungi 22.000 punti',                       type:'score',    target:22000,reward:1600 },
    { id:'m43', icon:'🎯', name:'Cecchino elite',        desc:'Cancella 48 linee in una partita',             type:'lines',    target:48,   reward:1400 },
    { id:'m44', icon:'🔥', name:'Fiamma viva',           desc:'Fai un combo x7',                              type:'combo',    target:7,    reward:1700 },
    { id:'m45', icon:'🏋️', name:'Campione',              desc:'Usa 13 bombe in totale',                       type:'useBomb',  target:13,   reward:1300 },
    { id:'m46', icon:'🧊', name:'Polo nord',             desc:'Usa il ghiaccio 17 volte',                     type:'useIce',   target:17,   reward:1300 },
    { id:'m47', icon:'🌊', name:'Tsunami',               desc:'Cancella 7 linee in un solo piazzamento',      type:'multiLine',target:7,    reward:2000 },
    { id:'m48', icon:'🦋', name:'Farfalla di fuoco',     desc:'Piazza 450 blocchi in totale',                 type:'placed',   target:450,  reward:1500 },
    { id:'m49', icon:'💡', name:'Genio',                 desc:'Raggiungi 28.000 punti',                       type:'score',    target:28000,reward:2000 },
    { id:'m50', icon:'🚀', name:'Razzo spaziale',        desc:'Completa 100 turni',                           type:'turns',    target:100,  reward:1700 },
    { id:'m51', icon:'🐉', name:'Drago',                 desc:'Fai un combo x8',                              type:'combo',    target:8,    reward:2200 },
    { id:'m52', icon:'⚔️', name:'Condottiero',           desc:'Usa 20 fulmini in totale (H+V)',               type:'useLH',    target:20,   reward:1600 },
    { id:'m53', icon:'🏰', name:'Cittadella',            desc:'Piazza 600 blocchi in totale',                 type:'placed',   target:600,  reward:1800 },
    { id:'m54', icon:'🌋', name:'Supervulcano',          desc:'Cancella 55 linee in una partita',             type:'lines',    target:55,   reward:1900 },
    { id:'m55', icon:'💎', name:'Diamante levigato',     desc:'Raggiungi 35.000 punti',                       type:'score',    target:35000,reward:2400 },
    { id:'m56', icon:'🔮', name:'Veggente',              desc:'Usa il ghiaccio 22 volte',                     type:'useIce',   target:22,   reward:1800 },
    { id:'m57', icon:'🌟', name:'Stella cadente',        desc:'Completa 130 turni',                           type:'turns',    target:130,  reward:2000 },
    { id:'m58', icon:'🏆', name:'Gran campione',         desc:'Raggiungi 45.000 punti',                       type:'score',    target:45000,reward:3000 },
    { id:'m59', icon:'🌠', name:'Cometa',                desc:'Cancella 65 linee in una partita',             type:'lines',    target:65,   reward:2500 },
    { id:'m60', icon:'👁️', name:'L-Onnisciente',        desc:'Fai un combo x10',                             type:'combo',    target:10,   reward:4000 },
  ],
  hard: [
    // ── Livello 1-5: entrata nell'inferno ──
    { id:'h1',  icon:'📊', name:'Demolizione',        desc:'Cancella 30 linee in una partita',             type:'lines',    target:30,   reward:800  },
    { id:'h2',  icon:'💫', name:'Inarrestabile',      desc:'Raggiungi 8.000 punti',                        type:'score',    target:8000, reward:900  },
    { id:'h3',  icon:'🌋', name:'Mega combo',         desc:'Fai un combo x5',                              type:'combo',    target:5,    reward:1200 },
    { id:'h4',  icon:'🏛️', name:'Costruttore',        desc:'Piazza 150 blocchi',                           type:'placed',   target:150,  reward:800  },
    { id:'h5',  icon:'💣', name:'Esperto esplosivi',  desc:'Usa 5 bombe in una partita',                   type:'useBomb',  target:5,    reward:700  },
    // ── Livello 6-10: sfide dure ──
    { id:'h6',  icon:'⚡', name:'Doppio fulmine',     desc:'Usa 3 fulmini H e 3 V nella stessa partita',   type:'useLH',    target:3,    reward:700  },
    { id:'h7',  icon:'❄️', name:'Re del ghiaccio',   desc:'Usa il ghiaccio 6 volte',                      type:'useIce',   target:6,    reward:600  },
    { id:'h8',  icon:'🔷', name:'Forma massiccia',    desc:'Piazza una forma da 7+ blocchi',               type:'bigShape', target:7,    reward:600  },
    { id:'h9',  icon:'⌛', name:'Leggenda',           desc:'Completa 40 turni',                            type:'turns',    target:40,   reward:900  },
    { id:'h10', icon:'👑', name:'Campione assoluto',  desc:'Raggiungi 15.000 punti',                       type:'score',    target:15000,reward:2000 },
    // ── Livello 11-15: élite ──
    { id:'h11', icon:'🔱', name:'Tritone',            desc:'Cancella 45 linee in una partita',             type:'lines',    target:45,   reward:1200 },
    { id:'h12', icon:'🎰', name:'Jackpot',            desc:'Fai un combo x6',                              type:'combo',    target:6,    reward:1500 },
    { id:'h13', icon:'🏗️', name:'Grattacielo',        desc:'Piazza 300 blocchi in totale',                 type:'placed',   target:300,  reward:1200 },
    { id:'h14', icon:'💥', name:'Bomber pro',         desc:'Usa 8 bombe in una partita',                   type:'useBomb',  target:8,    reward:1100 },
    { id:'h15', icon:'⚡', name:'Tempesta totale',    desc:'Usa fulmini 10 volte in una partita',          type:'useLV',    target:10,   reward:1200 },
    // ── Livello 16-20: maestria ──
    { id:'h16', icon:'🧊', name:'Permafrost',         desc:'Usa il ghiaccio 12 volte',                     type:'useIce',   target:12,   reward:1100 },
    { id:'h17', icon:'🌠', name:'Supernova',          desc:'Cancella 6 linee in un solo piazzamento',      type:'multiLine',target:6,    reward:1800 },
    { id:'h18', icon:'⏱️', name:'Immortale',          desc:'Completa 70 turni',                            type:'turns',    target:70,   reward:1500 },
    { id:'h19', icon:'💎', name:'Diamante puro',      desc:'Raggiungi 25.000 punti',                       type:'score',    target:25000,reward:2500 },
    { id:'h20', icon:'🔶', name:'Megalite',           desc:'Piazza una forma da 8+ blocchi',               type:'bigShape', target:8,    reward:1400 },
    // ── Livello 21-25: leggenda ──
    { id:'h21', icon:'🌊', name:'Tsunami',            desc:'Cancella 60 linee in una partita',             type:'lines',    target:60,   reward:2000 },
    { id:'h22', icon:'🌪️', name:'Uragano',            desc:'Fai un combo x7',                              type:'combo',    target:7,    reward:2200 },
    { id:'h23', icon:'🏺', name:'Monumento',          desc:'Piazza 500 blocchi in totale',                 type:'placed',   target:500,  reward:2000 },
    { id:'h24', icon:'💣', name:'Armageddon',         desc:'Usa 12 bombe in totale',                       type:'useBomb',  target:12,   reward:1800 },
    { id:'h25', icon:'❄️', name:'Era glaciale',       desc:'Usa il ghiaccio 18 volte',                     type:'useIce',   target:18,   reward:1800 },
    // ── Livello 26-30: finale epico ──
    { id:'h26', icon:'⚡', name:'Zeus',               desc:'Usa fulmini 20 volte in totale',               type:'useLV',    target:20,   reward:2000 },
    { id:'h27', icon:'🕰️', name:'Eterno',             desc:'Completa 100 turni',                           type:'turns',    target:100,  reward:2500 },
    { id:'h28', icon:'🌋', name:'Eruzione totale',    desc:'Cancella 8 linee in un solo piazzamento',      type:'multiLine',target:8,    reward:3000 },
    { id:'h29', icon:'💰', name:'Mida',               desc:'Raggiungi 40.000 punti',                       type:'score',    target:40000,reward:4000 },
    { id:'h30', icon:'🐉', name:'Il Drago',           desc:'Raggiungi 60.000 punti',                       type:'score',    target:60000,reward:8000 },
    // ── Livello 31-60: l'olimpo ──
    { id:'h31', icon:'🚂', name:'Treno blindato',       desc:'Completa 120 turni',                           type:'turns',    target:120,  reward:2500 },
    { id:'h32', icon:'🌈', name:'Arcobaleno di fuoco',  desc:'Cancella 70 linee in una partita',             type:'lines',    target:70,   reward:2800 },
    { id:'h33', icon:'🔩', name:'Mastro artigiano',     desc:'Piazza 700 blocchi in totale',                 type:'placed',   target:700,  reward:2200 },
    { id:'h34', icon:'🎸', name:'Death metal',          desc:'Fai un combo x8',                              type:'combo',    target:8,    reward:3000 },
    { id:'h35', icon:'🌪️', name:'Uragano categoria 5',  desc:'Usa 15 bombe in totale',                       type:'useBomb',  target:15,   reward:2500 },
    { id:'h36', icon:'🦅', name:'Arpione',              desc:'Raggiungi 55.000 punti',                       type:'score',    target:55000,reward:3500 },
    { id:'h37', icon:'🧲', name:'Campo magnetico',      desc:'Usa il ghiaccio 20 volte',                     type:'useIce',   target:20,   reward:2200 },
    { id:'h38', icon:'⚡', name:'Fulmini di Zeus',      desc:'Usa 25 fulmini in totale (H+V)',               type:'useLH',    target:25,   reward:2800 },
    { id:'h39', icon:'🎻', name:'Virtuoso assoluto',    desc:'Cancella 8 linee in un solo piazzamento',      type:'multiLine',target:8,    reward:4000 },
    { id:'h40', icon:'🧗', name:'Everest',              desc:'Completa 150 turni',                           type:'turns',    target:150,  reward:3000 },
    { id:'h41', icon:'🦁', name:'Re della savana',      desc:'Piazza 1.000 blocchi in totale',               type:'placed',   target:1000, reward:2800 },
    { id:'h42', icon:'🌙', name:'Eclissi totale',       desc:'Raggiungi 75.000 punti',                       type:'score',    target:75000,reward:4000 },
    { id:'h43', icon:'🎯', name:'Cecchino leggendario', desc:'Cancella 80 linee in una partita',             type:'lines',    target:80,   reward:3500 },
    { id:'h44', icon:'🔥', name:'Inferno eterno',       desc:'Fai un combo x9',                              type:'combo',    target:9,    reward:4500 },
    { id:'h45', icon:'🏋️', name:'Ercole',               desc:'Usa 20 bombe in totale',                       type:'useBomb',  target:20,   reward:3200 },
    { id:'h46', icon:'🧊', name:'Era glaciale',         desc:'Usa il ghiaccio 28 volte',                     type:'useIce',   target:28,   reward:3000 },
    { id:'h47', icon:'🌊', name:'Fine del mondo',       desc:'Cancella 10 linee in un solo piazzamento',     type:'multiLine',target:10,   reward:6000 },
    { id:'h48', icon:'🦋', name:'Fenice',               desc:'Piazza 1.500 blocchi in totale',               type:'placed',   target:1500, reward:3800 },
    { id:'h49', icon:'💡', name:'Einstein',             desc:'Raggiungi 100.000 punti',                      type:'score',    target:100000,reward:5000 },
    { id:'h50', icon:'🚀', name:'Destinazione marte',   desc:'Completa 200 turni',                           type:'turns',    target:200,  reward:4000 },
    { id:'h51', icon:'🐉', name:'Drago antico',         desc:'Fai un combo x10',                             type:'combo',    target:10,   reward:5500 },
    { id:'h52', icon:'⚔️', name:'Esercito',             desc:'Usa 35 fulmini in totale (H+V)',               type:'useLH',    target:35,   reward:4000 },
    { id:'h53', icon:'🏰', name:'Impero',               desc:'Piazza 2.000 blocchi in totale',               type:'placed',   target:2000, reward:4500 },
    { id:'h54', icon:'🌋', name:'Apocalisse vulcanica', desc:'Cancella 90 linee in una partita',             type:'lines',    target:90,   reward:5000 },
    { id:'h55', icon:'💎', name:'Il Kohinoor',          desc:'Raggiungi 150.000 punti',                      type:'score',    target:150000,reward:7000 },
    { id:'h56', icon:'🔮', name:'Il Profeta',           desc:'Usa il ghiaccio 40 volte',                     type:'useIce',   target:40,   reward:5000 },
    { id:'h57', icon:'🌟', name:'Galassia',             desc:'Completa 300 turni',                           type:'turns',    target:300,  reward:6000 },
    { id:'h58', icon:'🏆', name:'Campionissimo',        desc:'Raggiungi 200.000 punti',                      type:'score',    target:200000,reward:9000 },
    { id:'h59', icon:'🌠', name:'Buco nero',            desc:'Cancella 100 linee in una partita',            type:'lines',    target:100,  reward:8000 },
    { id:'h60', icon:'👑', name:'Il Supremo',           desc:'Fai un combo x12 — sei una leggenda!',         type:'combo',    target:12,   reward:15000},
  ],
};
 
// ── STORAGE HELPERS ──
function getBest(d)  { return parseInt(localStorage.getItem('fb_best_'+d)||'0'); }
function setBest(d,v){ localStorage.setItem('fb_best_'+d, v); }
 
function getBonusPoints()  { return parseInt(localStorage.getItem('fb_bonus')||'0'); }
function addBonusPoints(n) { localStorage.setItem('fb_bonus', getBonusPoints()+n); }
 
function getObjState(diff) {
  try {
    const s = localStorage.getItem('fb_obj_'+diff);
    return s ? JSON.parse(s) : { currentIdx: 0, completed: [] };
  } catch(e) { return { currentIdx: 0, completed: [] }; }
}
function saveObjState(diff, state) {
  localStorage.setItem('fb_obj_'+diff, JSON.stringify(state));
}
 
function getSettings() {
  try { const s=localStorage.getItem('fb_set'); return s?{...defaultSettings(),...JSON.parse(s)}:defaultSettings(); }
  catch(e){ return defaultSettings(); }
}
function saveSettings(s){ localStorage.setItem('fb_set', JSON.stringify(s)); }
function defaultSettings(){ return {anim:true, fruit:true, special:true, speed:'normal'}; }
 
// ── Shop helpers (used by game.html) ──
const SHOP_EMOJI_SETS = {
  frutta:  ['🍎','🍊','🍋','🍇','🍓','🫐','🍑','🍒','🥝','🍍'],
  cibo:    ['🍕','🍔','🌮','🍣','🍩','🎂','🧁','🍫','🍦','🥐'],
  animali: ['🦁','🐘','🦊','🐧','🦋','🐬','🦄','🐸','🦀','🐙'],
  spazio:  ['🚀','🌙','⭐','🪐','☄️','🛸','🌌','💫','🔭','👾'],
  sport:   ['⚽','🏀','🎾','🏈','⚾','🏐','🎱','🏓','🥊','🎯'],
  natura:  ['🌸','🌺','🌻','🌴','🍄','🌊','🔥','❄️','🌈','⚡'],
};
function getActiveEmojiSet(){
  const id = localStorage.getItem('fb_active_set')||'frutta';
  return SHOP_EMOJI_SETS[id] || SHOP_EMOJI_SETS.frutta;
}
function getActiveBlockColor(){
  return localStorage.getItem('fb_active_color')||null;
}
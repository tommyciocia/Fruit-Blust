// ═══════════════════════════════════════════
//  FruitBlast — data.js
//  Shared game data, shapes, objectives
// ═══════════════════════════════════════════

const FRUITS = ['🍉','🍋','🍇','🍓','🍊','🥝','🍑','🫐'];
const SPEC = { bomb:'💣', lightH:'⚡', lightV:'🌩️', ice:'❄️' };

// ── SHAPES ──
const SE = [
  {c:[[0,0],[1,0],[2,0]]}, {c:[[0,0],[0,1],[0,2]]},
  {c:[[0,0],[1,0],[0,1],[1,1]]}, {c:[[0,0],[1,0]]},
  {c:[[0,0]]}, {c:[[0,0],[1,0],[2,0],[3,0]]},
  {c:[[0,0],[0,1],[0,2],[0,3]]}, {c:[[0,0],[1,0],[1,1]]},
  {c:[[0,0],[0,1],[1,1]]}, {c:[[0,0],[1,0],[2,0],[1,1]]},
];
const SM = [...SE,
  {c:[[0,0],[1,0],[2,0],[2,1],[2,2]]}, {c:[[0,0],[1,0],[2,0],[0,1],[0,2]]},
  {c:[[1,0],[0,1],[1,1],[2,1]]}, {c:[[0,0],[1,0],[1,1],[2,1]]},
  {c:[[0,1],[1,0],[1,1],[2,0]]}, {c:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]},
  {c:[[0,0],[0,1],[0,2],[1,2],[2,2]]}, {c:[[0,0],[1,0],[2,0],[2,1]]},
];
const SH = [...SM,
  {c:[[0,0],[1,0],[2,0],[3,0],[4,0]]}, {c:[[0,0],[0,1],[0,2],[0,3],[0,4]]},
  {c:[[0,0],[1,0],[2,0],[2,1],[2,2],[2,3]]},
  {c:[[0,0],[1,0],[2,0],[0,1],[0,2],[1,2],[2,2]]},
  {c:[[1,0],[0,1],[1,1],[2,1],[1,2]]},
  {c:[[0,0],[1,0],[1,1],[1,2],[2,2]]},
  {c:[[0,0],[0,1],[0,2],[0,3],[1,3],[2,3]]},
  {c:[[0,0],[1,0],[2,0],[2,1],[2,2],[1,2],[0,2]]},
];

const DCFG = {
  easy:   { gs:8,  sh:SE, sc:0.08, lbl:'🌱 Facile',    col:'#2ecc71', ms:8  },
  medium: { gs:8,  sh:SM, sc:0.15, lbl:'🔥 Medio',     col:'#f1c40f', ms:10 },
  hard:   { gs:10, sh:SH, sc:0.22, lbl:'💀 Difficile',  col:'#e74c3c', ms:12 },
};

// ── OBJECTIVES per difficulty ──
// Each has: id, icon, name, desc, type, target, reward
// type values: lines|score|combo|useBomb|useLH|useLV|useIce|placed|bigShape|multiLine|turns

const OBJECTIVES = {
  easy: [
    { id:'e1',  icon:'📏', name:'Prime linee',       desc:'Cancella 5 linee in una partita',             type:'lines',    target:5,    reward:300  },
    { id:'e2',  icon:'⭐', name:'Primo punteggio',   desc:'Raggiungi 500 punti',                          type:'score',    target:500,  reward:250  },
    { id:'e3',  icon:'🔥', name:'Primo combo',       desc:'Fai un combo x2',                              type:'combo',    target:2,    reward:300  },
    { id:'e4',  icon:'🧱', name:'Muratore junior',   desc:'Piazza 20 blocchi',                            type:'placed',   target:20,   reward:200  },
    { id:'e5',  icon:'💣', name:'Prima bomba',       desc:'Usa una bomba',                                type:'useBomb',  target:1,    reward:200  },
    { id:'e6',  icon:'⚡', name:'Fulminante',        desc:'Usa il fulmine orizzontale 2 volte',           type:'useLH',    target:2,    reward:250  },
    { id:'e7',  icon:'❄️', name:'Ghiacciato',        desc:'Usa il ghiaccio 2 volte',                     type:'useIce',   target:2,    reward:200  },
    { id:'e8',  icon:'🎯', name:'Doppio colpo',      desc:'Cancella 2 linee in un singolo piazzamento',  type:'multiLine',target:2,    reward:350  },
    { id:'e9',  icon:'🔄', name:'In ritmo',          desc:'Completa 5 turni (set di 3 forme)',            type:'turns',    target:5,    reward:200  },
    { id:'e10', icon:'🏅', name:'Campione facile',   desc:'Raggiungi 1.500 punti',                       type:'score',    target:1500, reward:500  },
  ],
  medium: [
    { id:'m1',  icon:'📐', name:'In serie',          desc:'Cancella 15 linee in una partita',            type:'lines',    target:15,   reward:500  },
    { id:'m2',  icon:'🌟', name:'In forma',          desc:'Raggiungi 3.000 punti',                       type:'score',    target:3000, reward:600  },
    { id:'m3',  icon:'💥', name:'Triplice fuoco',    desc:'Fai un combo x3',                             type:'combo',    target:3,    reward:600  },
    { id:'m4',  icon:'🏗️', name:'Architetto',        desc:'Piazza 80 blocchi',                           type:'placed',   target:80,   reward:500  },
    { id:'m5',  icon:'💣', name:'Artificiere',       desc:'Usa 3 bombe in una partita',                  type:'useBomb',  target:3,    reward:450  },
    { id:'m6',  icon:'🌩️', name:'Colpo verticale',   desc:'Usa il fulmine verticale 3 volte',            type:'useLV',    target:3,    reward:450  },
    { id:'m7',  icon:'❄️', name:'Glaciatore',        desc:'Usa il ghiaccio 4 volte',                     type:'useIce',   target:4,    reward:400  },
    { id:'m8',  icon:'🔷', name:'Grande piazzata',   desc:'Piazza una forma da 6+ blocchi',              type:'bigShape', target:6,    reward:400  },
    { id:'m9',  icon:'⏳', name:'Resistente',        desc:'Completa 20 turni',                           type:'turns',    target:20,   reward:450  },
    { id:'m10', icon:'🏆', name:'Campione medio',    desc:'Raggiungi 6.000 punti',                       type:'score',    target:6000, reward:900  },
  ],
  hard: [
    { id:'h1',  icon:'📊', name:'Demolizione',       desc:'Cancella 30 linee in una partita',            type:'lines',    target:30,   reward:800  },
    { id:'h2',  icon:'💫', name:'Inarrestabile',     desc:'Raggiungi 8.000 punti',                       type:'score',    target:8000, reward:900  },
    { id:'h3',  icon:'🌋', name:'Mega combo',        desc:'Fai un combo x5',                             type:'combo',    target:5,    reward:1200 },
    { id:'h4',  icon:'🏛️', name:'Costruttore',       desc:'Piazza 150 blocchi',                          type:'placed',   target:150,  reward:800  },
    { id:'h5',  icon:'💣', name:'Esperto esplosivi', desc:'Usa 5 bombe in una partita',                  type:'useBomb',  target:5,    reward:700  },
    { id:'h6',  icon:'⚡', name:'Doppio fulmine',    desc:'Usa 3 fulmini H e 3 V nella stessa partita',  type:'useLH',    target:3,    reward:700  },
    { id:'h7',  icon:'❄️', name:'Re del ghiaccio',  desc:'Usa il ghiaccio 6 volte',                     type:'useIce',   target:6,    reward:600  },
    { id:'h8',  icon:'🔷', name:'Forma massiccia',   desc:'Piazza una forma da 7+ blocchi',              type:'bigShape', target:7,    reward:600  },
    { id:'h9',  icon:'⌛', name:'Leggenda',          desc:'Completa 40 turni',                           type:'turns',    target:40,   reward:900  },
    { id:'h10', icon:'👑', name:'Campione assoluto', desc:'Raggiungi 15.000 punti',                      type:'score',    target:15000,reward:2000 },
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

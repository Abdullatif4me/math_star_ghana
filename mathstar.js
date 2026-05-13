

// =====================================================
// CLASS CONFIG – difficulty ranges per class
// =====================================================
const CLASS_CONFIG = {
  1: { max:10,  mulMax:3,  desc:"Numbers up to 10" },
  2: { max:20,  mulMax:5,  desc:"Numbers up to 20" },
  3: { max:50,  mulMax:7,  desc:"Numbers up to 50 & times tables to 7" },
  4: { max:100, mulMax:9,  desc:"Numbers up to 100 & times tables to 9" },
  5: { max:200, mulMax:10, desc:"Numbers up to 200 & times tables to 10" },
  6: { max:500, mulMax:12, desc:"Numbers up to 500 & times tables to 12" },
};

let selectedClass = 1;
let currentOp = 'add';

// =====================================================
// CLASS SELECTOR
// =====================================================
const classDescriptions = {
  1: "Start with small numbers. Counting fruits is the easiest way!",
  2: "Let's count up to 20 using number lines!",
  3: "Great — time to try bigger numbers and groups!",
  4: "You're ready for 3-digit numbers and full times tables!",
  5: "Challenge time! Bigger numbers, multi-step problems.",
  6: "Expert level — large numbers, remainders, and more!"
};

const addDescsByClass = {
  1:"Count objects to add small numbers — up to 10!",
  2:"Use a number line to jump forward and add up to 20.",
  3:"Break numbers apart to add easily (decompose).",
  4:"Column addition with carrying — up to 100!",
  5:"Add large numbers using place value tricks.",
  6:"Multi-step addition with large numbers and word problems."
};
const subDescsByClass = {
  1:"Take away a few items — see what's left!",
  2:"Count backwards on a number line.",
  3:"Subtract by breaking numbers into parts.",
  4:"Column subtraction with borrowing.",
  5:"Subtract large numbers step by step.",
  6:"Multi-step subtraction — try it the fast way!"
};
const mulDescsByClass = {
  1:"Multiplication is just adding groups — 2 groups of 3 = 6!",
  2:"Count in 2s and 5s — that's multiplication!",
  3:"Times tables up to 5 using patterns.",
  4:"Learn all times tables up to 9.",
  5:"Practise times tables to 10 and use tricks.",
  6:"Master all times tables to 12 and multiply big numbers!"
};
const divDescsByClass = {
  1:"Share equally — 6 bananas between 2 friends.",
  2:"Division is the opposite of multiplication.",
  3:"Share objects into equal groups.",
  4:"Short division — divide up to 100.",
  5:"Division with bigger numbers, no remainder.",
  6:"Division with remainders — advanced sharing!"
};

document.querySelectorAll('.class-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedClass = parseInt(btn.dataset.class);
    const cfg = CLASS_CONFIG[selectedClass];
    document.getElementById('classBadge').textContent = `📚 Class ${selectedClass} – ${cfg.desc}`;

    // Update descriptions
    document.getElementById('add-desc').textContent = addDescsByClass[selectedClass];
    document.getElementById('sub-desc').textContent = subDescsByClass[selectedClass];
    document.getElementById('mul-desc').textContent = mulDescsByClass[selectedClass];
    document.getElementById('div-desc').textContent = divDescsByClass[selectedClass];

    renderTricks();
    buildTimesTable();
  });
});

// =====================================================
// TAB NAVIGATION
// =====================================================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
    btn.classList.add('active');
    currentOp = btn.dataset.op;
    document.getElementById('sec-' + currentOp).classList.add('visible');
    if(currentOp === 'mul') buildTimesTable();
  });
});

// =====================================================
// TRICKS DATA
// =====================================================
const TRICKS = {
  add: [
    {
      title:"🍎 Count with Fruits",
      text:"Put two groups of fruit together and count them all!",
      visual: (cls) => {
        const a = cls <= 2 ? 3 : cls <= 4 ? 5 : 8;
        const b = cls <= 2 ? 2 : cls <= 4 ? 4 : 7;
        return `<div class="fruit-row">
          <div class="fruit-group" style="background:#e8f8ee;">${'🍎'.repeat(a)}</div>
          <span style="font-size:2rem;font-weight:900;align-self:center;">+</span>
          <div class="fruit-group" style="background:#fff3cd;">${'🍊'.repeat(b)}</div>
          <span style="font-size:2rem;font-weight:900;align-self:center;">=</span>
          <div class="fruit-group" style="background:#fde8f0;">${'🍎'.repeat(a)+'🍊'.repeat(b)}</div>
        </div>
        <p style="margin-top:8px;font-size:1.1rem;color:#555;">${a} + ${b} = <strong>${a+b}</strong></p>`;
      },
      accent: 'var(--kente-green)'
    },
    {
      title:"📏 Number Line Jump",
      text:"Start at the first number and jump forward!",
      visual: (cls) => {
        const start = cls <= 2 ? 2 : cls <= 4 ? 5 : 10;
        const jump  = cls <= 2 ? 3 : cls <= 4 ? 4 : 6;
        const end   = start + jump;
        const max   = end + 2;
        let html = '<div class="number-line-wrap"><div class="number-line">';
        for(let i=0;i<=max;i++){
          const isStart = i===start, isEnd = i===end;
          html += `<div class="nl-num" style="background:${isEnd?'var(--kente-gold)':isStart?'var(--kente-green)':'#f0f0f0'};
            color:${(isStart||isEnd)?'#fff':'#555'};
            border-color:${isEnd?'var(--kente-gold)':isStart?'var(--kente-green)':'#ccc'};">${i}</div>`;
          if(i < max) {
            if(i >= start && i < end) html += `<span class="nl-arrow">→</span>`;
            else html += `<span style="font-size:1rem;color:#ccc;">–</span>`;
          }
        }
        html += '</div></div>';
        html += `<p style="margin-top:8px;font-size:1.1rem;"><span style="background:var(--kente-green);color:#fff;padding:2px 10px;border-radius:6px;">${start}</span> + ${jump} = <span style="background:var(--kente-gold);color:#fff;padding:2px 10px;border-radius:6px;">${end}</span></p>`;
        return html;
      },
      accent: 'var(--kente-blue)'
    },
    {
      title:"🔢 Double a Number",
      text:"Doubling means adding a number to itself — it's super fast!",
      visual: (cls) => {
        const n = cls <= 2 ? 4 : cls <= 4 ? 7 : 15;
        return `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="background:#e8f8ee;padding:10px 20px;border-radius:12px;font-size:1.5rem;font-weight:900;">${n}</div>
          <span style="font-size:1.5rem;">+</span>
          <div style="background:#e8f8ee;padding:10px 20px;border-radius:12px;font-size:1.5rem;font-weight:900;">${n}</div>
          <span style="font-size:1.5rem;">=</span>
          <div style="background:var(--kente-gold);color:#fff;padding:10px 20px;border-radius:12px;font-size:1.8rem;font-weight:900;">${n*2}</div>
        </div>
        <p style="margin-top:8px;font-size:.95rem;color:#777;">Double ${n} = ${n} + ${n} = ${n*2}</p>`;
      },
      accent: 'var(--kente-gold)'
    }
  ],
  sub: [
    {
      title:"🍌 Take Away",
      text:"Start with a group and remove some — see what's left!",
      visual: (cls) => {
        const total = cls <= 2 ? 6 : cls <= 4 ? 10 : 15;
        const take  = cls <= 2 ? 2 : cls <= 4 ? 4 : 6;
        const left  = total - take;
        return `<div class="fruit-row" style="align-items:center;gap:8px;">
          <div class="fruit-group" style="background:#fff3cd;">${'🍌'.repeat(left)}</div>
          <div class="fruit-group" style="background:#fde8f0;text-decoration:line-through;opacity:.5;">${'🍌'.repeat(take)}</div>
        </div>
        <p style="margin-top:8px;font-size:1.1rem;">${total} – ${take} = <strong>${left}</strong> bananas left</p>`;
      },
      accent: 'var(--kente-red)'
    },
    {
      title:"📏 Count Back",
      text:"Stand on the bigger number and jump backwards!",
      visual: (cls) => {
        const start = cls <= 2 ? 7 : cls <= 4 ? 12 : 20;
        const jump  = cls <= 2 ? 3 : cls <= 4 ? 5 : 8;
        const end   = start - jump;
        const min   = Math.max(0, end - 1);
        let html = '<div class="number-line-wrap"><div class="number-line">';
        for(let i=min;i<=start;i++){
          const isStart = i===start, isEnd = i===end;
          html += `<div class="nl-num" style="background:${isEnd?'var(--kente-gold)':isStart?'var(--kente-red)':'#f0f0f0'};
            color:${(isStart||isEnd)?'#fff':'#555'};
            border-color:${isEnd?'var(--kente-gold)':isStart?'var(--kente-red)':'#ccc'};">${i}</div>`;
          if(i < start){
            if(i >= end && i < start) html += `<span class="nl-arrow" style="transform:scaleX(-1);display:inline-block;">→</span>`;
            else html += `<span style="font-size:1rem;color:#ccc;">–</span>`;
          }
        }
        html += '</div></div>';
        html += `<p style="margin-top:8px;font-size:1.1rem;"><span style="background:var(--kente-red);color:#fff;padding:2px 10px;border-radius:6px;">${start}</span> – ${jump} = <span style="background:var(--kente-gold);color:#fff;padding:2px 10px;border-radius:6px;">${end}</span></p>`;
        return html;
      },
      accent: 'var(--kente-orange)'
    },
    {
      title:"🔍 Find the Difference",
      text:"How many steps apart are these two numbers?",
      visual: (cls) => {
        const a = cls <= 2 ? 3 : cls <= 4 ? 8 : 25;
        const b = cls <= 2 ? 7 : cls <= 4 ? 15 : 40;
        const diff = b - a;
        return `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:1.4rem;font-weight:900;">
          <div style="background:var(--kente-red);color:#fff;padding:10px 20px;border-radius:12px;">${a}</div>
          <div style="background:#f0f0f0;padding:10px;border-radius:12px;font-size:.9rem;">← ${diff} steps →</div>
          <div style="background:var(--kente-gold);color:#fff;padding:10px 20px;border-radius:12px;">${b}</div>
        </div>
        <p style="margin-top:8px;font-size:1rem;color:#666;">${b} – ${a} = ${diff}</p>`;
      },
      accent: 'var(--kente-purple)'
    }
  ],
  mul: [
    {
      title:"👥 Groups of Things",
      text:"Multiplication = making equal groups! 3 groups of 4 = 12.",
      visual: (cls) => {
        const groups = cls <= 2 ? 2 : cls <= 4 ? 3 : 4;
        const size   = cls <= 2 ? 3 : cls <= 4 ? 4 : 5;
        const emojis = ['🍪','⭐','🎈','🌸','🦋'];
        const e = emojis[groups % emojis.length];
        let html = '<div style="display:flex;flex-wrap:wrap;gap:10px;">';
        for(let g=0;g<groups;g++){
          html += `<div style="background:#f0e9ff;border:2px solid var(--kente-purple);border-radius:12px;padding:8px;display:flex;gap:4px;flex-wrap:wrap;max-width:160px;">`;
          for(let i=0;i<size;i++) html += `<span style="font-size:1.6rem;">${e}</span>`;
          html += '</div>';
        }
        html += `</div><p style="margin-top:8px;font-size:1.1rem;">${groups} groups × ${size} = <strong>${groups*size}</strong></p>`;
        return html;
      },
      accent: 'var(--kente-purple)'
    },
    {
      title:"⚡ Skip Counting",
      text:"Count by 2s, 5s or 10s — that IS multiplication!",
      visual: (cls) => {
        const n = cls <= 2 ? 2 : cls <= 4 ? 5 : 3;
        const count = cls <= 2 ? 5 : cls <= 4 ? 6 : 7;
        const nums = Array.from({length:count}, (_,i) => n*(i+1));
        let html = '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
        nums.forEach((v,i) => {
          html += `<div style="background:${['#e8f8ee','#fff3cd','#fde8f0','#e8f0ff','#ffe8f0','#f0e9ff','#e8fff0'][i%7]};
            border-radius:10px;padding:8px 14px;font-size:1.2rem;font-weight:900;
            border:2px solid rgba(0,0,0,.08);">${v}</div>`;
        });
        html += `</div><p style="margin-top:8px;font-size:.95rem;color:#666;">Counting by ${n}s: ${nums.join(', ')}…</p>`;
        return html;
      },
      accent: 'var(--kente-green)'
    },
    {
      title:"🪄 The Zero & One Trick",
      text:"Any number × 0 = 0. Any number × 1 = itself!",
      visual: (cls) => {
        const n = cls <= 2 ? 5 : cls <= 4 ? 12 : 37;
        return `<div style="display:flex;flex-direction:column;gap:10px;font-size:1.1rem;font-weight:700;">
          <div style="background:#fde8f0;padding:10px 16px;border-radius:10px;">
            🔴 ${n} × <span style="color:var(--kente-red);font-size:1.3rem;">0</span> = <strong>0</strong> <span style="color:#999;">(nothing at all!)</span>
          </div>
          <div style="background:#e8f8ee;padding:10px 16px;border-radius:10px;">
            🟢 ${n} × <span style="color:var(--kente-green);font-size:1.3rem;">1</span> = <strong>${n}</strong> <span style="color:#999;">(stays the same!)</span>
          </div>
        </div>`;
      },
      accent: 'var(--kente-blue)'
    }
  ],
  div: [
    {
      title:"🍕 Share Equally",
      text:"Division means splitting things into equal groups — fair sharing!",
      visual: (cls) => {
        const total  = cls <= 2 ? 6 : cls <= 4 ? 12 : 20;
        const groups = cls <= 2 ? 2 : cls <= 4 ? 3 : 4;
        const each   = total / groups;
        const emojis = ['🍕','🍇','🎁','🌟'];
        const e = emojis[groups % emojis.length];
        const names = ['Asana','Tampuli','Gariba','Kojo'];
        let html = '<div style="display:flex;flex-wrap:wrap;gap:10px;">';
        for(let g=0;g<groups;g++){
          html += `<div style="background:#e8f7ff;border:2px solid var(--kente-blue);border-radius:12px;padding:10px;min-width:100px;text-align:center;">
            <div style="font-size:.85rem;font-weight:800;color:var(--kente-blue);margin-bottom:6px;">${names[g]}</div>
            <div style="font-size:1.5rem;">${e.repeat(Math.floor(each))}</div>
          </div>`;
        }
        html += `</div><p style="margin-top:8px;font-size:1.1rem;">${total} ÷ ${groups} = <strong>${each}</strong> each</p>`;
        return html;
      },
      accent: 'var(--kente-blue)'
    },
    {
      title:"🔄 Division ↔ Multiplication",
      text:"Division is the OPPOSITE of multiplication — use times tables to help!",
      visual: (cls) => {
        const a = cls <= 2 ? 2 : cls <= 4 ? 4 : 6;
        const b = cls <= 2 ? 3 : cls <= 4 ? 5 : 7;
        const c = a * b;
        return `<div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:1.2rem;font-weight:800;">
            <div style="background:var(--kente-purple);color:#fff;padding:8px 16px;border-radius:10px;">${a} × ${b} = ${c}</div>
            <span style="font-size:1.5rem;">⟷</span>
            <div style="background:var(--kente-blue);color:#fff;padding:8px 16px;border-radius:10px;">${c} ÷ ${b} = ${a}</div>
          </div>
          <div style="background:#f0f0f0;padding:10px;border-radius:10px;font-size:.9rem;color:#555;">
            If you know <strong>${a} × ${b} = ${c}</strong>, then you already know <strong>${c} ÷ ${b} = ${a}</strong>!
          </div>
        </div>`;
      },
      accent: 'var(--kente-purple)'
    },
    {
      title:"⭕ Divide by 1 & Itself",
      text:"Any number ÷ 1 = itself. Any number ÷ itself = 1!",
      visual: (cls) => {
        const n = cls <= 2 ? 7 : cls <= 4 ? 16 : 45;
        return `<div style="display:flex;flex-direction:column;gap:10px;font-size:1.1rem;font-weight:700;">
          <div style="background:#fff3cd;padding:10px 16px;border-radius:10px;">
            ⭐ ${n} ÷ <span style="color:var(--kente-gold);font-size:1.3rem;">1</span> = <strong>${n}</strong>
          </div>
          <div style="background:#e8f8ee;padding:10px 16px;border-radius:10px;">
            🟢 ${n} ÷ <span style="color:var(--kente-green);font-size:1.3rem;">${n}</span> = <strong>1</strong>
          </div>
        </div>`;
      },
      accent: 'var(--kente-orange)'
    }
  ]
};

function renderTricks() {
  ['add','sub','mul','div'].forEach(op => {
    const container = document.getElementById(op + '-tricks');
    container.innerHTML = '';
    TRICKS[op].forEach(t => {
      const card = document.createElement('div');
      card.className = 'trick-card';
      card.style.setProperty('--card-accent', t.accent);
      card.innerHTML = `
        <h3>${t.title}</h3>
        <p>${t.text}</p>
        <div class="visual-block" style="background:#fafafa;border:2px solid #eee;">
          ${t.visual(selectedClass)}
        </div>`;
      container.appendChild(card);
    });
  });
}
renderTricks();

// =====================================================
// DEMO FUNCTIONS
// =====================================================
function runAddDemo() {
  const a = parseInt(document.getElementById('add-a').value)||0;
  const b = parseInt(document.getElementById('add-b').value)||0;
  if(a+b > 200) { document.getElementById('add-output').textContent = "Try smaller numbers!"; return; }
  const fruitA = '🍎'.repeat(Math.min(a,30));
  const fruitB = '🍊'.repeat(Math.min(b,30));
  const total  = '⭐'.repeat(Math.min(a+b,30));
  document.getElementById('add-output').innerHTML = `
    <div class="fruit-row">
      <div class="fruit-group" style="background:#e8f8ee;">${fruitA}</div>
      <span style="font-size:1.5rem;">+</span>
      <div class="fruit-group" style="background:#fff3cd;">${fruitB}</div>
      <span style="font-size:1.5rem;">=</span>
      <div class="fruit-group" style="background:#fde8f0;">${total}</div>
    </div>
    <p style="font-family:'Fredoka One',cursive;font-size:1.4rem;margin-top:8px;">${a} + ${b} = <span style="color:var(--kente-green)">${a+b}</span></p>`;
}

function runSubDemo() {
  const a = parseInt(document.getElementById('sub-a').value)||0;
  const b = parseInt(document.getElementById('sub-b').value)||0;
  if(b > a) { document.getElementById('sub-output').innerHTML = `<p style="color:var(--kente-red);">Oops! You can't take away more than you have — try again! 😊</p>`; return; }
  const left   = '🍌'.repeat(Math.min(a-b,40));
  const gone   = '❌'.repeat(Math.min(b,40));
  document.getElementById('sub-output').innerHTML = `
    <div class="fruit-row">
      <div class="fruit-group" style="background:#fff3cd;">${left}</div>
      <div class="fruit-group" style="background:#fde8f0;opacity:.5;">${gone}</div>
    </div>
    <p style="font-family:'Fredoka One',cursive;font-size:1.4rem;margin-top:8px;">${a} – ${b} = <span style="color:var(--kente-red)">${a-b}</span></p>`;
}

function runMulDemo() {
  const a = parseInt(document.getElementById('mul-a').value)||1;
  const b = parseInt(document.getElementById('mul-b').value)||1;
  if(a>12||b>12) { document.getElementById('mul-output').textContent = "Max 12 for the visual!"; return; }
  let html = '<div class="mul-grid">';
  for(let r=0;r<b;r++){
    html += '<div class="mul-row">';
    for(let c=0;c<a;c++){
      const colors = ['#e8f8ee','#fff3cd','#fde8f0','#e8f0ff','#f0e9ff'];
      html += `<div class="mul-dot" style="background:${colors[r%colors.length]};animation-delay:${(r*a+c)*40}ms;">⭐</div>`;
    }
    html += '</div>';
  }
  html += '</div>';
  html += `<p style="font-family:'Fredoka One',cursive;font-size:1.4rem;margin-top:12px;">${b} groups of ${a} = <span style="color:var(--kente-purple)">${a*b}</span></p>`;
  document.getElementById('mul-output').innerHTML = html;
}

function runDivDemo() {
  const a = parseInt(document.getElementById('div-a').value)||1;
  const b = parseInt(document.getElementById('div-b').value)||1;
  if(b===0) { document.getElementById('div-output').textContent = "Can't divide by zero!"; return; }
  const each = Math.floor(a/b);
  const rem  = a % b;
  const names = ['Asana','Tampuli','Gariba','Kojo','Yaw','Akua','Kwame','Efua','Nana','Fiifi'];
  const emojis = ['🍎','🍪','⭐','🌸','🎈','🍇','🍕','🍦','🧁','🎀'];
  let html = '<div style="display:flex;flex-wrap:wrap;gap:10px;">';
  for(let g=0;g<Math.min(b,10);g++){
    const e = emojis[g%emojis.length];
    html += `<div style="background:#e8f7ff;border:2px solid var(--kente-blue);border-radius:12px;padding:10px;min-width:90px;text-align:center;">
      <div style="font-size:.8rem;font-weight:800;color:var(--kente-blue);">${names[g]||'Friend '+(g+1)}</div>
      <div style="font-size:1.3rem;">${e.repeat(Math.min(each,20))}</div>
    </div>`;
  }
  html += '</div>';
  html += `<p style="font-family:'Fredoka One',cursive;font-size:1.3rem;margin-top:10px;">${a} ÷ ${b} = <span style="color:var(--kente-blue)">${each}</span>${rem?' (remainder '+rem+')':''}</p>`;
  document.getElementById('div-output').innerHTML = html;
}

// =====================================================
// TIMES TABLE
// =====================================================
function buildTimesTable() {
  const max = CLASS_CONFIG[selectedClass].mulMax;
  const tbl = document.getElementById('timesTable');
  tbl.innerHTML = '';
  const hdr = document.createElement('tr');
  hdr.innerHTML = '<th>×</th>' + Array.from({length:max},(_,i)=>`<th>${i+1}</th>`).join('');
  tbl.appendChild(hdr);
  for(let r=1;r<=max;r++){
    const row = document.createElement('tr');
    row.innerHTML = `<th>${r}</th>` +
      Array.from({length:max},(_,c)=>`<td data-r="${r}" data-c="${c+1}">${r*(c+1)}</td>`).join('');
    tbl.appendChild(row);
  }
  tbl.querySelectorAll('td').forEach(td=>{
    td.addEventListener('click', function(){
      tbl.querySelectorAll('td').forEach(x=>x.classList.remove('highlight'));
      const r=this.dataset.r, c=this.dataset.c;
      tbl.querySelectorAll(`td[data-r="${r}"], td[data-c="${c}"]`).forEach(x=>x.classList.add('highlight'));
      this.style.background='var(--kente-red)';this.style.color='#fff';
    });
  });
}
buildTimesTable();

// =====================================================
// QUIZ
// =====================================================
let quizOps = ['add'];
let quizQuestions = [], quizIndex = 0, quizScore = 0;
const TOTAL_Q = 10;

document.querySelectorAll('.quiz-op-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.dataset.q === 'mixed'){
      document.querySelectorAll('.quiz-op-btn').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      quizOps = ['add','sub','mul','div'];
    } else {
      const mixedBtn = document.querySelector('.quiz-op-btn[data-q="mixed"]');
      if(mixedBtn) mixedBtn.classList.remove('selected');
      btn.classList.toggle('selected');
      quizOps = [...document.querySelectorAll('.quiz-op-btn.selected:not([data-q="mixed"])')].map(b=>b.dataset.q);
      if(quizOps.length === 0){ btn.classList.add('selected'); quizOps=[btn.dataset.q]; }
    }
  });
});

function rnd(min,max){return Math.floor(Math.random()*(max-min+1))+min;}

function generateQuestion(op) {
  const cfg = CLASS_CONFIG[selectedClass];
  let a,b,q,ans;
  if(op==='add'){
    a = rnd(1,Math.floor(cfg.max/2));
    b = rnd(1,Math.floor(cfg.max/2));
    q=`${a} + ${b} = ?`; ans=a+b;
  } else if(op==='sub'){
    a = rnd(1,cfg.max); b = rnd(1,a);
    q=`${a} – ${b} = ?`; ans=a-b;
  } else if(op==='mul'){
    a = rnd(1,cfg.mulMax); b = rnd(1,cfg.mulMax);
    q=`${a} × ${b} = ?`; ans=a*b;
  } else {
    b = rnd(1,cfg.mulMax); ans = rnd(1,cfg.mulMax); a=b*ans;
    q=`${a} ÷ ${b} = ?`;
  }
  // Generate 3 wrong answers
  const wrongs = new Set();
  let attempts = 0;
  while(wrongs.size < 3 && attempts < 100){
    let range = Math.max(2, Math.floor(ans * 0.5));
    let offset = rnd(-range, range);
    let w = ans + offset;
    if(w !== ans && w >= 0 && w <= 1000) wrongs.add(w);
    attempts++;
  }
  // Fallback: if we still don't have enough, generate simple alternatives
  while(wrongs.size < 3){
    wrongs.add(wrongs.size === 0 ? ans + 1 : ans - 1);
  }
  const choices = [ans,...Array.from(wrongs).slice(0, 3)].sort(()=>Math.random()-.5);
  return {op, question:q, answer:ans, choices};
}

function buildVisual(q){
  if(q.op==='add'){
    const parts = q.question.match(/(\d+) \+ (\d+)/);
    if(!parts) return '';
    const a=parseInt(parts[1]),b=parseInt(parts[2]);
    if(a+b>30) return '';
    return '🍎'.repeat(a) + ' <strong style="font-size:1.5rem;">+</strong> ' + '🍊'.repeat(b);
  }
  if(q.op==='sub'){
    const parts = q.question.match(/(\d+) – (\d+)/);
    if(!parts) return '';
    const a=parseInt(parts[1]),b=parseInt(parts[2]);
    if(a>20) return '';
    return '🌟'.repeat(a-b) + '<span style="opacity:.3;text-decoration:line-through;">' + '🌟'.repeat(b) + '</span>';
  }
  if(q.op==='mul'){
    const parts = q.question.match(/(\d+) × (\d+)/);
    if(!parts) return '';
    const a=parseInt(parts[1]),b=parseInt(parts[2]);
    if(a*b>36) return '';
    let html='';
    for(let r=0;r<a;r++){
      for(let c=0;c<b;c++) html+='⭐';
      html+=' ';
    }
    return html;
  }
  return '';
}

// =====================================================
// SOUND EFFECTS
// =====================================================
function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
      // Happy ascending notes
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } else if (type === 'wrong') {
      // Sad descending notes
      oscillator.frequency.setValueAtTime(392, audioContext.currentTime); // G4
      oscillator.frequency.setValueAtTime(330, audioContext.currentTime + 0.15); // E4
      oscillator.frequency.setValueAtTime(262, audioContext.currentTime + 0.3); // C4
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'start') {
      // Exciting start sound
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
      oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1); // C#5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2); // E5
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.6);
    } else if (type === 'victory') {
      // Triumphant victory fanfare
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
      oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3); // C6
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } else if (type === 'complete') {
      // Gentle completion sound
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(587, audioContext.currentTime + 0.2); // D5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.4); // E5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.7);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.7);
    }
  } catch (e) {
    // Fallback: no sound if Web Audio API not supported
    console.log('Sound not supported');
  }
}

function startQuiz(){
  quizQuestions = Array.from({length:TOTAL_Q}, ()=>{
    const op = quizOps[Math.floor(Math.random()*quizOps.length)];
    return generateQuestion(op);
  });
  quizIndex = 0; quizScore = 0;
  document.getElementById('quiz-setup').style.display='none';
  document.getElementById('quiz-result').style.display='none';
  document.getElementById('quiz-active').style.display='block';

  // Play start sound
  playSound('start');

  renderQuestion();
}

function renderQuestion(){
  const q = quizQuestions[quizIndex];
  document.getElementById('q-counter').textContent = `Question ${quizIndex+1} of ${TOTAL_Q}`;
  document.getElementById('qProgressFill').style.width = ((quizIndex/TOTAL_Q)*100)+'%';
  document.getElementById('qScore').textContent = quizScore;
  document.getElementById('qText').textContent = q.question;
  document.getElementById('qVisual').innerHTML = buildVisual(q);
  const grid = document.getElementById('answersGrid');
  grid.innerHTML = '';
  q.choices.forEach(c=>{
    const btn = document.createElement('button');
    btn.className='answer-btn';
    btn.textContent=c;
    btn.addEventListener('click', ()=>checkAnswer(btn, c, q));
    grid.appendChild(btn);
  });
}

const CORRECT_MSGS = [
  {emoji:'🎉',text:'Asanazing!',sub:'You are a maths star!'},
  {emoji:'🏆',text:'Excellent!',sub:'Keep going, you\'re brilliant!'},
  {emoji:'🌟',text:'Superstar!',sub:'Ghana is proud of you!'},
  {emoji:'🔥',text:'On Fire!',sub:'Nothing can stop you!'},
  {emoji:'🥇',text:'Gold Medal!',sub:'You\'re a champion!'},
  {emoji:'🦁',text:'Roarsome!',sub:'Brave and smart!'},
  {emoji:'🎊',text:'Fantastic!',sub:'You\'ve got this!'},
];
const WRONG_MSGS = [
  {emoji:'💪',text:'Don\'t Give Up!',sub:'Try the next one — you can do it!'},
  {emoji:'🤔',text:'Almost There!',sub:'Mistakes help us learn!'},
  {emoji:'🌱',text:'Keep Growing!',sub:'Every mistake makes you smarter!'},
  {emoji:'😊',text:'Keep Trying!',sub:'You are doing great — believe in yourself!'},
];

function showFeedback(isCorrect){
  const msgs = isCorrect ? CORRECT_MSGS : WRONG_MSGS;
  const m = msgs[Math.floor(Math.random()*msgs.length)];
  const toast = document.getElementById('feedbackToast');
  document.getElementById('fbEmoji').textContent = m.emoji;
  document.getElementById('fbText').textContent  = m.text;
  document.getElementById('fbSub').textContent   = m.sub;
  toast.style.borderTop = `5px solid ${isCorrect?'var(--kente-green)':'var(--kente-red)'}`;
  toast.classList.add('show');

  // Play sound effect
  playSound(isCorrect ? 'correct' : 'wrong');

  setTimeout(()=>toast.classList.remove('show'), 1800);
}

let answering = false;
function checkAnswer(btn, chosen, q){
  if(answering) return; answering=true;
  const correct = chosen === q.answer;
  document.querySelectorAll('.answer-btn').forEach(b=>{
    if(parseInt(b.textContent)===q.answer) b.classList.add('correct');
    b.style.pointerEvents='none';
  });
  if(!correct) btn.classList.add('wrong');
  else quizScore++;
  showFeedback(correct);
  if(correct && quizScore % 3 === 0) launchConfetti();
  setTimeout(()=>{
    answering=false;
    quizIndex++;
    if(quizIndex >= TOTAL_Q) showResult();
    else renderQuestion();
  }, 1400);
}

function showResult(){
  document.getElementById('quiz-active').style.display='none';
  const res = document.getElementById('quiz-result');
  res.style.display='block';
  const pct = quizScore/TOTAL_Q;
  let trophy,title,msg;
  if(pct===1){
    trophy='🏆'; title='PERFECT SCORE!';
    msg='You are an absolute maths champion! Ghana is so proud of you. You answered ALL 10 questions correctly — keep shining!';
  } else if(pct>=.8){
    trophy='🥇'; title='Outstanding!';
    msg='Brilliant work! You got most questions right. You\'re almost a maths superstar — practise a bit more and you\'ll be perfect!';
  } else if(pct>=.6){
    trophy='🥈'; title='Well Done!';
    msg='Great effort! You\'re getting better every day. Keep practising and you\'ll move to the top very soon!';
  } else if(pct>=.4){
    trophy='🥉'; title='Good Try!';
    msg='You\'re learning! Don\'t give up — every champion started where you are. Review the tricks and try again!';
  } else {
    trophy='💪'; title='Keep Going!';
    msg='It\'s okay — learning takes time. Go back and check the tricks for each operation, then try again. You\'ve got this!';
  }
  document.getElementById('resTrophy').textContent=trophy;
  document.getElementById('resTitle').textContent=title;
  document.getElementById('resScore').textContent=`${quizScore} / ${TOTAL_Q}`;
  document.getElementById('resMsg').textContent=msg;

  // Play completion sound
  playSound(pct >= 0.8 ? 'victory' : 'complete');

  if(pct>=.8) launchConfetti();
}

function resetQuiz(){
  document.getElementById('quiz-result').style.display='none';
  document.getElementById('quiz-setup').style.display='block';
}

// =====================================================
// CONFETTI
// =====================================================
function launchConfetti(){
  const colors=['#E63946','#FFB703','#2DC653','#219EBC','#8338EC','#FB8500'];
  for(let i=0;i<60;i++){
    const el=document.createElement('div');
    el.className='confetti-piece';
    el.style.left=Math.random()*100+'vw';
    el.style.top='-20px';
    el.style.background=colors[Math.floor(Math.random()*colors.length)];
    el.style.width=(8+Math.random()*8)+'px';
    el.style.height=(8+Math.random()*8)+'px';
    el.style.animationDelay=(Math.random()*1.5)+'s';
    el.style.animationDuration=(1.5+Math.random())+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 3500);
  }
}

// =====================================================
// FLOATING STARS IN HERO
// =====================================================
const starEmojis=['⭐','🌟','✨','🎈','🌺','🎶','🦋','🌈'];
const heroStars=document.getElementById('heroStars');
for(let i=0;i<16;i++){
  const s=document.createElement('div');
  s.className='star';
  s.textContent=starEmojis[i%starEmojis.length];
  s.style.left=Math.random()*95+'%';
  s.style.top=Math.random()*90+'%';
  s.style.animationDelay=(Math.random()*3)+'s';
  s.style.fontSize=(1+Math.random())+'rem';
  heroStars.appendChild(s);
}



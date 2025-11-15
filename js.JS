// Tabs
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(btn => btn.onclick = () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tool').forEach(t => t.style.display = 'none');
    document.getElementById(btn.dataset.tab).style.display = 'flex';
});

// Flip Display for counter
let digitCards = [];
function createDigitCard(v) { const c = document.createElement('div'); c.className = 'flip-container'; c.innerHTML = `<div class='flip-card'><div class='top'>${v}</div><div class='bottom'>${v}</div><div class='flip-top'>${v}</div><div class='flip-bottom'>${v}</div></div>`; return c; }
function flipDigit(card, val) { const t = card.querySelector('.top'); const b = card.querySelector('.bottom'); const ft = card.querySelector('.flip-top'); const fb = card.querySelector('.flip-bottom'); const f = card.querySelector('.flip-card'); if (val == t.innerText) return; ft.innerText = t.innerText; fb.innerText = val; b.innerText = val; f.classList.add('animate'); setTimeout(() => { t.innerText = val; f.classList.remove('animate'); }, 350); }
function updateDigits(str) { const box = document.getElementById('digits'); if (str.length !== digitCards.length) { box.innerHTML = ''; digitCards = []; for (let c of str) { let card = createDigitCard(c); box.appendChild(card); digitCards.push(card); } return; } for (let i = 0; i < str.length; i++)flipDigit(digitCards[i], str[i]); }

// Base converter
document.getElementById('convertBtn').onclick = () => {
    let v = document.getElementById('inputValue').value.trim();
    let f = parseInt(baseFrom.value), t = parseInt(baseTo.value);
    let dec = parseInt(v, f); if (isNaN(dec)) return document.getElementById('resultBase').innerText = 'ورودی نامعتبر';
    let r = dec.toString(t).toUpperCase(); document.getElementById('resultBase').innerText = 'نتیجه: ' + r;
};

// Calculator
const calc = document.getElementById('calcBtn').onclick = () => {
    let a = parseFloat(calcA.value), b = parseFloat(calcB.value), op = calcOp.value, r;
    if (op == '+') r = a + b; else if (op == '-') r = a - b; else if (op == '*') r = a * b; else if (op == '/') r = b ? a / b : 'خطا'; else if (op == '%') r = a % b; else r = Math.pow(a, b);
    document.getElementById('resultCalc').innerText = 'نتیجه: ' + r;
};

// Char to bin
document.getElementById('charToBin').onclick = () => {
    let t = charInput.value; let bin = t.split('').map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    resultChar.innerText = 'نتیجه: ' + bin;
};

// Binary Counter
// Binary Counter
let n = 0;
let run = false;
let intv = null;

startCount.onclick = () => {

    if (!run) {
        // شروع
        run = true;
        startCount.innerText = "stop";

        // جلوگیری از شروع دوباره
        if (intv !== null) clearInterval(intv);

        intv = setInterval(() => {
            n++;
            updateDigits(n.toString(2));
        }, 1000);

    } else {
        // توقف
        run = false;
        startCount.innerText = "srart";
        clearInterval(intv);
        intv = null;  // این خط کل مشکل رو حل می‌کنه
    }
};

resetCount.onclick = () => {
    clearInterval(intv);
    intv = null;
    run = false;
    n = 0;
    startCount.innerText = "srart";
    updateDigits("0");
};



// Random Number Generator
document.getElementById('randBtn').onclick = () => {
    let min = parseInt(randMin.value), max = parseInt(randMax.value), count = parseInt(randCount.value);
    if (isNaN(min) || isNaN(max) || isNaN(count) || min > max) return;
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    const out = Array.from(nums).map(n => n.toString(2));
    const box = document.getElementById('resultRand');
    box.innerHTML = '';
    out.forEach(b => {
        let card = createDigitCard(b);
        box.appendChild(card);
    });
};

// Binary Clock
function createClockCard(v) { return createDigitCard(v); }
function updateClockUnit(unitId, value, bits) {
    const row = document.getElementById(unitId);
    const bin = value.toString(2).padStart(bits, '0');
    row.innerHTML = '';
    for (let ch of bin) { row.appendChild(createClockCard(ch)); }
}
setInterval(() => {
    const now = new Date();
    updateClockUnit('hourBits', now.getHours(), 5);
    updateClockUnit('minuteBits', now.getMinutes(), 6);
    updateClockUnit('secondBits', now.getSeconds(), 6);
}, 1000);

// 
// Fill base options
const bases = [
    { v: 2, t: 'binary (2)' },
    { v: 8, t: 'octal (8)' },
    { v: 10, t: 'decimal (10)' },
    { v: 16, t: 'hexadecimal (16)' }
];

const baseFrom = document.getElementById('baseFrom');
const baseTo = document.getElementById('baseTo');

bases.forEach(b => {
    let o1 = document.createElement('option');
    o1.value = b.v; o1.textContent = b.t;
    baseFrom.appendChild(o1);

    let o2 = document.createElement('option');
    o2.value = b.v; o2.textContent = b.t;
    baseTo.appendChild(o2);
});

// پیش‌فرض
baseFrom.value = 10;
baseTo.value = 2;
// 
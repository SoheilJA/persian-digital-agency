/* ================================================================
   ALAWEBIX — utils.js
   ابزارهای مشترک: انتخابگرها، اعداد فارسی، توست، اعتبارسنجی
   ================================================================ */
window.$ = (s, c) => (c || document).querySelector(s);
window.$$ = (s, c) => [...(c || document).querySelectorAll(s)];

window.finePointer = matchMedia('(pointer:fine)').matches;
window.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- تبدیل اعداد به فارسی --- */
const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
window.toFa = function (input) {
  return String(input).replace(/\d/g, d => FA_DIGITS[+d]);
};
/* جداکننده هزارگان + فارسی‌سازی */
window.faNum = function (n) {
  return toFa(Number(n).toLocaleString('en-US'));
};

/* --- کوئری‌استرینگ --- */
window.qs = function (key) {
  return new URLSearchParams(location.search).get(key);
};

/* --- هایلایت ساده کد --- */
window.hl = function (src) {
  return src.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/(\/\/[^\n]*)/g, '<span class="c-com">$1</span>')
    .replace(/('[^'\n]*')/g, '<span class="c-str">$1</span>')
    .replace(/\b(const|let|var|function|return|if|else|throw|new|await|async|for|of|import|export|class|true|false|null)\b/g, '<span class="c-kw">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="c-num">$1</span>');
};

/* --- توست --- */
window.toast = function (msg, ic) {
  let host = $('#toasts');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toasts';
    document.body.appendChild(host);
  }
  const t = document.createElement('div');
  t.className = 'toast flex items-center gap-3 bg-ink text-white rounded-xl px-4 py-3.5 text-sm shadow-lift border-l-4';
  t.style.borderColor = 'var(--color-primary)';
  t.innerHTML = icon(ic || 'check', 'w-[18px] h-[18px] text-primary shrink-0') + '<span>' + msg + '</span>';
  host.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 380); }, 3600);
};

/* --- اعتبارسنجی فرم --- */
window.validateForm = function (form) {
  let ok = true;
  $$('input, textarea', form).forEach(f => {
    const err = $('[data-for="' + f.id + '"]', form);
    if (!err) return;
    let bad = false;
    if (f.hasAttribute('required') && !f.value.trim()) bad = true;
    if (f.type === 'email' && f.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value)) bad = true;
    if (f.hasAttribute('minlength') && f.value.trim().length < +f.getAttribute('minlength')) bad = true;
    err.classList.toggle('hidden', !bad);
    f.classList.toggle('border-[#C4372F]', bad);
    f.setAttribute('aria-invalid', bad ? 'true' : 'false');
    if (bad) ok = false;
  });
  return ok;
};

window.wireForm = function (formSel, successMsg, ic) {
  const form = $(formSel);
  if (!form) return;
  form.setAttribute('novalidate', '');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) { toast('لطفاً فیلدهای مشخص‌شده را اصلاح کنید.', 'x'); return; }
    const btn = form.querySelector('button[type=submit]');
    const label = btn.dataset.label || btn.textContent.trim();
    btn.disabled = true;
    btn.innerHTML = icon('loader', 'w-4 h-4 animate-spin') + 'در حال ارسال…';
    setTimeout(() => {
      toast(successMsg, ic);
      form.reset();
      btn.disabled = false;
      btn.innerHTML = label + ' ' + icon('arrow', 'w-4 h-4');
    }, 900);
  });
};

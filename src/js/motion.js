/* ================================================================
   ALAWEBIX — motion.js
   انیمیشن ظاهر شدن، شمارنده‌ها، مکان‌نمای اختصاصی، پارالاکس، مارکویی
   ================================================================ */

/* ---------- ظاهر شدن با اسکرول ---------- */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
  });
}, { threshold: .12, rootMargin: '0px 0px -36px' });

window.initReveal = function (scope) {
  $$('.reveal:not(.in)', scope || document).forEach(el => revealIO.observe(el));
};

/* ---------- شمارنده‌ها (با اعداد فارسی) ---------- */
const counterIO = new IntersectionObserver(es => {
  es.forEach(en => {
    if (!en.isIntersecting) return;
    counterIO.unobserve(en.target);
    const el = en.target, target = +el.dataset.count, t0 = performance.now(), dur = 1500;
    if (reduced) { el.textContent = faNum(target); return; }
    (function tick(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = faNum(Math.round(target * e));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
}, { threshold: .6 });

window.initCounters = function (scope) {
  $$('[data-count]', scope || document).forEach(el => counterIO.observe(el));
};

/* ---------- دکمه‌های مغناطیسی ---------- */
window.initMagnetic = function (scope) {
  if (!finePointer || reduced) return;
  $$('[data-magnetic]:not(.mag-init)', scope || document).forEach(el => {
    el.classList.add('mag-init');
    const strength = parseFloat(el.dataset.magnetic) || 14;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength * 0.7}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
};

/* ---------- مکان‌نمای اختصاصی ---------- */
window.initCursor = function () {
  const dot = $('#cursorDot'), ring = $('#cursorRing');
  if (!dot || !ring) return;

  if (!finePointer || reduced) {
    document.body.classList.remove('custom-cursor');
    dot.remove(); ring.remove();
    return;
  }

  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    document.body.classList.add('cursor-on');
  });
  document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on'));
  (function loop() {
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    const t = e.target;
    const interactive = t.closest && t.closest('a, button, .srv-row, [data-magnetic], .dot, summary');
    const textual = t.closest && t.closest('input, textarea, select');
    ring.classList.toggle('grow', !!interactive && !textual);
    document.body.classList.toggle('custom-cursor', !textual);
  });
};

/* ---------- پارالاکس صحنه هیرو ---------- */
window.initHeroParallax = function () {
  const stage = $('#heroStage');
  if (!stage || !finePointer || reduced) return;
  const layers = [...stage.querySelectorAll('[data-depth]')];
  let tx = 0, ty = 0, cx = 0, cy = 0;
  stage.addEventListener('mousemove', e => {
    const r = stage.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - .5) * 2;
    ty = ((e.clientY - r.top) / r.height - .5) * 2;
  });
  stage.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
  (function loop() {
    cx += (tx - cx) * .06; cy += (ty - cy) * .06;
    layers.forEach(l => {
      const d = parseFloat(l.dataset.depth);
      l.style.transform = `translate3d(${cx * d * 130}px, ${cy * d * 130}px, 0)`;
    });
    requestAnimationFrame(loop);
  })();
};

/* ---------- وضعیت اسکرول ناوبری + نوار پیشرفت مطالعه ---------- */
window.initScrollState = function () {
  const navEl = $('#siteHeader');
  const bar = $('#progressBar');
  addEventListener('scroll', () => {
    if (navEl) navEl.classList.toggle('scrolled', scrollY > 10);
    const art = $('#postArticle');
    if (bar && art) {
      const r = art.getBoundingClientRect(), start = innerHeight * .55;
      const prog = Math.min(1, Math.max(0, (start - r.top) / r.height));
      bar.style.width = (prog * 100) + '%';
    } else if (bar) bar.style.width = '0%';
  }, { passive: true });
};

/* ---------- مارکویی: حرکت به سمت راست ---------- */
/* محتوای تراک دو بار تکرار می‌شود تا انیمیشن بی‌درز باشد */
window.initMarquee = function () {
  $$('.marquee').forEach(m => {
    const track = m.querySelector('.marquee-track');
    if (!track || track.dataset.doubled) return;
    track.dataset.doubled = '1';
    track.innerHTML = track.innerHTML + track.innerHTML;
    if (reduced) track.style.animation = 'none';
  });
};

/* ---------- تعاملات واگذارشده: FAQ، کپی، اسکرول نرم ---------- */
window.initDelegated = function () {
  document.addEventListener('click', e => {
    /* آکاردئون سؤالات متداول */
    const faqBtn = e.target.closest('.faq-btn');
    if (faqBtn) {
      const item = faqBtn.closest('.faq-item');
      const open = item.classList.toggle('open');
      faqBtn.setAttribute('aria-expanded', String(open));
      item.parentElement.querySelectorAll('.faq-item.open').forEach(o => {
        if (o !== item) {
          o.classList.remove('open');
          o.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
        }
      });
      return;
    }
    /* کپی کد */
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      const code = copyBtn.closest('.codeblock')?.querySelector('code')?.innerText || '';
      navigator.clipboard?.writeText(code)
        .then(() => toast('کد در کلیپ‌بورد کپی شد'))
        .catch(() => toast('کپی در این محیط ممکن نیست', 'x'));
      return;
    }
    /* کپی لینک */
    const linkBtn = e.target.closest('[data-copy-link]');
    if (linkBtn) {
      navigator.clipboard?.writeText(location.href)
        .then(() => toast('لینک کپی شد'))
        .catch(() => toast('کپی در این محیط ممکن نیست', 'x'));
      return;
    }
    /* اسکرول نرم */
    const scrollBtn = e.target.closest('[data-scroll]');
    if (scrollBtn) {
      const t = document.getElementById(scrollBtn.dataset.scroll);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};

/* ---------- راه‌اندازی کامل ---------- */
window.initMotion = function () {
  initReveal();
  initCounters();
  initMagnetic();
  initCursor();
  initHeroParallax();
  initScrollState();
  initMarquee();
  initDelegated();
};

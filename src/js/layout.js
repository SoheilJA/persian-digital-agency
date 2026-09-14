/* ================================================================
   ALAWEBIX — layout.js
   هدر، منوی موبایل، فوتر و ویجت تم را در همه صفحات تزریق می‌کند
   (بهبود: بدون تکرار کد در هفت فایل HTML)
   ================================================================ */

const NAV_ITEMS = [
  ['index.html', 'خانه', 'home'],
  ['about.html', 'درباره ما', 'about'],
  ['services.html', 'خدمات', 'services'],
  ['blog.html', 'وبلاگ', 'blog'],
  ['contact.html', 'تماس با ما', 'contact'],
];

const LOGO_SVG = `<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor"
  stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8.5 7 4 12l4.5 5"/><path d="M15.5 7 20 12l-4.5 5"/><path d="M13.2 5.5 10.8 18.5"/></svg>`;

/* ---------------- هدر ---------------- */
function renderHeader() {
  const route = document.body.dataset.route || 'home';
  const host = $('#siteHeader');
  if (!host) return;

  host.innerHTML = `
  <div class="container-x">
    <nav class="flex items-center justify-between h-[76px]" aria-label="ناوبری اصلی">
      <a href="index.html" class="flex items-center gap-2.5 group" aria-label="آلاوبیکس — خانه">
        <span class="w-9 h-9 rounded-xl grid place-items-center text-white transition-transform duration-300 group-hover:rotate-6"
          style="background:var(--color-primary)">${LOGO_SVG}</span>
        <span class="font-display font-bold text-xl tracking-tight">آلاوبیکس</span>
      </a>

      <div class="hidden lg:flex items-center gap-9">
        ${NAV_ITEMS.map(([href, label, key]) =>
    `<a href="${href}" class="nav-link ${key === route ? 'active' : ''}" ${key === route ? 'aria-current="page"' : ''}>${label}</a>`
  ).join('')}
      </div>

      <div class="flex items-center gap-3">
        <a href="contact.html" data-magnetic="8" class="btn-primary btn-sm hidden sm:inline-flex">
          شروع پروژه ${icon('arrow', 'w-4 h-4')}</a>
        <button id="menuBtn" class="lg:hidden w-11 h-11 grid place-items-center rounded-xl border border-ink/10 bg-white/70"
          aria-label="باز کردن منو" aria-expanded="false" aria-controls="mobileMenu">${icon('menu', 'w-5 h-5')}</button>
      </div>
    </nav>
  </div>

  <div id="mobileMenu" class="hidden lg:hidden bg-paper border-t border-ink/10 shadow-lift px-6 py-6">
    <nav class="flex flex-col" aria-label="ناوبری موبایل">
      ${NAV_ITEMS.map(([href, label, key], i) =>
    `<a href="${href}" class="mobile-link py-4 ${i < NAV_ITEMS.length - 1 ? 'border-b border-ink/8' : ''} font-display text-2xl font-semibold tracking-tight ${key === route ? 'text-primary' : ''}">${label}</a>`
  ).join('')}
    </nav>
    <a href="contact.html" class="btn-primary w-full mt-6">شروع پروژه ${icon('arrow', 'w-4 h-4')}</a>
  </div>`;

  /* منوی موبایل */
  const menuBtn = $('#menuBtn'), mobileMenu = $('#mobileMenu'), navEl = $('#siteHeader');
  function setMenu(open) {
    mobileMenu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.innerHTML = icon(open ? 'x' : 'menu', 'w-5 h-5');
    navEl.classList.toggle('scrolled', open || scrollY > 10);
  }
  menuBtn.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

/* ---------------- فوتر ---------------- */
function renderFooter() {
  const host = $('#siteFooter');
  if (!host) return;

  host.innerHTML = `
  <div class="container-x py-16 lg:py-20">
    <div class="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">

      <div class="lg:col-span-4">
        <a href="index.html" class="flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-xl grid place-items-center text-white" style="background:var(--color-primary)">${LOGO_SVG}</span>
          <span class="font-display font-bold text-xl tracking-tight text-white">آلاوبیکس</span>
        </a>
        <p class="mt-5 leading-relaxed max-w-sm">یک استودیوی طراحی وب و توسعه نرم‌افزار در تهران، که دورکارمحور با تیم‌های جسور در همه جا کار می‌کند.</p>
        <div class="mt-6 flex gap-2.5">
          ${SITE.social.map(([ic, url, label]) => `
          <a href="${url}" target="_blank" rel="noopener" aria-label="${label}"
            class="w-10 h-10 rounded-full border border-white/12 grid place-items-center text-white/60 hover:text-white hover:border-white/35 transition-colors">${icon(ic, 'w-4 h-4')}</a>`).join('')}
        </div>
      </div>

      <div class="lg:col-span-3">
        <p class="font-display font-semibold text-white">خدمات</p>
        <ul class="mt-5 space-y-3">
          ${SERVICES.map(s => `<li><a href="service.html?s=${s.slug}" class="hover:text-primary transition-colors">${s.title}</a></li>`).join('')}
        </ul>
      </div>

      <div class="lg:col-span-2">
        <p class="font-display font-semibold text-white">شرکت</p>
        <ul class="mt-5 space-y-3">
          <li><a href="about.html" class="hover:text-primary transition-colors">درباره ما</a></li>
          <li><a href="blog.html" class="hover:text-primary transition-colors">وبلاگ</a></li>
          <li><a href="services.html" class="hover:text-primary transition-colors">همه خدمات</a></li>
          <li><a href="contact.html" class="hover:text-primary transition-colors">تماس با ما</a></li>
        </ul>
      </div>

      <div class="lg:col-span-3">
        <p class="font-display font-semibold text-white">در تماس باشید</p>
        <ul class="mt-5 space-y-3.5">
          <li><a href="mailto:${SITE.email}" class="flex items-center gap-3 hover:text-primary transition-colors">
            ${icon('mail', 'w-4 h-4 shrink-0')}<span dir="ltr">${SITE.email}</span></a></li>
          <li><a href="tel:${SITE.phoneRaw}" class="flex items-center gap-3 hover:text-primary transition-colors">
            ${icon('phone', 'w-4 h-4 shrink-0')}<span>${SITE.phone}</span></a></li>
          <li class="flex items-start gap-3">${icon('pin', 'w-4 h-4 shrink-0 mt-1')}<span>${SITE.address}، ${SITE.city}</span></li>
        </ul>
      </div>
    </div>

    <div class="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-5">
      <p class="font-mono text-[11px] uppercase tracking-[.2em] text-white/35">تهران · دورکارمحور · از ${SITE.since}</p>
      <p class="text-sm text-white/45">© ${toFa(1404)} استودیو آلاوبیکس — دست‌ساز، البته.</p>
      <p class="font-mono text-[11px] text-white/30">v${toFa('3.2')} · ${toFa(98)} کیلوبایت قصد</p>
    </div>
  </div>`;
}

/* ---------------- ویجت تم ---------------- */
const THEMES = {
  blue: { label: 'آبی کبالت', primary: '#1D5FE0', light: '#5B8BF0', dark: '#1547B4' },
  sky: { label: 'آبی آسمانی', primary: '#0E86D4', light: '#4FB0E8', dark: '#0A6AA8' },
  indigo: { label: 'نیلی', primary: '#4F46E5', light: '#8480F0', dark: '#3730B4' },
  teal: { label: 'فیروزه‌ای', primary: '#0D9DA8', light: '#43C6CF', dark: '#097480' },
  purple: { label: 'بنفش', primary: '#7748E8', light: '#A07EF2', dark: '#5B33BD' },
  green: { label: 'سبز', primary: '#0E9F6E', light: '#3EC48E', dark: '#0A7A50' },
};
const hexToTriplet = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)).join(' ');

window.applyTheme = function (key) {
  const t = THEMES[key];
  if (!t) return;
  const r = document.documentElement.style;
  r.setProperty('--color-primary', t.primary);
  r.setProperty('--color-primary-light', t.light);
  r.setProperty('--color-primary-dark', t.dark);
  r.setProperty('--color-primary-rgb', hexToTriplet(t.primary));
  r.setProperty('--color-primary-light-rgb', hexToTriplet(t.light));
  r.setProperty('--color-primary-dark-rgb', hexToTriplet(t.dark));
  try { localStorage.setItem('alawebix-theme', key); } catch (e) { }
  $$('#swatchGrid [data-theme]').forEach(b => {
    b.querySelector('.sw-ring').classList.toggle('sw-on', b.dataset.theme === key);
    b.setAttribute('aria-pressed', String(b.dataset.theme === key));
  });
};

function renderThemeWidget() {
  const host = $('#themeWidget');
  if (!host) return;

  host.innerHTML = `
  <button id="themeBtn" class="w-12 h-12 rounded-full bg-white border border-ink/10 shadow-lift grid place-items-center text-primary"
    aria-label="تغییر رنگ تم" aria-expanded="false" aria-controls="themePanel">${icon('palette', 'w-5 h-5')}</button>

  <div id="themePanel" class="hidden opacity-0 scale-95 theme-panel w-[268px] card p-5 shadow-lift">
    <p class="font-display font-semibold text-sm">رنگ تأکیدی</p>
    <p class="mt-1 text-xs text-ink/50 leading-relaxed">در همه صفحات اعمال می‌شود — در همین مرورگر ذخیره می‌ماند.</p>
    <div id="swatchGrid" class="mt-5 grid grid-cols-3 gap-4"></div>
  </div>`;

  $('#swatchGrid').innerHTML = Object.entries(THEMES).map(([k, t]) => `
  <button type="button" data-theme="${k}" class="flex flex-col items-center gap-1.5 group" aria-label="${t.label}" aria-pressed="false">
    <span class="relative w-10 h-10 rounded-full block" style="background:${t.primary}">
      <span class="sw-ring absolute -inset-[5px] rounded-full border-2 transition-all duration-200"
        style="border-color:${t.primary}; opacity:0; transform:scale(.85)"></span>
      <span class="absolute inset-0 grid place-items-center text-white opacity-0 transition-opacity duration-200 sw-check">${icon('check', 'w-4 h-4')}</span>
    </span>
    <span class="font-mono text-[9px] text-ink/45 group-hover:text-ink transition-colors">${t.label.split(' ').pop()}</span>
  </button>`).join('');

  $$('#swatchGrid [data-theme]').forEach(b =>
    b.addEventListener('click', () => applyTheme(b.dataset.theme)));

  let saved = 'blue';
  try { saved = localStorage.getItem('alawebix-theme') || 'blue'; } catch (e) { }
  applyTheme(THEMES[saved] ? saved : 'blue');

  const panel = $('#themePanel'), btn = $('#themeBtn');
  function setPanel(open) {
    panel.classList.toggle('hidden', !open);
    requestAnimationFrame(() => {
      panel.classList.toggle('opacity-0', !open);
      panel.classList.toggle('scale-95', !open);
    });
    btn.setAttribute('aria-expanded', String(open));
  }
  btn.addEventListener('click', e => { e.stopPropagation(); setPanel(panel.classList.contains('hidden')); });
  document.addEventListener('click', e => { if (!e.target.closest('#themeWidget')) setPanel(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setPanel(false); });
}

/* ---------------- بنر فراخوان مشترک ---------------- */
window.renderCTAs = function () {
  $$('[data-cta]').forEach(m => {
    const title = m.dataset.ctaTitle || 'پروژه‌ای در ذهن دارید؟';
    const sub = m.dataset.ctaSub || 'بگویید چه می‌سازید. تا یک روز کاری پاسخ می‌دهیم، با سؤال‌هایی که ارزش جواب دادن دارند.';
    m.innerHTML = `
    <div class="relative overflow-hidden rounded-[2rem] bg-ink text-white px-7 py-16 md:px-16 md:py-20 text-center reveal">
      <div class="absolute -top-48 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-primary/25 blur-[140px] pointer-events-none" aria-hidden="true"></div>
      <svg class="absolute top-8 left-8 w-8 h-8 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8.5 7 4 12l4.5 5"/><path d="M15.5 7 20 12l-4.5 5"/></svg>
      <svg class="absolute bottom-8 right-8 w-8 h-8 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8.5 7 4 12l4.5 5"/><path d="M15.5 7 20 12l-4.5 5"/></svg>
      <div class="relative">
        <p class="font-mono text-[11px] uppercase tracking-[.3em] text-white/40">مشاوره رایگان</p>
        <h2 class="mt-5 font-display font-bold tracking-tight leading-[1.08] text-3xl md:text-5xl">${title}</h2>
        <p class="mt-5 text-white/60 text-lg max-w-xl mx-auto leading-relaxed">${sub}</p>
        <div class="mt-9 flex flex-wrap gap-4 justify-center">
          <a href="contact.html" data-magnetic="14" class="btn-primary">رزرو مشاوره رایگان ${icon('arrow', 'w-4 h-4')}</a>
          <a href="services.html" class="btn-ghost-dark">مشاهده خدمات</a>
        </div>
        <p class="mt-7 font-mono text-xs text-white/35 uppercase tracking-[.2em]">بدون ارائه · بدون فشار · میانگین پاسخ زیر ۴ ساعت</p>
      </div>
    </div>`;
  });
};

/* ---------------- راه‌اندازی ---------------- */
window.initLayout = function () {
  renderHeader();
  renderFooter();
  renderThemeWidget();
  renderCTAs();
};

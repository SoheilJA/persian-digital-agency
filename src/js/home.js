/* ================================================================
   ALAWEBIX — home.js  (صفحه اصلی)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLayout();

  /* --- پیش‌نمایش خدمات --- */
  $('#homeServices').innerHTML =
    SERVICES.slice(0, 3).map(s => serviceRow(s, true)).join('') +
    '<div class="border-t border-ink/10"></div>';

  /* --- نمونه‌کارها --- */
  $('#homePortfolio').innerHTML = PROJECTS.slice(0, 3).map((p, i) => `
  <article class="reveal group flex flex-col ${i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center">
    <div class="lg:w-[56%] relative w-full">
      ${frame(`${p.clientEn}.com`, `
        <div class="overflow-hidden">
          <img loading="lazy" src="${img(p.slug, 1100, 720)}" alt="${p.client} — ${p.title}"
            class="w-full aspect-[11/7] object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
        </div>`)}
      <div class="absolute -bottom-7 right-4 card px-5 py-4 flex items-center gap-4">
        <span class="font-display text-3xl font-bold text-primary tracking-tight">${p.stat}</span>
        <span class="text-xs text-ink/55 leading-snug w-32">${p.statLabel}</span>
      </div>
    </div>
    <div class="lg:w-[44%] pt-10 lg:pt-0">
      <p class="font-mono text-xs tracking-[.2em] text-ink/45">${p.client} · ${p.year}</p>
      <h3 class="mt-3 font-display font-bold tracking-tight leading-[1.15] text-2xl md:text-3xl">${p.title}</h3>
      <p class="mt-4 text-ink/60 leading-relaxed">${p.desc}</p>
      <div class="mt-6 flex flex-wrap gap-2">
        ${p.tags.map(t => {
    const s = SERVICES.find(x => x.slug === t);
    return s ? `<span class="chip text-xs">${s.title}</span>` : '';
  }).join('')}
      </div>
      <a href="${p.link}" class="mt-7 font-display font-semibold text-ink hover:text-primary transition-colors inline-flex items-center gap-2 group/l">
        ${p.linkLabel} ${icon('arrow', 'w-4 h-4')}</a>
    </div>
  </article>`).join('');

  /* --- نظرات مشتریان --- */
  $('#testiWrap').innerHTML = `
  <div class="overflow-hidden">
    <div id="testiTrack" class="flex transition-transform duration-500" style="will-change:transform">
      ${TESTIMONIALS.map(t => `
      <figure class="w-full shrink-0 px-2 text-center">
        <blockquote class="font-display text-xl md:text-[1.7rem] font-medium leading-snug tracking-tight">«${t.q}»</blockquote>
        <figcaption class="mt-9 flex items-center justify-center gap-4">
          <img loading="lazy" src="${img(t.seed, 96, 96)}" alt="" class="w-12 h-12 rounded-full object-cover ring-primary/40"/>
          <div class="text-right">
            <div class="font-semibold">${t.name}</div>
            <div class="text-sm text-ink/50">${t.role}</div>
          </div>
        </figcaption>
      </figure>`).join('')}
    </div>
  </div>
  <div class="mt-10 flex items-center justify-center gap-6">
    <button id="testiPrev" class="w-11 h-11 rounded-full border border-ink/12 grid place-items-center text-ink/60 hover:border-primary hover:text-primary transition-colors" aria-label="نظر قبلی">${icon('chevR', 'w-4 h-4')}</button>
    <div class="flex items-center gap-2.5" id="testiDots" role="tablist" aria-label="نظرات مشتریان"></div>
    <button id="testiNext" class="w-11 h-11 rounded-full border border-ink/12 grid place-items-center text-ink/60 hover:border-primary hover:text-primary transition-colors" aria-label="نظر بعدی">${icon('chevL', 'w-4 h-4')}</button>
    <span id="testiCount" class="font-mono text-xs text-ink/45 mr-2"></span>
  </div>`;

  /* اسلایدر (RTL: جهت جابه‌جایی مثبت) */
  (function () {
    const track = $('#testiTrack'), dots = $('#testiDots'), n = TESTIMONIALS.length;
    let i = 0, timer = null;
    dots.innerHTML = TESTIMONIALS.map((_, k) =>
      `<button type="button" class="dot" role="tab" aria-label="نظر ${toFa(k + 1)}"></button>`).join('');
    function go(k) {
      i = (k + n) % n;
      track.style.transform = `translateX(${i * 100}%)`;
      [...dots.children].forEach((d, j) => {
        d.classList.toggle('dot-active', j === i);
        d.setAttribute('aria-selected', String(j === i));
      });
      $('#testiCount').textContent = `${toFa(String(i + 1).padStart(2, '0'))} / ${toFa(String(n).padStart(2, '0'))}`;
    }
    function start() { if (!reduced) { stop(); timer = setInterval(() => go(i + 1), 6000); } }
    function stop() { if (timer) clearInterval(timer); }
    $('#testiPrev').addEventListener('click', () => { go(i - 1); start(); });
    $('#testiNext').addEventListener('click', () => { go(i + 1); start(); });
    [...dots.children].forEach((d, k) => d.addEventListener('click', () => { go(k); start(); }));
    const wrap = $('#testiWrap');
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
    go(0); start();
  })();

  /* --- پیش‌نمایش وبلاگ --- */
  $('#homeBlog').innerHTML = POSTS.slice(0, 3).map((p, i) =>
    postCard(p, i, i === 1 ? 'md:mt-10' : i === 2 ? 'md:mt-20' : '')).join('');

  initMotion();
});

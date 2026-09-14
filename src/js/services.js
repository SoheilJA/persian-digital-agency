/* ================================================================
   ALAWEBIX — services.js  (فهرست خدمات)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLayout();

  /* --- فهرست کامل خدمات --- */
  $('#servicesList').innerHTML = SERVICES.map(s => `
  <a href="service.html?s=${s.slug}" class="srv-row group relative flex items-center gap-6 md:gap-10 border-t border-ink/10 py-8 md:py-10 px-2 md:px-4 -mx-2 md:-mx-4 transition-colors duration-300 hover:bg-white" data-preview="${s.slug}">
    <span class="font-mono text-sm md:text-base text-primary font-medium w-8 shrink-0">${s.num}</span>
    <span class="flex-1 min-w-0">
      <span class="block font-display font-semibold tracking-tight text-2xl md:text-4xl group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">${s.title}</span>
      <span class="mt-2 block text-ink/55 md:text-lg leading-snug max-w-2xl">${s.short}</span>
      <span class="mt-3 hidden md:flex flex-wrap gap-x-3 font-mono text-[11px] text-ink/40">${s.tags.map(t => `<span>${t}</span>`).join('<span class="text-primary/40">·</span>')}</span>
    </span>
    <span class="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-ink/12 grid place-items-center text-ink/60 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:-rotate-45">${icon('arrow', 'w-5 h-5')}</span>
  </a>`).join('') + '<div class="border-t border-ink/10"></div>';

  /* --- جدول مقایسه --- */
  const cmpIcon = v => v === 2
    ? `<span class="w-6 h-6 rounded-full grid place-items-center text-white" style="background:var(--color-primary)">${icon('check', 'w-3.5 h-3.5')}</span>`
    : `<span class="w-6 h-6 rounded-full grid place-items-center border border-ink/15 text-ink/30">${icon('x', 'w-3.5 h-3.5')}</span>`;

  $('#compareBody').innerHTML = COMPARE.map(r => `
  <tr class="border-b border-ink/[.07]">
    <td class="py-4 pr-6 font-medium">${r[0]}</td>
    <td class="py-4 px-6" style="background:rgb(var(--color-primary-rgb)/.07)">${cmpIcon(r[1])}</td>
    <td class="py-4 px-6">${cmpIcon(r[2])}</td>
    <td class="py-4 px-6">${cmpIcon(r[3])}</td>
  </tr>`).join('') + `
  <tr><td></td>
    <td class="pt-6 px-6" style="background:rgb(var(--color-primary-rgb)/.07)">
      <a href="contact.html" class="btn-primary btn-sm">همکاری با ما ${icon('arrow', 'w-3.5 h-3.5')}</a></td>
    <td colspan="2"></td></tr>`;

  /* --- پیش‌نمایش شناور روی هاور (دسکتاپ) --- */
  (function () {
    const list = $('#servicesList'), prev = $('#srvPreview');
    if (!list || !prev || !finePointer || reduced) return;
    list.addEventListener('mousemove', e => {
      prev.style.left = (e.clientX - 288) + 'px'; /* RTL: سمت چپ نشانگر */
      prev.style.top = (e.clientY - 100) + 'px';
    });
    $$('.srv-row[data-preview]', list).forEach(row => {
      row.addEventListener('mouseenter', () => {
        const s = SERVICES.find(x => x.slug === row.dataset.preview);
        if (!s) return;
        prev.innerHTML = `
        <img src="${img(s.slug, 560, 340)}" alt="" class="w-full aspect-[28/17] object-cover"/>
        <div class="bg-ink text-white/90 px-4 py-3 flex items-center justify-between gap-4">
          <span class="font-display font-semibold text-sm">${s.title}</span>
          <span class="font-mono text-[10px]" style="color:var(--color-primary-light)">${s.num}</span>
        </div>`;
        prev.classList.add('on');
      });
    });
    list.addEventListener('mouseleave', () => prev.classList.remove('on'));
  })();

  initMotion();
});

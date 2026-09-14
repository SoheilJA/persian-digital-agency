/* ================================================================
   ALAWEBIX — about.js  (درباره ما)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLayout();

  /* --- تیم --- */
  $('#aboutTeam').innerHTML = TEAM.map((m, i) => `
  <div class="reveal group ${i % 3 === 1 ? 'md:mt-8' : ''} ${i % 2 === 1 ? 'lg:mt-6' : ''}" style="--d:${(i % 6) * 70}ms">
    <div class="overflow-hidden rounded-2xl">
      <img loading="lazy" src="${img(m[3], 420, 500)}" alt="پرتره ${m[0]}"
        class="w-full aspect-[4/5] object-cover saturate-[.85] group-hover:saturate-100 group-hover:scale-[1.04] transition-all duration-500"/>
    </div>
    <p class="mt-4 font-display font-semibold tracking-tight group-hover:text-primary transition-colors">${m[0]}</p>
    <p class="text-sm text-ink/50">${m[1]}</p>
    <p class="mt-1.5 text-xs text-ink/40 leading-relaxed">${m[2]}</p>
  </div>`).join('');

  /* --- خط زمانی --- */
  $('#aboutTimeline').innerHTML = TIMELINE.map((t, i) => `
  <div class="reveal relative pl-10 md:pl-14 ${i === TIMELINE.length - 1 ? 'pb-0' : 'pb-10'}" style="--d:${i * 90}ms">
    <span class="absolute right-0 top-1.5 w-3.5 h-3.5 rounded-full border-[3px] bg-paper" style="border-color:var(--color-primary)"></span>
    ${i < TIMELINE.length - 1 ? '<span class="absolute right-[6px] top-6 bottom-0 w-px bg-ink/15" aria-hidden="true"></span>' : ''}
    <p class="font-mono text-sm text-primary">${t[0]}</p>
    <p class="mt-1.5 text-ink/70 leading-relaxed md:text-lg">${t[1]}</p>
  </div>`).join('');

  initMotion();
});

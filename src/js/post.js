/* ================================================================
   ALAWEBIX — post.js  (تمپلیت صفحه مقاله — post.html?p=slug)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLayout();

  const slug = qs('p') || FEATURED_SLUG;
  const p = POSTS.find(x => x.slug === slug);

  if (!p) { location.replace('blog.html'); return; }

  document.title = `${p.title} — آلاوبیکس`;
  const meta = $('meta[name="description"]');
  if (meta) meta.setAttribute('content', p.excerpt);

  /* مقالات مرتبط */
  const related = POSTS.filter(x => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  if (related.length < 3) {
    related.push(...POSTS.filter(x => x.slug !== p.slug && !related.includes(x)).slice(0, 3 - related.length));
  }

  /* رندر بلوک‌های محتوا */
  const blocks = p.body.map(b => {
    if (b.t === 'p') return `<p class="text-[1.075rem] leading-[1.85] text-ink/75 mb-7">${b.x}</p>`;
    if (b.t === 'h2') return `<h2 class="font-display font-bold tracking-tight text-2xl md:text-[1.8rem] mt-12 mb-5">${b.x}</h2>`;
    if (b.t === 'q') return `<blockquote class="my-10 pl-7 border-l-[3px] font-display text-xl md:text-2xl font-medium leading-relaxed" style="border-color:var(--color-primary)">${b.x}</blockquote>`;
    if (b.t === 'ul') return `<ul class="mb-8 space-y-3.5">${b.x.map(li =>
      `<li class="flex gap-3.5 text-[1.05rem] leading-relaxed text-ink/75">${icon('check', 'w-5 h-5 text-primary shrink-0 mt-1')}<span>${li}</span></li>`).join('')}</ul>`;
    if (b.t === 'code') return `
      <div class="codeblock my-9 rounded-xl overflow-hidden border border-ink/10" dir="ltr"
        style="box-shadow:0 1px 2px rgba(24,22,20,.05),0 16px 40px -16px rgba(24,22,20,.2)">
        <div class="flex items-center gap-2 px-4 py-2.5 bg-[#141312] text-white/50 font-mono text-xs">
          <span class="w-2 h-2 rounded-full bg-white/15"></span>
          <span class="w-2 h-2 rounded-full bg-white/15"></span>
          <span class="w-2 h-2 rounded-full bg-primary/70"></span>
          <span class="ml-2">${b.file}</span>
          <button type="button" data-copy class="ml-auto flex items-center gap-1.5 hover:text-white transition-colors" aria-label="کپی کد">${icon('copy', 'w-3.5 h-3.5')}کپی</button>
        </div>
        <pre class="p-5 overflow-x-auto bg-[#1B1917] font-mono text-[13px] leading-[1.75] text-[#D6D3CD]"><code>${hl(b.x)}</code></pre>
      </div>`;
    return '';
  }).join('');

  $('#postMount').innerHTML = `
  <div class="pt-32 lg:pt-40 pb-24">
    <div class="container-x">
      <article id="postArticle">
        <header class="max-w-3xl mx-auto text-center reveal">
          <a href="blog.html" class="inline-flex px-3.5 py-1.5 rounded-full font-mono text-[11px] text-white" style="background:var(--color-primary)">${p.category}</a>
          <h1 class="mt-6 font-display font-bold tracking-tight leading-[1.1] text-[clamp(1.9rem,4vw,3.1rem)]">${p.title}</h1>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-ink/55">
            <span class="flex items-center gap-2.5">
              <img loading="lazy" src="${img(p.aseed, 64, 64)}" alt="" class="w-9 h-9 rounded-full object-cover"/>
              <span class="font-semibold text-ink">${p.author}</span></span>
            <span class="flex items-center gap-1.5">${icon('calendar', 'w-4 h-4 text-primary')}${p.date}</span>
            <span class="flex items-center gap-1.5">${icon('clock', 'w-4 h-4 text-primary')}${toFa(p.read)} دقیقه مطالعه</span>
          </div>
        </header>

        <div class="mt-12 max-w-5xl mx-auto reveal" style="--d:120ms">
          <div class="rounded-3xl overflow-hidden" style="box-shadow:0 4px 10px rgba(24,22,20,.06),0 40px 80px -24px rgba(24,22,20,.25)">
            <img src="${img(p.seed, 1400, 700)}" alt="" class="w-full aspect-[2/1] object-cover"/>
          </div>
        </div>

        <div class="mt-14 max-w-[680px] mx-auto reveal" style="--d:200ms">
          ${blocks}

          <div class="mt-12 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-5">
            <p class="font-mono text-xs tracking-[.2em] text-ink/45">این مقاله را به اشتراک بگذارید</p>
            <div class="flex gap-2.5">
              <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(p.title)}" target="_blank" rel="noopener" aria-label="اشتراک در ایکس"
                class="w-10 h-10 rounded-full border border-ink/12 grid place-items-center text-ink/60 hover:border-primary hover:text-primary transition-colors">${icon('x', 'w-4 h-4')}</a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="اشتراک در لینکدین"
                class="w-10 h-10 rounded-full border border-ink/12 grid place-items-center text-ink/60 hover:border-primary hover:text-primary transition-colors">${icon('linkedin', 'w-4 h-4')}</a>
              <button type="button" data-copy-link aria-label="کپی لینک"
                class="w-10 h-10 rounded-full border border-ink/12 grid place-items-center text-ink/60 hover:border-primary hover:text-primary transition-colors">${icon('copy', 'w-4 h-4')}</button>
            </div>
          </div>

          <div class="card p-7 md:p-8 mt-10 flex flex-wrap sm:flex-nowrap items-center gap-6">
            <img loading="lazy" src="${img(p.aseed, 160, 160)}" alt="پرتره ${p.author}" class="w-20 h-20 rounded-2xl object-cover shrink-0"/>
            <div>
              <p class="font-mono text-[11px] tracking-[.2em] text-ink/45">نوشته</p>
              <p class="mt-1 font-display font-bold text-xl tracking-tight">${p.author}</p>
              <p class="text-sm text-ink/50">${p.role} در آلاوبیکس</p>
              <p class="mt-2.5 text-sm text-ink/60 leading-relaxed">درباره صنعتگری پشت کار منتشرشده می‌نویسد: مهندسی، طراحی و تصمیم‌های کسب‌وکاری میان آن دو.</p>
            </div>
          </div>
        </div>
      </article>

      <section class="mt-24 pt-14 border-t border-ink/10">
        <div class="flex items-end justify-between gap-6 mb-10 reveal">
          <h2 class="font-display font-bold tracking-tight text-2xl md:text-3xl">ادامه مطالعه</h2>
          <a href="blog.html" class="font-display font-semibold text-ink hover:text-primary transition-colors inline-flex items-center gap-2 group">همه مقالات ${icon('arrow', 'w-4 h-4')}</a>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          ${related.slice(0, 3).map((r, i) => postCard(r, i)).join('')}
        </div>
      </section>
    </div>
  </div>`;

  initMotion();
});

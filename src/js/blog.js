/* ================================================================
   ALAWEBIX — blog.js  (فهرست مقالات + فیلتر + صفحه‌بندی)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLayout();

  const state = { cat: qs('cat') || 'all', page: 1 };

  function count(c) {
    return c === 'all'
      ? POSTS.length - 1
      : POSTS.filter(p => p.slug !== FEATURED_SLUG && p.category === c).length;
  }

  function render() {
    /* تب‌های دسته‌بندی */
    $('#filterTabs').innerHTML = CATEGORIES.map(c => `
    <button type="button" role="tab" aria-selected="${state.cat === c}" data-cat="${c}"
      class="tab ${state.cat === c ? 'tab-active' : ''}">${c === 'all' ? 'همه مقالات' : c}<sup class="mr-1.5 opacity-60">${toFa(count(c))}</sup></button>`).join('');

    /* مقاله شاخص */
    const featured = (state.cat === 'all' && state.page === 1)
      ? POSTS.find(p => p.slug === FEATURED_SLUG) : null;

    $('#featuredPost').innerHTML = featured ? `
    <a href="post.html?p=${featured.slug}" class="card card-hover overflow-hidden group grid lg:grid-cols-2 reveal">
      <div class="overflow-hidden min-h-[240px]">
        <img loading="lazy" src="${img(featured.seed, 1000, 640)}" alt=""
          class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"/>
      </div>
      <div class="p-7 md:p-10 flex flex-col justify-center">
        <div class="flex items-center gap-3 font-mono text-[11px] text-ink/45">
          <span class="px-2.5 py-1 rounded-full text-white" style="background:var(--color-primary)">شاخص</span>
          <span class="text-primary">${featured.category}</span><span>·</span><span>${toFa(featured.read)} دقیقه مطالعه</span>
        </div>
        <h2 class="mt-4 font-display font-bold tracking-tight leading-[1.12] text-2xl md:text-3xl group-hover:text-primary transition-colors">${featured.title}</h2>
        <p class="mt-4 text-ink/60 leading-relaxed">${featured.excerpt}</p>
        <div class="mt-6 flex items-center gap-3">
          <img loading="lazy" src="${img(featured.aseed, 56, 56)}" alt="" class="w-9 h-9 rounded-full object-cover"/>
          <div><p class="text-sm font-semibold">${featured.author}</p><p class="text-xs text-ink/45">${featured.date}</p></div>
          <span class="ml-auto w-10 h-10 rounded-full border border-ink/12 grid place-items-center text-ink/60 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:-rotate-45 transition-all duration-300">${icon('arrow', 'w-4 h-4')}</span>
        </div>
      </div>
    </a>` : '';

    /* شبکه مقالات */
    const rest = POSTS.filter(p => p.slug !== FEATURED_SLUG && (state.cat === 'all' || p.category === state.cat));
    const pages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
    state.page = Math.min(state.page, pages);
    const slice = rest.slice((state.page - 1) * POSTS_PER_PAGE, state.page * POSTS_PER_PAGE);

    $('#blogGrid').innerHTML = slice.length
      ? slice.map((p, i) => postCard(p, i)).join('')
      : '<p class="text-ink/50 col-span-full py-8">هنوز مقاله‌ای در این دسته نیست — به‌زودی سر بزنید.</p>';

    /* صفحه‌بندی */
    $('#blogPager').innerHTML = pages > 1 ? `
    <button type="button" class="page-btn" data-page="${state.page - 1}" ${state.page <= 1 ? 'disabled' : ''} aria-label="صفحه قبل">${icon('chevR', 'w-4 h-4')}</button>
    ${Array.from({ length: pages }, (_, i) =>
      `<button type="button" class="page-btn ${state.page === i + 1 ? 'page-btn-active' : ''}" data-page="${i + 1}">${toFa(i + 1)}</button>`).join('')}
    <button type="button" class="page-btn" data-page="${state.page + 1}" ${state.page >= pages ? 'disabled' : ''} aria-label="صفحه بعد">${icon('chevL', 'w-4 h-4')}</button>` : '';

    initReveal($('#blogGrid'));
    initReveal($('#featuredPost'));
  }

  $('#filterTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    state.cat = b.dataset.cat;
    state.page = 1;
    render();
  });

  $('#blogPager').addEventListener('click', e => {
    const b = e.target.closest('[data-page]');
    if (!b || b.disabled) return;
    state.page = +b.dataset.page;
    render();
    $('#blogGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  render();
  wireForm('#newsForm', 'عضویت انجام شد — ماه آینده در ایمیلتان می‌بینیمتان.', 'mail');
  initMotion();
});

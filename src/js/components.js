/* ================================================================
   ALAWEBIX — components.js
   کامپوننت‌های HTML مشترک بین صفحات
   ================================================================ */

/* تصویر با placeholder */
window.img = (seed, w, h) => `https://picsum.photos/seed/alawebix-${seed}/${w}/${h}.jpg`;

/* قاب مرورگر */
window.frame = (url, inner) => `
  <div class="rounded-2xl border border-ink/10 bg-white overflow-hidden"
    style="box-shadow:0 2px 6px rgba(24,22,20,.05),0 30px 64px -20px rgba(24,22,20,.2)">
    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-ink/[.06] bg-[#F5F4F1]">
      <span class="w-2.5 h-2.5 rounded-full bg-ink/15"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-ink/15"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-primary/50"></span>
      <span dir="ltr" class="ml-3 flex-1 max-w-[260px] rounded-md bg-white border border-ink/[.06] px-3 py-1 font-mono text-[11px] text-ink/40 truncate">${url}</span>
    </div>${inner}
  </div>`;

/* ردیف خدمت */
window.serviceRow = function (s, big) {
  return `
  <a href="service.html?s=${s.slug}" class="srv-row group relative flex items-center gap-5 md:gap-8 border-t border-ink/10 ${big ? 'py-8 md:py-9' : 'py-6 md:py-7'}">
    <span class="font-mono text-sm text-primary font-medium w-7 shrink-0">${s.num}</span>
    <span class="hidden sm:grid w-12 h-12 shrink-0 rounded-xl place-items-center text-primary"
      style="background:rgb(var(--color-primary-rgb)/.09)">${icon(s.icon, 'w-5 h-5')}</span>
    <span class="flex-1 min-w-0">
      <span class="block font-display font-semibold tracking-tight ${big ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} group-hover:text-primary transition-colors duration-300">${s.title}</span>
      <span class="mt-1 block text-ink/55 ${big ? 'md:text-lg' : ''} leading-snug">${s.short}</span>
    </span>
    <span class="shrink-0 w-11 h-11 rounded-full border border-ink/12 grid place-items-center text-ink/60 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:-rotate-45">${icon('arrow', 'w-4 h-4')}</span>
  </a>`;
};

/* کارت مقاله */
window.postCard = function (p, i, cls) {
  i = i || 0;
  return `
  <a href="post.html?p=${p.slug}" class="card card-hover overflow-hidden group block reveal ${cls || ''}" style="--d:${(i % 3) * 100}ms">
    <div class="overflow-hidden">
      <img loading="lazy" src="${img(p.seed, 640, 400)}" alt="" class="w-full aspect-[16/10] object-cover group-hover:scale-[1.05] transition-transform duration-700"/>
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 font-mono text-[11px] text-ink/45">
        <span class="text-primary">${p.category}</span><span>·</span><span>${toFa(p.read)} دقیقه مطالعه</span>
      </div>
      <h3 class="mt-3 font-display text-xl font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">${p.title}</h3>
      <p class="mt-2.5 text-sm text-ink/55 leading-relaxed line-clamp-2">${p.excerpt}</p>
      <div class="mt-5 flex items-center gap-2.5">
        <img loading="lazy" src="${img(p.aseed, 56, 56)}" alt="" class="w-7 h-7 rounded-full object-cover"/>
        <span class="text-sm text-ink/60">${p.author}</span>
        <span class="ml-auto font-mono text-xs text-ink/40">${p.date}</span>
      </div>
    </div>
  </a>`;
};

/* بلوک سؤالات متداول */
window.faqBlock = function (faqs) {
  return faqs.map((f, i) => `
  <div class="faq-item reveal border-t border-ink/10 ${i === faqs.length - 1 ? 'border-b' : ''}" style="--d:${i * 70}ms">
    <button class="faq-btn w-full flex items-center justify-between gap-6 py-6 text-right" aria-expanded="false">
      <span class="font-display font-semibold text-lg tracking-tight">${f[0]}</span>
      <span class="faq-icon text-primary shrink-0">${icon('plus', 'w-5 h-5')}</span>
    </button>
    <div class="faq-body"><div><p class="pb-6 text-ink/60 leading-relaxed">${f[1]}</p></div></div>
  </div>`).join('');
};

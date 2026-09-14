/* ================================================================
   ALAWEBIX — service.js  (تمپلیت صفحه یک خدمت — service.html?s=slug)
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLayout();

  const slug = qs('s') || SERVICES[0].slug;
  const s = SERVICES.find(x => x.slug === slug);

  if (!s) { location.replace('services.html'); return; }

  document.title = `${s.title} — آلاوبیکس`;
  const meta = $('meta[name="description"]');
  if (meta) meta.setAttribute('content', s.short);

  const cases = PROJECTS.filter(p => p.tags.includes(s.slug)).slice(0, 2);

  /* --- هیرو --- */
  $('#svc-hero').innerHTML = `
  <div class="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
    <div class="absolute -top-24 right-[10%] w-[480px] h-[480px] rounded-full bg-primary/14 blur-[130px] pointer-events-none" aria-hidden="true"></div>
    <div class="container-x relative reveal">
      <nav class="flex items-center gap-2 font-mono text-xs text-ink/40" aria-label="مسیر صفحه">
        <a href="services.html" class="hover:text-primary transition-colors">خدمات</a>
        <span class="text-primary">/</span><span class="text-ink/60">${s.title}</span>
      </nav>
      <div class="mt-8 grid lg:grid-cols-12 gap-10 items-start">
        <div class="lg:col-span-8">
          <span class="w-16 h-16 rounded-2xl grid place-items-center text-primary" style="background:rgb(var(--color-primary-rgb)/.09)">${icon(s.icon, 'w-7 h-7')}</span>
          <h1 class="mt-7 font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.2rem,4.6vw,3.5rem)]">${s.title}</h1>
          <p class="mt-6 text-lg md:text-xl text-ink/60 leading-relaxed max-w-2xl">${s.hero}</p>
          <div class="mt-8 flex flex-wrap gap-4">
            <a href="contact.html" data-magnetic="12" class="btn-primary">شروع این پروژه ${icon('arrow', 'w-4 h-4')}</a>
            ${s.tiers ? '<button type="button" data-scroll="svc-tiers" class="btn-outline">مشاهده پکیج‌ها</button>' : ''}
          </div>
        </div>
        <div class="lg:col-span-4 card p-6 lg:mt-4">
          <p class="font-mono text-[11px] tracking-[.2em] text-ink/45">در یک نگاه</p>
          <ul class="mt-4 space-y-2.5">${s.tags.map(t =>
    `<li class="flex items-center gap-2.5 text-sm text-ink/70">${icon('check', 'w-4 h-4 text-primary shrink-0')}${t}</li>`).join('')}</ul>
          <p class="mt-5 pt-5 border-t border-ink/10 font-mono text-xs text-ink/45">${s.pricingNote || (s.tiers ? 'پکیج‌ها ' + s.tiers[0].price : 'قیمت‌گذاری توافقی')}</p>
        </div>
      </div>
    </div>
  </div>`;

  /* --- قابلیت‌ها --- */
  $('#svc-features').innerHTML = `
  <section class="py-20 lg:py-24 bg-white border-y border-ink/[.06]">
    <div class="container-x">
      <div class="max-w-2xl reveal">
        <p class="eyebrow">چه چیزی دریافت می‌کنید</p>
        <h2 class="mt-5 font-display font-bold tracking-tight text-3xl md:text-[2.4rem]">جزئیاتی که تفاوت را می‌سازند.</h2>
      </div>
      <div class="mt-12">
        ${s.features.map((f, i) => `
        <div class="reveal grid md:grid-cols-12 gap-4 md:gap-8 items-start border-t border-ink/10 py-7" style="--d:${Math.min(i * 70, 280)}ms">
          <span class="md:col-span-1 font-mono text-sm text-primary pt-1">${toFa(String(i + 1).padStart(2, '0'))}</span>
          <h3 class="md:col-span-4 font-display text-xl font-semibold tracking-tight">${f[0]}</h3>
          <p class="md:col-span-7 text-ink/60 leading-relaxed">${f[1]}</p>
        </div>`).join('')}
        <div class="border-t border-ink/10"></div>
      </div>
    </div>
  </section>`;

  /* --- فرآیند --- */
  $('#svc-process').innerHTML = `
  <section class="py-20 lg:py-24">
    <div class="container-x grid lg:grid-cols-12 gap-14">
      <div class="lg:col-span-4 reveal">
        <p class="eyebrow">فرآیند کار</p>
        <h2 class="mt-5 font-display font-bold tracking-tight text-3xl md:text-[2.4rem] leading-[1.1]">${s.title} چطور منتشر می‌شود.</h2>
        <p class="mt-5 text-ink/60 leading-relaxed">همان ریتم همیشگی ما: پیشرفت قابل مشاهده، بدون غافلگیری.</p>
      </div>
      <div class="lg:col-span-8">
        ${s.process.map((p, i) => `
        <div class="reveal relative pl-12 ${i === s.process.length - 1 ? 'pb-0' : 'pb-9'}" style="--d:${i * 90}ms">
          <span class="absolute right-0 top-0 w-9 h-9 rounded-full border border-ink/12 bg-white grid place-items-center font-mono text-xs text-primary">${toFa(String(i + 1).padStart(2, '0'))}</span>
          ${i < s.process.length - 1 ? '<span class="absolute right-[18px] top-10 bottom-0 border-l border-dashed border-ink/20" aria-hidden="true"></span>' : ''}
          <h3 class="font-display text-lg font-semibold tracking-tight">${p[0]}</h3>
          <p class="mt-1.5 text-ink/60 leading-relaxed">${p[1]}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

  /* --- پکیج‌ها --- */
  $('#svc-tiers').innerHTML = s.tiers ? `
  <section id="svc-tiers" class="py-20 lg:py-24 bg-white border-y border-ink/[.06] relative overflow-hidden">
    <div class="absolute -top-24 left-[20%] w-[380px] h-[380px] rounded-full bg-primary/10 blur-[110px] pointer-events-none" aria-hidden="true"></div>
    <div class="container-x relative">
      <div class="text-center max-w-2xl mx-auto reveal">
        <p class="eyebrow inline-block">پکیج‌ها</p>
        <h2 class="mt-5 font-display font-bold tracking-tight text-3xl md:text-[2.4rem]">یک نقطه شروع انتخاب کنید.</h2>
        <p class="mt-4 text-ink/60 text-lg">هر پکیج یک آغاز است، نه یک سقف — دامنه کار را در تماس اول تنظیم می‌کنیم.</p>
      </div>
      <div class="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
        ${s.tiers.map((t, i) => `
        <div class="reveal card card-hover p-7 relative flex flex-col ${t.featured ? 'lg:-mt-4 lg:pb-11 border-primary/40' : ''}" style="--d:${i * 110}ms">
          ${t.featured ? '<span class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-mono text-[10px] text-white whitespace-nowrap" style="background:var(--color-primary)">محبوب‌ترین</span>' : ''}
          <p class="font-display font-semibold text-lg tracking-tight">${t.name}</p>
          <p class="mt-1 text-sm text-ink/50">${t.forr}</p>
          <p class="mt-5 font-display text-xl font-bold ${t.featured ? 'text-primary' : ''}">${t.price}</p>
          <ul class="mt-6 space-y-3 flex-1">
            ${t.items.map(it => `<li class="flex gap-3 text-sm text-ink/70 leading-relaxed">${icon('check', 'w-4 h-4 text-primary shrink-0 mt-0.5')}<span>${it}</span></li>`).join('')}
          </ul>
          <a href="contact.html" class="${t.featured ? 'btn-primary' : 'btn-outline'} w-full mt-7">${t.cta}</a>
        </div>`).join('')}
      </div>
    </div>
  </section>` : (s.pricingNote ? `
  <section class="py-16">
    <div class="container-x">
      <div class="reveal card p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <p class="font-mono text-[11px] tracking-[.2em] text-ink/45">سرمایه‌گذاری</p>
          <p class="mt-2 font-display text-xl md:text-2xl font-bold tracking-tight">${s.pricingNote}</p>
        </div>
        <a href="contact.html" class="btn-primary">درخواست قیمت ${icon('arrow', 'w-4 h-4')}</a>
      </div>
    </div>
  </section>` : '');

  /* --- نمونه‌کارهای مرتبط --- */
  $('#svc-cases').innerHTML = cases.length ? `
  <section class="py-20 lg:py-24">
    <div class="container-x">
      <div class="flex flex-wrap items-end justify-between gap-6 mb-12 reveal">
        <div>
          <p class="eyebrow">کارهای مرتبط</p>
          <h2 class="mt-5 font-display font-bold tracking-tight text-3xl md:text-[2.4rem]">منتشرشده با این خدمت.</h2>
        </div>
        <a href="blog.html" class="font-display font-semibold text-ink hover:text-primary transition-colors inline-flex items-center gap-2 group">همه مطالعات موردی ${icon('arrow', 'w-4 h-4')}</a>
      </div>
      <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
        ${cases.map((p, i) => `
        <a href="${p.link}" class="reveal card card-hover overflow-hidden group block" style="--d:${i * 110}ms">
          <div class="overflow-hidden"><img loading="lazy" src="${img(p.slug, 800, 460)}" alt="${p.client}" class="w-full aspect-[16/9] object-cover group-hover:scale-[1.04] transition-transform duration-700"/></div>
          <div class="p-6">
            <p class="font-mono text-xs tracking-[.2em] text-ink/45">${p.client} · ${p.year}</p>
            <h3 class="mt-2.5 font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">${p.title}</h3>
            <p class="mt-2.5 text-sm text-ink/55 leading-relaxed line-clamp-2">${p.desc}</p>
            <p class="mt-4 font-display font-bold text-2xl text-primary">${p.stat} <span class="text-sm font-normal text-ink/45">${p.statLabel}</span></p>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </section>` : '';

  /* --- سؤالات متداول --- */
  $('#svc-faq').innerHTML = `
  <section class="py-20 lg:py-24 bg-white border-y border-ink/[.06]">
    <div class="container-x grid lg:grid-cols-12 gap-14">
      <div class="lg:col-span-4 reveal">
        <p class="eyebrow">سؤالات متداول</p>
        <h2 class="mt-5 font-display font-bold tracking-tight text-3xl md:text-[2.4rem] leading-[1.1]">قبلاً پرسیده شده،<br/>اینجا پاسخ داده شده.</h2>
        <p class="mt-5 text-ink/60 leading-relaxed">چیز دیگری در ذهن دارید؟ <a href="contact.html" class="text-primary font-semibold hover:underline">مستقیم از ما بپرسید</a> — پاسخ در کمتر از چهار ساعت کاری.</p>
      </div>
      <div class="lg:col-span-8">${faqBlock(s.faqs)}</div>
    </div>
  </section>`;

  /* --- خدمات دیگر --- */
  $('#svc-others').innerHTML = `
  <section class="py-20 lg:py-24">
    <div class="container-x">
      <div class="max-w-2xl reveal mb-10">
        <p class="eyebrow">خدمات دیگر</p>
        <h2 class="mt-5 font-display font-bold tracking-tight text-3xl md:text-[2.4rem]">جای دیگری هم می‌توانیم کمک کنیم.</h2>
      </div>
      <div>${SERVICES.filter(x => x.slug !== s.slug).map(x => serviceRow(x, false)).join('')}
        <div class="border-t border-ink/10"></div>
      </div>
    </div>
  </section>`;

  initMotion();
});

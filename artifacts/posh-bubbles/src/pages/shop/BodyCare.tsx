/** Body Care category page. */
export default function BodyCare() {
  return (
    <main className="min-h-screen bg-pb-background">
      <div className="pb-page-banner">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">Body Care</h1>
          <div className="mt-4 mx-auto w-16 h-px bg-pb-champagne-gold/60" />
          <p className="mt-4 text-white/70 font-sans text-base">Placeholder — Body Care category page. Browse all body care products.</p>
          <nav aria-label="Body Care subcategories" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-3">
              <li><a href="/shop/body-care/body-wash" className="pb-subcat-link">Body Wash</a></li>
              <li><a href="/shop/body-care/body-lotion" className="pb-subcat-link">Body Lotion</a></li>
              <li><a href="/shop/body-care/body-butter" className="pb-subcat-link">Body Butter</a></li>
              <li><a href="/shop/body-care/body-scrub" className="pb-subcat-link">Body Scrub</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 text-center">
        <p className="font-serif text-xl text-pb-text-secondary italic">Products coming soon.</p>
      </div>
    </main>
  );
}

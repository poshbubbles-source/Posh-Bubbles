/** Body Scrub subcategory page (Body Care). */
export default function BodyScrub() {
  return (
    <main className="min-h-screen bg-pb-background">
      <div className="pb-page-banner">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">Body Scrub</h1>
          <div className="mt-4 mx-auto w-16 h-px bg-pb-champagne-gold/60" />
          <p className="mt-4 text-white/70 font-sans text-base">Placeholder — Body Scrub product listing goes here.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 text-center">
        <p className="font-serif text-xl text-pb-text-secondary italic mb-6">Products coming soon.</p>
        <a href="/shop/body-care" className="pb-back-link justify-center">← Back to Body Care</a>
      </div>
    </main>
  );
}

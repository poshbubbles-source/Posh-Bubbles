/**
 * HeroSection
 *
 * Full-width opening section. Placeholder content only.
 * Structure inspired by premium skincare brand hero layouts:
 *   - Prominent headline + supporting tagline
 *   - Primary call-to-action link
 *   - Hero imagery area
 */
export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-pb-background min-h-[75vh] sm:min-h-[85vh] flex items-center"
    >
      {/* Lotus background decoration — right side */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 w-72 sm:w-96 lg:w-[480px] opacity-[0.12] pointer-events-none select-none mix-blend-multiply"
      >
        <img src="/images/lotus.png" alt="" className="w-full h-auto" />
      </div>

      {/* Subtle left lotus — desktop only */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-10 w-40 lg:w-56 opacity-[0.07] pointer-events-none select-none mix-blend-multiply hidden lg:block"
      >
        <img src="/images/lotus.png" alt="" className="w-full h-auto scale-x-[-1] scale-y-[-1]" />
      </div>

      <article className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 w-full">

        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-pb-champagne-gold" />
          <span className="text-pb-champagne-gold text-xs font-semibold tracking-[0.25em] uppercase">
            Handcrafted Organic Luxury
          </span>
          <span className="h-px w-8 bg-pb-champagne-gold" />
        </div>

        {/* Headline block */}
        <header className="max-w-2xl">
          <h1
            id="hero-heading"
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-pb-text-primary leading-[1.1] tracking-tight"
          >
            Placeholder — Elevate Your Ritual
          </h1>

          {/* Gold accent line */}
          <div className="mt-5 mb-6 w-20 h-0.5 bg-gradient-to-r from-pb-champagne-gold to-pb-champagne-gold/30" />

          <p className="font-sans text-base sm:text-lg text-pb-text-secondary leading-relaxed max-w-lg">
            Placeholder tagline — a short, evocative sentence about the brand's
            promise and who it's for.
          </p>
        </header>

        {/* Primary CTA */}
        <nav aria-label="Hero call to action" className="mt-10 flex flex-wrap gap-4">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3 bg-pb-ruby text-white text-sm font-semibold tracking-widest uppercase rounded-full shadow-soft hover:bg-pb-burgundy transition-all duration-200 hover:shadow-lifted"
          >
            Shop Now
          </a>
          <a
            href="/featured"
            className="inline-flex items-center gap-2 px-7 py-3 border border-pb-ruby text-pb-ruby text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-pb-ruby/5 transition-all duration-200"
          >
            Explore Featured
          </a>
        </nav>

        {/* Hero image */}
        <figure className="mt-14 sm:mt-16 max-w-2xl">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-pb-background-secondary border border-pb-champagne-gold/15 flex items-center justify-center shadow-soft">
            <img
              src="/placeholders/hero.jpg"
              alt="Placeholder — brand hero lifestyle image"
              width={1280}
              height={720}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <figcaption className="mt-2 text-xs text-pb-text-secondary/60 font-sans text-center italic">
            Placeholder — lifestyle image showcasing the product collection
          </figcaption>
        </figure>

      </article>
    </section>
  );
}

/**
 * HeroSection
 *
 * Full-width opening section. Placeholder only — no styling or logic.
 * Structure inspired by premium skincare brand hero layouts:
 *   - Prominent headline + supporting tagline
 *   - Primary call-to-action link
 *   - Hero imagery area
 */
export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading">
      <article>
        {/* Headline block */}
        <header>
          <h1 id="hero-heading">
            Placeholder — Elevate Your Ritual
          </h1>
          <p>
            Placeholder tagline — a short, evocative sentence about the brand's
            promise and who it's for.
          </p>
        </header>

        {/* Primary CTA */}
        <nav aria-label="Hero call to action">
          <a href="/shop">Shop Now</a>
          <a href="/featured">Explore Featured</a>
        </nav>

        {/* Hero image */}
        <figure>
          <img
            src="/placeholders/hero.jpg"
            alt="Placeholder — brand hero lifestyle image"
            width={1280}
            height={720}
          />
          <figcaption>
            Placeholder — lifestyle image showcasing the product collection
          </figcaption>
        </figure>
      </article>
    </section>
  );
}

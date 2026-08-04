/** About page — brand story and values. */
export default function About() {
  return (
    <main className="min-h-screen bg-pb-background">
      <div className="pb-page-banner">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">
            About Us
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-pb-champagne-gold/60" />
          <p className="mt-4 text-white/70 font-sans text-base sm:text-lg">
            Placeholder — About page content goes here.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
        <p className="font-serif text-xl text-pb-text-secondary italic text-center">
          Our story coming soon.
        </p>
      </div>
    </main>
  );
}

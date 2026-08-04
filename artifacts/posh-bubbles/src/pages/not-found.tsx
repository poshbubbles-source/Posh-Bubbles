import { Link } from 'react-router-dom';

/** 404 Not Found page. */
export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-pb-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Logo decoration */}
        <div
          aria-hidden="true"
          className="mx-auto mb-6 w-20 h-20 opacity-10 mix-blend-multiply"
        >
          <img src="/images/logo.png" alt="" className="w-full h-auto" />
        </div>

        <p className="font-serif text-8xl font-light text-pb-ruby/20 leading-none select-none">
          404
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-light text-pb-text-primary">
          Page Not Found
        </h1>
        <div className="mt-4 mx-auto w-12 h-px bg-pb-champagne-gold/50" />
        <p className="mt-4 font-sans text-pb-text-secondary">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-pb-ruby text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-pb-burgundy transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

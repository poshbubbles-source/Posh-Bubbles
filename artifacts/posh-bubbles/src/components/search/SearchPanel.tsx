/**
 * SearchPanel
 *
 * Reusable search UI for product discovery.
 * Filters: product name, ingredients, category, skin type, hair type.
 *
 * Static UI only — no API, JSON, or external state connections.
 * Internal UI state (selections, expand/collapse) is local to this component.
 * All colours are Posh Bubbles design-system tokens.
 */

import { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Leaf,
} from 'lucide-react';

// ─── Static option lists ──────────────────────────────────────────────────────

const CATEGORIES = [
  'All Categories',
  'Skin Care',
  'Lip Care',
  'Hair Care',
  'Body Care',
  'Sunscreen',
  'Hand Soap',
  'Pet Care',
] as const;

const SKIN_TYPES = [
  'Normal',
  'Dry',
  'Oily',
  'Combination',
  'Sensitive',
  'Acne-Prone',
] as const;

const HAIR_TYPES = [
  'Straight',
  'Wavy',
  'Curly',
  'Coily',
  'Fine',
  'Thick',
  'Color-Treated',
  'Damaged',
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Toggleable pill chip used for skin/hair type multi-select. */
function FilterChip({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      onClick={onToggle}
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'font-sans text-[0.75rem] font-medium tracking-wide',
        'border transition-all duration-150',
        active
          ? 'bg-pb-ruby border-pb-ruby text-white shadow-sm'
          : 'bg-transparent border-pb-champagne-gold/40 text-pb-text-secondary hover:border-pb-ruby/60 hover:text-pb-ruby',
      ].join(' ')}
    >
      {active && <X size={10} aria-hidden="true" />}
      {label}
    </button>
  );
}

/** Collapsible filter group with a gold-rule heading. */
function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full group"
        aria-expanded={open}
      >
        <span className="font-serif text-sm font-semibold text-pb-text-primary tracking-wide uppercase">
          {title}
        </span>
        {open ? (
          <ChevronUp size={14} className="text-pb-champagne-gold" aria-hidden="true" />
        ) : (
          <ChevronDown size={14} className="text-pb-champagne-gold" aria-hidden="true" />
        )}
      </button>
      <div className="w-full h-px bg-pb-champagne-gold/25" aria-hidden="true" />
      {open && <div>{children}</div>}
    </div>
  );
}

// ─── Active filter badge ──────────────────────────────────────────────────────

function ActiveFilterBadge({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-pb-ruby/10 border border-pb-ruby/25 text-pb-ruby font-sans text-[0.6875rem] font-medium">
      {label}
      <button
        type="button"
        aria-label={`Remove filter: ${label}`}
        onClick={onRemove}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-pb-ruby/20 transition-colors"
      >
        <X size={9} aria-hidden="true" />
      </button>
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface SearchPanelProps {
  /** Extra class names to apply to the root element */
  className?: string;
  /**
   * Called when the user submits a search.
   * Receives the current query snapshot — wire up when integrating data.
   */
  onSearch?: (query: {
    name: string;
    ingredients: string;
    category: string;
    skinTypes: string[];
    hairTypes: string[];
  }) => void;
}

export default function SearchPanel({ className = '', onSearch }: SearchPanelProps) {
  // ── UI state ──────────────────────────────────────────────────────────────
  const [filtersOpen,    setFiltersOpen]    = useState(false);
  const [name,           setName]           = useState('');
  const [ingredients,    setIngredients]    = useState('');
  const [category,       setCategory]       = useState('All Categories');
  const [skinTypes,      setSkinTypes]      = useState<string[]>([]);
  const [hairTypes,      setHairTypes]      = useState<string[]>([]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function toggleSkinType(t: string) {
    setSkinTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  function toggleHairType(t: string) {
    setHairTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  function clearAll() {
    setName('');
    setIngredients('');
    setCategory('All Categories');
    setSkinTypes([]);
    setHairTypes([]);
  }

  // Active filters summary for the badge row
  const activeFilters: Array<{ label: string; clear: () => void }> = [
    ...(name        ? [{ label: `"${name}"`,           clear: () => setName('')                              }] : []),
    ...(ingredients ? [{ label: `Ingredient: ${ingredients}`, clear: () => setIngredients('')               }] : []),
    ...(category !== 'All Categories' ? [{ label: category, clear: () => setCategory('All Categories')      }] : []),
    ...skinTypes.map((t) => ({ label: `Skin: ${t}`, clear: () => toggleSkinType(t)  })),
    ...hairTypes.map((t) => ({ label: `Hair: ${t}`, clear: () => toggleHairType(t)  })),
  ];

  const hasFilters = activeFilters.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.({ name, ingredients, category, skinTypes, hairTypes });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      aria-label="Product search"
      className={['w-full', className].join(' ').trim()}
    >
      <form onSubmit={handleSubmit} noValidate>

        {/* ── Primary search bar ─────────────────────────────────────────── */}
        <div className="flex items-center gap-2">

          {/* Text input */}
          <div className="relative flex-1">
            <label htmlFor="search-name" className="sr-only">Search by product name</label>
            <Search
              size={16}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-pb-text-secondary/50 pointer-events-none"
            />
            <input
              id="search-name"
              type="search"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search products…"
              autoComplete="off"
              className={[
                'w-full h-11 pl-10 pr-10 rounded-full',
                'bg-pb-card border border-pb-champagne-gold/25',
                'font-sans text-sm text-pb-text-primary placeholder:text-pb-text-secondary/40',
                'focus:outline-none focus:ring-2 focus:ring-pb-ruby/30 focus:border-pb-ruby/50',
                'transition-all duration-200',
              ].join(' ')}
            />
            {name && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setName('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-pb-text-secondary/50 hover:text-pb-ruby transition-colors"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Filters toggle */}
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="search-filters-panel"
            onClick={() => setFiltersOpen((v) => !v)}
            className={[
              'h-11 px-4 rounded-full flex items-center gap-2 shrink-0',
              'font-sans text-xs font-semibold tracking-widest uppercase',
              'border transition-all duration-200',
              filtersOpen
                ? 'bg-pb-ruby border-pb-ruby text-white'
                : 'bg-pb-card border-pb-champagne-gold/30 text-pb-text-secondary hover:border-pb-ruby/50 hover:text-pb-ruby',
            ].join(' ')}
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            <span>Filters</span>
            {hasFilters && (
              <span
                aria-label={`${activeFilters.length} active filters`}
                className="w-4 h-4 rounded-full bg-pb-champagne-gold text-pb-burgundy text-[0.5625rem] font-bold flex items-center justify-center leading-none"
              >
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Search submit */}
          <button
            type="submit"
            aria-label="Search"
            className={[
              'h-11 px-5 rounded-full shrink-0',
              'bg-pb-ruby text-white',
              'font-sans text-xs font-semibold tracking-widest uppercase',
              'hover:bg-pb-burgundy transition-colors duration-200',
            ].join(' ')}
          >
            Search
          </button>

        </div>

        {/* ── Active filter badges ───────────────────────────────────────── */}
        {hasFilters && (
          <div
            role="status"
            aria-live="polite"
            aria-label="Active filters"
            className="flex flex-wrap items-center gap-2 mt-3"
          >
            <span className="font-sans text-[0.6875rem] text-pb-text-secondary/60 mr-1">
              Active:
            </span>
            {activeFilters.map((f) => (
              <ActiveFilterBadge key={f.label} label={f.label} onRemove={f.clear} />
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="font-sans text-[0.6875rem] text-pb-ruby/70 hover:text-pb-ruby underline underline-offset-2 transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ── Expanded filters panel ─────────────────────────────────────── */}
        {filtersOpen && (
          <div
            id="search-filters-panel"
            className={[
              'mt-4 p-5 sm:p-6 rounded-2xl',
              'bg-pb-card border border-pb-champagne-gold/15',
              'shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
              'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6',
            ].join(' ')}
          >

            {/* Category */}
            <FilterGroup title="Category">
              <div className="relative">
                <label htmlFor="search-category" className="sr-only">Category</label>
                <select
                  id="search-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={[
                    'w-full h-9 pl-3 pr-8 rounded-lg appearance-none',
                    'bg-pb-background border border-pb-champagne-gold/25',
                    'font-sans text-sm text-pb-text-primary',
                    'focus:outline-none focus:ring-2 focus:ring-pb-ruby/30 focus:border-pb-ruby/50',
                    'transition-all duration-200 cursor-pointer',
                  ].join(' ')}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  aria-hidden="true"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pb-champagne-gold pointer-events-none"
                />
              </div>
            </FilterGroup>

            {/* Ingredients */}
            <FilterGroup title="Ingredient">
              <div className="relative">
                <label htmlFor="search-ingredients" className="sr-only">Search by ingredient</label>
                <Leaf
                  size={13}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-pb-champagne-gold/60 pointer-events-none"
                />
                <input
                  id="search-ingredients"
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g. Shea Butter, Argan Oil…"
                  className={[
                    'w-full h-9 pl-8 pr-3 rounded-lg',
                    'bg-pb-background border border-pb-champagne-gold/25',
                    'font-sans text-sm text-pb-text-primary placeholder:text-pb-text-secondary/40',
                    'focus:outline-none focus:ring-2 focus:ring-pb-ruby/30 focus:border-pb-ruby/50',
                    'transition-all duration-200',
                  ].join(' ')}
                />
              </div>
            </FilterGroup>

            {/* Skin type */}
            <FilterGroup title="Skin Type">
              <fieldset className="flex flex-wrap gap-2">
                <legend className="sr-only">Select skin types</legend>
                {SKIN_TYPES.map((t) => (
                  <FilterChip
                    key={t}
                    label={t}
                    active={skinTypes.includes(t)}
                    onToggle={() => toggleSkinType(t)}
                  />
                ))}
              </fieldset>
            </FilterGroup>

            {/* Hair type */}
            <FilterGroup title="Hair Type">
              <fieldset className="flex flex-wrap gap-2">
                <legend className="sr-only">Select hair types</legend>
                {HAIR_TYPES.map((t) => (
                  <FilterChip
                    key={t}
                    label={t}
                    active={hairTypes.includes(t)}
                    onToggle={() => toggleHairType(t)}
                  />
                ))}
              </fieldset>
            </FilterGroup>

          </div>
        )}

      </form>
    </section>
  );
}

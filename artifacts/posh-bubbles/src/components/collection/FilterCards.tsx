/**
 * FilterCards
 *
 * Responsive filter sidebar / panel for product collection pages.
 * Filters: Category, Price, Popularity, Skin Type, Hair Type.
 *
 * Aesthetic: Native-inspired clean minimalism using Posh Bubbles brand tokens.
 * Each filter is a self-contained collapsible card.
 *
 * Static UI only — all selection state is local to this component.
 * Wire `onFilterChange` when integrating with data.
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Option lists ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  'All',
  'Skin Care',
  'Lip Care',
  'Hair Care',
  'Body Care',
  'Sunscreen',
  'Soaps & Bars',
  'Eye Care',
  'Foot Care',
  'Pet Care',
] as const;

const PRICES = [
  { label: 'Under $15',  value: 'under-15'  },
  { label: '$15 – $30',  value: '15-30'     },
  { label: '$30 – $50',  value: '30-50'     },
  { label: 'Over $50',   value: 'over-50'   },
] as const;

const POPULARITIES = [
  { label: 'Best Sellers', value: 'best-sellers' },
  { label: 'New Arrivals', value: 'new-arrivals' },
  { label: 'Top Rated',    value: 'top-rated'    },
  { label: 'On Sale',      value: 'on-sale'      },
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

// ─── Shared chip styles ───────────────────────────────────────────────────────

/** Single-select radio chip */
function RadioChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-sm',
        'font-sans text-[0.7rem] font-medium tracking-[0.08em] uppercase',
        'border transition-all duration-150 whitespace-nowrap',
        active
          ? 'bg-pb-ruby border-pb-ruby text-white'
          : 'bg-transparent border-pb-champagne-gold/30 text-pb-text-secondary hover:border-pb-ruby/50 hover:text-pb-ruby',
      )}
    >
      {label}
    </button>
  );
}

/** Multi-select toggle chip */
function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1.5 rounded-sm',
        'font-sans text-[0.7rem] font-medium tracking-[0.08em] uppercase',
        'border transition-all duration-150 whitespace-nowrap',
        active
          ? 'bg-pb-ruby border-pb-ruby text-white'
          : 'bg-transparent border-pb-champagne-gold/30 text-pb-text-secondary hover:border-pb-ruby/50 hover:text-pb-ruby',
      )}
    >
      {active && <X size={9} aria-hidden="true" className="shrink-0" />}
      {label}
    </button>
  );
}

// ─── Filter card shell ────────────────────────────────────────────────────────

function FilterCard({
  title,
  activeCount,
  children,
  defaultOpen = true,
}: {
  title: string;
  activeCount?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'bg-pb-card border border-pb-champagne-gold/18',
        'rounded-none',                          // Native uses square corners
        'overflow-hidden',
        'transition-shadow duration-200',
      )}
    >
      {/* Header */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center justify-between',
          'px-4 py-3.5',
          'group',
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-pb-text-primary">
            {title}
          </span>
          {activeCount != null && activeCount > 0 && (
            <span
              aria-label={`${activeCount} selected`}
              className="h-4 min-w-4 px-1 rounded-full bg-pb-ruby text-white font-sans text-[0.5rem] font-bold flex items-center justify-center leading-none"
            >
              {activeCount}
            </span>
          )}
        </div>
        {open
          ? <ChevronUp  size={13} className="text-pb-champagne-gold shrink-0" aria-hidden="true" />
          : <ChevronDown size={13} className="text-pb-champagne-gold shrink-0" aria-hidden="true" />
        }
      </button>

      {/* Gold rule */}
      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/18 mx-4" />

      {/* Body */}
      {open && (
        <div className="px-4 py-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Filter state ─────────────────────────────────────────────────────────────

export interface FilterState {
  category:   string;
  price:      string;
  popularity: string;
  skinTypes:  string[];
  hairTypes:  string[];
}

export interface FilterCardsProps {
  /** Extra class names on the root wrapper */
  className?: string;
  /**
   * Called whenever any filter changes.
   * Wire up when integrating with product data.
   */
  onFilterChange?: (filters: FilterState) => void;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FilterCards({ className, onFilterChange }: FilterCardsProps) {
  const [category,   setCategory]   = useState('All');
  const [price,      setPrice]      = useState('');
  const [popularity, setPopularity] = useState('');
  const [skinTypes,  setSkinTypes]  = useState<string[]>([]);
  const [hairTypes,  setHairTypes]  = useState<string[]>([]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function notify(patch: Partial<FilterState>) {
    onFilterChange?.({
      category,
      price,
      popularity,
      skinTypes,
      hairTypes,
      ...patch,
    });
  }

  function pick<K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
    setter: (v: FilterState[K]) => void,
  ) {
    setter(value);
    notify({ [key]: value });
  }

  function toggleMulti(
    key: 'skinTypes' | 'hairTypes',
    value: string,
    current: string[],
    setter: (v: string[]) => void,
  ) {
    const next = current.includes(value)
      ? current.filter((x) => x !== value)
      : [...current, value];
    setter(next);
    notify({ [key]: next });
  }

  // Total active filter count (for the header summary badge)
  const totalActive =
    (category !== 'All' ? 1 : 0) +
    (price      ? 1 : 0) +
    (popularity ? 1 : 0) +
    skinTypes.length +
    hairTypes.length;

  function clearAll() {
    setCategory('All');
    setPrice('');
    setPopularity('');
    setSkinTypes([]);
    setHairTypes([]);
    onFilterChange?.({
      category: 'All',
      price: '',
      popularity: '',
      skinTypes: [],
      hairTypes: [],
    });
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <aside
      aria-label="Product filters"
      className={cn('flex flex-col gap-0', className)}
    >

      {/* ── Panel header ────────────────────────────────────────────────── */}
      <div
        className={cn(
          'flex items-center justify-between',
          'px-4 py-3 mb-3',
          'border border-pb-champagne-gold/18 bg-pb-card',
        )}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={13} className="text-pb-champagne-gold" aria-hidden="true" />
          <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-pb-text-primary">
            Filters
          </span>
          {totalActive > 0 && (
            <span
              aria-label={`${totalActive} active filters`}
              className="h-4 min-w-4 px-1 rounded-full bg-pb-ruby text-white font-sans text-[0.5rem] font-bold flex items-center justify-center leading-none"
            >
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="font-sans text-[0.6375rem] tracking-[0.08em] uppercase text-pb-text-secondary/60 hover:text-pb-ruby transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Category ────────────────────────────────────────────────────── */}
      <FilterCard
        title="Category"
        activeCount={category !== 'All' ? 1 : 0}
        defaultOpen
      >
        <fieldset>
          <legend className="sr-only">Category</legend>
          <div className="flex flex-wrap gap-1.5" role="radiogroup">
            {CATEGORIES.map((c) => (
              <RadioChip
                key={c}
                label={c}
                active={category === c}
                onClick={() => pick('category', c, setCategory)}
              />
            ))}
          </div>
        </fieldset>
      </FilterCard>

      {/* thin gap line between cards */}
      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/10" />

      {/* ── Price ───────────────────────────────────────────────────────── */}
      <FilterCard
        title="Price"
        activeCount={price ? 1 : 0}
        defaultOpen
      >
        <fieldset>
          <legend className="sr-only">Price range</legend>
          <div className="flex flex-wrap gap-1.5" role="radiogroup">
            {PRICES.map((p) => (
              <RadioChip
                key={p.value}
                label={p.label}
                active={price === p.value}
                onClick={() =>
                  pick('price', price === p.value ? '' : p.value, setPrice)
                }
              />
            ))}
          </div>
        </fieldset>
      </FilterCard>

      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/10" />

      {/* ── Popularity ──────────────────────────────────────────────────── */}
      <FilterCard
        title="Popularity"
        activeCount={popularity ? 1 : 0}
        defaultOpen
      >
        <fieldset>
          <legend className="sr-only">Popularity</legend>
          <div className="flex flex-wrap gap-1.5" role="radiogroup">
            {POPULARITIES.map((p) => (
              <RadioChip
                key={p.value}
                label={p.label}
                active={popularity === p.value}
                onClick={() =>
                  pick(
                    'popularity',
                    popularity === p.value ? '' : p.value,
                    setPopularity,
                  )
                }
              />
            ))}
          </div>
        </fieldset>
      </FilterCard>

      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/10" />

      {/* ── Skin Type ───────────────────────────────────────────────────── */}
      <FilterCard
        title="Skin Type"
        activeCount={skinTypes.length}
        defaultOpen
      >
        <fieldset>
          <legend className="sr-only">Skin type (select all that apply)</legend>
          <div className="flex flex-wrap gap-1.5">
            {SKIN_TYPES.map((t) => (
              <ToggleChip
                key={t}
                label={t}
                active={skinTypes.includes(t)}
                onClick={() =>
                  toggleMulti('skinTypes', t, skinTypes, setSkinTypes)
                }
              />
            ))}
          </div>
        </fieldset>
      </FilterCard>

      <div aria-hidden="true" className="h-px bg-pb-champagne-gold/10" />

      {/* ── Hair Type ───────────────────────────────────────────────────── */}
      <FilterCard
        title="Hair Type"
        activeCount={hairTypes.length}
        defaultOpen={false}
      >
        <fieldset>
          <legend className="sr-only">Hair type (select all that apply)</legend>
          <div className="flex flex-wrap gap-1.5">
            {HAIR_TYPES.map((t) => (
              <ToggleChip
                key={t}
                label={t}
                active={hairTypes.includes(t)}
                onClick={() =>
                  toggleMulti('hairTypes', t, hairTypes, setHairTypes)
                }
              />
            ))}
          </div>
        </fieldset>
      </FilterCard>

    </aside>
  );
}

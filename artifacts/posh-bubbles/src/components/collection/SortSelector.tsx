/**
 * SortSelector
 *
 * Accessible custom dropdown for choosing product sort order.
 * Options: Featured · New Arrivals · Best Sellers · Price Low→High · Price High→Low
 *
 * Style: Native-inspired — square corners, uppercase micro-labels, Posh Bubbles tokens.
 * Closes on outside click, Escape, or option selection.
 *
 * UI only — wire `value` + `onChange` from a parent to drive sort logic.
 * Pair with `sortProducts()` from `@/utils/sort`.
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SORT_OPTIONS, DEFAULT_SORT } from '@/utils/sort';
import type { SortValue } from '@/utils/sort';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SortSelectorProps {
  /** Currently active sort; defaults to 'featured' when omitted (uncontrolled) */
  value?: SortValue;
  /** Called when the user picks a new sort option */
  onChange?: (sort: SortValue) => void;
  /** Extra class names on the root element */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SortSelector({
  value: controlledValue,
  onChange,
  className,
}: SortSelectorProps) {
  // Support both controlled and uncontrolled usage
  const [internalValue, setInternalValue] = useState<SortValue>(DEFAULT_SORT);
  const value = controlledValue ?? internalValue;

  const [open, setOpen]     = useState(false);
  const rootRef             = useRef<HTMLDivElement>(null);
  const listRef             = useRef<HTMLUListElement>(null);
  const triggerRef          = useRef<HTMLButtonElement>(null);

  const activeLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? 'Sort';

  // ── Close on outside click / Escape ─────────────────────────────────────────
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  // Focus first item when list opens
  useEffect(() => {
    if (open) {
      const first = listRef.current?.querySelector<HTMLButtonElement>('[role="option"]');
      first?.focus();
    }
  }, [open]);

  // ── Selection ─────────────────────────────────────────────────────────────
  function select(v: SortValue) {
    setInternalValue(v);
    onChange?.(v);
    setOpen(false);
    triggerRef.current?.focus();
  }

  // ── Keyboard nav inside list ──────────────────────────────────────────────
  function handleListKey(e: React.KeyboardEvent<HTMLUListElement>) {
    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [],
    );
    const idx = items.indexOf(document.activeElement as HTMLButtonElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={rootRef}
      className={cn('relative inline-flex items-center gap-3', className)}
    >
      {/* Label */}
      <span
        className="font-sans text-[0.6375rem] font-semibold tracking-[0.12em] uppercase text-pb-text-secondary/60 shrink-0 select-none"
        id="sort-label"
      >
        Sort by
      </span>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="sort-label"
        aria-label={`Sort by: ${activeLabel}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-2.5 h-9 pl-3.5 pr-3 min-w-[10.5rem]',
          'border bg-pb-card',
          'font-sans text-[0.7rem] font-semibold tracking-[0.08em] uppercase',
          'transition-all duration-150',
          open
            ? 'border-pb-ruby text-pb-ruby'
            : 'border-pb-champagne-gold/30 text-pb-text-primary hover:border-pb-ruby/50 hover:text-pb-ruby',
        )}
      >
        <span className="flex-1 text-left truncate">{activeLabel}</span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          className={cn(
            'shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby="sort-label"
          aria-activedescendant={`sort-option-${value}`}
          onKeyDown={handleListKey}
          className={cn(
            'absolute top-full left-auto right-0 z-50 mt-1 min-w-[10.5rem]',
            'bg-pb-card border border-pb-champagne-gold/25',
            'shadow-[0_8px_24px_rgba(0,0,0,0.10)]',
            'py-1',
            'focus:outline-none',
          )}
        >
          {SORT_OPTIONS.map((opt) => {
            const isActive = opt.value === value;
            return (
              <li key={opt.value} role="none">
                <button
                  id={`sort-option-${opt.value}`}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => select(opt.value)}
                  className={cn(
                    'w-full flex items-center justify-between gap-3',
                    'px-4 py-2.5',
                    'font-sans text-[0.7rem] font-medium tracking-[0.08em] uppercase',
                    'transition-colors duration-100 focus:outline-none',
                    isActive
                      ? 'bg-pb-ruby/8 text-pb-ruby'
                      : 'text-pb-text-secondary hover:bg-pb-background hover:text-pb-ruby focus:bg-pb-background focus:text-pb-ruby',
                  )}
                >
                  {opt.label}
                  {isActive && (
                    <Check size={11} aria-hidden="true" className="shrink-0 text-pb-ruby" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/**
 * PbAccordion — reusable Posh Bubbles accordion component.
 *
 * Wraps @radix-ui/react-accordion with PB design tokens:
 * champagne-gold borders, ruby hover/active trigger, serif questions,
 * and smooth height animation via tw-animate-css keyframes.
 *
 * Usage:
 *   <PbAccordion items={[{ id, question, answer }]} />
 *
 * Or with categories:
 *   <PbAccordionGroup sections={[{ heading, items }]} />
 */

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionSection {
  heading: string;
  items: AccordionItem[];
}

// ─── Single accordion list ────────────────────────────────────────────────────

interface PbAccordionProps {
  items: AccordionItem[];
  /** Default open item id. Pass undefined for all collapsed. */
  defaultValue?: string;
  className?: string;
}

export function PbAccordion({ items, defaultValue, className }: PbAccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={cn('w-full', className)}
    >
      {items.map((item, idx) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className={cn(
            'group border-b border-pb-champagne-gold/20',
            idx === 0 && 'border-t',
          )}
        >
          {/* Trigger */}
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                'flex flex-1 items-center justify-between gap-6',
                'py-5 sm:py-6 text-left',
                'font-serif text-base sm:text-lg font-semibold leading-snug',
                'text-pb-text-primary',
                'hover:text-pb-ruby',
                'data-[state=open]:text-pb-ruby',
                'transition-colors duration-200',
                'group/trigger',
                '[&[data-state=open]>span>svg]:rotate-180',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-ruby/30 focus-visible:ring-offset-2',
              )}
            >
              <span>{item.question}</span>

              {/* Chevron wrapper */}
              <span
                aria-hidden="true"
                className={cn(
                  'flex shrink-0 items-center justify-center',
                  'w-7 h-7 rounded-full',
                  'border border-pb-champagne-gold/30',
                  'bg-pb-background',
                  'group-data-[state=open]:border-pb-ruby/30 group-data-[state=open]:bg-pb-ruby/5',
                  'transition-all duration-300',
                )}
              >
                <ChevronDown
                  size={14}
                  className="text-pb-champagne-gold group-data-[state=open]:text-pb-ruby transition-all duration-300"
                  strokeWidth={2.5}
                />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          {/* Content — height animated by tw-animate-css keyframes */}
          <AccordionPrimitive.Content
            className={cn(
              'overflow-hidden',
              'data-[state=open]:animate-accordion-down',
              'data-[state=closed]:animate-accordion-up',
            )}
          >
            <div className="pb-6 pr-12">
              <p className="font-sans text-[0.875rem] sm:text-[0.9375rem] text-pb-text-secondary leading-relaxed">
                {item.answer}
              </p>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

// ─── Grouped accordion with section headings ─────────────────────────────────

interface PbAccordionGroupProps {
  sections: AccordionSection[];
  className?: string;
}

export function PbAccordionGroup({ sections, className }: PbAccordionGroupProps) {
  return (
    <div className={cn('flex flex-col gap-14', className)}>
      {sections.map((section) => (
        <section key={section.heading} aria-labelledby={`faq-${section.heading}`}>
          {/* Section heading */}
          <div className="flex items-center gap-4 mb-6">
            <h2
              id={`faq-${section.heading}`}
              className="font-sans text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-pb-champagne-gold whitespace-nowrap"
            >
              {section.heading}
            </h2>
            <div
              aria-hidden="true"
              className="flex-1 h-px bg-gradient-to-r from-pb-champagne-gold/40 to-transparent"
            />
          </div>

          <PbAccordion items={section.items} />
        </section>
      ))}
    </div>
  );
}

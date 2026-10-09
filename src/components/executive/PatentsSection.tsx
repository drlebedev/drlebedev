import React from 'react';
import { PatentItem } from '../../types/content';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export interface PatentsSectionProps {
  patents: PatentItem[];
}

export const PatentsSection: React.FC<PatentsSectionProps> = ({ patents }) => {
  return (
    <section
      id="patents"
      className="relative w-full py-20 bg-forest-noir border-b border-gold-prestige/20"
    >
      {/* Corner Geometric Hatch Accent */}
      <div
        className="absolute -top-16 -left-16 w-64 h-64 triangle-hatch-gold opacity-15 pointer-events-none"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase">
              CHAPTER IV • INTELLECTUAL PROPERTY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface mt-2 font-normal">
              Issued US Patents Portfolio
            </h2>
            <p className="font-sans text-on-surface-variant text-base mt-2 max-w-2xl">
              Legally assigned algorithmic patents defending multi-party causal attribution, on-device experimentation, and stateful streaming graphs.
            </p>
            <div className="h-0.5 w-16 bg-gold-prestige/60 my-4"></div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-accent bg-[#0c1f3d] px-4 py-2 rounded border border-emerald-accent/30 shadow-sm shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-accent" />
            <span>UNITED STATES PATENT &amp; TRADEMARK OFFICE (USPTO)</span>
          </div>
        </div>

        {/* Patent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {patents.map((patent) => (
            <div
              key={patent.patentNumber}
              className="relative bg-[#0d1a30] border border-gold-prestige/40 hover:border-gold-prestige rounded-lg p-7 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Corner Decorative Triangular Hatch */}
              <div
                className="absolute top-0 right-0 w-20 h-20 triangle-hatch-gold opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                aria-hidden="true"
              ></div>

              <div className="space-y-4">
                {/* Patent Number & Status */}
                <div className="flex items-center justify-between border-b border-gold-prestige/15 pb-3">
                  <span className="font-mono text-sm text-gold-light font-semibold group-hover:text-white transition-colors">
                    {patent.patentNumber}
                  </span>
                  <span className="px-2 py-0.5 bg-black/50 text-emerald-accent font-mono text-[11px] rounded border border-emerald-accent/30 group-hover:border-emerald-accent transition-colors">
                    GRANTED {patent.grantDate.split('-')[0]}
                  </span>
                </div>

                {/* Patent Title */}
                <h3 className="font-serif text-2xl text-on-surface font-semibold leading-snug group-hover:text-gold-light transition-colors">
                  {patent.title}
                </h3>

                {/* Patent Abstract */}
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {patent.abstract}
                </p>
              </div>

              {/* USPTO Link */}
              <div className="mt-6 pt-4 border-t border-gold-prestige/15 flex items-center justify-between font-mono text-xs">
                <span className="text-on-surface-variant text-[11px]">PRIMARY INVENTOR</span>
                <a
                  href={patent.usptoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-light hover:underline flex items-center gap-1.5 font-medium group/link"
                >
                  <span>View USPTO Record</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

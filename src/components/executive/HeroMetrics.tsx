import React from 'react';
import { MetricSummaryItem } from '../../types/content';

export interface HeroMetricsProps {
  metrics?: MetricSummaryItem[];
}

export const HeroMetrics: React.FC<HeroMetricsProps> = ({ metrics }) => {
  // Fallback defaults if metrics prop is omitted
  const items: MetricSummaryItem[] = metrics && metrics.length > 0 ? metrics : [
    {
      value: '$1B+',
      label: 'Brand Advertising Business Line Bootstrap',
      subtext: '~20% of total LinkedIn ad revenue from 0 to 1',
    },
    {
      value: '$100M+ ARR',
      label: 'AI Ads Solution Acceleration',
      subtext: '6x revenue growth achieved in six months (LinkedIn Accelerate)',
    },
    {
      value: '40–70+',
      label: 'Scientific & Engineering Organization',
      subtext: 'Full-stack scope across Audience, Identity, Incrementality & Measurement',
    },
    {
      value: '25%',
      label: 'Total Ad Revenue Covered by Incremental Measurement',
      subtext: 'Validated 2x incremental spend lift for enterprise adopters',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-gold-prestige/20">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col group p-4 rounded bg-[#0d1a30]/60 border border-gold-prestige/15 hover:border-gold-prestige/40 hover:bg-[#0d1a30] transition-all duration-300 ${
              idx > 0 ? 'sm:border-l sm:border-gold-prestige/20' : ''
            }`}
          >
            <span
              className={`font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-none ${
                idx === 0
                  ? 'text-emerald-accent'
                  : idx === 1
                  ? 'text-gold-light'
                  : idx === 2
                  ? 'text-on-surface'
                  : 'text-emerald-accent'
              }`}
            >
              {item.value}
            </span>
            <span className="font-sans text-xs font-medium text-on-surface mt-2 group-hover:text-gold-light transition-colors">
              {item.label}
            </span>
            {item.subtext && (
              <span className="font-sans text-[11px] text-on-surface-variant/80 mt-1 leading-normal">
                {item.subtext}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

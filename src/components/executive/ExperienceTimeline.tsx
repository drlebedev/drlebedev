import React, { useState } from 'react';
import { ExperienceItem } from '../../types/content';
import { ChevronDown, ChevronUp, MapPin, Users, TrendingUp } from 'lucide-react';

export interface ExperienceTimelineProps {
  experience: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  // Set first role (current role) expanded by default
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    'linkedin-director': true,
  });

  const toggleRole = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="relative w-full py-20 bg-forest-deep border-b border-gold-prestige/20">
      {/* Anchor alias for backwards compatibility */}
      <span id="trajectory" className="sr-only" aria-hidden="true" />

      {/* Background Watermark Pattern */}
      <div
        className="absolute left-0 bottom-10 w-96 h-96 triangle-hatch-gold opacity-10 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' }}
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase">
              CHAPTER III • LEADERSHIP &amp; CAREER EXPERIENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface mt-2 font-normal">
              Leadership Experience &amp; Track Record
            </h2>
            <div className="h-0.5 w-16 bg-gold-prestige/60 my-4"></div>
          </div>
          <div className="font-mono text-xs text-on-surface-variant bg-[#0b162c] px-4 py-2 rounded border border-gold-prestige/20">
            15+ YEARS OF ENGINEERING &amp; SCIENTIFIC LEADERSHIP
          </div>
        </div>

        {/* Timeline Entries */}
        <div className="relative border-l-2 border-gold-prestige/30 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {experience.map((item) => {
            const isExpanded = !!expandedRoles[item.id];

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Pin */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 bg-[#050b14] border-2 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform ${
                    item.isCurrent
                      ? 'border-emerald-accent'
                      : 'border-gold-prestige'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.isCurrent
                        ? 'bg-emerald-accent animate-pulse'
                        : 'bg-gold-light'
                    }`}
                  ></span>
                </div>

                {/* Role Card */}
                <div className="bg-[#0d1a30] border border-gold-prestige/35 hover:border-gold-prestige/70 rounded-lg p-6 sm:p-8 shadow-xl transition-all duration-300">
                  {/* Role Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gold-prestige/15 pb-4 mb-4">
                    <div>
                      {item.isCurrent && (
                        <span className="font-mono text-xs text-emerald-accent uppercase tracking-widest font-semibold flex items-center gap-2 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse"></span>
                          <span>CURRENT EXECUTIVE APPOINTMENT</span>
                        </span>
                      )}
                      <h3 className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                        {item.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-gold-light font-serif text-lg italic mt-0.5">
                        <span>{item.company}</span>
                        {item.location && (
                          <span className="flex items-center gap-1 font-sans text-xs text-on-surface-variant font-normal not-italic ml-2">
                            <MapPin className="w-3.5 h-3.5 text-gold-prestige/80" />
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-mono text-sm text-gold-prestige font-medium block">
                        {item.startDate} — {item.endDate || (item.isCurrent ? 'Present' : '')}
                      </span>
                      {item.period && (
                        <span className="font-sans text-xs text-on-surface-variant">
                          {item.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Org Scope Banner */}
                  {item.orgScope && (
                    <div className="flex items-center gap-2 mb-5 font-mono text-xs text-emerald-accent/90 bg-[#0a182e] px-3.5 py-1.5 rounded border border-emerald-accent/25">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.orgScope}</span>
                    </div>
                  )}

                  {/* High-Impact Metrics Grid */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                      {item.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 bg-black/40 rounded border border-gold-prestige/20 hover:border-gold-prestige/50 transition-colors flex items-start gap-2.5"
                        >
                          <TrendingUp className="w-4 h-4 text-emerald-accent shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-on-surface leading-snug">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights (Expandable) */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleRole(item.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-gold-light hover:text-white transition-colors"
                        >
                          <span>
                            {isExpanded ? 'Hide Achievements' : 'View Key Achievements'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {isExpanded && (
                        <ul className="mt-3.5 space-y-2.5 font-sans text-sm text-on-surface-variant leading-relaxed pl-5 list-disc marker:text-gold-prestige/80">
                          {item.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="pl-1">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Technologies / Competencies Tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-gold-prestige/15">
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 bg-black/40 rounded border border-white/10 text-[11px] font-mono text-on-surface hover:border-gold-prestige/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

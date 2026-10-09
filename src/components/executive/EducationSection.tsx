import React from 'react';
import { EducationItem } from '../../types/content';
import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';

export interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section
      id="pedigree"
      className="reveal-on-scroll relative w-full py-20 bg-forest-deep border-b border-gold-prestige/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase">
            CHAPTER V • ACADEMIC FOUNDATION &amp; DOCTORAL PEDIGREE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface mt-2 font-normal">
            Doctoral Rigor &amp; Systems Foundations
          </h2>
          <div className="h-0.5 w-16 bg-gold-prestige/60 my-4"></div>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {education.map((item) => (
            <div
              key={item.id}
              className="relative bg-[#0d1a30] border-2 border-gold-prestige/40 hover:border-gold-prestige rounded-xl p-8 sm:p-10 shadow-2xl overflow-hidden transition-all duration-300"
            >
              {/* Background Triangular Watermark in Corner */}
              <div
                className="absolute -right-16 -bottom-16 w-64 h-64 triangle-hatch-gold opacity-15 pointer-events-none"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  transform: 'rotate(45deg)',
                }}
                aria-hidden="true"
              ></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex items-start gap-6 max-w-3xl">
                  {/* Academic Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#142542] border border-gold-prestige/50 flex items-center justify-center shrink-0 text-gold-light shadow-lg">
                    {item.honors ? (
                      <Award className="w-8 h-8 text-gold-light" />
                    ) : (
                      <GraduationCap className="w-8 h-8 text-gold-light" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase">
                        {item.period}
                      </span>
                      {item.honors && (
                        <span className="px-2 py-0.5 rounded bg-gold-burnished/30 border border-gold-prestige/50 font-mono text-[11px] text-gold-light">
                          {item.honors}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-on-surface font-normal">
                      {item.degree}
                    </h3>

                    <p className="font-serif text-lg text-emerald-accent italic">
                      {item.institution}
                    </p>

                    <p className="font-sans text-sm text-on-surface-variant font-medium">
                      Specialization: {item.field}
                    </p>

                    {item.thesisTitle && (
                      <div className="pt-2 text-sm text-on-surface-variant space-y-1">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-4 h-4 text-gold-prestige shrink-0 mt-0.5" />
                          <span className="font-serif italic text-on-surface">
                            &ldquo;{item.thesisTitle}&rdquo;
                          </span>
                        </div>
                        {item.thesisSummary && (
                          <p className="text-xs text-on-surface-variant/90 leading-relaxed pl-6 pt-1">
                            {item.thesisSummary}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action */}
                <div className="shrink-0 w-full sm:w-auto">
                  <a
                    href="mailto:kirill@drlebedev.com?subject=Academic%20Dossier%20Inquiry"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0a182e] hover:bg-[#142a4e] border border-gold-prestige/40 hover:border-gold-prestige text-gold-light font-sans text-xs tracking-wider uppercase rounded transition-all w-full sm:w-auto shadow-md"
                  >
                    <span>Request Doctoral Records</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

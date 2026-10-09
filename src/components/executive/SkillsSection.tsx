import React from 'react';
import { SkillDomain } from '../../types/content';
import { Cpu, Layers, TrendingUp, Users, CheckCircle } from 'lucide-react';

export interface SkillsSectionProps {
  skills: SkillDomain[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('leadership') || category.toLowerCase().includes('governance')) {
      return <Users className="w-5 h-5 text-gold-light" />;
    }
    if (category.toLowerCase().includes('adtech') || category.toLowerCase().includes('monetization')) {
      return <TrendingUp className="w-5 h-5 text-emerald-accent" />;
    }
    if (category.toLowerCase().includes('intelligence') || category.toLowerCase().includes('machine learning')) {
      return <Cpu className="w-5 h-5 text-gold-light" />;
    }
    return <Layers className="w-5 h-5 text-emerald-accent" />;
  };

  return (
    <section
      id="skills"
      className="relative w-full py-20 bg-forest-noir border-b border-gold-prestige/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase">
            CORE COMPETENCIES &amp; DOMAIN EXPERTISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface mt-2 font-normal">
            Engineering Leadership &amp; Technical Expertise
          </h2>
          <p className="font-sans text-on-surface-variant text-base mt-2">
            Leadership and technical capabilities spanning organizational scaling, commercial 0-to-1 incubation, causal machine learning, and distributed systems.
          </p>
          <div className="h-0.5 w-16 bg-gold-prestige/60 my-4"></div>
        </div>

        {/* Skills Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((domain, dIdx) => (
            <div
              key={dIdx}
              className="bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-xl p-7 shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Domain Header */}
                <div className="flex items-center gap-3.5 border-b border-gold-prestige/15 pb-4 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#142542] border border-gold-prestige/40 flex items-center justify-center shrink-0">
                    {getCategoryIcon(domain.category)}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                    {domain.category}
                  </h3>
                </div>

                {/* Skills Badges / List */}
                <ul className="space-y-2.5 font-sans text-sm text-on-surface-variant">
                  {domain.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-accent shrink-0 mt-0.5 group-hover:text-gold-light transition-colors" />
                      <span className="text-on-surface leading-snug">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-label count */}
              <div className="mt-6 pt-4 border-t border-gold-prestige/15 flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                <span>SYSTEM ARCHITECTURE PILLAR 0{dIdx + 1}</span>
                <span className="text-emerald-accent">{domain.skills.length} Core Capabilities</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

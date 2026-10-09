import React from 'react';
import { ContentStore } from '../../types/content';
import { ExecutiveHeader } from './ExecutiveHeader';
import { ExecutiveBio } from './ExecutiveBio';
import { ExperienceTimeline } from './ExperienceTimeline';
import { PatentsSection } from './PatentsSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ExecutiveFooter } from './ExecutiveFooter';
import defaultContent from '../../data/content.json';
import { ShieldCheck, Cpu, Network } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';

export interface ExecutiveViewProps {
  content?: ContentStore;
}

export const ExecutiveView: React.FC<ExecutiveViewProps> = ({ content = defaultContent as unknown as ContentStore }) => {
  const { profile, metricsSummary, doctrine, experience, patents, education, skills } = content;

  return (
    <div className="w-full min-h-screen bg-forest-noir text-on-surface font-sans selection:bg-gold-burnished/30 selection:text-gold-light">
      {/* 1. Header Navigation Chrome */}
      <ExecutiveHeader profile={profile} />

      {/* Main Content Area */}
      <main className="w-full pt-28">
        {/* 2. Hero Storytelling & Executive Bio */}
        <ExecutiveBio profile={profile} metrics={metricsSummary} />

        {/* 3. Chapter I & II: Technical Doctrine & Systems Architecture */}
        <section
          id="doctrine"
          className="relative w-full py-20 bg-forest-noir border-b border-gold-prestige/20"
        >
          {/* Subtle Geometric Background */}
          <div
            className="absolute top-0 right-0 w-80 h-80 triangle-hatch-emerald opacity-15 pointer-events-none"
            style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
            aria-hidden="true"
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase">
                CHAPTER II • ENGINEERING PRINCIPLES &amp; SYSTEMS ARCHITECTURE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-on-surface mt-2 font-normal">
                Ads Measurement Systems, AI Monetization &amp; Architecture
              </h2>
              <p className="font-sans text-on-surface-variant text-base mt-2">
                Architecture principles covering causal attribution frameworks, privacy-preserving analytics, and scalable identity graphs.
              </p>
              <div className="h-0.5 w-16 bg-gold-prestige/60 my-4"></div>
            </div>

            {/* Embedded Architecture Diagram */}
            <div className="mb-12 rounded-xl overflow-hidden border border-gold-prestige/30 shadow-2xl bg-[#050b14] p-3">
              <img
                src={getAssetUrl('assets/diagrams/attribution-architecture.svg')}
                alt="Executive Technology Portfolio: Ads Measurement, AI Products & Systems Architecture Blueprint"
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('attribution-architecture-dark.svg')) {
                    target.src = getAssetUrl('assets/diagrams/attribution-architecture-dark.svg');
                  }
                }}
              />
            </div>

            {/* Principles Cards (from content store) */}
            {doctrine && doctrine.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {doctrine.map((item) => (
                  <div
                    key={item.number}
                    className="relative bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-lg p-7 shadow-xl flex flex-col justify-between group transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-gold-prestige/15 pb-3">
                        <span className="font-mono text-xs text-gold-light uppercase tracking-widest">
                          PRINCIPLE {item.number}
                        </span>
                        {item.number === '01' ? (
                          <Cpu className="w-4 h-4 text-emerald-accent" />
                        ) : item.number === '02' ? (
                          <ShieldCheck className="w-4 h-4 text-gold-light" />
                        ) : (
                          <Network className="w-4 h-4 text-emerald-accent" />
                        )}
                      </div>

                      <h3 className="font-serif text-xl text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                        {item.title}
                      </h3>

                      <p className="font-serif italic text-xs text-gold-light/90 border-l border-gold-prestige/40 pl-3 leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </p>

                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed pt-1">
                        {item.narrative}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gold-prestige/15 font-mono text-[11px] text-emerald-accent">
                      <span>CORE SYSTEMS ARCHITECTURE PILLAR</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. Chapter III: Leadership Dossier / Career Timeline */}
        <ExperienceTimeline experience={experience} />

        {/* 5. Chapter IV: Intellectual Property & US Patents */}
        <PatentsSection patents={patents} />

        {/* 6. Chapter V: Academic Foundation & Doctoral Pedigree */}
        <EducationSection education={education} />

        {/* 7. Competency Matrix & Domain Mastery */}
        <SkillsSection skills={skills} />

        {/* 8. Chapter VI & Footer: Advisory & Verified Channels */}
        <ExecutiveFooter profile={profile} />
      </main>
    </div>
  );
};

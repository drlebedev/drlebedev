import React from 'react';
import { Profile, MetricSummaryItem } from '../../types/content';
import { HeroMetrics } from './HeroMetrics';
import { BookOpen, Mail, Award, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';

export interface ExecutiveBioProps {
  profile: Profile;
  metrics?: MetricSummaryItem[];
}

export const ExecutiveBio: React.FC<ExecutiveBioProps> = ({ profile, metrics }) => {
  return (
    <section
      id="narrative"
      className="relative w-full overflow-hidden bg-forest-noir bg-tessellation border-b border-gold-prestige/20 pt-8 pb-16 lg:py-20"
    >
      {/* Background Decorative Geometric Tessellation Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg
          className="absolute -top-32 -left-32 w-[650px] h-[650px]"
          fill="none"
          viewBox="0 0 600 600"
          aria-hidden="true"
        >
          <polygon
            points="300,50 550,500 50,500"
            stroke="#f59e0b"
            strokeDasharray="6 6"
            strokeWidth="1"
          />
          <polygon
            points="300,120 480,440 120,440"
            stroke="#3b82f6"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <line
            stroke="#f59e0b"
            strokeOpacity="0.2"
            strokeWidth="0.75"
            x1="300"
            x2="300"
            y1="50"
            y2="500"
          />
        </svg>
        <svg
          className="absolute -bottom-40 right-10 w-[700px] h-[700px]"
          fill="none"
          viewBox="0 0 600 600"
          aria-hidden="true"
        >
          <polygon
            points="300,550 50,100 550,100"
            stroke="#60a5fa"
            strokeDasharray="10 8"
            strokeWidth="1"
          />
          <polygon
            points="300,480 120,160 480,160"
            stroke="#f59e0b"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Grid: Narrative and Geometric Portrait Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Authoritative Editorial Statement & Bio */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase flex items-center gap-2">
                <span className="h-px w-6 bg-gold-prestige/60"></span>
                APPLIED MATHEMATICIAN • DISTINGUISHED SYSTEMS LEADER
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-on-surface leading-[1.08] font-normal tracking-tight">
                Kirill Lebedev, <span className="italic font-serif text-gold-light font-light">PhD</span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-emerald-accent/90 italic font-light mt-1">
                {profile.headline}
              </p>
            </div>

            {/* Editorial Thesis & Summary */}
            <div className="prose prose-invert max-w-none text-on-surface-variant font-sans text-base leading-relaxed space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-on-surface font-sans">
                {profile.summary}
              </p>
              <div className="text-sm text-on-surface-variant/90 border-l-2 border-gold-prestige/40 pl-4 italic space-y-1">
                <p>
                  &ldquo;When heuristic attribution dissolved under the collapse of third-party cookies and platform tracking barriers, the solution was not more telemetry—it was rigorous high-dimensional causal mathematics.&rdquo;
                </p>
              </div>
            </div>

            {/* Monolithic Hero Metrics Bar */}
            <HeroMetrics metrics={metrics} />

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#trajectory"
                className="px-5 py-2.5 bg-gradient-to-r from-gold-burnished to-gold-prestige text-[#050b14] font-sans text-xs tracking-wider uppercase font-semibold rounded hover:brightness-110 transition-all shadow-lg flex items-center gap-2 group"
              >
                <span>Read Leadership Dossier</span>
                <BookOpen className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="px-4 py-2.5 bg-[#0a182e] hover:bg-[#122544] border border-emerald-accent/40 hover:border-emerald-accent text-emerald-accent font-mono text-xs rounded transition-all flex items-center gap-2 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </a>

              <a
                href={profile.resumePdfUrl}
                download
                className="px-4 py-2.5 bg-[#0b162c] hover:bg-[#152a4e] border border-gold-prestige/30 hover:border-gold-prestige text-gold-light font-mono text-xs rounded transition-all flex items-center gap-2 shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>Executive CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Geometric Framing Artwork & Portrait */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-[1/1.15] flex items-center justify-center select-none py-6">
              {/* Soft Ambient Glow */}
              <div className="absolute -inset-8 bg-gradient-to-tr from-emerald-accent/15 via-gold-prestige/10 to-transparent blur-3xl pointer-events-none"></div>

              {/* Decorative Geometric Diamond & Hatch Elements */}
              <div
                className="absolute inset-0 border border-gold-prestige/30 rotate-3 rounded-lg pointer-events-none triangle-hatch-gold opacity-30"
                aria-hidden="true"
              ></div>
              <div
                className="absolute inset-2 border border-emerald-accent/25 -rotate-2 rounded-lg pointer-events-none"
                aria-hidden="true"
              ></div>

              {/* Portrait Image Card */}
              <div className="relative z-20 w-[280px] sm:w-[320px] aspect-[4/5] rounded overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 border-gold-prestige/60 group">
                <img
                  src={getAssetUrl('assets/images/portrait.webp')}
                  alt={`Portrait of ${profile.fullName}`}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  onError={(e) => {
                    // Fallback to portrait-dark.webp or dark asset
                    const target = e.currentTarget;
                    if (!target.src.includes('portrait-dark.webp')) {
                      target.src = getAssetUrl('assets/images/portrait-dark.webp');
                    }
                  }}
                />

                {/* Fine Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/80 via-transparent to-transparent pointer-events-none"></div>

                {/* Corner Tick Marks */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-gold-light pointer-events-none transition-all group-hover:w-3.5 group-hover:h-3.5 group-hover:border-gold-prestige"></div>
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-gold-light pointer-events-none transition-all group-hover:w-3.5 group-hover:h-3.5 group-hover:border-gold-prestige"></div>
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-gold-light pointer-events-none transition-all group-hover:w-3.5 group-hover:h-3.5 group-hover:border-gold-prestige"></div>
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-gold-light pointer-events-none transition-all group-hover:w-3.5 group-hover:h-3.5 group-hover:border-gold-prestige"></div>
              </div>

              {/* Floating Credential Badge */}
              <div className="absolute -bottom-2 z-30 px-5 py-2.5 bg-[#0d1a30]/95 border border-gold-prestige/60 rounded shadow-[0_15px_35px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-accent" />
                <span className="font-mono text-xs text-gold-light font-medium tracking-wider uppercase">
                  PhD Computer Science • 3 Patents
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

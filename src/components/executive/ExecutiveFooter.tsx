import React from 'react';
import { Profile } from '../../types/content';
import { useViewMode } from '../../context/ViewModeContext';
import { Mail, Linkedin, FileText, MapPin, Terminal, Phone, ArrowUpRight } from 'lucide-react';

export interface ExecutiveFooterProps {
  profile: Profile;
}

export const ExecutiveFooter: React.FC<ExecutiveFooterProps> = ({ profile }) => {
  const { setActiveMode } = useViewMode();

  return (
    <>
      {/* Chapter VI: Confidential Advisory & Direct Contact Section */}
      <section id="contact" className="relative w-full py-20 bg-forest-noir border-b border-gold-prestige/20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs text-gold-prestige tracking-[0.2em] uppercase">
              CHAPTER VI • ADVISORY ENGAGEMENTS &amp; DIRECT CONTACT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-on-surface font-normal mt-2">
              Strategic Executive Counsel &amp; Due Diligence
            </h2>
            <div className="h-0.5 w-16 bg-gold-prestige/60 my-4"></div>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              Available for select technical due-diligence advisory for venture capital funds, enterprise board advisement on AI monetization architecture, and academic keynote lectures on causal systems.
            </p>
          </div>

          {/* Clean Executive Contact Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Direct Email Card */}
            <div className="bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-accent/15 border border-emerald-accent/30 flex items-center justify-center text-emerald-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                  Direct Email
                </h3>
                <p className="font-sans text-xs text-on-surface-variant">
                  Private correspondence, executive opportunities, and keynote invitations.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gold-prestige/15">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-xs text-emerald-accent hover:underline flex items-center justify-between group-hover:text-gold-light transition-colors"
                >
                  <span className="break-all">{profile.email}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 ml-1" />
                </a>
              </div>
            </div>

            {/* LinkedIn Network Card */}
            <div className="bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-gold-light/15 border border-gold-light/30 flex items-center justify-center text-gold-light">
                  <Linkedin className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                  Executive Network
                </h3>
                <p className="font-sans text-xs text-on-surface-variant">
                  Verified executive chronology, recommendations, and industry connections.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gold-prestige/15">
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-gold-light hover:underline flex items-center justify-between group-hover:text-emerald-accent transition-colors"
                >
                  <span>linkedin.com/in/drlebedev</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 ml-1" />
                </a>
              </div>
            </div>

            {/* Resume & Curriculum Vitae Card */}
            <div className="bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-accent/15 border border-emerald-accent/30 flex items-center justify-center text-emerald-accent">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                  Executive Resume (PDF)
                </h3>
                <p className="font-sans text-xs text-on-surface-variant">
                  Download comprehensive dossier detailing $1B+ metrics and organizational scale.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gold-prestige/15">
                <a
                  href={profile.resumePdfUrl}
                  download
                  className="font-mono text-xs text-emerald-accent hover:underline flex items-center justify-between group-hover:text-gold-light transition-colors"
                >
                  <span>drlebedev-resume.pdf</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 ml-1" />
                </a>
              </div>
            </div>

            {/* Direct Telephone */}
            {profile.phone && (
              <div className="bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-xl p-6 shadow-xl transition-all group flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-light/15 border border-gold-light/30 flex items-center justify-center text-gold-light">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                    Direct Telephone
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Direct voice contact for urgent board and technical diligence inquiries.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gold-prestige/15">
                  <a
                    href={`tel:${profile.phone}`}
                    className="font-mono text-xs text-gold-light hover:underline flex items-center justify-between group-hover:text-emerald-accent transition-colors"
                  >
                    <span>{profile.phone}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 ml-1" />
                  </a>
                </div>
              </div>
            )}

            {/* Geographic Headquarters Card */}
            <div className="bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-accent/15 border border-emerald-accent/30 flex items-center justify-center text-emerald-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                  Geographic Location
                </h3>
                <p className="font-sans text-xs text-on-surface-variant">
                  Resident in Silicon Valley / San Francisco Bay Area.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gold-prestige/15 font-mono text-xs text-on-surface-variant">
                <span>Silicon Valley • {profile.location}</span>
              </div>
            </div>

            {/* Terminal CLI Card */}
            <div className="bg-[#0d1a30] border border-gold-prestige/30 hover:border-gold-prestige/60 rounded-xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-gold-light/15 border border-gold-light/30 flex items-center justify-center text-gold-light">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-on-surface font-semibold group-hover:text-gold-light transition-colors">
                  Interactive Terminal
                </h3>
                <p className="font-sans text-xs text-on-surface-variant">
                  Access command-driven systems telemetry and executive shell commands.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gold-prestige/15">
                <button
                  onClick={() => setActiveMode('terminal')}
                  className="font-mono text-xs text-gold-light hover:underline flex items-center justify-between group-hover:text-emerald-accent transition-colors w-full"
                >
                  <span>Launch terminal.sh (~)</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Site Footer */}
      <footer className="w-full bg-[#03070d] border-t border-gold-prestige/20 py-12 text-on-surface-variant text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-serif text-lg text-gold-light font-medium">
              Kirill Lebedev, PhD • Executive Engineering Portfolio
            </span>
            <p className="font-sans text-xs text-on-surface-variant/80 max-w-xl">
              {profile.title}. Applied mathematician specializing in counterfactual causal inference, differential privacy, and high-throughput streaming state.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 font-mono text-xs w-full md:w-auto">
            {/* Bottom Menu Links: Responsive tiers on mobile, single line on desktop */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-2 sm:gap-x-3 sm:gap-y-1.5 text-emerald-accent text-center w-full md:w-auto">
              <div className="flex items-center justify-center gap-2.5">
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
                <span className="text-white/20" aria-hidden="true">•</span>
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
              <span className="text-white/20 hidden sm:inline" aria-hidden="true">•</span>
              <div className="flex items-center justify-center gap-2.5">
                <a href={profile.resumePdfUrl} download className="hover:underline text-gold-light">
                  Resume PDF
                </a>
                <span className="text-white/20" aria-hidden="true">•</span>
                <button
                  onClick={() => setActiveMode('terminal')}
                  className="text-gold-light hover:underline flex items-center gap-1"
                >
                  <Terminal className="w-3 h-3 inline" />
                  <span>terminal.sh</span>
                </button>
              </div>
            </div>

            <span className="text-on-surface-variant/60 text-[11px] text-center md:text-right">
              &copy; {new Date().getFullYear()} Kirill Lebedev, PhD. All US Patents active &amp; registered.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

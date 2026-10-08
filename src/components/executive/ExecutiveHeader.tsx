import React, { useState } from 'react';
import { useViewMode } from '../../context/ViewModeContext';
import { Profile } from '../../types/content';
import { Terminal, Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';

export interface ExecutiveHeaderProps {
  profile: Profile;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({ profile }) => {
  const { activeMode, setActiveMode, activeTheme, setActiveTheme, isDark } = useViewMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    if (activeTheme === 'dark') setActiveTheme('light');
    else if (activeTheme === 'light') setActiveTheme('system');
    else setActiveTheme('dark');
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  const navLinks = [
    { label: 'Vision', href: '#narrative' },
    { label: 'Technical Doctrine', href: '#doctrine' },
    { label: 'Leadership Dossier', href: '#trajectory' },
    { label: 'US Patents', href: '#patents' },
    { label: 'Academic Foundation', href: '#pedigree' },
    { label: 'Competencies', href: '#skills' },
    { label: 'Advisory', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050b14]/95 backdrop-blur-xl border-b border-gold-prestige/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all duration-300">
      {/* TIER 1: Desktop Telemetry Ribbon (Hidden on mobile to eliminate small-screen overflow) */}
      <div className="hidden md:block border-b border-gold-prestige/15 bg-[#03070d]/80">
        <div className="h-9 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          {/* Left: Location Telemetry */}
          <div className="flex items-center gap-2 font-sans text-[11px] text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent"></span>
            <span>Silicon Valley • SF Bay Area</span>
          </div>

          {/* Right: Desktop Controls (Theme Toggle, Mode Toggle, Inquiry CTA) */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={cycleTheme}
              data-testid="theme-toggle-btn"
              aria-label={`Toggle theme (current: ${activeTheme})`}
              title={`Toggle theme (Current: ${activeTheme})`}
              className="px-2 py-0.5 rounded-full text-xs flex items-center gap-1 bg-[#0b162c] border border-gold-prestige/30 text-gold-light hover:text-white hover:border-gold-prestige/60 transition-all shadow-inner"
            >
              {isDark ? (
                <Moon className="w-3 h-3 text-gold-light" />
              ) : (
                <Sun className="w-3 h-3 text-gold-light" />
              )}
              <span className="text-[10px] font-mono uppercase">{activeTheme}</span>
            </button>

            {/* Interface Mode Switcher */}
            <div
              className="bg-[#0b162c] border border-gold-prestige/30 p-0.5 rounded-full flex items-center gap-0.5 shadow-inner"
              role="group"
              aria-label="Interface mode toggle"
            >
              <button
                onClick={() => setActiveMode('editorial')}
                data-active={activeMode === 'editorial'}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium transition-all ${
                  activeMode === 'editorial'
                    ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30 shadow-sm'
                    : 'text-on-surface-variant hover:text-gold-light'
                }`}
              >
                Executive
              </button>
              <button
                onClick={() => setActiveMode('terminal')}
                data-active={activeMode === 'terminal'}
                title="Launch Terminal Console (~)"
                className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] flex items-center gap-1 transition-all group ${
                  activeMode === 'terminal'
                    ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30 shadow-sm'
                    : 'text-on-surface-variant hover:text-gold-light'
                }`}
              >
                <Terminal className="w-2.5 h-2.5 text-emerald-accent" />
                <span>Terminal</span>
                <kbd className="hidden sm:inline text-[8px] px-1 bg-black/40 rounded border border-white/10 text-on-surface-variant group-hover:border-gold-prestige/40">
                  ~
                </kbd>
              </button>
            </div>

            {/* Confidential Contact Button */}
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-1 px-3 py-0.5 bg-gradient-to-r from-gold-burnished to-gold-prestige text-[#050b14] font-sans text-[11px] tracking-wider uppercase font-semibold rounded hover:brightness-110 transition-all shadow-sm cursor-pointer"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* TIER 2: Main Masthead & Navigation Bar */}
      <div className="h-16 md:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Masthead: Seal Logo & Compact Stacked Identity (No Dr., PhD kept) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 min-w-0">
          <a
            href="#narrative"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded bg-[#0b162c] border border-gold-prestige/40 flex items-center justify-center shrink-0 shadow-lg group hover:border-gold-prestige transition-all duration-300"
            aria-label="Home - Kirill Lebedev, PhD"
          >
            <span className="font-serif text-lg sm:text-xl text-gold-light italic font-semibold group-hover:scale-105 transition-transform">
              KL
            </span>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-accent rotate-45 border border-forest-noir"></div>
          </a>

          <div className="flex flex-col min-w-0">
            <a
              href="#narrative"
              className="font-serif text-sm sm:text-base lg:text-lg tracking-wide text-on-surface font-medium hover:text-gold-light transition-colors whitespace-nowrap leading-tight"
            >
              Kirill Lebedev, <span className="italic text-gold-prestige font-normal">PhD</span>
            </a>
            <span className="font-mono text-[9px] sm:text-[10px] text-on-surface-variant tracking-wider uppercase whitespace-nowrap leading-tight">
              {profile.title.includes('|') ? profile.title.split('|')[0].trim() : 'Director of Engineering'}
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-emerald-accent/90 tracking-wider uppercase whitespace-nowrap leading-tight">
              {profile.title.includes('|') ? profile.title.split('|')[1].trim() : 'AI & Ads Measurement Leader'}
            </span>
          </div>
        </div>

        {/* Complete Desktop Navigation Menu */}
        <nav
          className="hidden xl:flex items-center gap-3.5 2xl:gap-5 text-xs 2xl:text-sm font-sans tracking-wide text-on-surface-variant shrink-0"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gold-light transition-colors relative py-1 hover:after:w-full after:transition-all after:duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-prestige/70 whitespace-nowrap font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Action Controls (< xl viewports) */}
        <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Theme Toggle Button */}
          <button
            onClick={cycleTheme}
            data-testid="theme-toggle-btn-mobile"
            aria-label={`Toggle theme (current: ${activeTheme})`}
            className="p-1 rounded-full text-xs flex items-center bg-[#0b162c] border border-gold-prestige/30 text-gold-light hover:text-white"
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-gold-light" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-gold-light" />
            )}
          </button>

          {/* Mobile Interface Mode Switcher */}
          <div
            className="bg-[#0b162c] border border-gold-prestige/30 p-0.5 rounded-full flex items-center gap-0.5"
            role="group"
            aria-label="Interface mode toggle"
          >
            <button
              onClick={() => setActiveMode('editorial')}
              data-active={activeMode === 'editorial'}
              className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-medium transition-all ${
                activeMode === 'editorial'
                  ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30'
                  : 'text-on-surface-variant'
              }`}
            >
              Exec
            </button>
            <button
              onClick={() => setActiveMode('terminal')}
              data-active={activeMode === 'terminal'}
              title="Terminal (~)"
              className={`px-2 py-0.5 rounded-full font-mono text-[10px] flex items-center gap-0.5 transition-all ${
                activeMode === 'terminal'
                  ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30'
                  : 'text-on-surface-variant'
              }`}
            >
              <Terminal className="w-2.5 h-2.5 text-emerald-accent" />
              <span>CLI</span>
            </button>
          </div>

          {/* Mobile Drawer Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-on-surface-variant hover:text-gold-light rounded border border-gold-prestige/30"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#08101d] border-t border-gold-prestige/30 px-6 py-4 space-y-3 font-sans text-sm shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-gold-light py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gold-prestige/20 flex items-center justify-between text-xs font-mono text-emerald-accent">
            <span>Silicon Valley • SF Bay Area</span>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="px-2.5 py-1 bg-gradient-to-r from-gold-burnished to-gold-prestige text-[#050b14] rounded text-[11px] font-sans font-semibold uppercase cursor-pointer"
            >
              Contact ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

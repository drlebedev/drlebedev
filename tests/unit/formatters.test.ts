import { describe, it, expect } from 'vitest';
import {
  formatHelp,
  formatBio,
  formatExp,
  formatPatents,
  formatEdu,
  formatSkills,
  formatContact,
  formatUnknown,
} from '../../src/terminal/formatters';

describe('Terminal Monospace Formatters (T037)', () => {
  it('formats help output with table of commands and descriptions', () => {
    const text = formatHelp();
    expect(text).toContain('KIRILL LEBEDEV, PhD — INTERACTIVE WEB CONSOLE');
    expect(text).toContain('help');
    expect(text).toContain('bio');
    expect(text).toContain('exp');
    expect(text).toContain('patents');
    expect(text).toContain('edu');
    expect(text).toContain('skills');
    expect(text).toContain('contact');
    expect(text).toContain('gui');
    expect(text).toContain('clear');
  });

  it('formats bio output with executive narrative, scale metrics, and doctoral credentials', () => {
    const text = formatBio();
    expect(text).toContain('EXECUTIVE PROFILE: KIRILL LEBEDEV, PhD');
    expect(text).toContain('Director of Engineering | AI & Ads Measurement Leader');
    expect(text).toContain('Director of Engineering at LinkedIn');
    expect(text).toContain('$1B+ in annual revenue');
    expect(text).toContain('$100M ARR');
    expect(text).toContain('3 Issued US Patents');
    expect(text).toContain('SF Bay Area');
  });

  it('formats full exp output with career chronology', () => {
    const text = formatExp();
    expect(text).toContain('EXECUTIVE EXPERIENCE & CAREER HISTORY');
    expect(text).toContain('LINKEDIN');
    expect(text).toContain('Director of Engineering');
    expect(text).toContain('Senior Engineering Manager');
    expect(text).toContain('ORGANIZER INC.');
    expect(text).toContain('I.POINT LLC');
    expect(text).toContain('IRKUTSK NATIONAL RESEARCH TECHNICAL UNIVERSITY');
  });

  it('formats filtered exp output when company argument matches', () => {
    const text = formatExp('linkedin');
    expect(text).toContain('LINKEDIN');
    expect(text).not.toContain('ORGANIZER INC.');
    expect(text).not.toContain('I.POINT LLC');
  });

  it('formats filtered exp output error message when company argument does not match', () => {
    const text = formatExp('nonexistent');
    expect(text).toContain('No career entries found matching query: "nonexistent".');
    expect(text).toContain("Type 'exp' to view all positions.");
  });

  it('formats patents output with US patent numbers and Google Patents links', () => {
    const text = formatPatents();
    expect(text).toContain('ISSUED UNITED STATES PATENTS (USPTO VERIFIED)');
    expect(text).toContain('US 11,968,185');
    expect(text).toContain('https://patents.google.com/patent/US11968185');
    expect(text).toContain('US 11,232,254');
    expect(text).toContain('https://patents.google.com/patent/US11232254');
    expect(text).toContain('US 11,102,534');
    expect(text).toContain('https://patents.google.com/patent/US11102534');
  });

  it('formats edu output with PhD dissertation details and academic honors', () => {
    const text = formatEdu();
    expect(text).toContain('ACADEMIC BACKGROUND & DEGREES');
    expect(text).toContain('Doctor of Philosophy (PhD) in Computer Science');
    expect(text).toContain('Irkutsk National Research Technical University (INRTU)');
    expect(text).toContain('Summa cum laude');
    expect(text).toContain('Model-Driven Architecture');
    expect(text).toContain('05.13.11');
  });

  it('formats skills output across 4 competency categories', () => {
    const text = formatSkills();
    expect(text).toContain('CORE COMPETENCY MATRIX');
    expect(text).toContain('EXECUTIVE LEADERSHIP');
    expect(text).toContain('ADTECH PRODUCT INCUBATION');
    expect(text).toContain('ARTIFICIAL INTELLIGENCE');
    expect(text).toContain('DISTRIBUTED SYSTEMS');
  });

  it('formats contact output with verified channels', () => {
    const text = formatContact();
    expect(text).toContain('DIRECT CONTACT CHANNELS');
    expect(text).toContain('kirill@drlebedev.com');
    expect(text).toContain('+1 (415) 799-9995');
    expect(text).toContain('https://www.linkedin.com/in/drlebedev/');
    expect(text).toContain('SF Bay Area');
    expect(text).toContain('/assets/drlebedev-resume.pdf');
  });

  it('formats unknown command error message matching terminal-commands contract', () => {
    const text = formatUnknown('bad_cmd');
    expect(text).toBe(
      `Command not found: 'bad_cmd'.\nType 'help' to view all available commands.\nClick any command chip below for fast navigation.`
    );
  });
});

import contentData from '../data/content.json';
import { ExperienceItem } from '../types/content';

const DIVIDER = '======================================================================';

export function formatHelp(): string {
  return [
    DIVIDER,
    '  KIRILL LEBEDEV, PhD — INTERACTIVE WEB CONSOLE',
    DIVIDER,
    'Available commands:',
    '  help       - Display this list of available commands',
    '  bio        - View executive background, personal credo, and story',
    '  exp        - View leadership chronology and career milestones',
    '  patents    - List issued United States patents and USPTO links',
    '  edu        - View academic major, doctoral thesis, and honors',
    '  skills     - View competency matrix across leadership, AI, and systems',
    '  contact    - View verified direct communication channels',
    '  gui        - Switch display to the Executive Dossier graphical interface',
    '  clear      - Clear the console screen buffer',
    DIVIDER,
  ].join('\n');
}

export function formatBio(): string {
  const { profile } = contentData;
  return [
    DIVIDER,
    '  EXECUTIVE DOSSIER: KIRILL LEBEDEV, PhD',
    `  ${profile.title}`,
    DIVIDER,
    '"I have always believed that real engineering breakthroughs do not',
    'come from chasing trends. They come from understanding the fundamentals',
    'so deeply that you can see where reality is heading before anyone else.',
    'When you build from first principles—whether in mathematics, distributed',
    'systems, or artificial intelligence—you don\'t just follow industry',
    'waves. You build the bedrock they ride on."',
    '',
    'Overview:',
    '• Director of Engineering at LinkedIn; overall Ads Measurement leader.',
    '• Lead 40-70+ person full-stack organization across 5 core charters.',
    '• Bootstrapped Brand Advertising from 0 to 1 to $1B+ in annual revenue.',
    '• Engineering DRI for AI Ads products: 6x growth to $100M ARR in 6 mo.',
    '• Multi-year member of company-wide hiring committee.',
    '• PhD in Computer Science | Summa cum laude | 3 Issued US Patents.',
    `• Location: ${profile.location}`,
    DIVIDER,
  ].join('\n');
}

export function formatExp(companyFilter?: string): string {
  const query = companyFilter?.trim().toLowerCase();
  let items = contentData.experience as ExperienceItem[];

  if (query) {
    items = items.filter(
      (item) =>
        item.company.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query)
    );

    if (items.length === 0) {
      return [
        DIVIDER,
        '  PROFESSIONAL LEADERSHIP CHRONOLOGY',
        DIVIDER,
        `No career entries found matching query: "${companyFilter}".`,
        "Type 'exp' to view all positions.",
        DIVIDER,
      ].join('\n');
    }
  }

  const lines: string[] = [
    DIVIDER,
    '  PROFESSIONAL LEADERSHIP CHRONOLOGY',
    DIVIDER,
  ];

  items.forEach((item, index) => {
    const startYear = item.startDate ? item.startDate.slice(0, 4) : '';
    let endYear = 'Present';
    if (!item.isCurrent && item.endDate && item.endDate.toLowerCase() !== 'present') {
      endYear = item.endDate.slice(0, 4);
    }
    const periodStr = startYear ? `[${startYear} – ${endYear}] ` : '';
    const locationStr = item.location ? ` • ${item.location}` : '';

    lines.push(`${periodStr}${item.company.toUpperCase()}${locationStr}`);
    lines.push(`${item.role}${item.orgScope ? ` (${item.orgScope})` : ''}`);
    item.highlights.forEach((h) => {
      lines.push(`• ${h}`);
    });
    if (index < items.length - 1) {
      lines.push('');
    }
  });

  lines.push(DIVIDER);
  return lines.join('\n');
}

export function formatPatents(): string {
  const lines: string[] = [
    DIVIDER,
    '  ISSUED UNITED STATES PATENTS (USPTO VERIFIED)',
    DIVIDER,
  ];

  contentData.patents.forEach((patent, idx) => {
    lines.push(`[${idx + 1}] ${patent.patentNumber} | ${patent.title}`);
    lines.push(`    Grant Date: ${patent.grantDate} | USPTO Verified`);
    lines.push(`    URL: ${patent.usptoUrl}`);
    lines.push(`    Focus: ${patent.abstract}`);
    if (idx < contentData.patents.length - 1) {
      lines.push('');
    }
  });

  lines.push(DIVIDER);
  return lines.join('\n');
}

export function formatEdu(): string {
  return [
    DIVIDER,
    '  ACADEMIC FOUNDATIONS & DEGREES',
    DIVIDER,
    'Doctor of Philosophy (PhD) in Computer Science | 2004 – 2008',
    'Irkutsk National Research Technical University (INRTU)',
    '• Thesis: Development of a method and tools for creating applications',
    '  for a website content management system (Specialty: 05.13.11).',
    '• Research: Model-Driven Architecture (MDA), automated code generation',
    '  via Eclipse EMF/UML, dynamic structured metadata persistence, and',
    '  modular multi-tenant i.Portal kernel architecture.',
    '',
    'Master of Engineering / Degree in Computer Science | 1999 – 2004',
    'Irkutsk National Research Technical University (INRTU)',
    '• Honors: Summa cum laude (GPA 5.0 / 5.0)',
    '• Major: Systems Engineering and Low-Level System and Software Design',
    '• Minor: Software Engineering',
    '',
    'Academic Faculty Tenure | 2004 – 2012',
    '• Title: Deputy Vice-Rector / Professor',
    '• Taught: Operating Systems, Software Engineering, Probability Theory',
    DIVIDER,
  ].join('\n');
}

export function formatSkills(): string {
  const lines: string[] = [
    DIVIDER,
    '  CORE COMPETENCY MATRIX',
    DIVIDER,
  ];

  contentData.skills.forEach((category, idx) => {
    lines.push(`[${category.category.toUpperCase()}]`);
    category.skills.forEach((skill) => {
      lines.push(`• ${skill}`);
    });
    if (idx < contentData.skills.length - 1) {
      lines.push('');
    }
  });

  lines.push(DIVIDER);
  return lines.join('\n');
}

export function formatContact(): string {
  const { profile } = contentData;
  return [
    DIVIDER,
    '  VERIFIED DIRECT COMMUNICATION CHANNELS',
    DIVIDER,
    `• Direct Email : ${profile.email}`,
    `• Phone        : ${profile.phone}`,
    `• LinkedIn     : ${profile.linkedInUrl}`,
    '• Website      : https://www.drlebedev.com',
    `• Location     : ${profile.location}`,
    `• Resume PDF   : ${profile.resumePdfUrl}`,
    '• PhD Thesis   : /assets/download/thesis.pdf',
    DIVIDER,
  ].join('\n');
}

export function formatUnknown(cmd: string): string {
  return [
    `Command not found: '${cmd}'.`,
    "Type 'help' to view all available commands.",
    'Click any command chip below for fast navigation.',
  ].join('\n');
}

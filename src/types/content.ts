/**
 * Data model type definitions for Dr. Kirill Lebedev's personal brand website.
 * Follows specs/001-personal-brand-website/data-model.md and contracts/content-schema.json verbatim.
 */

export interface Profile {
  fullName: string;
  title: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  linkedInUrl: string;
  phone: string;
  resumePdfUrl: string;
  bio?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  period?: string;
  isCurrent: boolean;
  orgScope?: string;
  metrics: string[];
  highlights: string[];
  technologies?: string[];
  location?: string;
}

export interface PatentItem {
  patentNumber: string;
  title: string;
  grantDate: string;
  usptoUrl: string;
  abstract: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  honors?: string;
  thesisTitle?: string;
  thesisSummary?: string;
}

export interface SkillDomain {
  category: string;
  skills: string[];
}

export interface MetricSummaryItem {
  value: string;
  label: string;
  subtext: string;
}

export interface DoctrineItem {
  number: string;
  title: string;
  quote: string;
  narrative: string;
}

export interface ContentStore {
  $schema?: string;
  profile: Profile;
  metricsSummary?: MetricSummaryItem[];
  doctrine?: DoctrineItem[];
  experience: ExperienceItem[];
  patents: PatentItem[];
  education: EducationItem[];
  skills: SkillDomain[];
}

export interface UserSessionState {
  activeMode: 'editorial' | 'terminal';
  activeTheme: 'system' | 'light' | 'dark';
  commandHistory: string[];
  historyIndex: number;
}

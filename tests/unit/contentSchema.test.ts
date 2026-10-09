import { describe, it, expect } from 'vitest';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';

describe('Shared Content Fixture & JSON Schema Validation', () => {
  const schemaPath = path.resolve(__dirname, '../../specs/001-personal-brand-website/contracts/content-schema.json');
  const contentPath = path.resolve(__dirname, '../../src/data/content.json');

  const rawSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  const rawContent = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(rawSchema);

  it('validates src/data/content.json conforms strictly to content-schema.json', () => {
    const valid = validate(rawContent);
    if (!valid) {
      console.error('Validation errors:', validate.errors);
    }
    expect(valid).toBe(true);
    expect(validate.errors).toBeNull();
  });

  it('verifies profile entity structure and required properties', () => {
    const { profile } = rawContent;
    expect(profile).toBeDefined();
    expect(profile.fullName).toBe('Kirill Lebedev, PhD');
    expect(profile.title).toContain('Director of Engineering');
    expect(profile.headline).toBeTruthy();
    expect(profile.email).toBe('kirill@drlebedev.com');
    expect(profile.linkedInUrl).toBe('https://www.linkedin.com/in/drlebedev/');
    expect(profile.phone).toBeTruthy();
    expect(profile.resumePdfUrl).toBeTruthy();
    expect(profile.summary).toBeTruthy();
  });

  it('verifies career experience items contain valid structure and metrics', () => {
    const { experience } = rawContent;
    expect(Array.isArray(experience)).toBe(true);
    expect(experience.length).toBeGreaterThan(0);

    const linkedInRole = experience.find((exp: { id: string }) => exp.id === 'linkedin-director');
    expect(linkedInRole).toBeDefined();
    expect(linkedInRole.company).toBe('LinkedIn');
    expect(linkedInRole.role).toBe('Director of Engineering');
    expect(linkedInRole.isCurrent).toBe(true);
    expect(Array.isArray(linkedInRole.metrics)).toBe(true);
    expect(linkedInRole.metrics.length).toBeGreaterThan(0);
    expect(Array.isArray(linkedInRole.highlights)).toBe(true);
  });

  it('verifies issued US patents are present with grant dates and USPTO links', () => {
    const { patents } = rawContent;
    expect(Array.isArray(patents)).toBe(true);
    expect(patents.length).toBe(3);

    const patentNumbers = patents.map((p: { patentNumber: string }) => p.patentNumber);
    expect(patentNumbers).toContain('US 11,968,185');
    expect(patentNumbers).toContain('US 11,232,254');
    expect(patentNumbers).toContain('US 11,102,534');

    patents.forEach((p: { patentNumber: string; usptoUrl: string; title: string; grantDate: string; abstract: string }) => {
      expect(p.usptoUrl).toMatch(/^https?:\/\//);
      expect(p.title).toBeTruthy();
      expect(p.grantDate).toBeTruthy();
      expect(p.abstract).toBeTruthy();
    });
  });

  it('verifies education items contain doctoral credential from INRTU', () => {
    const { education } = rawContent;
    expect(Array.isArray(education)).toBe(true);
    expect(education.length).toBeGreaterThan(0);

    const phd = education.find((edu: { degree: string }) => edu.degree.includes('PhD'));
    expect(phd).toBeDefined();
    expect(phd.institution).toContain('INRTU');
    expect(phd.field).toContain('Computer Science');
    expect(phd.thesisTitle).toBeTruthy();
  });

  it('verifies skill domains categorisation', () => {
    const { skills } = rawContent;
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);

    skills.forEach((domain: { category: string; skills: string[] }) => {
      expect(domain.category).toBeTruthy();
      expect(Array.isArray(domain.skills)).toBe(true);
      expect(domain.skills.length).toBeGreaterThan(0);
    });
  });

  it('fails validation when required fields are missing', () => {
    const invalidData = {
      profile: {
        fullName: 'Test'
        // missing required fields
      },
      experience: [],
      patents: [],
      education: [],
      skills: []
    };
    const isValid = validate(invalidData);
    expect(isValid).toBe(false);
  });
});

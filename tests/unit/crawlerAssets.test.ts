import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Crawler Assets and Static Configuration (US3 / T044)', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const publicDir = path.join(rootDir, 'public');

  describe('public/llms.txt', () => {
    const llmsPath = path.join(publicDir, 'llms.txt');

    it('exists and is not empty', () => {
      expect(fs.existsSync(llmsPath)).toBe(true);
      const content = fs.readFileSync(llmsPath, 'utf-8');
      expect(content.length).toBeGreaterThan(100);
    });

    it('contains comprehensive executive identity and achievements', () => {
      const content = fs.readFileSync(llmsPath, 'utf-8');
      expect(content).toContain('Kirill Lebedev');
      expect(content).toContain('Director of Engineering');
      expect(content).toContain('$1B+');
      expect(content).toContain('$100M+ ARR');
      expect(content).toContain('LinkedIn');
      expect(content).toContain('11,968,185');
      expect(content).toContain('11,232,254');
      expect(content).toContain('11,102,534');
      expect(content).toContain('PhD');
    });

    it('contains standard Markdown hyperlinks adhering to llmstxt.org specification', () => {
      const content = fs.readFileSync(llmsPath, 'utf-8');
      expect(content).toMatch(/\[.+\]\(https?:\/\/.+\)/);
      expect(content).toContain('[LLM Comprehensive Overview](https://drlebedev.com/llms-full.txt)');
    });
  });

  describe('public/.well-known/ai-catalog.json', () => {
    const catalogPath = path.join(publicDir, '.well-known', 'ai-catalog.json');

    it('exists and is valid ARD manifest JSON', () => {
      expect(fs.existsSync(catalogPath)).toBe(true);
      const parsed = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
      expect(parsed.specVersion).toBe('1.0');
      expect(parsed.host.displayName).toContain('Kirill Lebedev');
      expect(Array.isArray(parsed.entries)).toBe(true);
      expect(parsed.entries.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('public/llms-full.txt', () => {
    const llmsFullPath = path.join(publicDir, 'llms-full.txt');

    it('exists and contains complete unabridged executive and doctrine data', () => {
      expect(fs.existsSync(llmsFullPath)).toBe(true);
      const content = fs.readFileSync(llmsFullPath, 'utf-8');
      expect(content.length).toBeGreaterThan(1000);
      expect(content).toContain('Kirill Lebedev');
      expect(content).toContain('Bayesian Causal Inference');
      expect(content).toContain('Differential Privacy');
      expect(content).toContain('Scaled Identity Graph');
      expect(content).toContain('11,968,185');
    });
  });

  describe('public/sitemap.xml', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    it('exists and has valid XML structure', () => {
      expect(fs.existsSync(sitemapPath)).toBe(true);
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(content).toContain('<loc>https://drlebedev.com/</loc>');
      expect(content).toContain('</urlset>');
    });
  });

  describe('public/robots.txt', () => {
    const robotsPath = path.join(publicDir, 'robots.txt');

    it('exists and provides access instructions for crawlers', () => {
      expect(fs.existsSync(robotsPath)).toBe(true);
      const content = fs.readFileSync(robotsPath, 'utf-8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Allow: /');
      expect(content).toContain('Sitemap: https://drlebedev.com/sitemap.xml');
    });
  });

  describe('docs/drlebedev-profile.md', () => {
    const docPath = path.join(rootDir, 'docs/drlebedev-profile.md');

    it('exists and contains complete portfolio markdown', () => {
      expect(fs.existsSync(docPath)).toBe(true);
      const content = fs.readFileSync(docPath, 'utf-8');
      expect(content).toContain('Kirill Lebedev');
      expect(content).toContain('Director of Engineering');
      expect(content).toContain('Core Engineering Principles & Architecture');
      expect(content).toContain('LinkedIn');
      expect(content).toContain('Patents');
      expect(content).toContain('11,968,185');
    });
  });

  describe('public/assets PDF credentials', () => {
    const resumePath = path.join(publicDir, 'assets', 'drlebedev-resume.pdf');
    const thesisPath = path.join(publicDir, 'assets', 'download', 'thesis.pdf');

    it('ensures drlebedev-resume.pdf exists and is a valid non-empty PDF', () => {
      expect(fs.existsSync(resumePath)).toBe(true);
      const stat = fs.statSync(resumePath);
      expect(stat.size).toBeGreaterThan(50000);
      const buffer = fs.readFileSync(resumePath);
      expect(buffer.subarray(0, 5).toString('ascii')).toBe('%PDF-');
    });

    it('ensures download/thesis.pdf exists and is a valid non-empty PDF', () => {
      expect(fs.existsSync(thesisPath)).toBe(true);
      const stat = fs.statSync(thesisPath);
      expect(stat.size).toBeGreaterThan(100000);
      const buffer = fs.readFileSync(thesisPath);
      expect(buffer.subarray(0, 5).toString('ascii')).toBe('%PDF-');
    });
  });

  describe('app.yaml', () => {
    const appYamlPath = path.join(rootDir, 'app.yaml');

    it('exists and adheres to caching-headers.md contract', () => {
      expect(fs.existsSync(appYamlPath)).toBe(true);
      const content = fs.readFileSync(appYamlPath, 'utf-8');
      expect(content).toContain('runtime: python311');
      expect(content).toContain('instance_class: F1');
      expect(content).toContain('static_dir: dist/assets');
      expect(content).toContain('Cache-Control: "public, max-age=31536000, immutable"');
      expect(content).toContain('upload: dist/(robots');
      expect(content).toContain('llms');
      expect(content).toContain('Cache-Control: "public, max-age=86400"');
      expect(content).toContain('Cache-Control: "public, max-age=0, must-revalidate"');
    });
  });
});

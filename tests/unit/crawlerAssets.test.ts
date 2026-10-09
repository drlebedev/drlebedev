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
      expect(content).toContain('Core Engineering & Leadership Doctrines');
      expect(content).toContain('LinkedIn');
      expect(content).toContain('Patents');
      expect(content).toContain('11,968,185');
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

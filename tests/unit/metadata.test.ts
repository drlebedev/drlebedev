import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { MetaTags } from '../../src/components/seo/MetaTags';
import contentData from '../../src/data/content.json';

describe('MetaTags & SEO Metadata (US3 / T043)', () => {
  beforeEach(() => {
    // Clear any previously injected meta tags or scripts
    const injected = document.head.querySelectorAll('[data-seo="true"]');
    injected.forEach((el) => el.remove());
  });

  afterEach(() => {
    const injected = document.head.querySelectorAll('[data-seo="true"]');
    injected.forEach((el) => el.remove());
  });

  it('renders without crashing', () => {
    const { container } = render(React.createElement(MetaTags));
    expect(container).toBeDefined();
  });

  it('injects valid Schema.org Person JSON-LD script', () => {
    render(React.createElement(MetaTags));

    const script = document.head.querySelector('script[type="application/ld+json"][data-seo="true"]');
    expect(script).not.toBeNull();

    const json = JSON.parse(script!.textContent || '{}');
    expect(json['@context']).toBe('https://schema.org');
    expect(json['@type']).toBe('Person');
    expect(json.name).toBe(contentData.profile.fullName);
    expect(json.jobTitle).toContain('Director of Engineering');
    expect(json.url).toBe('https://drlebedev.com');
    expect(json.sameAs).toContain(contentData.profile.linkedInUrl);
    expect(json.alumniOf).toBeDefined();
    expect(json.alumniOf[0].name).toContain('Irkutsk');
    expect(json.worksFor.name).toBe('LinkedIn');
  });

  it('injects Open Graph meta tags into document head', () => {
    render(React.createElement(MetaTags));

    const ogTitle = document.head.querySelector('meta[property="og:title"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle?.getAttribute('content')).toContain('Kirill Lebedev');

    const ogDescription = document.head.querySelector('meta[property="og:description"]');
    expect(ogDescription).not.toBeNull();
    expect(ogDescription?.getAttribute('content')).toContain('Director of Engineering');

    const ogImage = document.head.querySelector('meta[property="og:image"]');
    expect(ogImage).not.toBeNull();
    expect(ogImage?.getAttribute('content')).toContain('/assets/images/og-card.png');

    const ogUrl = document.head.querySelector('meta[property="og:url"]');
    expect(ogUrl).not.toBeNull();
    expect(ogUrl?.getAttribute('content')).toBe('https://drlebedev.com');

    const ogType = document.head.querySelector('meta[property="og:type"]');
    expect(ogType).not.toBeNull();
    expect(ogType?.getAttribute('content')).toBe('profile');
  });

  it('injects Twitter Card meta tags into document head', () => {
    render(React.createElement(MetaTags));

    const twitterCard = document.head.querySelector('meta[name="twitter:card"]');
    expect(twitterCard).not.toBeNull();
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');

    const twitterTitle = document.head.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle).not.toBeNull();
    expect(twitterTitle?.getAttribute('content')).toContain('Kirill Lebedev');

    const twitterImage = document.head.querySelector('meta[name="twitter:image"]');
    expect(twitterImage).not.toBeNull();
    expect(twitterImage?.getAttribute('content')).toContain('/assets/images/og-card.png');
  });

  it('sets canonical link in document head', () => {
    render(React.createElement(MetaTags));

    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
    expect(canonical?.getAttribute('href')).toBe('https://drlebedev.com');
  });
});

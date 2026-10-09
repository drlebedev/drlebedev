import React, { useEffect } from 'react';
import contentData from '../../data/content.json';

export const MetaTags: React.FC = () => {
  useEffect(() => {
    const { profile, education } = contentData;
    const siteUrl = 'https://drlebedev.com';
    const ogImageUrl = `${siteUrl}/assets/images/og-card.png`;

    // 1. Prepare JSON-LD Person Schema
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.fullName,
      jobTitle: profile.title,
      description: profile.summary,
      url: siteUrl,
      image: ogImageUrl,
      sameAs: [profile.linkedInUrl],
      email: profile.email,
      telephone: profile.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sunnyvale',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'LinkedIn',
      },
      alumniOf: education.map((edu) => ({
        '@type': 'CollegeOrUniversity',
        name: edu.institution,
      })),
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'PhD in Computer Science',
        },
      ],
      knowsAbout: [
        'Distributed Systems',
        'AI/ML Monetization',
        'Adtech & Ads Measurement',
        'Causal Inference',
        'Differential Privacy',
        'Identity Resolution',
      ],
    };

    // Helper to add or replace meta tags
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let meta = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attributeName, attributeValue);
        meta.setAttribute('data-seo', 'true');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to add or replace link tags
    const setLinkTag = (rel: string, href: string) => {
      let link = document.head.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        link.setAttribute('data-seo', 'true');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Open Graph
    setMetaTag('property', 'og:title', `${profile.fullName} — ${profile.title}`);
    setMetaTag('property', 'og:description', profile.summary);
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('property', 'og:url', siteUrl);
    setMetaTag('property', 'og:type', 'profile');
    setMetaTag('property', 'og:site_name', profile.fullName);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', `${profile.fullName} — ${profile.title}`);
    setMetaTag('name', 'twitter:description', profile.summary);
    setMetaTag('name', 'twitter:image', ogImageUrl);

    // Canonical
    setLinkTag('canonical', siteUrl);

    // JSON-LD Script
    let jsonLdScript = document.head.querySelector('script[type="application/ld+json"][data-seo="true"]') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.setAttribute('data-seo', 'true');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  return null;
};

export default MetaTags;

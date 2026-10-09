import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroMetrics } from '../../src/components/executive/HeroMetrics';
import { PatentsSection } from '../../src/components/executive/PatentsSection';
import contentData from '../../src/data/content.json';

describe('HeroMetrics Component (T026)', () => {
  it('displays $1B+ Ads line bootstrap, $100M+ ARR, and org scale metrics', () => {
    render(<HeroMetrics metrics={contentData.metricsSummary} />);

    expect(screen.getByText(/\$1B\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Brand Advertising/i)).toBeInTheDocument();

    expect(screen.getByText(/\$100M\+ ARR/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Ads Solution/i)).toBeInTheDocument();

    expect(screen.getByText(/40–70\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Scientific & Engineering/i)).toBeInTheDocument();
  });
});

describe('PatentsSection Component (T026)', () => {
  it('renders all issued US patents with numbers and links', () => {
    render(<PatentsSection patents={contentData.patents} />);

    // Check patent numbers
    expect(screen.getByText(/US 11,968,185/i)).toBeInTheDocument();
    expect(screen.getByText(/US 11,232,254/i)).toBeInTheDocument();
    expect(screen.getByText(/US 11,102,534/i)).toBeInTheDocument();

    // Check patent titles
    expect(screen.getByRole('heading', { name: /On-Device Experimentation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Editing Mechanism for Electronic Content Items/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Content Item Similarity Detection/i })).toBeInTheDocument();

    // Check USPTO links
    const usptoLinks = screen.getAllByRole('link', { name: /view uspto record|examine record|uspto/i });
    expect(usptoLinks.length).toBe(3);
    expect(usptoLinks[0]).toHaveAttribute('href', 'https://patents.google.com/patent/US11968185');
    expect(usptoLinks[0]).toHaveAttribute('target', '_blank');
    expect(usptoLinks[0]).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});

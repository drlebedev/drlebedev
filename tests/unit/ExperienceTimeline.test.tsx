import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExperienceTimeline } from '../../src/components/executive/ExperienceTimeline';
import contentData from '../../src/data/content.json';

describe('ExperienceTimeline Component (T025)', () => {
  it('renders career timeline chapters and roles', () => {
    render(<ExperienceTimeline experience={contentData.experience} />);

    // Check header and chapter title
    expect(screen.getByText(/LEADERSHIP & CAREER EXPERIENCE/i)).toBeInTheDocument();
    expect(screen.getByText(/Leadership Experience & Track Record/i)).toBeInTheDocument();

    // Check key companies
    expect(screen.getAllByText(/LinkedIn/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Director of Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/i\.Point/i)).toBeInTheDocument();
  });

  it('renders current appointment marker for active role', () => {
    render(<ExperienceTimeline experience={contentData.experience} />);

    expect(screen.getByText(/CURRENT EXECUTIVE APPOINTMENT/i)).toBeInTheDocument();
  });

  it('renders role metrics', () => {
    render(<ExperienceTimeline experience={contentData.experience} />);

    // Metrics for Director role
    expect(screen.getByText(/\$100M ARR reached in 6 months/i)).toBeInTheDocument();
    expect(screen.getByText(/25% of total ad revenue covered/i)).toBeInTheDocument();
  });

  it('expands and collapses highlights when toggled', () => {
    render(<ExperienceTimeline experience={contentData.experience} />);

    // First role (Director of Engineering) highlights might be expanded or toggleable
    const toggleButtons = screen.getAllByRole('button', { name: /view key achievements|hide achievements|expand|collapse/i });
    expect(toggleButtons.length).toBeGreaterThan(0);

    const firstToggle = toggleButtons[0];
    const initialText = firstToggle.textContent;

    // Toggle button click
    fireEvent.click(firstToggle);
    expect(firstToggle.textContent).not.toBe(initialText);
  });
});

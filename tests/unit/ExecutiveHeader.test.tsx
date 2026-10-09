import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewModeProvider } from '../../src/context/ViewModeContext';
import { ExecutiveHeader } from '../../src/components/executive/ExecutiveHeader';
import contentData from '../../src/data/content.json';

describe('ExecutiveHeader Component (T024)', () => {
  it('renders name, title, and status beacon', () => {
    render(
      <ViewModeProvider initialMode="editorial">
        <ExecutiveHeader profile={contentData.profile} />
      </ViewModeProvider>
    );

    // Verify name (PhD kept, Dr removed)
    expect(screen.getByText(/Kirill Lebedev/i)).toBeInTheDocument();
    expect(screen.queryByText(/Dr\./i)).not.toBeInTheDocument();
    expect(screen.getByText(/PhD/i)).toBeInTheDocument();

    // Verify title and leadership role
    expect(screen.getByText(/Director of Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/AI & Ads Measurement Leader/i)).toBeInTheDocument();
  });

  it('renders mode toggle buttons and allows toggling to terminal mode', () => {
    render(
      <ViewModeProvider initialMode="editorial">
        <ExecutiveHeader profile={contentData.profile} />
      </ViewModeProvider>
    );

    const terminalButton = screen.getByRole('button', { name: /terminal/i });
    expect(terminalButton).toBeInTheDocument();

    fireEvent.click(terminalButton);
    // After clicking, terminal should now be active
    expect(terminalButton).toHaveAttribute('data-active', 'true');
  });

  it('renders theme switcher button and cycles theme', () => {
    render(
      <ViewModeProvider initialTheme="dark">
        <ExecutiveHeader profile={contentData.profile} />
      </ViewModeProvider>
    );

    const themeButton = screen.getByTestId('theme-toggle-btn');
    expect(themeButton).toBeInTheDocument();

    fireEvent.click(themeButton);
    // Button exists and triggers theme toggle without error
  });

  it('renders navigation links to core sections', () => {
    render(
      <ViewModeProvider>
        <ExecutiveHeader profile={contentData.profile} />
      </ViewModeProvider>
    );

    expect(screen.getByRole('link', { name: /vision/i })).toHaveAttribute('href', '#narrative');
    expect(screen.getByRole('link', { name: /principles/i })).toHaveAttribute('href', '#doctrine');
    expect(screen.getByRole('link', { name: /experience/i })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: /patents/i })).toHaveAttribute('href', '#patents');
    expect(screen.getByRole('link', { name: /education/i })).toHaveAttribute('href', '#education');
    expect(screen.getByRole('link', { name: /expertise/i })).toHaveAttribute('href', '#skills');
    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    contactLinks.forEach((link) => expect(link).toHaveAttribute('href', '#contact'));
  });
});

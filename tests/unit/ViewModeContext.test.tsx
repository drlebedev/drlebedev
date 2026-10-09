import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ViewModeProvider, useViewMode } from '../../src/context/ViewModeContext';

// Test consumer component
const TestConsumer = () => {
  const { activeMode, setActiveMode, toggleMode, activeTheme, setActiveTheme, isDark } =
    useViewMode();

  return (
    <div>
      <div data-testid="mode-display">{activeMode}</div>
      <div data-testid="theme-display">{activeTheme}</div>
      <div data-testid="dark-display">{isDark ? 'dark' : 'not-dark'}</div>
      <button onClick={() => setActiveMode('terminal')} data-testid="btn-set-terminal">
        Set Terminal
      </button>
      <button onClick={() => setActiveMode('editorial')} data-testid="btn-set-editorial">
        Set Editorial
      </button>
      <button onClick={toggleMode} data-testid="btn-toggle-mode">
        Toggle Mode
      </button>
      <button onClick={() => setActiveTheme('dark')} data-testid="btn-set-theme-dark">
        Set Dark
      </button>
      <button onClick={() => setActiveTheme('light')} data-testid="btn-set-theme-light">
        Set Light
      </button>
      <button onClick={() => setActiveTheme('system')} data-testid="btn-set-theme-system">
        Set System
      </button>
    </div>
  );
};

describe('ViewModeContext & useViewMode Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  it('provides default values of editorial mode and system theme', () => {
    render(
      <ViewModeProvider>
        <TestConsumer />
      </ViewModeProvider>
    );

    expect(screen.getByTestId('mode-display').textContent).toBe('editorial');
    expect(screen.getByTestId('theme-display').textContent).toBe('system');
  });

  it('toggles mode between editorial and terminal and persists to localStorage', () => {
    render(
      <ViewModeProvider>
        <TestConsumer />
      </ViewModeProvider>
    );

    expect(screen.getByTestId('mode-display').textContent).toBe('editorial');

    act(() => {
      screen.getByTestId('btn-toggle-mode').click();
    });

    expect(screen.getByTestId('mode-display').textContent).toBe('terminal');
    expect(localStorage.getItem('drlebedev_view_mode')).toBe('terminal');

    act(() => {
      screen.getByTestId('btn-toggle-mode').click();
    });

    expect(screen.getByTestId('mode-display').textContent).toBe('editorial');
    expect(localStorage.getItem('drlebedev_view_mode')).toBe('editorial');
  });

  it('allows setting active mode directly', () => {
    render(
      <ViewModeProvider>
        <TestConsumer />
      </ViewModeProvider>
    );

    act(() => {
      screen.getByTestId('btn-set-terminal').click();
    });

    expect(screen.getByTestId('mode-display').textContent).toBe('terminal');
    expect(localStorage.getItem('drlebedev_view_mode')).toBe('terminal');

    act(() => {
      screen.getByTestId('btn-set-editorial').click();
    });

    expect(screen.getByTestId('mode-display').textContent).toBe('editorial');
    expect(localStorage.getItem('drlebedev_view_mode')).toBe('editorial');
  });

  it('loads persisted mode and theme from localStorage on initial render', () => {
    localStorage.setItem('drlebedev_view_mode', 'terminal');
    localStorage.setItem('drlebedev_theme', 'dark');

    render(
      <ViewModeProvider>
        <TestConsumer />
      </ViewModeProvider>
    );

    expect(screen.getByTestId('mode-display').textContent).toBe('terminal');
    expect(screen.getByTestId('theme-display').textContent).toBe('dark');
  });

  it('updates active theme and syncs document.documentElement dark class', () => {
    render(
      <ViewModeProvider>
        <TestConsumer />
      </ViewModeProvider>
    );

    // Set to dark
    act(() => {
      screen.getByTestId('btn-set-theme-dark').click();
    });

    expect(screen.getByTestId('theme-display').textContent).toBe('dark');
    expect(screen.getByTestId('dark-display').textContent).toBe('dark');
    expect(localStorage.getItem('drlebedev_theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Set to light
    act(() => {
      screen.getByTestId('btn-set-theme-light').click();
    });

    expect(screen.getByTestId('theme-display').textContent).toBe('light');
    expect(screen.getByTestId('dark-display').textContent).toBe('not-dark');
    expect(localStorage.getItem('drlebedev_theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('honors initialMode and initialTheme props when provided', () => {
    render(
      <ViewModeProvider initialMode="terminal" initialTheme="light">
        <TestConsumer />
      </ViewModeProvider>
    );

    expect(screen.getByTestId('mode-display').textContent).toBe('terminal');
    expect(screen.getByTestId('theme-display').textContent).toBe('light');
    expect(screen.getByTestId('dark-display').textContent).toBe('not-dark');
  });

  it('throws an error when useViewMode is used outside of ViewModeProvider', () => {
    // Suppress console.error for expected thrown error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestConsumer />);
    }).toThrow('useViewMode must be used within a ViewModeProvider');

    spy.mockRestore();
  });
});

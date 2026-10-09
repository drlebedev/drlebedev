import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewModeProvider } from '../../src/context/ViewModeContext';
import { TerminalView } from '../../src/components/terminal/TerminalView';

describe('TerminalView Component (T038)', () => {
  it('renders terminal window header, initial greeting, and prompt', () => {
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView />
      </ViewModeProvider>
    );

    expect(screen.getAllByText(/kirill@silicon-valley/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/APPLIED SYSTEMS WORKSTATION/i)).toBeInTheDocument();
    expect(screen.getByTestId('terminal-input')).toBeInTheDocument();
  });

  it('submits command on enter and renders output', () => {
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView />
      </ViewModeProvider>
    );

    const input = screen.getByTestId('terminal-input');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText(/KIRILL LEBEDEV, PhD — INTERACTIVE WEB CONSOLE/i)).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('submits patents command and renders US patent numbers', () => {
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView />
      </ViewModeProvider>
    );

    const input = screen.getByTestId('terminal-input');
    fireEvent.change(input, { target: { value: 'patents' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText(/ISSUED UNITED STATES PATENTS/i)).toBeInTheDocument();
    expect(screen.getByText(/US 11,968,185/i)).toBeInTheDocument();
  });

  it('renders error hint for unknown command per contract', () => {
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView />
      </ViewModeProvider>
    );

    const input = screen.getByTestId('terminal-input');
    fireEvent.change(input, { target: { value: 'invalid_cmd' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText(/Command not found: 'invalid_cmd'/i)).toBeInTheDocument();
    expect(screen.getByText(/Type 'help' to view all available commands/i)).toBeInTheDocument();
  });

  it('clears log when clear command is executed', () => {
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView />
      </ViewModeProvider>
    );

    const input = screen.getByTestId('terminal-input');
    // First run help to populate log
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText(/Available commands:/i)).toBeInTheDocument();

    // Now run clear
    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.queryByText(/Available commands:/i)).not.toBeInTheDocument();
  });

  it('switches mode to editorial when gui command or return button is clicked', () => {
    const onSwitchGui = vi.fn();
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView onSwitchGui={onSwitchGui} />
      </ViewModeProvider>
    );

    const returnBtn = screen.getByRole('button', { name: /return to executive view/i });
    fireEvent.click(returnBtn);
    expect(onSwitchGui).toHaveBeenCalled();
  });

  it('navigates history with Up and Down arrow keys', () => {
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView />
      </ViewModeProvider>
    );

    const input = screen.getByTestId('terminal-input');

    // Run first command
    fireEvent.change(input, { target: { value: 'bio' } });
    fireEvent.submit(input.closest('form')!);

    // Run second command
    fireEvent.change(input, { target: { value: 'skills' } });
    fireEvent.submit(input.closest('form')!);

    // Press Up arrow: should get 'skills'
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('skills');

    // Press Up arrow again: should get 'bio'
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('bio');

    // Press Down arrow: should get 'skills'
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('skills');

    // Press Down arrow again: should return to empty
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('');
  });

  it('executes command when clicking a command chip', () => {
    render(
      <ViewModeProvider initialMode="terminal">
        <TerminalView />
      </ViewModeProvider>
    );

    const eduChip = screen.getByRole('button', { name: /run command edu/i });
    fireEvent.click(eduChip);

    expect(screen.getByText(/ACADEMIC FOUNDATIONS & DEGREES/i)).toBeInTheDocument();
    expect(screen.getByText(/Doctor of Philosophy \(PhD\)/i)).toBeInTheDocument();
  });
});

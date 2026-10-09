import { describe, it, expect } from 'vitest';
import { parseCommand, dispatchCommand } from '../../src/terminal/commandParser';

describe('Command Parser and Dispatch Router (T036)', () => {
  describe('parseCommand', () => {
    it('handles empty string and whitespace', () => {
      expect(parseCommand('')).toEqual({ raw: '', command: '', args: [] });
      expect(parseCommand('   ')).toEqual({ raw: '   ', command: '', args: [] });
    });

    it('parses single command with lowercase normalization', () => {
      const parsed = parseCommand('HELP');
      expect(parsed.command).toBe('help');
      expect(parsed.args).toEqual([]);
    });

    it('parses command with multiple arguments and whitespace trimming', () => {
      const parsed = parseCommand('  exp   linkedin   adtech  ');
      expect(parsed.command).toBe('exp');
      expect(parsed.args).toEqual(['linkedin', 'adtech']);
      expect(parsed.raw).toBe('  exp   linkedin   adtech  ');
    });
  });

  describe('dispatchCommand', () => {
    it('dispatches help command with output', () => {
      const result = dispatchCommand('help');
      expect(result.action).toBe('output');
      expect(result.command).toBe('help');
      expect(result.output).toContain('Available commands:');
      expect(result.output).toContain('bio');
      expect(result.output).toContain('gui');
    });

    it('dispatches bio command', () => {
      const result = dispatchCommand('BIO');
      expect(result.action).toBe('output');
      expect(result.command).toBe('bio');
      expect(result.output).toContain('KIRILL LEBEDEV, PhD');
      expect(result.output).toContain('Director of Engineering');
    });

    it('dispatches exp command without filter', () => {
      const result = dispatchCommand('exp');
      expect(result.action).toBe('output');
      expect(result.command).toBe('exp');
      expect(result.output).toContain('LINKEDIN');
      expect(result.output).toContain('ORGANIZER INC.');
    });

    it('dispatches exp command with company filter', () => {
      const result = dispatchCommand('exp linkedin');
      expect(result.action).toBe('output');
      expect(result.command).toBe('exp');
      expect(result.args).toEqual(['linkedin']);
      expect(result.output).toContain('LINKEDIN');
      expect(result.output).not.toContain('ORGANIZER INC.');
    });

    it('dispatches exp command with non-matching filter', () => {
      const result = dispatchCommand('exp nonexistentcompany');
      expect(result.action).toBe('output');
      expect(result.output).toContain('No career entries found');
    });

    it('dispatches patents command', () => {
      const result = dispatchCommand('patents');
      expect(result.action).toBe('output');
      expect(result.command).toBe('patents');
      expect(result.output).toContain('US 11,968,185');
      expect(result.output).toContain('US 11,232,254');
      expect(result.output).toContain('US 11,102,534');
    });

    it('dispatches edu command', () => {
      const result = dispatchCommand('edu');
      expect(result.action).toBe('output');
      expect(result.command).toBe('edu');
      expect(result.output).toContain('Irkutsk National Research Technical University');
      expect(result.output).toContain('PhD');
      expect(result.output).toContain('Summa cum laude');
    });

    it('dispatches skills command', () => {
      const result = dispatchCommand('skills');
      expect(result.action).toBe('output');
      expect(result.command).toBe('skills');
      expect(result.output).toContain('EXECUTIVE LEADERSHIP');
      expect(result.output).toContain('Bayesian');
    });

    it('dispatches contact command', () => {
      const result = dispatchCommand('contact');
      expect(result.action).toBe('output');
      expect(result.command).toBe('contact');
      expect(result.output).toContain('kirill@drlebedev.com');
      expect(result.output).toContain('+1 (415) 799-9995');
      expect(result.output).toContain('https://www.linkedin.com/in/drlebedev/');
    });

    it('dispatches gui command with gui action', () => {
      const result = dispatchCommand('gui');
      expect(result.action).toBe('gui');
      expect(result.command).toBe('gui');
    });

    it('dispatches clear command with clear action', () => {
      const result = dispatchCommand('clear');
      expect(result.action).toBe('clear');
      expect(result.command).toBe('clear');
    });

    it('returns error hint for unknown command per contract', () => {
      const result = dispatchCommand('foo_bar_unknown');
      expect(result.action).toBe('error');
      expect(result.command).toBe('foo_bar_unknown');
      expect(result.output).toContain("Command not found: 'foo_bar_unknown'");
      expect(result.output).toContain("Type 'help' to view all available commands.");
      expect(result.output).toContain('Click any command chip below for fast navigation.');
    });
  });
});

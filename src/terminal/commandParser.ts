import {
  formatHelp,
  formatBio,
  formatExp,
  formatPatents,
  formatEdu,
  formatSkills,
  formatContact,
  formatUnknown,
} from './formatters';

export type CommandActionType = 'output' | 'clear' | 'gui' | 'error';

export interface CommandResult {
  action: CommandActionType;
  output: string;
  command: string;
  args: string[];
}

export interface ParsedCommand {
  raw: string;
  command: string;
  args: string[];
}

/**
 * Maximum permitted characters in a single console input string.
 * Prevents memory bloat, ReDoS, and CPU resource starvation.
 */
export const MAX_INPUT_LENGTH = 256;

/**
 * Sanitizes raw user input by:
 * 1. Enforcing maximum length boundaries
 * 2. Stripping ASCII control characters (null bytes, backspaces, bell, etc.)
 * 3. Stripping Unicode Bidirectional (BiDi) override control characters (U+202A - U+202E, U+2066 - U+2069)
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  // Enforce boundary length limit
  const bounded = input.length > MAX_INPUT_LENGTH ? input.slice(0, MAX_INPUT_LENGTH) : input;

  return bounded
    // Strip ASCII control characters (0x00-0x1F, 0x7F) excluding standard whitespace (space, tab, newline)
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip Unicode Bidirectional text override characters that can disguise filenames or spoof prompts
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, '');
}

/**
 * Parses raw user input into command and arguments.
 * Trims leading/trailing whitespace, strips dangerous control characters,
 * limits string length, and normalizes command to lowercase.
 */
export function parseCommand(rawInput: string): ParsedCommand {
  const sanitized = sanitizeInput(rawInput);
  const trimmed = sanitized.trim();

  if (!trimmed) {
    return { raw: sanitized, command: '', args: [] };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  return { raw: sanitized, command, args };
}

/**
 * Dispatches parsed command to corresponding handler and returns formatted output.
 * Uses a strict whitelist switch-case to prevent object prototype pollution.
 */
export function dispatchCommand(rawInput: string): CommandResult {
  const { command, args } = parseCommand(rawInput);

  if (!command) {
    return { action: 'output', output: '', command: '', args: [] };
  }

  // Explicit command dispatch whitelist
  switch (command) {
    case 'help':
      return { action: 'output', output: formatHelp(), command, args };
    case 'bio':
      return { action: 'output', output: formatBio(), command, args };
    case 'exp':
      return { action: 'output', output: formatExp(args.join(' ')), command, args };
    case 'patents':
      return { action: 'output', output: formatPatents(), command, args };
    case 'edu':
      return { action: 'output', output: formatEdu(), command, args };
    case 'skills':
      return { action: 'output', output: formatSkills(), command, args };
    case 'contact':
      return { action: 'output', output: formatContact(), command, args };
    case 'gui':
      return { action: 'gui', output: 'Switching to Executive Graphical Interface...', command, args };
    case 'clear':
      return { action: 'clear', output: '', command, args };
    default:
      return { action: 'error', output: formatUnknown(command), command, args };
  }
}

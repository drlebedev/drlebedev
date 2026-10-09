import { describe, it, expect } from 'vitest';
import { parseCommand, dispatchCommand, sanitizeInput } from '../../src/terminal/commandParser';
import { formatExp } from '../../src/terminal/formatters';

describe('Web Console Adversarial Security & Injection Defense', () => {
  describe('Input Sanitization & Control Character Neutralization', () => {
    it('strips null bytes and non-printable control characters', () => {
      const malicious = 'help\x00\x08\x1b[31m\x07';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).toBe('help[31m');
      expect(sanitized).not.toContain('\x00');
      expect(sanitized).not.toContain('\x08');
      expect(sanitized).not.toContain('\x07');
    });

    it('neutralizes Unicode Bidirectional (BiDi) override spoofing characters', () => {
      // U+202E is Right-to-Left Override used to disguise file names / output
      const bidiPayload = 'exp \u202Ereversed_company';
      const sanitized = sanitizeInput(bidiPayload);
      expect(sanitized).toBe('exp reversed_company');
      expect(sanitized).not.toContain('\u202E');
    });

    it('enforces maximum input length to prevent Memory/CPU exhaustion DoS', () => {
      const hugeInput = 'a'.repeat(50000);
      const parsed = parseCommand(hugeInput);
      expect(parsed.raw.length).toBeLessThanOrEqual(256);
      expect(parsed.command.length).toBeLessThanOrEqual(256);
    });

    it('handles whitespace flooding and ReDoS attempts safely in linear time', () => {
      const whitespaceFlood = '   \t   \r\n   '.repeat(5000);
      const startTime = performance.now();
      const parsed = parseCommand(whitespaceFlood);
      const elapsed = performance.now() - startTime;
      expect(parsed.command).toBe('');
      expect(elapsed).toBeLessThan(100); // Must resolve in < 100ms
    });
  });

  describe('XSS & HTML/Script Injection Neutralization', () => {
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert(1)>',
      '<svg/onload=alert(document.cookie)>',
      '"><script>alert(1)</script>',
      'javascript:alert(1)',
      '<iframe src="javascript:alert(1)"></iframe>',
      '"><img src="x" onerror="evil()"/>',
    ];

    it.each(xssPayloads)('safely handles XSS payload as literal unknown command: %s', (payload) => {
      const result = dispatchCommand(payload);
      expect(result.action).toBe('error');
      // Output must treat payload as plain text and not execute or mangle structure
      expect(result.output).toContain("Command not found: '");
      // Result should be sanitized plain text
      expect(typeof result.output).toBe('string');
    });

    it('safely handles XSS payloads inside command arguments (e.g. exp <script>)', () => {
      const result = dispatchCommand('exp <script>alert(1)</script>');
      expect(result.action).toBe('output');
      expect(result.output).toContain('No career entries found matching query');
      expect(result.output).toContain('<script>alert(1)</script>');
      // Confirmed returned as plain string to be rendered as safe text node in JSX
    });
  });

  describe('Command Injection & Shell Metacharacters', () => {
    const shellPayloads = [
      'help; rm -rf /',
      'help && echo hacked',
      'help | cat /etc/passwd',
      'help `whoami`',
      'help $(id)',
      'help \n cat /etc/shadow',
      '|| dir',
      '& ping -c 1 127.0.0.1 &',
    ];

    it.each(shellPayloads)('treats shell metacharacter payloads as literal string without execution: %s', (payload) => {
      const result = dispatchCommand(payload);
      // The parser normalizes the first token, shell metacharacters don't trigger command chaining
      if (result.command === 'help') {
        expect(result.action).toBe('output');
        expect(result.output).toContain('Available commands:');
      } else {
        expect(result.action).toBe('error');
      }
    });
  });

  describe('Prototype Pollution & Object Property Injection', () => {
    const protoPayloads = [
      '__proto__',
      'constructor',
      'prototype',
      'toString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
    ];

    it.each(protoPayloads)('handles JavaScript object prototype names safely: %s', (payload) => {
      const result = dispatchCommand(payload);
      expect(result.action).toBe('error');
      expect(result.output).toContain(`Command not found: '${payload.toLowerCase()}'`);
      // Verify global Object prototype is not polluted
      expect((Object.prototype as any).polluted).toBeUndefined();
    });
  });

  describe('Formatters Defense against Path Traversal & Injection', () => {
    it('handles path traversal strings in exp company query safely', () => {
      const traversal = '../../../../etc/passwd';
      const output = formatExp(traversal);
      expect(output).toContain('No career entries found matching query: "../../../../etc/passwd"');
    });

    it('handles SQL injection patterns in exp company query safely', () => {
      const sqli = "' OR '1'='1' --";
      const output = formatExp(sqli);
      expect(output).toContain("No career entries found matching query: \"' OR '1'='1' --\"");
    });
  });
});

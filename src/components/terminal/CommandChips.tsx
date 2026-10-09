import React from 'react';

export interface CommandChip {
  id: string;
  label: string;
  description?: string;
  variant?: 'gold' | 'emerald' | 'muted';
}

export const DEFAULT_COMMANDS: CommandChip[] = [
  { id: 'help', label: 'help', variant: 'gold' },
  { id: 'bio', label: 'bio', variant: 'emerald' },
  { id: 'exp', label: 'exp', variant: 'emerald' },
  { id: 'patents', label: 'patents', variant: 'emerald' },
  { id: 'edu', label: 'edu', variant: 'emerald' },
  { id: 'skills', label: 'skills', variant: 'emerald' },
  { id: 'contact', label: 'contact', variant: 'emerald' },
  { id: 'gui', label: 'gui', variant: 'gold' },
  { id: 'clear', label: 'clear', variant: 'muted' },
];

export interface CommandChipsProps {
  onSelectCommand: (command: string) => void;
  commands?: CommandChip[];
}

export const CommandChips: React.FC<CommandChipsProps> = ({
  onSelectCommand,
  commands = DEFAULT_COMMANDS,
}) => {
  return (
    <div
      id="command-chips"
      data-testid="command-chips"
      className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 border-y border-white/10 my-1 sm:my-2 select-none overflow-x-auto overscroll-contain no-scrollbar sm:flex-wrap"
      role="toolbar"
      aria-label="Terminal command shortcuts"
    >
      <span className="text-on-surface-variant text-xs font-mono font-medium mr-1 uppercase tracking-wider">
        COMMANDS:
      </span>
      {commands.map((cmd) => {
        let variantClasses =
          'text-emerald-accent border-emerald-accent/30 bg-[#0e1e38] hover:bg-emerald-accent/20 active:bg-emerald-accent/30';

        if (cmd.variant === 'gold') {
          variantClasses =
            'text-gold-light border-gold-prestige/40 bg-[#0e1e38] hover:bg-gold-light/20 active:bg-gold-light/30';
        } else if (cmd.variant === 'muted') {
          variantClasses =
            'text-on-surface-variant border-white/20 bg-[#0e1e38] hover:bg-white/10 active:bg-white/20';
        }

        return (
          <button
            key={cmd.id}
            type="button"
            onClick={() => onSelectCommand(cmd.id)}
            aria-label={`Run command ${cmd.label}`}
            className={`min-h-[36px] sm:min-h-[28px] px-3 py-1 sm:px-2.5 sm:py-0.5 rounded font-mono text-xs font-medium border transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-emerald-accent ${variantClasses}`}
          >
            {cmd.label}
          </button>
        );
      })}
    </div>
  );
};

export default CommandChips;

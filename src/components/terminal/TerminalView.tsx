import React, { useState, useEffect, useRef } from 'react';
import { useViewMode } from '../../context/ViewModeContext';
import { dispatchCommand } from '../../terminal/commandParser';
import { CommandChips } from './CommandChips';

interface LogItem {
  id: string;
  command: string;
  output: string;
  isError?: boolean;
}

export interface TerminalViewProps {
  onSwitchGui?: () => void;
}

const MAX_LOG_ENTRIES = 100;
const MAX_HISTORY = 50;

export const TerminalView: React.FC<TerminalViewProps> = ({ onSwitchGui }) => {
  const { setActiveMode } = useViewMode();
  const [inputVal, setInputVal] = useState('');
  const [log, setLog] = useState<LogItem[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const screenEndRef = useRef<HTMLDivElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll when log changes
  useEffect(() => {
    if (typeof screenEndRef.current?.scrollIntoView === 'function') {
      screenEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [log]);

  const handleReturnToGui = () => {
    if (onSwitchGui) {
      onSwitchGui();
    }
    setActiveMode('editorial');
  };

  // Keyboard shortcut listener for Escape and backtick
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleReturnToGui();
      } else if (e.key === '`' || e.key === '~') {
        // Only toggle if not currently typing inside input
        if (document.activeElement !== inputRef.current) {
          e.preventDefault();
          handleReturnToGui();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSwitchGui, setActiveMode]);

  const executeCommandString = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Add to history with rolling cap to prevent memory leaks
    setHistory((prev) => {
      const updated = [...prev, trimmed];
      return updated.length > MAX_HISTORY ? updated.slice(updated.length - MAX_HISTORY) : updated;
    });
    setHistoryIndex(null);

    const result = dispatchCommand(trimmed);

    if (result.action === 'gui') {
      handleReturnToGui();
      return;
    }

    if (result.action === 'clear') {
      setLog([]);
      return;
    }

    // Append to log with rolling cap to prevent client-side DOM memory exhaustion
    setLog((prev) => {
      const newEntry: LogItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        command: trimmed,
        output: result.output,
        isError: result.action === 'error',
      };
      const updated = [...prev, newEntry];
      return updated.length > MAX_LOG_ENTRIES
        ? updated.slice(updated.length - MAX_LOG_ENTRIES)
        : updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmdToRun = inputVal;
    setInputVal('');
    executeCommandString(cmdToRun);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;

      const nextIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIndex === null) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      } else {
        setHistoryIndex(null);
        setInputVal('');
      }
    }
  };

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      id="cli-view-container"
      role="region"
      aria-label="Web Console Terminal"
      className="fixed inset-0 z-50 bg-[#050b14]/95 pt-16 sm:pt-20 pb-4 px-3 sm:px-6 overflow-y-auto crt-overlay backdrop-blur-md flex flex-col"
      onClick={handleFocusInput}
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col flex-1 justify-between">
        {/* Terminal Chassis */}
        <div className="w-full bg-[#081324] border border-emerald-accent/40 rounded-lg shadow-[0_0_50px_rgba(59,130,246,0.18)] overflow-hidden flex flex-col flex-1">
          {/* Terminal Window Header Bar */}
          <div className="bg-[#0f1f3a] px-4 py-3 border-b border-emerald-accent/30 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-accent inline-block" />
              <span className="font-mono text-xs text-gold-light font-medium ml-2">
                kirill@silicon-valley:~ (CAUSAL-V8.4-PROD)
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleReturnToGui();
              }}
              className="px-3 py-1 bg-emerald-accent/20 hover:bg-emerald-accent hover:text-[#050b14] text-emerald-accent font-mono text-xs rounded transition-all flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-accent cursor-pointer"
            >
              <span>Return to Executive View [ESC]</span>
            </button>
          </div>

          {/* Terminal Phosphor Screen */}
          <div
            id="cli-screen"
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm flex flex-col gap-3 overflow-y-auto flex-1 text-on-surface bg-[#081324]"
          >
            {/* System Banner */}
            <div className="text-gold-light font-mono text-[11px] sm:text-xs leading-tight select-none">
              ********************************************************************************<br />
              &nbsp;KIRILL LEBEDEV, PhD • APPLIED SYSTEMS WORKSTATION<br />
              &nbsp;Respected AI Executive Leader • Scaled Distributed Systems &amp; Causal AI<br />
              ********************************************************************************
            </div>
            <div className="text-on-surface-variant text-[11px] select-none">
              Active Node: SF Bay Area • Enclave: SMPC-Privacy-Guaranteed (ε ≤ 0.48)
            </div>

            {/* Quick Command Chips Toolbar */}
            <div onClick={(e) => e.stopPropagation()}>
              <CommandChips onSelectCommand={executeCommandString} />
            </div>

            {/* Initial System Summary */}
            <div className="flex flex-col gap-1 text-xs">
              <div className="text-gold-light">
                kirill@silicon-valley:~$ <span className="text-on-surface">dossier.summary</span>
              </div>
              <div className="text-emerald-accent pl-3 space-y-0.5">
                <div>• ROLE: Director of Engineering &amp; Head of Ads Measurement @ LinkedIn</div>
                <div>• SCOPE: $1.0B+ Measurement Line | 70+ Person Scientific Org | 8 Engineering Managers</div>
                <div>• CORE IP: US Patents 11,968,185 | 11,232,254 | 11,102,534</div>
                <div>• DOCTORATE: PhD in Computer Science, INRTU (Summa cum laude)</div>
              </div>
            </div>

            {/* Command Log */}
            <div id="cli-log" className="flex flex-col gap-4 mt-2">
              {log.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="text-gold-light">
                    kirill@silicon-valley:~$ <span className="text-on-surface">{item.command}</span>
                  </div>
                  <pre
                    className={`pl-1 sm:pl-3 whitespace-pre-wrap font-mono text-xs leading-relaxed ${
                      item.isError ? 'text-amber-400' : 'text-emerald-accent'
                    }`}
                  >
                    {item.output}
                  </pre>
                </div>
              ))}
            </div>

            {/* Interactive Prompt Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 text-gold-light pt-4 mt-auto border-t border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="shrink-0 text-emerald-accent font-semibold select-none">
                kirill@silicon-valley:~$
              </span>
              <input
                ref={inputRef}
                id="cli-input-field"
                data-testid="terminal-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'exp', 'patents', 'edu', 'contact', 'gui'..."
                autoComplete="off"
                spellCheck={false}
                maxLength={256}
                className="flex-1 bg-transparent text-emerald-accent focus:outline-none font-mono text-xs sm:text-sm placeholder-on-surface-variant/50 caret-emerald-accent"
              />
              <span className="w-2 h-4 bg-emerald-accent animate-pulse inline-block" aria-hidden="true" />
            </form>
            <div ref={screenEndRef} />
          </div>

          {/* Terminal Footer Bar */}
          <div className="bg-[#050b14] px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-on-surface-variant select-none">
            <div>CRYPTO_ENCLAVE: DIFFERENTIAL_PRIVACY_VERIFIED</div>
            <div>PRESS &apos;ESC&apos; OR TYPE &apos;gui&apos; TO EXIT</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalView;

import React from 'react';
import { ViewModeProvider, useViewMode } from './context/ViewModeContext';
import { ExecutiveView } from './components/executive/ExecutiveView';

const MainContent: React.FC = () => {
  const { activeMode, setActiveMode } = useViewMode();

  return (
    <div className="relative min-h-screen bg-forest-noir text-on-surface">
      {/* Executive Graphical UI View */}
      <ExecutiveView />

      {/* Terminal View Overlay Stub for Phase 5 (until Phase 6 completes US2) */}
      {activeMode === 'terminal' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#050b14]/95 backdrop-blur-md pt-20 px-4 flex flex-col items-center justify-center scanline-overlay"
        >
          <div className="w-full max-w-3xl bg-[#081324] border border-emerald-accent/50 rounded-lg p-6 shadow-2xl font-mono text-sm space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-accent/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-accent inline-block"></span>
                <span className="text-gold-light font-medium ml-2">
                  kirill@ads-attribution:~ (SYSTEM-READY)
                </span>
              </div>
              <button
                onClick={() => setActiveMode('editorial')}
                className="px-3 py-1 bg-emerald-accent/20 hover:bg-emerald-accent hover:text-[#050b14] text-emerald-accent text-xs rounded transition-all"
              >
                Return to Executive View [ESC]
              </button>
            </div>
            <div className="text-emerald-accent space-y-2">
              <p className="text-gold-light">
                [SYSTEM NOTICE]: Phase 5 Executive Graphical MVP is fully deployed and active.
              </p>
              <p>
                Interactive Web Console Terminal UI will be delivered in Phase 6 (User Story 2).
              </p>
              <p className="text-on-surface-variant text-xs pt-2">
                Click &quot;Return to Executive View&quot; above to explore the complete Executive Dossier, career trajectory, patents, and academic credentials.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ViewModeProvider>
      <MainContent />
    </ViewModeProvider>
  );
};

export default App;

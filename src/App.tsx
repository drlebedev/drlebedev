import React from 'react';
import { ViewModeProvider, useViewMode } from './context/ViewModeContext';
import { ExecutiveView } from './components/executive/ExecutiveView';
import { TerminalView } from './components/terminal/TerminalView';
import { MetaTags } from './components/seo/MetaTags';

const MainContent: React.FC = () => {
  const { activeMode } = useViewMode();

  return (
    <div className="relative min-h-screen bg-forest-noir text-on-surface">
      {/* Executive Graphical UI View */}
      <ExecutiveView />

      {/* Terminal View Overlay for Technical Exploration (Phase 6 / US2) */}
      {activeMode === 'terminal' && <TerminalView />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ViewModeProvider>
      <MetaTags />
      <MainContent />
    </ViewModeProvider>
  );
};

export default App;

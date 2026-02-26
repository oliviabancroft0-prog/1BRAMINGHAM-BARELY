import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import SanctumPage from './pages/SanctumPage';
import InnovationPage from './pages/InnovationPage';
import { ApplyModal } from './components/ApplyModal';

export default function App() {
  const [view, setView] = useState<'landing' | 'sanctum' | 'innovation'>('landing');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | undefined>(undefined);

  const handleApply = (tier?: string) => {
    setSelectedTier(tier);
    setIsApplyModalOpen(true);
  };

  return (
    <main className="relative">
      {view === 'landing' && (
        <LandingPage 
          onEnter={() => setView('sanctum')} 
          onInnovation={() => setView('innovation')}
          onApply={() => handleApply()}
        />
      )}
      {view === 'sanctum' && (
        <SanctumPage 
          onBack={() => setView('landing')} 
          onApply={(tier) => handleApply(tier)}
        />
      )}
      {view === 'innovation' && (
        <InnovationPage onBack={() => setView('landing')} />
      )}

      <ApplyModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        initialTier={selectedTier}
      />
    </main>
  );
}

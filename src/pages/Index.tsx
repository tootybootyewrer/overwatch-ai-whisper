import { useState } from 'react';
import { DropZone } from '@/components/DropZone';
import { CoachPanel } from '@/components/CoachPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { HistoryPanel } from '@/components/HistoryPanel';

interface PlayerStats {
  level: number;
  rank: string;
  gamesPlayed: number;
  winRate: number;
}

interface HistoryItem {
  id: string;
  fileName: string;
  fileType: 'video' | 'image';
  advice: string;
  timestamp: Date;
}

const Index = () => {
  const [coachAdvice, setCoachAdvice] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCoachLoading, setIsCoachLoading] = useState(false);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Mock file processing - in real app this would send to backend
  const handleFileProcess = async (file: File) => {
    setIsProcessing(true);
    setIsCoachLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const mockAdvice = `Great analysis of your ${file.type.includes('video') ? 'gameplay clip' : 'screenshot'}! Here are some key insights:

• **Positioning**: Try to stay behind cover more often, especially when engaging enemies at medium range.

• **Cooldown Management**: You used your abilities well, but consider saving your escape ability for disengaging rather than engaging.

• **Target Priority**: Focus on eliminating supports first - Ana and Mercy should be primary targets.

• **Team Coordination**: Your timing with team pushes was good, but communicate ultimate status more frequently.

• **Mechanical Skills**: Your aim is solid, but work on pre-aiming common angles to reduce reaction time.

Keep practicing these fundamentals and you'll see improvement in your next matches!`;

      setCoachAdvice(mockAdvice);
      setIsProcessing(false);
      setIsCoachLoading(false);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        fileName: file.name,
        fileType: file.type.includes('video') ? 'video' : 'image',
        advice: mockAdvice,
        timestamp: new Date(),
      };

      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep last 10 items
    }, 3000);
  };

  // Mock stats fetching - in real app this would call Overwatch API
  const handleFetchStats = async (battleTag: string) => {
    setIsStatsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const mockStats: PlayerStats = {
        level: 423,
        rank: 'Diamond 3',
        gamesPlayed: 147,
        winRate: 68,
      };

      setPlayerStats(mockStats);
      setIsStatsLoading(false);
    }, 2000);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setCoachAdvice(item.advice);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-gaming">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Overwatch AI Coach
            </h1>
            <p className="text-muted-foreground">
              Elevate your gameplay with AI-powered coaching insights
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - File Drop & Coach Panel */}
          <div className="lg:col-span-2 space-y-8">
            <DropZone 
              onFileProcess={handleFileProcess}
              isProcessing={isProcessing}
            />
            
            <CoachPanel 
              advice={coachAdvice}
              isLoading={isCoachLoading}
            />
          </div>

          {/* Right Column - Stats & History */}
          <div className="space-y-8">
            <StatsPanel
              onFetchStats={handleFetchStats}
              stats={playerStats}
              isLoading={isStatsLoading}
            />
            
            <HistoryPanel
              history={history}
              onSelectHistory={handleSelectHistory}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-gradient-gaming mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by local AI • No cloud dependency • Your data stays private</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

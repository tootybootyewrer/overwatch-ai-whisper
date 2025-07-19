import { useState } from 'react';
import { Search, Trophy, Target, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PlayerStats {
  level: number;
  rank: string;
  gamesPlayed: number;
  winRate: number;
}

interface StatsPanelProps {
  onFetchStats: (battleTag: string) => void;
  stats: PlayerStats | null;
  isLoading: boolean;
}

export function StatsPanel({ onFetchStats, stats, isLoading }: StatsPanelProps) {
  const [battleTag, setBattleTag] = useState('');
  const { toast } = useToast();

  const handleFetch = () => {
    if (!battleTag.trim()) {
      toast({
        title: "BattleTag required",
        description: "Please enter your BattleTag (e.g., Player#1234)",
        variant: "destructive",
      });
      return;
    }

    onFetchStats(battleTag);
    toast({
      title: "Fetching stats...",
      description: `Looking up ${battleTag}`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <Card className="bg-gradient-secondary/10 border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Trophy className="h-5 w-5" />
          Live Overwatch Stats
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter BattleTag (e.g., Player#1234)"
            value={battleTag}
            onChange={(e) => setBattleTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleFetch}
            disabled={isLoading}
            className="gap-2"
          >
            <Search className="h-4 w-4" />
            {isLoading ? 'Fetching...' : 'Fetch'}
          </Button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                Level
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.level}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4" />
                Competitive Rank
              </div>
              <Badge variant="secondary" className="text-sm font-semibold">
                {stats.rank}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Games Played
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.gamesPlayed}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Win Rate
              </div>
              <div className="text-2xl font-bold text-accent">{stats.winRate}%</div>
            </div>
          </div>
        )}

        {!stats && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your BattleTag to view live Overwatch statistics</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
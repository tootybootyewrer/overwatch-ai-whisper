import { useState } from 'react';
import { Copy, CheckCheck, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import coachMascot from '@/assets/coach-mascot.png';

interface CoachPanelProps {
  advice: string;
  isLoading?: boolean;
}

export function CoachPanel({ advice, isLoading = false }: CoachPanelProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(advice);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Coaching advice copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy advice to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gradient-gaming border-primary/20">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={coachMascot} 
              alt="Coach Echo" 
              className="w-16 h-16 rounded-full ring-2 ring-primary/50 shadow-gaming"
            />
            {!isLoading && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full animate-pulse" />
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-primary">
              <MessageSquare className="h-5 w-5" />
              Coach Echo Says:
            </CardTitle>
            <p className="text-sm text-muted-foreground">AI-powered coaching analysis</p>
          </div>
          {advice && !isLoading && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <CheckCheck className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        ) : advice ? (
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {advice}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Upload a gameplay clip or screenshot to get personalized coaching advice!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
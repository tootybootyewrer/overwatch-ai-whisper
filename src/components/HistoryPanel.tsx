import { Clock, FileVideo, FileImage, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface HistoryItem {
  id: string;
  fileName: string;
  fileType: 'video' | 'image';
  advice: string;
  timestamp: Date;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
}

export function HistoryPanel({ history, onSelectHistory }: HistoryPanelProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFileIcon = (type: 'video' | 'image') => {
    return type === 'video' ? FileVideo : FileImage;
  };

  return (
    <Card className="bg-gradient-gaming border-accent/20 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Clock className="h-5 w-5" />
          Coaching History
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {history.length > 0 ? (
            <div className="space-y-2 p-4">
              {history.map((item) => {
                const FileIcon = getFileIcon(item.fileType);
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full h-auto p-4 justify-start hover:bg-accent/10"
                    onClick={() => onSelectHistory(item)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <FileIcon className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      
                      <div className="flex-1 text-left space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {item.fileName}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {formatTime(item.timestamp)}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.advice}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 px-4 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No coaching sessions yet</p>
              <p className="text-xs mt-1">Upload files to build your history</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
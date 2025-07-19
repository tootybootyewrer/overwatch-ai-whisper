import { useCallback, useState } from 'react';
import { Upload, FileVideo, FileImage, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DropZoneProps {
  onFileProcess: (file: File) => void;
  isProcessing: boolean;
}

export function DropZone({ onFileProcess, isProcessing }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => 
      file.type.match(/^(video|image)\/(mp4|wav|png|jpg|jpeg)$/)
    );

    if (validFile) {
      onFileProcess(validFile);
      toast({
        title: "File received!",
        description: `Processing ${validFile.name}...`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please drop .mp4, .wav, .png, or .jpg files only.",
        variant: "destructive",
      });
    }
  }, [onFileProcess, toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileProcess(file);
      toast({
        title: "File received!",
        description: `Processing ${file.name}...`,
      });
    }
  }, [onFileProcess, toast]);

  return (
    <Card 
      className={`
        relative overflow-hidden border-2 border-dashed transition-all duration-300
        ${isDragOver 
          ? 'border-primary bg-primary/5 shadow-gaming' 
          : 'border-border hover:border-primary/50'
        }
        ${isProcessing ? 'pointer-events-none opacity-75' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-12 text-center">
        {isProcessing ? (
          <div className="space-y-4">
            <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">Processing...</h3>
              <p className="text-muted-foreground">AI Coach is analyzing your gameplay</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              <FileVideo className="h-12 w-12 text-primary" />
              <Upload className="h-12 w-12 text-secondary" />
              <FileImage className="h-12 w-12 text-accent" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Drop Your Gameplay Here</h3>
              <p className="text-muted-foreground">
                Drag & drop clips (.mp4, .wav) or screenshots (.png, .jpg)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <label htmlFor="file-upload">
                <Button variant="default" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".mp4,.wav,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {isDragOver && (
        <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-pulse" />
      )}
    </Card>
  );
}
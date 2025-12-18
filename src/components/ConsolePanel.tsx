import { useRef, useEffect } from 'react';
import { Terminal, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { LogEntry } from '@/types/test';
import { ScrollArea } from './ui/scroll-area';

interface ConsolePanelProps {
  logs: LogEntry[];
  onClear: () => void;
}

const getLogColor = (level: LogEntry['level']) => {
  switch (level) {
    case 'success':
      return 'text-success';
    case 'warning':
      return 'text-warning';
    case 'error':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
};

const getLogPrefix = (level: LogEntry['level']) => {
  switch (level) {
    case 'success':
      return '[✓]';
    case 'warning':
      return '[!]';
    case 'error':
      return '[✗]';
    default:
      return '[i]';
  }
};

const ConsolePanel = ({ logs, onClear }: ConsolePanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Console de Logs</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-64">
        <div
          ref={scrollRef}
          className="p-4 font-mono text-sm space-y-1 bg-background/50"
        >
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-center py-8">
              En attente des logs d'exécution...
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className={`console-text ${getLogColor(log.level)}`}
              >
                <span className="text-muted-foreground">
                  [{log.timestamp.toLocaleTimeString()}]
                </span>{' '}
                <span className={getLogColor(log.level)}>
                  {getLogPrefix(log.level)}
                </span>{' '}
                {log.message}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConsolePanel;

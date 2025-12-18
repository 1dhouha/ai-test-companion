import { TestCase } from '@/types/test';
import { CheckCircle2, XCircle, Clock, Play, AlertTriangle, Sparkles, Bug } from 'lucide-react';
import { Badge } from './ui/badge';

interface TestCasesTableProps {
  testCases: TestCase[];
}

const getStatusIcon = (status?: TestCase['status']) => {
  switch (status) {
    case 'passed':
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'running':
      return <Play className="h-4 w-4 text-primary animate-pulse" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getTypeIcon = (type: TestCase['type']) => {
  switch (type) {
    case 'nominal':
      return <CheckCircle2 className="h-3 w-3" />;
    case 'edge_case':
      return <AlertTriangle className="h-3 w-3" />;
    case 'error':
      return <Bug className="h-3 w-3" />;
  }
};

const getTypeBadgeVariant = (type: TestCase['type']) => {
  switch (type) {
    case 'nominal':
      return 'bg-success/10 text-success border-success/20';
    case 'edge_case':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'error':
      return 'bg-destructive/10 text-destructive border-destructive/20';
  }
};

const TestCasesTable = ({ testCases }: TestCasesTableProps) => {
  if (testCases.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">Aucun cas de test</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Entrez une URL et une user story pour générer des cas de test avec l'IA
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-secondary/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cas de Test Générés</h2>
          <Badge variant="outline" className="font-mono">
            {testCases.length} tests
          </Badge>
        </div>
      </div>

      <div className="divide-y divide-border">
        {testCases.map((test, index) => (
          <div
            key={test.id}
            className="p-4 hover:bg-secondary/20 transition-colors"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-1">
                {getStatusIcon(test.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-muted-foreground">#{test.id}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getTypeBadgeVariant(test.type)}`}
                  >
                    {getTypeIcon(test.type)}
                    <span className="ml-1 capitalize">{test.type.replace('_', ' ')}</span>
                  </Badge>
                </div>
                
                <h3 className="font-medium text-foreground mb-1">{test.name}</h3>
                <p className="text-sm text-muted-foreground">{test.description}</p>

                {test.steps.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {test.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="flex-shrink-0 font-mono text-primary">{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {test.error && (
                  <div className="mt-3 rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                    <p className="text-sm text-destructive font-mono">{test.error}</p>
                  </div>
                )}

                {test.duration !== undefined && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Durée: {test.duration}ms
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCasesTable;

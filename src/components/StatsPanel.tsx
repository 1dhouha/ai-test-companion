import { CheckCircle2, XCircle, Clock, Activity } from 'lucide-react';

interface StatsPanelProps {
  stats: {
    total: number;
    passed: number;
    failed: number;
    pending: number;
  };
}

const StatsPanel = ({ stats }: StatsPanelProps) => {
  const successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Tests</p>
          </div>
        </div>
      </div>

      {/* Passed */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-success">{stats.passed}</p>
            <p className="text-xs text-muted-foreground">Réussis</p>
          </div>
        </div>
      </div>

      {/* Failed */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
            <XCircle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-bold text-destructive">{stats.failed}</p>
            <p className="text-xs text-muted-foreground">Échoués</p>
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">En attente</p>
          </div>
        </div>
      </div>

      {/* Success Rate Bar */}
      {stats.total > 0 && (
        <div className="col-span-2 lg:col-span-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Taux de réussite</span>
            <span className="text-sm font-bold text-primary">{successRate}%</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;

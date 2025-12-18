import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ResultsChartProps {
  passed: number;
  failed: number;
  pending: number;
}

const ResultsChart = ({ passed, failed, pending }: ResultsChartProps) => {
  const data = [
    { name: 'Réussis', value: passed, color: 'hsl(142, 76%, 45%)' },
    { name: 'Échoués', value: failed, color: 'hsl(0, 72%, 51%)' },
    { name: 'En attente', value: pending, color: 'hsl(215, 20%, 55%)' },
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-center h-64">
        <p className="text-muted-foreground text-sm">Aucune donnée à afficher</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-medium mb-4">Distribution des Résultats</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 18%, 12%)',
              border: '1px solid hsl(220, 15%, 22%)',
              borderRadius: '8px',
              color: 'hsl(210, 40%, 98%)',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            formatter={(value) => <span className="text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;

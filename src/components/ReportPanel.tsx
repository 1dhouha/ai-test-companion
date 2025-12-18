import { FileText, Download, FileCode } from 'lucide-react';
import { Button } from './ui/button';
import { TestCase } from '@/types/test';

interface ReportPanelProps {
  testCases: TestCase[];
  url: string;
  userStory: string;
}

const ReportPanel = ({ testCases, url, userStory }: ReportPanelProps) => {
  const generateHTMLReport = () => {
    const passed = testCases.filter(t => t.status === 'passed').length;
    const failed = testCases.filter(t => t.status === 'failed').length;
    const total = testCases.length;
    const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Rapport de Tests - TestGenius</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #0f1419; color: #e7e9ea; padding: 2rem; }
    .header { text-align: center; margin-bottom: 2rem; }
    .header h1 { color: #00d4ff; font-size: 2rem; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .stat { background: #1c2128; border-radius: 12px; padding: 1.5rem; text-align: center; }
    .stat-value { font-size: 2rem; font-weight: bold; }
    .stat-label { font-size: 0.875rem; color: #8b949e; margin-top: 0.5rem; }
    .passed { color: #3fb950; }
    .failed { color: #f85149; }
    .tests { background: #1c2128; border-radius: 12px; overflow: hidden; }
    .test { padding: 1rem; border-bottom: 1px solid #30363d; }
    .test:last-child { border-bottom: none; }
    .test-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
    .test-name { font-weight: 500; }
    .test-desc { color: #8b949e; font-size: 0.875rem; }
    .badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
    .badge-passed { background: rgba(63, 185, 80, 0.2); color: #3fb950; }
    .badge-failed { background: rgba(248, 81, 73, 0.2); color: #f85149; }
    .error-box { background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.3); border-radius: 8px; padding: 1rem; margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #f85149; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🧪 Rapport de Tests - TestGenius</h1>
    <p style="color: #8b949e; margin-top: 0.5rem;">Généré le ${new Date().toLocaleString('fr-FR')}</p>
  </div>
  
  <div style="background: #1c2128; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
    <h3 style="color: #00d4ff; margin-bottom: 1rem;">Configuration</h3>
    <p><strong>URL testée:</strong> ${url}</p>
    <p style="margin-top: 0.5rem;"><strong>User Story:</strong> ${userStory}</p>
  </div>
  
  <div class="stats">
    <div class="stat">
      <div class="stat-value" style="color: #00d4ff;">${total}</div>
      <div class="stat-label">Total Tests</div>
    </div>
    <div class="stat">
      <div class="stat-value passed">${passed}</div>
      <div class="stat-label">Réussis</div>
    </div>
    <div class="stat">
      <div class="stat-value failed">${failed}</div>
      <div class="stat-label">Échoués</div>
    </div>
    <div class="stat">
      <div class="stat-value">${successRate}%</div>
      <div class="stat-label">Taux de réussite</div>
    </div>
  </div>
  
  <div class="tests">
    <h3 style="padding: 1rem; background: #161b22; color: #00d4ff;">Détails des Tests</h3>
    ${testCases.map(test => `
      <div class="test">
        <div class="test-header">
          <span class="badge ${test.status === 'passed' ? 'badge-passed' : 'badge-failed'}">
            ${test.status === 'passed' ? '✓ Réussi' : '✗ Échoué'}
          </span>
          <span class="test-name">${test.name}</span>
        </div>
        <p class="test-desc">${test.description}</p>
        ${test.error ? `<div class="error-box">${test.error}</div>` : ''}
      </div>
    `).join('')}
  </div>
</body>
</html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url_blob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `rapport-tests-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url_blob);
  };

  const exportJSON = () => {
    const data = {
      timestamp: new Date().toISOString(),
      url,
      userStory,
      results: testCases,
      stats: {
        total: testCases.length,
        passed: testCases.filter(t => t.status === 'passed').length,
        failed: testCases.filter(t => t.status === 'failed').length,
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url_blob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `tests-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url_blob);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Exporter les Résultats</h3>
      </div>
      
      <div className="flex gap-3">
        <Button
          onClick={generateHTMLReport}
          variant="outline"
          className="flex-1"
          disabled={testCases.length === 0}
        >
          <Download className="h-4 w-4" />
          Rapport HTML
        </Button>
        <Button
          onClick={exportJSON}
          variant="outline"
          className="flex-1"
          disabled={testCases.length === 0}
        >
          <FileCode className="h-4 w-4" />
          Export JSON
        </Button>
      </div>
    </div>
  );
};

export default ReportPanel;

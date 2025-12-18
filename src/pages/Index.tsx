import Header from '@/components/Header';
import InputPanel from '@/components/InputPanel';
import TestCasesTable from '@/components/TestCasesTable';
import StatsPanel from '@/components/StatsPanel';
import ConsolePanel from '@/components/ConsolePanel';
import ResultsChart from '@/components/ResultsChart';
import ReportPanel from '@/components/ReportPanel';
import { useTestRunner } from '@/hooks/useTestRunner';

const Index = () => {
  const {
    testCases,
    logs,
    isGenerating,
    isRunning,
    currentUrl,
    currentUserStory,
    generateTests,
    runTests,
    clearLogs,
  } = useTestRunner();

  const handleGenerate = async (url: string, userStory: string, customPrompt: string) => {
    await generateTests({ url, userStory, customPrompt });
  };

  const stats = {
    total: testCases.length,
    passed: testCases.filter(t => t.status === 'passed').length,
    failed: testCases.filter(t => t.status === 'failed').length,
    pending: testCases.filter(t => t.status === 'pending' || t.status === 'running').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(190 95% 50% / 0.08) 0%, transparent 50%)' }} />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Automatisation de Tests</span>
              <br />
              <span className="text-foreground">Propulsée par l'IA</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Générez et exécutez des cas de test intelligents à partir de vos user stories.
              Combinez la puissance de l'IA générative avec Selenium pour des tests exhaustifs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Input */}
          <div className="lg:col-span-1 space-y-6">
            <InputPanel
              onGenerate={handleGenerate}
              onRunTests={runTests}
              isGenerating={isGenerating}
              isRunning={isRunning}
              hasTestCases={testCases.length > 0}
            />
            
            <ReportPanel
              testCases={testCases}
              url={currentUrl}
              userStory={currentUserStory}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            <StatsPanel stats={stats} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <ResultsChart
                passed={stats.passed}
                failed={stats.failed}
                pending={stats.pending}
              />
              <ConsolePanel
                logs={logs}
                onClear={clearLogs}
              />
            </div>
            
            <TestCasesTable testCases={testCases} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            TestGenius - Automatisation intelligente des tests logiciels
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

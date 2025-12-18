import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import InputPanel from '@/components/InputPanel';
import TestCasesTable from '@/components/TestCasesTable';
import StatsPanel from '@/components/StatsPanel';
import ConsolePanel from '@/components/ConsolePanel';
import ResultsChart from '@/components/ResultsChart';
import ReportPanel from '@/components/ReportPanel';
import { TestCase, LogEntry } from '@/types/test';

const Index = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentUserStory, setCurrentUserStory] = useState('');

  const addLog = useCallback((level: LogEntry['level'], message: string) => {
    setLogs(prev => [...prev, { timestamp: new Date(), level, message }]);
  }, []);

  const handleGenerate = async (url: string, userStory: string, customPrompt: string) => {
    setIsGenerating(true);
    setCurrentUrl(url);
    setCurrentUserStory(userStory);
    addLog('info', `Démarrage de la génération pour ${url}`);
    addLog('info', `User Story: "${userStory.substring(0, 50)}..."`);

    // Simulation de génération IA (à connecter avec votre backend Python)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockTestCases: TestCase[] = [
      {
        id: '001',
        name: 'Connexion avec identifiants valides',
        description: 'Vérifier que l\'utilisateur peut se connecter avec des identifiants corrects',
        type: 'nominal',
        steps: [
          'Naviguer vers la page de connexion',
          'Entrer un email valide',
          'Entrer un mot de passe valide',
          'Cliquer sur le bouton "Se connecter"',
        ],
        expectedResult: 'L\'utilisateur est redirigé vers le dashboard',
        status: 'pending',
      },
      {
        id: '002',
        name: 'Connexion avec email invalide',
        description: 'Vérifier le comportement avec un format d\'email incorrect',
        type: 'edge_case',
        steps: [
          'Naviguer vers la page de connexion',
          'Entrer un email mal formaté (ex: "test@")',
          'Cliquer sur "Se connecter"',
        ],
        expectedResult: 'Message d\'erreur "Email invalide"',
        status: 'pending',
      },
      {
        id: '003',
        name: 'Connexion avec champs vides',
        description: 'Vérifier la validation des champs obligatoires',
        type: 'error',
        steps: [
          'Naviguer vers la page de connexion',
          'Laisser tous les champs vides',
          'Cliquer sur "Se connecter"',
        ],
        expectedResult: 'Messages d\'erreur pour champs requis',
        status: 'pending',
      },
      {
        id: '004',
        name: 'Mot de passe incorrect',
        description: 'Vérifier le comportement avec un mot de passe erroné',
        type: 'error',
        steps: [
          'Entrer un email valide',
          'Entrer un mot de passe incorrect',
          'Cliquer sur "Se connecter"',
        ],
        expectedResult: 'Message d\'erreur "Identifiants incorrects"',
        status: 'pending',
      },
      {
        id: '005',
        name: 'Test de timeout réseau',
        description: 'Vérifier le comportement en cas de lenteur réseau',
        type: 'edge_case',
        steps: [
          'Simuler une connexion lente',
          'Tenter de se connecter',
        ],
        expectedResult: 'Indicateur de chargement visible, timeout géré',
        status: 'pending',
      },
    ];

    setTestCases(mockTestCases);
    addLog('success', `${mockTestCases.length} cas de test générés avec succès`);
    setIsGenerating(false);
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    addLog('info', 'Démarrage de l\'exécution des tests Selenium...');

    // Simulation d'exécution des tests (à connecter avec votre backend)
    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];
      
      // Mettre à jour le statut en "running"
      setTestCases(prev => prev.map((t, idx) => 
        idx === i ? { ...t, status: 'running' as const } : t
      ));
      
      addLog('info', `Exécution: ${test.name}`);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation de résultat aléatoire
      const passed = Math.random() > 0.3;
      const duration = Math.floor(Math.random() * 2000) + 500;
      
      setTestCases(prev => prev.map((t, idx) => 
        idx === i ? { 
          ...t, 
          status: passed ? 'passed' : 'failed',
          duration,
          error: passed ? undefined : 'Element not found: #login-button (TimeoutException)'
        } : t
      ));
      
      addLog(
        passed ? 'success' : 'error',
        `${test.name}: ${passed ? 'RÉUSSI' : 'ÉCHOUÉ'} (${duration}ms)`
      );
    }

    addLog('success', 'Exécution des tests terminée');
    setIsRunning(false);
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
              onRunTests={handleRunTests}
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
                onClear={() => setLogs([])}
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

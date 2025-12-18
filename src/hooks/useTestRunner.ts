import { useState, useCallback } from 'react';
import { TestCase, TestRun, LogEntry } from '@/types/test';
import { testApi, GenerateTestsRequest, RunTestsRequest } from '@/services/testApi';
import { useToast } from '@/hooks/use-toast';

interface UseTestRunnerReturn {
  testCases: TestCase[];
  testRun: TestRun | null;
  logs: LogEntry[];
  isGenerating: boolean;
  isRunning: boolean;
  currentUrl: string;
  currentUserStory: string;
  generateTests: (request: GenerateTestsRequest) => Promise<void>;
  runTests: () => Promise<void>;
  clearLogs: () => void;
  resetAll: () => void;
}

export function useTestRunner(): UseTestRunnerReturn {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [testRun, setTestRun] = useState<TestRun | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentUserStory, setCurrentUserStory] = useState('');
  const { toast } = useToast();

  const addLog = useCallback((level: LogEntry['level'], message: string) => {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
    };
    setLogs(prev => [...prev, entry]);
  }, []);

  const generateTests = useCallback(async (request: GenerateTestsRequest) => {
    setIsGenerating(true);
    setCurrentUrl(request.url);
    setCurrentUserStory(request.userStory);
    addLog('info', `Connexion au backend pour générer les tests...`);
    addLog('info', `URL cible: ${request.url}`);
    addLog('info', `User Story: ${request.userStory.substring(0, 100)}...`);

    try {
      // Vérifier la santé du backend
      const isHealthy = await testApi.checkHealth();
      if (!isHealthy) {
        throw new Error('Le backend Python n\'est pas accessible. Vérifiez qu\'il est lancé sur http://localhost:5000');
      }
      addLog('success', 'Backend connecté avec succès');

      // Appeler l'API de génération
      addLog('info', 'Envoi de la requête à l\'API Grok...');
      const response = await testApi.generateTests(request);

      if (!response.success) {
        throw new Error(response.error || 'Erreur lors de la génération des tests');
      }

      setTestCases(response.testCases);
      addLog('success', `${response.testCases.length} cas de test générés avec succès!`);
      
      toast({
        title: 'Génération terminée',
        description: `${response.testCases.length} cas de test ont été créés.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      addLog('error', `Erreur: ${message}`);
      toast({
        title: 'Erreur de génération',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }, [addLog, toast]);

  const runTests = useCallback(async () => {
    if (testCases.length === 0) {
      toast({
        title: 'Aucun test à exécuter',
        description: 'Veuillez d\'abord générer des cas de test.',
        variant: 'destructive',
      });
      return;
    }

    setIsRunning(true);
    addLog('info', 'Démarrage de l\'exécution des tests Selenium...');

    try {
      const request: RunTestsRequest = {
        testCases,
        url: currentUrl,
      };

      const response = await testApi.runTests(request);

      if (!response.success) {
        throw new Error(response.error || 'Erreur lors de l\'exécution des tests');
      }

      // Mettre à jour les cas de test avec les résultats
      const updatedTestCases = response.results.testCases;
      setTestCases(updatedTestCases);
      setTestRun(response.results);

      // Logger les résultats
      const passed = response.results.stats.passed;
      const failed = response.results.stats.failed;
      
      addLog('success', `Exécution terminée: ${passed} réussis, ${failed} échoués`);
      
      updatedTestCases.forEach(tc => {
        if (tc.status === 'passed') {
          addLog('success', `✓ ${tc.name}: Réussi (${tc.duration}ms)`);
        } else if (tc.status === 'failed') {
          addLog('error', `✗ ${tc.name}: Échoué - ${tc.error}`);
        }
      });

      toast({
        title: 'Tests terminés',
        description: `${passed} réussis, ${failed} échoués sur ${testCases.length} tests.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      addLog('error', `Erreur d'exécution: ${message}`);
      toast({
        title: 'Erreur d\'exécution',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsRunning(false);
    }
  }, [testCases, currentUrl, addLog, toast]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const resetAll = useCallback(() => {
    setTestCases([]);
    setTestRun(null);
    setLogs([]);
    setCurrentUrl('');
    setCurrentUserStory('');
  }, []);

  return {
    testCases,
    testRun,
    logs,
    isGenerating,
    isRunning,
    currentUrl,
    currentUserStory,
    generateTests,
    runTests,
    clearLogs,
    resetAll,
  };
}

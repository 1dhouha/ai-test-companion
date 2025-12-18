import { API_CONFIG } from '@/config/api';
import { TestCase, TestRun } from '@/types/test';

// Types pour les requêtes/réponses API
export interface GenerateTestsRequest {
  url: string;
  userStory: string;
  customPrompt?: string;
}

export interface GenerateTestsResponse {
  success: boolean;
  testCases: TestCase[];
  error?: string;
}

export interface RunTestsRequest {
  testCases: TestCase[];
  url: string;
}

export interface RunTestsResponse {
  success: boolean;
  results: TestRun;
  error?: string;
}

// Fonction helper pour les appels API
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('La requête a expiré. Vérifiez que le backend est accessible.');
      }
      throw error;
    }
    throw new Error('Erreur de connexion au backend');
  }
}

// Service API pour les tests
export const testApi = {
  // Vérifier la santé du backend
  async checkHealth(): Promise<boolean> {
    try {
      await fetchApi<{ status: string }>(API_CONFIG.endpoints.health);
      return true;
    } catch {
      return false;
    }
  },

  // Générer les cas de test via l'API Grok
  async generateTests(request: GenerateTestsRequest): Promise<GenerateTestsResponse> {
    return fetchApi<GenerateTestsResponse>(API_CONFIG.endpoints.generateTests, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  // Exécuter les tests via Selenium
  async runTests(request: RunTestsRequest): Promise<RunTestsResponse> {
    return fetchApi<RunTestsResponse>(API_CONFIG.endpoints.runTests, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },
};

// Configuration de l'API backend Python
// En développement, le backend tourne sur localhost
// Changez cette URL quand vous déployez en production

export const API_CONFIG = {
  // URL de base du backend Python (Flask/FastAPI)
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Endpoints
  endpoints: {
    generateTests: '/api/generate-tests',
    runTests: '/api/run-tests',
    health: '/api/health',
  },
  
  // Timeout en millisecondes
  timeout: 120000, // 2 minutes pour la génération IA
};

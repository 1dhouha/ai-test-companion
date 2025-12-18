export interface TestCase {
  id: string;
  name: string;
  description: string;
  type: 'nominal' | 'edge_case' | 'error';
  steps: string[];
  expectedResult: string;
  status?: 'pending' | 'running' | 'passed' | 'failed';
  duration?: number;
  error?: string;
}

export interface TestRun {
  id: string;
  url: string;
  userStory: string;
  timestamp: Date;
  testCases: TestCase[];
  stats: {
    total: number;
    passed: number;
    failed: number;
    pending: number;
  };
}

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

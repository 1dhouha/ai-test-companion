import { useState } from 'react';
import { Globe, FileText, Sparkles, Play, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface InputPanelProps {
  onGenerate: (url: string, userStory: string, customPrompt: string) => void;
  onRunTests: () => void;
  isGenerating: boolean;
  isRunning: boolean;
  hasTestCases: boolean;
}

const InputPanel = ({ onGenerate, onRunTests, isGenerating, isRunning, hasTestCases }: InputPanelProps) => {
  const [url, setUrl] = useState('');
  const [userStory, setUserStory] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = () => {
    if (url && userStory) {
      onGenerate(url, userStory, customPrompt);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-lg">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">Configuration des Tests</h2>
      </div>

      <div className="space-y-4">
        {/* URL Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Globe className="h-4 w-4" />
            URL du site à tester
          </label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemple.com"
            className="bg-secondary/50 border-border/50 focus:border-primary"
          />
        </div>

        {/* User Story Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="h-4 w-4" />
            User Story
          </label>
          <Textarea
            value={userStory}
            onChange={(e) => setUserStory(e.target.value)}
            placeholder="En tant qu'utilisateur, je veux me connecter pour accéder à mon compte..."
            className="min-h-[120px] bg-secondary/50 border-border/50 focus:border-primary resize-none"
          />
        </div>

        {/* Advanced Options Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          {showAdvanced ? 'Masquer' : 'Afficher'} les options avancées
        </button>

        {/* Custom Prompt */}
        {showAdvanced && (
          <div className="space-y-2 animate-fade-in">
            <label className="text-sm font-medium text-muted-foreground">
              Prompt personnalisé (optionnel)
            </label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Instructions supplémentaires pour l'IA..."
              className="min-h-[80px] bg-secondary/50 border-border/50 focus:border-primary resize-none font-mono text-sm"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleGenerate}
          disabled={!url || !userStory || isGenerating}
          variant="gradient"
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Générer les cas de test
            </>
          )}
        </Button>

        <Button
          onClick={onRunTests}
          disabled={!hasTestCases || isRunning}
          variant="success"
          className="flex-1"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Exécution...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Lancer les tests
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default InputPanel;

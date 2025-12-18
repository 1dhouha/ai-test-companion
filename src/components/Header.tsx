import { Zap, Github, Settings } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              <span className="gradient-text">TestGenius</span>
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Test Automation</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

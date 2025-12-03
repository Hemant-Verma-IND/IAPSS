import { Code2 } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">IAPSS</h1>
              <p className="text-xs text-muted-foreground">Intelligent Academic Problem-Solving System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {children}
      </main>
    </div>
  );
}

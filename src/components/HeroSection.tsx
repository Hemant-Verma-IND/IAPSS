import { Sparkles, Zap, Brain } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
        <span className="gradient-text">
          Intelligent Academic
        </span>
        <br />
        <span className="text-foreground">
          Problem-Solving System
        </span>
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
        Upload competitive programming problems, submit your C++ solutions, and get instant AI-powered feedback with automated test case execution.
      </p>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="glass-card rounded-lg p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold">AI-Powered Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Advanced OCR and problem structuring with Gemini AI
          </p>
        </div>

        <div className="glass-card rounded-lg p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold">Real-Time Execution</h3>
          <p className="text-sm text-muted-foreground">
            Instant code formatting and test case validation
          </p>
        </div>

        <div className="glass-card rounded-lg p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold">Competitive Style</h3>
          <p className="text-sm text-muted-foreground">
            Automatic refactoring to competitive programming standards
          </p>
        </div>
      </div>
    </div>
  );
}

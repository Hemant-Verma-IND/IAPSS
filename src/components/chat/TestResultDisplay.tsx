import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

interface TestResult {
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compilation Error' | 'Runtime Error' | 'Internal Error';
  output: string | null;
  time: string | null;
  memory: number | null;
  actualOutput?: string;
}

interface TestResultDisplayProps {
  results: TestResult[];
}

const verdictConfig = {
  'Accepted': { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  'Wrong Answer': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  'Time Limit Exceeded': { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  'Compilation Error': { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  'Runtime Error': { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  'Internal Error': { icon: AlertCircle, color: 'text-gray-500', bg: 'bg-gray-500/10' },
};

export function TestResultDisplay({ results }: TestResultDisplayProps) {
  const passedCount = results.filter(r => r.verdict === 'Accepted').length;
  const totalCount = results.length;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Test Results</span>
          <span className={`text-sm font-normal ${
            passedCount === totalCount ? 'text-green-500' : 'text-red-500'
          }`}>
            {passedCount}/{totalCount} Passed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {results.map((result, index) => {
          const config = verdictConfig[result.verdict];
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`rounded-lg border border-border p-4 ${config.bg}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                  <span className="font-medium">Test Case {index + 1}</span>
                </div>
                <span className={`text-sm ${config.color}`}>{result.verdict}</span>
              </div>

              {result.time && result.memory && (
                <div className="flex gap-4 text-xs text-muted-foreground mb-2">
                  <span>Time: {result.time}s</span>
                  <span>Memory: {result.memory}KB</span>
                </div>
              )}

              {result.output && result.verdict !== 'Accepted' && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Output:</p>
                  <pre className="text-xs bg-background/50 p-2 rounded overflow-x-auto">
                    {result.output}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface DiagnosticResult {
  medicao: string;
  valor: string;
  variacaoNormal: string;
  status: 'normal' | 'abnormal' | 'borderline';
}

interface DiagnosticPanelProps {
  isLoading: boolean;
  results: DiagnosticResult[] | null;
}

const mockResults: DiagnosticResult[] = [
  { medicao: "Ângulo SNA ", valor: "82°", variacaoNormal: "80-84°", status: "normal" },
  { medicao: "Ângulo SNB ", valor: "78°", variacaoNormal: "78-82°", status: "normal" },
  { medicao: "Ângulo ANB ", valor: "4°", variacaoNormal: "0-4°", status: "normal" },
  { medicao: "Wits Appraisal", valor: "1mm", variacaoNormal: "-1 to +3mm", status: "normal" },
  { medicao: "FMA", valor: "28°", variacaoNormal: "20-30°", status: "normal" },
  { medicao: "IMPA", valor: "95°", variacaoNormal: "87-95°", status: "normal" },
  { medicao: "U1-SN", valor: "102°", variacaoNormal: "100-110°", status: "normal" },
  { medicao: "L1-MP", valor: "92°", variacaoNormal: "85-95°", status: "normal" }
];

export function DiagnosticPanel({ isLoading, results }: DiagnosticPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'abnormal': return 'bg-red-100 text-red-800 border-red-200';
      case 'borderline': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="mb-4">AI Analysis Results</h3>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const displayResults = results || mockResults;

  return (
    <Card className="p-6">
      <h3 className="mb-4">AI Analysis Results</h3>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {/* medicaos */}
          <div>
            <h4 className="mb-3">Medições cefalométricas</h4>
            <div className="space-y-3">
              {displayResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{result.medicao}</span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(result.status)}
                    >
                      {result.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Medido: </span>
                      <span>{result.valor}</span>
                    </div>
                    <div>
                      <span className="font-medium">Normal: </span>
                      <span>{result.variacaoNormal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}

import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface DiagnosticResult {
  measurement: string;
  value: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'borderline';
}

interface DiagnosticPanelProps {
  isLoading: boolean;
  results: DiagnosticResult[] | null;
  diagnosis: string | null;
}

const mockResults: DiagnosticResult[] = [
  { measurement: "Ângulo SNA", value: "82°", normalRange: "80-84°", status: "normal" },
  { measurement: "Ângulo SNB", value: "78°", normalRange: "78-82°", status: "normal" },
  { measurement: "Ângulo ANB", value: "4°", normalRange: "0-4°", status: "normal" },
  { measurement: "Avaliação de Wits", value: "1mm", normalRange: "-1 to +3mm", status: "normal" },
  { measurement: "FMA", value: "28°", normalRange: "20-30°", status: "normal" },
  { measurement: "IMPA", value: "95°", normalRange: "87-95°", status: "normal" },
  { measurement: "U1-SN", value: "102°", normalRange: "100-110°", status: "normal" },
  { measurement: "L1-MP", value: "92°", normalRange: "85-95°", status: "normal" }
];

export function DiagnosticPanel({ isLoading, results, diagnosis }: DiagnosticPanelProps) {
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
        <h3 className="mb-4">Resultados da análise</h3>
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
  const displayDiagnosis = diagnosis || "Com base na análise cefalométrica, o paciente apresenta uma relação esquelética de Classe I com proporções faciais normais. Todas as medidas angulares estão dentro dos limites normais, indicando crescimento e desenvolvimento craniofacial equilibrados.";

  return (
    <Card className="p-6">
      <h3 className="mb-4">Resultados da análise</h3>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {/* Measurements */}
          <div>
            <h4 className="mb-3">Medidas cefalométricas</h4>
            <div className="space-y-3">
              {displayResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{result.measurement}</span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(result.status)}
                    >
                      {result.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Medida: </span>
                      <span>{result.value}</span>
                    </div>
                    <div>
                      <span className="font-medium">Normal: </span>
                      <span>{result.normalRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* AI Diagnosis */}
          <div>
            <h4 className="mb-3">Sumário do diagnóstico</h4>
            <Card className="p-4 bg-muted/50">
              <p className="text-sm leading-relaxed">
                {displayDiagnosis}
              </p>
            </Card>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="mb-3">Recomendações clínicas</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Continuar com consultas regulares</li>
              <li>• Considerar avaliações semestrais para acompanhar crescimento</li>
              <li>• Monitorar quaisquer alterações em simetria facial.</li>
              <li>• Avaliar relações de oclusões clinicamente.</li>
            </ul>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}

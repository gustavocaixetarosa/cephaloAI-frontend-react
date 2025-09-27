import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import type { Angles } from '../App';

interface DiagnosticResult {
  measurement: string;
  value: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'borderline';
}

interface DiagnosticPanelProps {
  angles: Angles | null;
  isLoading: boolean;
  results: DiagnosticResult[] | null;
  diagnosis: string | null;
}

export function DiagnosticPanel({ isLoading, results, diagnosis, angles }: DiagnosticPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '1': return 'bg-green-100 text-green-800 border-green-200';      // normal
      case '2': return 'bg-yellow-100 text-yellow-800 border-yellow-200';   // ruim
      case '3': return 'bg-red-100 text-red-800 border-red-200';            // péssimo
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

  // Exemplo de ranges normais para exibição (ajuste conforme necessário)
  const normalRanges: Record<string, string> = {
    ANB: "2° – 4°",
    APDI: "81° – 87°",
    FHI: "0.65 – 0.75",
    FMA: "22° – 28°",
    MW: "25 – 30 mm",
    ODI: "72° – 88°",
    SNA: "82° ± 2°",
    SNB: "80° ± 2°",
  };

  // Transforma angles em array para mapear
  const displayResults = angles
    ? Object.entries(angles).map(([key, angle]) => ({
        measurement: key,
        value: angle.value.toFixed(2),
        normalRange: normalRanges[key] || "-",
        status: angle.class, // já vem como '1', '2' ou '3'
      }))
    : [];

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
                      {result.status === '1'
                        ? 'Normal'
                        : result.status === '2'
                        ? 'Ruim'
                        : result.status === '3'
                        ? 'Crítico'
                        : 'Desconhecido'}
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

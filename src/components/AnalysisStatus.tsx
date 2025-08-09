import { Card } from "../components/ui/card";
import { FileText } from "lucide-react";

type StatusProps = {
  isUploaded?: boolean;
  isPointsDetected?: boolean;
  isAnalyzed?: boolean;
  isAiDiagnosticReturned?: boolean;
}

export default function AnalysisStatus({ isUploaded, isPointsDetected, isAnalyzed, isAiDiagnosticReturned }: StatusProps) {
  const textSuccess = 'text-green-600 ';
  const textFailure = 'text-gray-400';

  return (
    <Card className="p-6 col-span-2 w-full max-w-4xl">
      <div className='flex items-center gap-2 mb-3'>
        <FileText className='w-5 h-5 text-primary' />
        <h3 className="items-center">Status da análise</h3>
      </div>
      <div className='flex items-center justify-center gap-8 flex-row gap-8 text-m'>
        <div className='flex items-center justify-between '>
          <span className={isUploaded ? textSuccess : textFailure}>Upload da imagem</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className={isPointsDetected ? textSuccess : textFailure}>Detecção de pontos</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className={isAnalyzed ? textSuccess : textFailure}>Análise das medições</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className={isAiDiagnosticReturned ? textSuccess : textFailure}>Diagnóstico da IA</span>
        </div>
      </div>
    </Card>
  )

}


import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ImageUpload } from './components/ImageUpload';
import { ImageDisplay } from './components/ImageDisplay';
import { DiagnosticPanel } from './components/DiagnosticPanel';
import { Brain, Zap } from 'lucide-react';
import './App.css'
import AiDiagnosis from './components/AiDiagnosis';
import AnalysisStatus from './components/AnalysisStatus';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [analyzedImage, setAnalyzedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isAiDiagnosticReturned, setAiReturn] = useState(false)

  const handleImageUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    setOriginalImage(imageUrl);
    setAnalyzedImage(null);
    setShowResults(false);
    //await handleCallIaAlgor(imageUrl);
  }

  //const handleCallIaAlgor = async (imageUrl: string) => {
  //TODO: Criar api em python
  //Chama api em python que gera os pontos da Imagem
  //await Promise<File> 

  //}

  const handleGenerateAnalysis = async () => {
    if (!originalImage) return;;

    setIsAnalyzing(true);

    //Chama api de analise de imagem por IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    //Recebeu nova imagem na response da api
    //

    //Chama llm para analisar os pontos entregues pelo alg de imagem
    handleLlmCall();


    setAnalyzedImage(originalImage);
    setShowResults(true);
    setIsAnalyzing(false);
  };

  const handleLlmCall = async () => {
    setAiReturn(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <header>
        <div className='border-b bg-card'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-primary text-primary-foreground'>
              <Brain className='w-6 h-6' />
            </div>
            <div>
              <h1 className='text-2x1 font-medium'>CephaloAI</h1>
              <p className='text-sm text-muted-foreground'>
                Análise automatizadas de cefalogramas
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className='container mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
          {/* Left column - Upload and Controls*/}
          <div className='space-y-6'>
            <ImageUpload
              onImageUpload={handleImageUpload}
              uploadedImage={originalImage}
            />

            <Card className='p-6'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Zap className='w-5 h-5 text-primary' />
                  <h3>Controle de análise</h3>
                </div>

                <Button
                  onClick={handleGenerateAnalysis}
                  disabled={!originalImage || isAnalyzing}
                  className='w-full'
                  size='lg'
                >
                  {isAnalyzing ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Brain className='w-4 h-4 mr-2' />
                      Gerar análise
                    </>
                  )}
                </Button>

                <div className='text-xs text-muted-foreground space-y-1'>
                  <p>• Carregue um raio x lateral </p>
                  <p>• Clique em "Gerar análise" para processar </p>
                  <p>• Veja os resultados e as medições </p>
                </div>
              </div>
            </Card>

            <AiDiagnosis />


          </div>


          {/* Right column - Images and Results */}

          <div className='xl:col-span-2 space-y-8'>
            <AnalysisStatus
              isUploaded={originalImage ? true : false}
              isPointsDetected={showResults}
              isAnalyzed={isAnalyzing ? true : false}
              isAiDiagnosticReturned={isAiDiagnosticReturned}
            />
            <ImageDisplay
              originalImage={originalImage}
              analyzedImage={analyzedImage}
            />

            <DiagnosticPanel
              isLoading={isAnalyzing}
              results={showResults ? null : null}
            />


          </div>
        </div>

      </main>
    </div>
  )
}

export default App

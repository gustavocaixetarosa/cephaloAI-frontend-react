import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ImageUpload } from './components/ImageUpload';
import { ImageDisplay } from './components/ImageDisplay';
import { DiagnosticPanel } from './components/DiagnosticPanel';
import { Brain, FileText, Zap } from 'lucide-react';
import './App.css'

interface AngleValue {
  class: string;
  value: number;
}

export interface Angles {
  ANB: AngleValue;
  APDI: AngleValue;
  FHI: AngleValue;
  FMA: AngleValue;
  MW: AngleValue;
  ODI: AngleValue;
  SNA: AngleValue;
  SNB: AngleValue;
}

function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzedImage, setAnalyzedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [angles, setAngles] = useState<Angles | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string[] | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file); // salva o File para enviar
    setPreviewUrl(URL.createObjectURL(file)); // salva a URL só para exibir
    setAnalyzedImage(null);
    setShowResults(false);
  };

  const API_PREFIX = "/api";

  const handleGenerateAnalysis = async () => {
    if (!originalImage) return;

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", originalImage);

      const response = await fetch(`${API_PREFIX}/processar-imagem`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro na API");
      }

      const data = await response.json();

      const filename = data.image_with_overlay_path.replace(/^.*[\\/]/, "");
      const imageUrl = `${API_PREFIX}/download-imagem/${filename}`;
      setAnalyzedImage(imageUrl);
      setShowResults(true);
      setAngles(data.angles);
      console.log("Chamando diagnosis");
      handleSendAnglesToAi(data.angles);

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendAnglesToAi = async (angles: any) => {
    if (!angles) {
      console.log("Error sending angles to ai. Angles might be null.");
      return;
    }
    console.log("Angulos: " + angles);
    console.log("Antes de chamar api de diagnostico");

    console.log("Enviando: ", JSON.stringify(angles, null, 2));
    const response = await fetch("/diagnostico", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(angles),
    });
    console.log("Chamou api de diagnostico");

    if (!response.ok) {
      throw new Error("Erro na api de diagnostico");
    }

    const data = await response.json();
    setDiagnosis(data.diagnostico);
    console.log("Diagnostico: ", data.diagnostico);
    console.log("Recomendacoes: " + data.recomendacoes);
    setRecommendations(data.recomendacoes);
  }

  const textSuccess = 'text-green-600 ';
  const textFailure = 'text-gray-400';

  return (
    <div className="min-h-screen bg-background">
      <header>
        <div className='border-b bg-card'>
          <div className='flex items-center gap-3'>
            <div>
              <h1 className='text-3x1 font-bold'>CephaloAI</h1>
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

            <Card className='p-6'>
              <div className='flex items-center gap-2 mb-3'>
                <FileText className='w-5 h-5 text-primary' />
                <h3>Status da análise</h3>
              </div>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center justify-between'>
                  <span>Upload da imagem</span>
                  <span className={originalImage ? textSuccess : textFailure}>
                    {originalImage ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Detecção de pontos</span>
                  <span className={showResults ? textSuccess : textFailure}>
                    {isAnalyzing ? "Processando..." : showResults ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Análise das medições</span>
                  <span className={angles ? textSuccess : textFailure}>
                    {angles ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Diagnóstico da IA</span>
                  <span className={diagnosis ? textSuccess : textFailure}>
                    {diagnosis ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
              </div>
            </Card>
          </div>


          {/* Right column - Images and Results */}
          {/* min-h-0 permite que filhos com h-full/min-height encolham corretamente em layouts flex/grid */}
          <div className='xl:col-span-2 space-y-8 min-h-0'>
            <ImageDisplay
              originalImage={previewUrl}
              analyzedImage={analyzedImage}
            />

            {showResults && recommendations && (
              <DiagnosticPanel
                angles={angles}
                isLoading={isAnalyzing}
                recommendations={recommendations}
                diagnosis={diagnosis}
              />
            )}
          </div>
        </div>

      </main>
    </div>
  )
}

export default App

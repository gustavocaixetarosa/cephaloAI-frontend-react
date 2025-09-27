import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ImageUpload } from './components/ImageUpload';
import { ImageDisplay } from './components/ImageDisplay';
import { DiagnosticPanel } from './components/DiagnosticPanel';
import { Brain, FileText, Zap } from 'lucide-react';
import './App.css'

interface angle {
  
}

function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzedImage, setAnalyzedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [angles, setAngles] = useState<angle[] | null>(null)

  const handleImageUpload = (file: File) => {
    setOriginalImage(file); // salva o File para enviar
    setPreviewUrl(URL.createObjectURL(file)); // salva a URL só para exibir
    setAnalyzedImage(null);
    setShowResults(false);
  };

  const handleGenerateAnalysis = async () => {
    if (!originalImage) return;

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", originalImage);

      const response = await fetch("http://127.0.0.1:5000/processar-imagem", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro na API");
      }

      const data = await response.json();
      console.log("Resposta do backend:", data);

      const filename = data.image_with_overlay_path.replace(/^.*[\\/]/, "");
      const imageUrl = `http://127.0.0.1:5000/download-imagem/${filename}`;
      setAnalyzedImage(imageUrl);
      setShowResults(true);

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
                <div className='flex items-center jusify-between'>
                  <span>Upload da imagem</span>
                  <span className={originalImage ? textSuccess : textFailure}>
                    {originalImage ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
                <div className='flex items-center jusify-between'>
                  <span>Detecção de pontos</span>
                  <span className={showResults ? textSuccess : textFailure}>
                    {isAnalyzing ? "Processando..." : showResults ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
                <div className='flex items-center jusify-between'>
                  <span>Análise das medições</span>
                  <span className={showResults ? textSuccess : textFailure}>
                    {originalImage ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
                <div className='flex items-center jusify-between'>
                  <span>Diagnóstico da IA</span>
                  <span className={showResults ? textSuccess : textFailure}>
                    {originalImage ? "✓ Concluido" : "Pendente"}
                  </span>
                </div>
              </div>
            </Card>
          </div>


          {/* Right column - Images and Results */}
          <div className='xl:col-span-2 space-y-8'>
            <ImageDisplay
              originalImage={previewUrl}
              analyzedImage={analyzedImage}
            />

            <DiagnosticPanel
              isLoading={isAnalyzing}
              results={showResults ? null : null}
              diagnosis={showResults ? null : null}
            />
          </div>
        </div>

      </main>
    </div>
  )
}

export default App

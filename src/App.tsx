import { useState } from 'react'
import './App.css'

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [analyzedImage, setAnalyzedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    setOriginalImage(imageUrl);
    setAnalyzedImage(null);
    setShowResults(false);
  }

  const handleGenerateAnalysis = async () => {
    if (!originalImage) return;;

    setIsAnalyzing(true);

    //Chama api de analise de imagem por IA
    await new Promise(resolve => setTimeout(resolve, 3000));

    //Recebeu nova imagem na response da api
    //

    setAnalyzedImage(originalImage);
    setShowResults(true);
    setIsAnalyzing(false);
  };


  return (
    <div className="min-h-screen bg-background">

    </div>
  )
}

export default App

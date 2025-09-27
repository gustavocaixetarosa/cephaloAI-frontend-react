import React, { useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card } from './ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
}

export function ImageUpload({ onImageUpload, uploadedImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className='p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors'>
      <div className='text-center space-y-4'>
        <div className='flex justify-center'>
          <div className='p-4 rounded-full bg-muted'>
            {uploadedImage ? (
              <ImageIcon className='w-8 h-8 text-muted-foreground' />
            ) : (
              <Upload className='w-8 h-8 text-muted-foreground' />
            )}
          </div>
        </div>

        <div>
          <h3>Envio imagem raio-x</h3>
          <p className='text-muted-foreground mt-1'>
            Seleciona um cefalograma de alta qualidade
          </p>
        </div>

        {uploadedImage && (
          <div className='text-sm text-primary'>
            ✓ Envio de imagem bem-sucedido!
          </div>
        )}

        <Button
          onClick={handleButtonClick}
          variant={uploadedImage ? "secondary" : "default"}
          className='w-full'
        >
          {uploadedImage ? "Mudar imagem" : "Selecionar imagem"}
        </Button>

        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileSelect}
          className='hidden'
        />

        <p className='text-xs text-muted-foreground'>
          Formatos suportados:
        </p>
      </div>
    </Card>
  )
}

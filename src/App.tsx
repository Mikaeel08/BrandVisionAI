import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ApiKeyModal from './components/ApiKeyModal';
import GenerationForm from './components/GenerationForm';
import ImagePreview from './components/ImagePreview';
import Footer from './components/Footer';
import { useImageStore } from './store/imageStore';
import { GenerationOptions } from './types';
import { saveApiKey, getCurrentApiKey } from './utils/imageGeneration';

function App() {
  const { generateImage, isGenerating, currentImage } = useImageStore();
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const handleSaveApiKey = (apiKey: string) => {
    saveApiKey(apiKey);
    toast.success('API key saved successfully!');
  };

  const handleSubmit = async (options: GenerationOptions) => {
    try {
      await generateImage(options);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image. Please try again.');
      console.error('Generation error:', error);
    }
  };

  const handleRegenerate = async () => {
    if (currentImage) {
      try {
        await generateImage(currentImage.options);
        toast.success('Image regenerated successfully!');
      } catch (error) {
        toast.error('Failed to regenerate image. Please try again.');
        console.error('Regeneration error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header onOpenSettings={() => setIsApiKeyModalOpen(true)} />
      
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentApiKey={getCurrentApiKey()}
        onSaveApiKey={handleSaveApiKey}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Brand Vision</span> Into Reality
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Generate professional brand imagery in seconds with our AI-powered tool. Select a template, customize your options, and watch your brand come to life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <GenerationForm onSubmit={handleSubmit} isGenerating={isGenerating} />
          <ImagePreview 
            image={currentImage} 
            isGenerating={isGenerating} 
            onRegenerate={handleRegenerate} 
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-white rounded-xl p-6 shadow-md max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-purple-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Select a Template</h3>
              <p className="text-gray-600 text-sm">Choose from five professionally designed templates for different brand needs</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Customize Options</h3>
              <p className="text-gray-600 text-sm">Personalize your brand image with style, color scheme, and complexity options</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Download & Use</h3>
              <p className="text-gray-600 text-sm">Generate your unique brand image and download it for immediate use</p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
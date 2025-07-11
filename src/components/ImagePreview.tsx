import React from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';
import { GeneratedImage } from '../types';
import { downloadImage } from '../utils/downloadImage';
import { toast } from 'react-toastify';

interface ImagePreviewProps {
  image: GeneratedImage | null;
  isGenerating: boolean;
  onRegenerate: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, isGenerating, onRegenerate }) => {
  const handleDownload = async () => {
    if (!image) return;
    
    try {
      const fileName = `${image.options.brandName.replace(/\s+/g, '-').toLowerCase()}-${image.options.promptTemplate}.jpg`;
      await downloadImage(image.url, fileName);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
      console.error(error);
    }
  };

  if (isGenerating) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 min-h-[300px]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin animation-delay-150"></div>
        </div>
        <p className="mt-6 text-lg text-gray-600">Crafting your brand image...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 min-h-[300px]">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p className="mt-6 text-lg text-gray-600">No image generated yet</p>
        <p className="text-sm text-gray-500 mt-2 text-center max-w-md">Complete the form and click "Generate Image" to create your brand visual</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative">
        <img 
          src={image.url} 
          alt={`Generated image for ${image.options.brandName}`}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between items-center">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={onRegenerate}
                className="flex items-center px-3 py-2 bg-white/90 hover:bg-white rounded-lg text-gray-800 transition-colors"
              >
                <RefreshCw size={16} className="mr-2" />
                Regenerate
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
              >
                <Download size={16} className="mr-2" />
                Download
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{image.options.brandName} - {prompts.find(p => p.value === image.options.promptTemplate)?.label}</h3>
        <div className="text-gray-600 text-sm mb-3">{image.prompt}</div>
        
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            {styles.find(s => s.value === image.options.style)?.label}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {colorSchemes.find(c => c.value === image.options.colorScheme)?.label}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            {complexities.find(c => c.value === image.options.complexity)?.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// These are needed to display the labels in the image preview
const prompts = [
  { value: 'hero-banner', label: 'Hero Banner' },
  { value: 'social-media', label: 'Social Media Post' },
  { value: 'pattern-background', label: 'Pattern/Background' },
  { value: 'product-mockup', label: 'Product Mock-up' },
  { value: 'abstract-art', label: 'Abstract Theme Art' }
];

const styles = [
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'futuristic', label: 'Futuristic' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'artistic', label: 'Artistic' },
  { value: 'corporate', label: 'Corporate' }
];

const colorSchemes = [
  { value: 'vibrant', label: 'Vibrant' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'earthy', label: 'Earthy' },
  { value: 'bold', label: 'Bold' }
];

const complexities = [
  { value: 'simple', label: 'Simple' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'complex', label: 'Complex' }
];

export default ImagePreview;
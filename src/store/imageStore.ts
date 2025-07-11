import { create } from 'zustand';
import { GeneratedImage, GenerationOptions } from '../types';
import { generateImage } from '../utils/imageGeneration';

interface ImageState {
  isGenerating: boolean;
  currentImage: GeneratedImage | null;
  generationHistory: GeneratedImage[];
  generateImage: (options: GenerationOptions) => Promise<void>;
}

export const useImageStore = create<ImageState>((set) => ({
  isGenerating: false,
  currentImage: null,
  generationHistory: [],
  
  generateImage: async (options: GenerationOptions) => {
    try {
      set({ isGenerating: true });
      const generatedImage = await generateImage(options);
      
      set(state => ({
        isGenerating: false,
        currentImage: generatedImage,
        generationHistory: [generatedImage, ...state.generationHistory]
      }));
    } catch (error) {
      set({ isGenerating: false });
      console.error('Image generation failed:', error);
      throw error;
    }
  }
}));
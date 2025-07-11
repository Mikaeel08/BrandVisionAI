import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { GenerationOptions, PromptTemplate, Style, ColorScheme, Complexity } from '../types';
import { ChevronDown, X } from 'lucide-react';
import { toast } from 'react-toastify';

interface GenerationFormProps {
  onSubmit: (data: GenerationOptions) => void;
  isGenerating: boolean;
}

const prompts: { value: PromptTemplate; label: string; description: string }[] = [
  { 
    value: 'logo', 
    label: 'Logo Design', 
    description: 'Professional brand logo with unique identity'
  },
  { 
    value: 'hero-banner', 
    label: 'Hero Banner', 
    description: 'Eye-catching banner for your website or landing page'
  },
  { 
    value: 'social-media', 
    label: 'Social Media Post', 
    description: 'Engaging visuals for Instagram, Facebook, or Twitter'
  },
  { 
    value: 'pattern-background', 
    label: 'Pattern/Background', 
    description: 'Seamless patterns or textures for brand consistency'
  },
  { 
    value: 'product-mockup', 
    label: 'Product Mock-up', 
    description: 'Professional product presentation visuals'
  },
  { 
    value: 'abstract-art', 
    label: 'Abstract Theme Art', 
    description: 'Unique artistic visuals representing brand essence'
  }
];

const styles: { value: Style; label: string }[] = [
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'futuristic', label: 'Futuristic' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'artistic', label: 'Artistic' },
  { value: 'corporate', label: 'Corporate' }
];

const colorSchemes: { value: ColorScheme; label: string }[] = [
  { value: 'vibrant', label: 'Vibrant' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'earthy', label: 'Earthy' },
  { value: 'bold', label: 'Bold' }
];

const complexities: { value: Complexity; label: string }[] = [
  { value: 'simple', label: 'Simple' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'complex', label: 'Complex' }
];

const GenerationForm: React.FC<GenerationFormProps> = ({ onSubmit, isGenerating }) => {
  const { control, register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<GenerationOptions>({
    defaultValues: {
      promptTemplate: 'logo',
      brandName: '',
      description: '',
      style: 'minimalist',
      colorScheme: 'vibrant',
      complexity: 'moderate'
    }
  });
  
  const selectedPrompt = watch('promptTemplate');
  
  const validateForm = (data: GenerationOptions) => {
    if (data.brandName.trim() === '') {
      toast.error('Brand name is required');
      return false;
    }
    
    if (data.description.trim() === '') {
      toast.error('Description is required');
      return false;
    }
    
    if (data.description.length < 10) {
      toast.error('Description must be at least 10 characters');
      return false;
    }
    
    return true;
  };
  
  const submitHandler = (data: GenerationOptions) => {
    if (validateForm(data)) {
      onSubmit(data);
    }
  };
  
  const resetForm = () => {
    reset();
    toast.info('Form has been reset');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prompts.map((prompt) => (
              <div 
                key={prompt.value}
                className={`relative cursor-pointer rounded-lg p-4 hover:bg-gray-50 transition-colors border-2 h-full ${
                  selectedPrompt === prompt.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setValue('promptTemplate', prompt.value)}
              >
                <div className="font-medium text-gray-800 mb-1 line-clamp-1">{prompt.label}</div>
                <div className="text-sm text-gray-500 line-clamp-2">{prompt.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Brand Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
              <input
                id="brandName"
                type="text"
                {...register('brandName', { required: 'Brand name is required' })}
                className={`w-full p-3 border ${errors.brandName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g. Zenith Studios"
              />
              {errors.brandName && (
                <span className="text-red-500 text-sm mt-1">{errors.brandName.message}</span>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                {...register('description', { 
                  required: 'Description is required',
                  minLength: { value: 10, message: 'Description must be at least 10 characters' }
                })}
                className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24`}
                placeholder="Describe your brand, its values, and the message you want to convey"
              />
              {errors.description && (
                <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Customization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">Style</label>
              <div className="relative">
                <Controller
                  name="style"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="style"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                    >
                      {styles.map((style) => (
                        <option key={style.value} value={style.value}>{style.label}</option>
                      ))}
                    </select>
                  )}
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            
            <div>
              <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 mb-1">Color Scheme</label>
              <div className="relative">
                <Controller
                  name="colorScheme"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="colorScheme"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                    >
                      {colorSchemes.map((scheme) => (
                        <option key={scheme.value} value={scheme.value}>{scheme.label}</option>
                      ))}
                    </select>
                  )}
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            
            <div>
              <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
              <div className="relative">
                <Controller
                  name="complexity"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="complexity"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                    >
                      {complexities.map((complexity) => (
                        <option key={complexity.value} value={complexity.value}>{complexity.label}</option>
                      ))}
                    </select>
                  )}
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={resetForm}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isGenerating}
          >
            <X size={18} className="mr-2" />
            Reset
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all ${
              isGenerating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Image'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default GenerationForm;
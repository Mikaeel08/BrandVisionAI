import { GeneratedImage, GenerationOptions } from '../types';

// Mock image URLs by category - in a real app, these would come from an AI image generation API
const mockImageUrls = {
  'hero-banner': [
    'https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg',
    'https://images.pexels.com/photos/7691091/pexels-photo-7691091.jpeg',
    'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg'
  ],
  'social-media': [
    'https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg',
    'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg',
    'https://images.pexels.com/photos/5077039/pexels-photo-5077039.jpeg'
  ],
  'pattern-background': [
    'https://images.pexels.com/photos/4585184/pexels-photo-4585184.jpeg',
    'https://images.pexels.com/photos/5412066/pexels-photo-5412066.jpeg', 
    'https://images.pexels.com/photos/6985260/pexels-photo-6985260.jpeg'
  ],
  'product-mockup': [
    'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg',
    'https://images.pexels.com/photos/6370739/pexels-photo-6370739.jpeg',
    'https://images.pexels.com/photos/5082577/pexels-photo-5082577.jpeg'
  ],
  'abstract-art': [
    'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg',
    'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg',
    'https://images.pexels.com/photos/3651579/pexels-photo-3651579.jpeg'
  ]
};

// Function to generate a random string ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Function to get a random element from an array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to construct a realistic prompt from options
export const constructPrompt = (options: GenerationOptions): string => {
  const { promptTemplate, brandName, description, style, colorScheme, complexity } = options;
  
  const templateDescriptions = {
    'hero-banner': 'website hero banner',
    'social-media': 'social media post visual',
    'pattern-background': 'seamless pattern or background',
    'product-mockup': 'product mockup presentation',
    'abstract-art': 'abstract themed artwork'
  };
  
  const styleDescriptions = {
    minimalist: 'clean, minimal, with lots of white space',
    futuristic: 'modern, tech-inspired, innovative',
    vintage: 'retro, nostalgic, classic feel',
    artistic: 'creative, expressive, hand-crafted appearance',
    corporate: 'professional, business-oriented, trustworthy'
  };
  
  const colorDescriptions = {
    vibrant: 'bright, saturated colors',
    pastel: 'soft, light pastel colors',
    monochrome: 'black, white, and shades of gray',
    earthy: 'natural earth tones, browns, greens',
    bold: 'high contrast, striking colors'
  };
  
  const complexityDescriptions = {
    simple: 'simple and straightforward design',
    moderate: 'balanced level of detail',
    complex: 'intricate details and elements'
  };
  
  return `Generate a ${templateDescriptions[promptTemplate]} for "${brandName}" with a ${styleDescriptions[style]} style, using ${colorDescriptions[colorScheme]}, with ${complexityDescriptions[complexity]}. The brand is about: ${description}.`;
};

// Mock function to simulate image generation
export const generateImageMock = async (options: GenerationOptions): Promise<GeneratedImage> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Randomly select an image URL based on the prompt template
  const imageUrl = getRandomElement(mockImageUrls[options.promptTemplate]);
  
  // Construct a realistic prompt
  const prompt = constructPrompt(options);
  
  // Return the "generated" image
  return {
    id: generateId(),
    url: imageUrl,
    prompt,
    options,
    createdAt: new Date()
  };
};
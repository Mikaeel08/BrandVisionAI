import { GeneratedImage, GenerationOptions } from '../types';

const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';

// Get API key from localStorage or use default
const getApiKey = (): string => {
  return localStorage.getItem('hf_api_key') || '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';
};

// Save API key to localStorage
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem('hf_api_key', apiKey);
};

// Get current API key
export const getCurrentApiKey = (): string => {
  return getApiKey();
};

export const generateImage = async (options: GenerationOptions): Promise<GeneratedImage> => {
  const apiKey = getApiKey();
  const prompt = constructPrompt(options);

  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Generation failed: ${errorData.error || response.statusText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      id: Date.now().toString(),
      url: imageUrl,
      prompt,
      options,
      createdAt: new Date()
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error(`Image generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const constructPrompt = (options: GenerationOptions): string => {
  const { promptTemplate, brandName, description, style, colorScheme, complexity } = options;
  
  const templateDescriptions = {
    'logo': 'professional brand logo',
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

  let basePrompt = `Create a ${templateDescriptions[promptTemplate]} for "${brandName}" with a ${styleDescriptions[style]} style, using ${colorDescriptions[colorScheme]}, with ${complexityDescriptions[complexity]}. The brand represents: ${description}.`;
  
  if (promptTemplate === 'logo') {
    basePrompt += ' Design a professional, scalable, and memorable logo with clear shapes and forms. Ensure it works well at different sizes and maintains visual clarity. Center the logo with ample space around it.';
  }

  return basePrompt + ' Make it professional and suitable for commercial use. High quality, sharp details, photorealistic.';
};
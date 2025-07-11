export type PromptTemplate = 'hero-banner' | 'social-media' | 'pattern-background' | 'product-mockup' | 'abstract-art' | 'logo';

export type ColorScheme = 'vibrant' | 'pastel' | 'monochrome' | 'earthy' | 'bold';

export type Style = 'minimalist' | 'futuristic' | 'vintage' | 'artistic' | 'corporate';

export type Complexity = 'simple' | 'moderate' | 'complex';

export interface GenerationOptions {
  promptTemplate: PromptTemplate;
  brandName: string;
  description: string;
  style: Style;
  colorScheme: ColorScheme;
  complexity: Complexity;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  options: GenerationOptions;
  createdAt: Date;
}
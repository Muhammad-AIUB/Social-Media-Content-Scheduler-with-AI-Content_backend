import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateContent(prompt: string, platform: string = 'general'): Promise<string> {
    try {
      const systemPrompt = this.getSystemPrompt(platform);
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Unable to generate content';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate content');
    }
  }

  async improveContent(content: string, platform: string = 'general'): Promise<string> {
    const prompt = `Please improve this social media content for ${platform}: "${content}"`;
    return this.generateContent(prompt, platform);
  }

  private getSystemPrompt(platform: string): string {
    const basePrompt = 'You are a social media content creator. Create engaging, authentic content that resonates with the audience.';
    
    switch (platform.toLowerCase()) {
      case 'twitter':
        return `${basePrompt} Keep it under 280 characters and use relevant hashtags.`;
      case 'instagram':
        return `${basePrompt} Focus on visual storytelling and use engaging captions with relevant hashtags.`;
      case 'linkedin':
        return `${basePrompt} Maintain a professional tone and focus on industry insights or career development.`;
      case 'facebook':
        return `${basePrompt} Create content that encourages engagement and community interaction.`;
      default:
        return basePrompt;
    }
  }
} 

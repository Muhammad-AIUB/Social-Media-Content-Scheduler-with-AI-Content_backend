import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(OpenAiService.name);

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('app.openai.apiKey'),
    });
  }

  async generateContentIdeas(topic: string, platform: string, count: number = 5): Promise<string[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a social media content strategist. Generate engaging and innovative content ideas that will resonate with the audience.',
          },
          {
            role: 'user',
            content: `Generate ${count} content ideas for posts about "${topic}" for ${platform}. Each idea should be engaging and optimized for the platform.`,
          },
        ],
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return [];
      }

      // Parse content to get individual ideas (assuming numbered list format)
      const ideas = content
        .split('\n')
        .filter(line => line.trim().match(/^\d+\.\s/)) // Find lines that start with a number and a period
        .map(line => line.replace(/^\d+\.\s/, '').trim()); // Remove the numbering

      return ideas.length > 0 ? ideas : content.split('\n').filter(line => line.trim());
    } catch (error) {
      this.logger.error(`Error generating content ideas: ${error.message}`);
      throw error;
    }
  }

  async generateHashtags(topic: string, count: number = 10): Promise<string[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a social media hashtag expert. Generate relevant and trending hashtags.',
          },
          {
            role: 'user',
            content: `Generate ${count} hashtags related to "${topic}" that would help increase visibility of a post on social media. Do not include explanations, just the hashtags.`,
          },
        ],
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return [];
      }

      // Extract hashtags
      const hashtags = content
        .split(/\s+/)
        .filter(word => word.startsWith('#'))
        .map(hashtag => hashtag.replace(/[,.!?:;]$/, '')); // Remove trailing punctuation

      return hashtags;
    } catch (error) {
      this.logger.error(`Error generating hashtags: ${error.message}`);
      throw error;
    }
  }

  async improveContent(content: string, platform: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a social media content optimizer that specializes in creating engaging content for ${platform}.`,
          },
          {
            role: 'user',
            content: `Improve the following social media post for ${platform} to make it more engaging and likely to get better reach. Keep the core message but enhance the delivery:\n\n${content}`,
          },
        ],
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || content;
    } catch (error) {
      this.logger.error(`Error improving content: ${error.message}`);
      throw error;
    }
  }

  async generateCaptionFromImage(imageUrl: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a social media caption generator. Generate an engaging caption based on the image provided.',
          },
          {
            role: 'user',
            content: `Generate an engaging social media caption for this image: ${imageUrl}`,
          },
        ],
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || 'Check out this awesome image!';
    } catch (error) {
      this.logger.error(`Error generating caption: ${error.message}`);
      throw error;
    }
  }
} 
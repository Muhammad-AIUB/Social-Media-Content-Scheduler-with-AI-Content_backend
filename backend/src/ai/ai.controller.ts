import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GenerateContentDto, ImproveContentDto } from './dto/generate-content.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generateContent(@Body() generateDto: GenerateContentDto) {
    const content = await this.aiService.generateContent(
      generateDto.prompt,
      generateDto.platform
    );
    return { content };
  }

  @Post('improve')
  async improveContent(@Body() improveDto: ImproveContentDto) {
    const improvedContent = await this.aiService.improveContent(
      improveDto.content,
      improveDto.platform
    );
    return { content: improvedContent };
  }
} 

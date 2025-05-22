import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsString, IsOptional, IsInt, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class ContentIdeaDto {
  @IsString()
  topic: string;

  @IsString()
  platform: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  count?: number;
}

export class HashtagDto {
  @IsString()
  topic: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  count?: number;
}

export class ImproveContentDto {
  @IsString()
  content: string;

  @IsString()
  platform: string;
}

export class ImageCaptionDto {
  @IsString()
  @IsUrl()
  imageUrl: string;
}

@Controller(['ai', 'openai'])
@UseGuards(JwtAuthGuard)
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('content-ideas')
  generateContentIdeas(@Body() contentIdeaDto: ContentIdeaDto) {
    const { topic, platform, count = 5 } = contentIdeaDto;
    return this.openAiService.generateContentIdeas(topic, platform, count);
  }

  @Post('hashtags')
  generateHashtags(@Body() hashtagDto: HashtagDto) {
    const { topic, count = 10 } = hashtagDto;
    return this.openAiService.generateHashtags(topic, count);
  }

  @Post('improve-content')
  improveContent(@Body() improveContentDto: ImproveContentDto) {
    const { content, platform } = improveContentDto;
    return this.openAiService.improveContent(content, platform);
  }

  @Post('generate-caption')
  generateCaption(@Body() imageCaptionDto: ImageCaptionDto) {
    return this.openAiService.generateCaptionFromImage(imageCaptionDto.imageUrl);
  }

  @Post('generate')
  generateContent(@Body() contentIdeaDto: ContentIdeaDto) {
    const { topic, platform, count = 5 } = contentIdeaDto;
    return this.openAiService.generateContentIdeas(topic, platform, count);
  }
} 

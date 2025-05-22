import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SocialPlatform } from '../../posts/schemas/post.schema';

export class ContentIdeaDto {
  @IsNotEmpty()
  @IsString()
  topic: string;

  @IsNotEmpty()
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @IsOptional()
  @IsNumber()
  count?: number;
} 
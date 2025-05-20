import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray, IsDateString } from 'class-validator';
import { SocialPlatform } from '../schemas/post.schema';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];
} 
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GenerateContentDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsString()
  @IsOptional()
  platform?: string;
}

export class ImproveContentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  platform?: string;
} 

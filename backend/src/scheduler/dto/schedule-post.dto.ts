import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class SchedulePostDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsDateString()
  @IsNotEmpty()
  scheduledTime: string;
} 

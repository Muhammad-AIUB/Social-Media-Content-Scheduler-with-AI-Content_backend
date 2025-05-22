import { Controller, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SchedulePostDto } from './dto/schedule-post.dto';

@Controller('scheduler')
@UseGuards(JwtAuthGuard)
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post('schedule')
  async schedulePost(@Body() scheduleDto: SchedulePostDto) {
    const scheduledTime = new Date(scheduleDto.scheduledTime);
    return this.schedulerService.schedulePost(scheduleDto.postId, scheduledTime);
  }

  @Delete('cancel/:postId')
  async cancelScheduledPost(@Param('postId') postId: string) {
    return this.schedulerService.cancelScheduledPost(postId);
  }
} 

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { SchedulerProcessor } from './scheduler.processor';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'post-scheduler',
    }),
    PostsModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService, SchedulerProcessor],
  exports: [SchedulerService],
})
export class SchedulerModule {} 

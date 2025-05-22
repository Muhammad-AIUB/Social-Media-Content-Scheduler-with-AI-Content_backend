import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectQueue('post-scheduler') private postQueue: Queue,
  ) {}

  async schedulePost(postId: string, scheduledTime: Date) {
    const delay = scheduledTime.getTime() - Date.now();
    
    if (delay <= 0) {
      throw new Error('Scheduled time must be in the future');
    }

    await this.postQueue.add(
      'publish-post',
      { postId },
      { delay }
    );

    return { message: 'Post scheduled successfully', scheduledTime };
  }

  async cancelScheduledPost(postId: string) {
    const jobs = await this.postQueue.getJobs(['delayed']);
    const job = jobs.find(j => j.data.postId === postId);
    
    if (job) {
      await job.remove();
      return { message: 'Scheduled post cancelled successfully' };
    }
    
    throw new Error('Scheduled post not found');
  }
} 

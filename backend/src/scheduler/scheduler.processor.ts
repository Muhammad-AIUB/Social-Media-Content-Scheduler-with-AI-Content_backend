import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';

@Injectable()
@Processor('post-scheduler')
export class SchedulerProcessor {
  private readonly logger = new Logger(SchedulerProcessor.name);

  constructor(private readonly postsService: PostsService) {}

  @Process('publish-post')
  async handlePublishPost(job: Job<{ postId: string }>) {
    this.logger.log(`Processing scheduled post publication: ${job.data.postId}`);
    
    try {
      // Update post status to published
      await this.postsService.publishScheduledPost(job.data.postId);
      this.logger.log(`Successfully published post: ${job.data.postId}`);
    } catch (error) {
      this.logger.error(`Failed to publish post: ${job.data.postId}`, error.stack);
      throw error;
    }
  }
} 

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PostsService } from './posts.service';
import { PostStatus } from './schemas/post.schema';

// Define the job data interface
interface PublishPostJobData {
  postId: string;
  userId?: string;
}

@Processor('posts')
export class PostsProcessor {
  private readonly logger = new Logger(PostsProcessor.name);

  constructor(private readonly postsService: PostsService) {}

  @Process('publish-post')
  async handlePublishPost(job: Job<PublishPostJobData>) {
    this.logger.debug(`Processing job ${job.id} - Publishing post: ${job.data.postId}`);
    
    try {
      // Here, you would integrate with actual social media APIs
      // For now, we'll just simulate publication by updating the status
      const post = await this.postsService.publishPost(job.data.postId);
      
      if (post) {
        // Get the post ID safely
        const postId = job.data.postId;
          
        this.logger.debug(`Post ${postId} published successfully`);
        
        // Set initial analytics values
        await this.postsService.updateAnalytics(postId, {
          views: 0,
          clicks: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          engagementRate: 0,
        });
        
        return { success: true, postId };
      }
      
      throw new Error('Failed to publish post - post is null');
    } catch (error) {
      this.logger.error(`Failed to publish post: ${error.message}`);
      
      // Handle error by marking the post as failed
      try {
        const post = await this.postsService.markAsFailed(job.data.postId);
        if (post) {
          this.logger.debug(`Post ${job.data.postId} marked as failed`);
        }
      } catch (innerError) {
        this.logger.error(`Failed to mark post as failed: ${innerError.message}`);
      }
      
      throw error;
    }
  }
} 

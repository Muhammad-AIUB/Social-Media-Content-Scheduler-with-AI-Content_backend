/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PostsService } from './posts.service';
import { PostStatus } from './schemas/post.schema';
import { Types } from 'mongoose';

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
        // Convert ObjectId to string if needed
        const postId = typeof post._id === 'object' && post._id !== null 
          ? post._id.toString() 
          : String(post._id);
          
        this.logger.debug(`Post ${postId} published successfully`);
        
        // Here you would update analytics after publication
        // For now just set initial analytics values
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
      this.logger.error(`Failed to publish post ${job.data.postId}: ${error.message}`);
      
      // Update post status to failed
      try {
        // Check if userId exists in job data
        const userId = job.data.userId;
        if (!userId) {
          this.logger.warn(`No userId found in job data for postId ${job.data.postId}`);
          throw new Error('User ID not found in job data');
        }
        
        const post = await this.postsService.update(
          userId,
          job.data.postId,
          { status: PostStatus.FAILED },
        );
        
        if (post) {
          // Convert ObjectId to string if needed
          const postId = typeof post._id === 'object' && post._id !== null 
            ? post._id.toString() 
            : String(post._id);
            
          this.logger.debug(`Post ${postId} marked as failed`);
        }
      } catch (updateError) {
        this.logger.error(`Failed to update post status: ${updateError.message}`);
      }
      
      throw error;
    }
  }
} 

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Post, PostDocument, PostStatus } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// Define a more specific analytics data interface
interface PostAnalytics {
  views?: number;
  clicks?: number;
  likes?: number;
  shares?: number;
  comments?: number;
  engagementRate?: number;
  [key: string]: number | undefined;
}

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectQueue('posts') private postsQueue: Queue,
  ) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    try {
      this.logger.debug(`Creating post for user ${userId}`);
      
      const newPost = new this.postModel({
        userId,
        ...createPostDto,
      });

      const post = await newPost.save();
      this.logger.debug(`Post saved with ID: ${post._id}`);

      // If the post has a scheduledDate, add it to the queue
      if (createPostDto.scheduledDate) {
        const scheduledDate = new Date(createPostDto.scheduledDate);
        // Safely handle the ObjectId
        await this.schedulePost(post._id.toString(), scheduledDate);
      }

      return post;
    } catch (error) {
      this.logger.error(`Error creating post: ${error.message}`);
      throw error;
    }
  }

  async findAll(userId: string): Promise<Post[]> {
    return this.postModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(userId: string, id: string): Promise<Post | null> {
    const post = await this.postModel.findOne({ _id: id, userId }).exec();
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    return post;
  }

  async update(userId: string, id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    const post = await this.postModel.findOne({ _id: id, userId }).exec();
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    // If scheduledDate is updated, we need to update the queue
    if (updatePostDto.scheduledDate) {
      const scheduledDate = new Date(updatePostDto.scheduledDate);
      
      // Remove old job and add new one
      const jobId = `post-${id}`;
      const jobs = await this.postsQueue.getJobs(['delayed', 'waiting']);
      const existingJob = jobs.find(job => job.id === jobId);
      if (existingJob) {
        await existingJob.remove();
      }
      await this.schedulePost(id, scheduledDate);
    }
    
    // Update status to scheduled if it was a draft and now has a scheduled date
    if (post.status === PostStatus.DRAFT && updatePostDto.scheduledDate) {
      updatePostDto.status = PostStatus.SCHEDULED;
    }
    
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
      
    return updatedPost;
  }

  async remove(userId: string, id: string): Promise<Post | null> {
    const post = await this.postModel.findOneAndDelete({ _id: id, userId }).exec();
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    // Remove job from queue if it was scheduled
    if (post.status === PostStatus.SCHEDULED) {
      const jobId = `post-${id}`;
      const jobs = await this.postsQueue.getJobs(['delayed', 'waiting']);
      const existingJob = jobs.find(job => job.id === jobId);
      if (existingJob) {
        await existingJob.remove();
      }
    }
    
    return post;
  }

  async schedulePost(postId: string, scheduledDate: Date): Promise<void> {
    try {
      const jobId = `post-${postId}`;
      const delay = scheduledDate.getTime() - Date.now();
      
      await this.postsQueue.add(
        'publish-post',
        { postId },
        {
          jobId,
          delay: Math.max(0, delay),
        },
      );
      
      // Update post status
      await this.postModel
        .findByIdAndUpdate(postId, { status: PostStatus.SCHEDULED })
        .exec();
    } catch (error) {
      this.logger.error(`Error scheduling post ${postId}: ${error.message}`);
      throw error;
    }
  }

  async publishPost(postId: string): Promise<Post | null> {
    const post = await this.postModel.findById(postId).exec();
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    
    post.status = PostStatus.PUBLISHED;
    post.publishedDate = new Date();
    
    return post.save();
  }

  async publishScheduledPost(postId: string): Promise<Post | null> {
    const post = await this.postModel.findById(postId).exec();
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    
    if (post.status !== PostStatus.SCHEDULED) {
      this.logger.warn(`Attempted to publish non-scheduled post: ${postId}`);
      return post;
    }
    
    post.status = PostStatus.PUBLISHED;
    post.publishedDate = new Date();
    
    this.logger.log(`Published scheduled post: ${postId}`);
    return post.save();
  }

  async updateAnalytics(postId: string, analyticsData: PostAnalytics): Promise<Post | null> {
    const post = await this.postModel.findById(postId).exec();
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    
    post.analytics = {
      ...post.analytics,
      ...analyticsData,
    };
    
    return post.save();
  }

  async markAsFailed(postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId).exec();
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    
    post.status = PostStatus.FAILED;
    return post.save();
  }
} 

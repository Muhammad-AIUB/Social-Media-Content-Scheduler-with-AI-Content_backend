/* eslint-disable @typescript-eslint/no-unsafe-assignment */
 
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument, NotificationType } from './schemas/notification.schema';

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
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: any,
  ): Promise<Notification> {
    const notification = new this.notificationModel({
      userId,
      type,
      title,
      message,
      data,
      read: false,
    });

    return notification.save();
  }

  async findAllForUser(userId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findUnreadForUser(userId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ userId, read: false })
      .sort({ createdAt: -1 })
      .exec();
  }

  async markAsRead(userId: string, notificationId: string): Promise<Notification | null> {
    return this.notificationModel
      .findOneAndUpdate(
        { _id: notificationId, userId },
        { read: true },
        { new: true },
      )
      .exec();
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationModel
      .updateMany(
        { userId, read: false },
        { read: true },
      )
      .exec();
  }

  async deleteNotification(userId: string, notificationId: string): Promise<Notification | null> {
    return this.notificationModel
      .findOneAndDelete({ _id: notificationId, userId })
      .exec();
  }

  // Notification creation helpers for different notification types
  async createPostScheduledNotification(
    userId: string,
    postId: string,
    postContent: string,
    scheduledDate: Date,
  ): Promise<Notification> {
    const title = 'Post Scheduled';
    const message = `Your post has been scheduled for ${scheduledDate.toLocaleString()}`;
    
    return this.create(
      userId,
      NotificationType.POST_SCHEDULED,
      title,
      message,
      { postId, postContent, scheduledDate },
    );
  }

  async createPostPublishedNotification(
    userId: string,
    postId: string,
    postContent: string,
  ): Promise<Notification> {
    const title = 'Post Published';
    const message = 'Your post has been published successfully';
    
    return this.create(
      userId,
      NotificationType.POST_PUBLISHED,
      title,
      message,
      { postId, postContent },
    );
  }

  async createPostFailedNotification(
    userId: string,
    postId: string,
    postContent: string,
    error: string,
  ): Promise<Notification> {
    const title = 'Post Publication Failed';
    const message = `There was an error publishing your post: ${error}`;
    
    return this.create(
      userId,
      NotificationType.POST_FAILED,
      title,
      message,
      { postId, postContent, error },
    );
  }

  async createAnalyticsUpdateNotification(
    userId: string,
    postId: string,
    postContent: string,
    analyticsData: PostAnalytics,
  ): Promise<Notification> {
    const title = 'Analytics Update';
    const message = 'Your post analytics have been updated';
    
    return this.create(
      userId,
      NotificationType.ANALYTICS_UPDATE,
      title,
      message,
      { postId, postContent, analyticsData },
    );
  }
} 

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type PostDocument = Post & Document;

export enum PostStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  FAILED = 'failed',
}

export enum SocialPlatform {
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  LINKEDIN = 'linkedin',
}

@Schema({ timestamps: true })
export class Post {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  content: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  platform: SocialPlatform;

  @Prop({ type: String, enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @Prop()
  scheduledDate: Date;

  @Prop()
  publishedDate: Date;

  @Prop({ type: [String], default: [] })
  hashtags: string[];

  @Prop({ type: Object, default: {} })
  analytics: {
    views?: number;
    clicks?: number;
    likes?: number;
    shares?: number;
    comments?: number;
    engagementRate?: number;
  };
}

export const PostSchema = SchemaFactory.createForClass(Post); 
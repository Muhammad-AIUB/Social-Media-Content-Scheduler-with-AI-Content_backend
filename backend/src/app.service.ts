import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      name: 'Social Media Scheduler API',
      version: '1.0.0',
      description: 'Backend API for scheduling and managing social media posts',
      endpoints: {
        auth: {
          login: 'POST /auth/login',
          register: 'POST /auth/register',
          profile: 'GET /auth/profile',
        },
        users: {
          create: 'POST /users',
          findAll: 'GET /users',
          findOne: 'GET /users/:id',
          update: 'PATCH /users/:id',
          remove: 'DELETE /users/:id',
        },
        posts: 'Various endpoints for managing posts',
        notifications: 'Endpoints for managing notifications',
        ai: {
          contentIdeas: 'POST /ai/content-ideas',
          hashtags: 'POST /ai/hashtags',
          improveContent: 'POST /ai/improve-content',
          generateCaption: 'POST /ai/generate-caption',
        },
      },
      status: 'running',
    };
  }
}

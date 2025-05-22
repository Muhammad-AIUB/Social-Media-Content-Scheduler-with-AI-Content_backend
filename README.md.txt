# Social Media Scheduler with AI Content

A powerful social media management platform that allows scheduling and managing content across various platforms with AI-powered content generation capabilities.

## 🔗 API Base URL

**Base URL**: `http://localhost:3000`

## ✨ Key Features

- **🔐 User Authentication**
  - Register: `POST /auth/register`
  - Login: `POST /auth/login`
  - Profile: `GET /auth/profile`

- **👤 User Management**
  - Get all users: `GET /users`
  - Get user by ID: `GET /users/:id`
  - Update user: `PATCH /users/:id`
  - Delete user: `DELETE /users/:id`

- **📝 Post Management**
  - Create post: `POST /posts`
  - Get all posts: `GET /posts`
  - Get post by ID: `GET /posts/:id`
  - Update post: `PATCH /posts/:id`
  - Delete post: `DELETE /posts/:id`

- **🤖 AI-Powered Content Generation**
  - Generate content ideas: `POST /ai/content-ideas`
  - Generate hashtags: `POST /ai/hashtags`
  - Improve content: `POST /ai/improve-content`
  - Generate image captions: `POST /ai/generate-caption`

- **🔔 Notifications System**
  - Get all notifications: `GET /notifications`
  - Get unread notifications: `GET /notifications/unread`
  - Mark notification as read: `POST /notifications/:id/read`
  - Mark all as read: `POST /notifications/read-all`
  - Delete notification: `DELETE /notifications/:id`

## 🛠️ Tech Stack

- **Backend**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport
- **Queue System**: BullMQ with Redis
- **AI Integration**: OpenAI API

## 📋 API Documentation

For detailed API documentation including request/response formats, see [backend README](backend/README.md).

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Redis
- OpenAI API key

### Setup

1. Clone the repository
```bash
git clone https://github.com/Muhammad-AIUB/Social-Media-Content-Scheduler-with-AI-Content_backend.git
cd Social-Media-Content-Scheduler-with-AI-Content_backend
```

2. Install dependencies
```bash
cd backend
pnpm install
```

3. Set up environment variables in `.env` file:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/social-media-scheduler
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d
OPENAI_API_KEY=your_openai_api_key
REDIS_HOST=localhost
REDIS_PORT=6379
FRONTEND_URL=http://localhost:5173
```

4. Start the server
```bash
pnpm run start:dev
```

## 📝 Example API Requests

### Register a User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Create a Post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content": "Test post", "platform": "twitter", "scheduledDate": "2023-12-31T12:00:00Z"}'
```

### Generate Content Ideas
```bash
curl -X POST http://localhost:3000/ai/content-ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"topic": "productivity", "platform": "linkedin", "count": 3}'
```

## 📄 License

[MIT](LICENSE) 

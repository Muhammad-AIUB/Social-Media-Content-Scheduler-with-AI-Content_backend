# Social Media Scheduler API

A powerful backend API for scheduling and managing social media posts across various platforms, enhanced with AI-powered content generation.

## Features

- **User Authentication**
  - JWT-based authentication
  - User registration and login
  - Profile management

- **Post Management**
  - Create, schedule, and manage posts
  - Support for multiple social platforms
  - Post analytics tracking
  - Scheduled publishing via queue system

- **AI-Powered Content Assistance**
  - Content idea generation
  - Hashtag suggestions
  - Content improvement
  - Image caption generation

- **Notifications System**
  - Real-time notifications
  - Notification management

## Tech Stack

- **Backend**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Passport.js
- **Queue System**: BullMQ with Redis
- **AI Integration**: OpenAI API

## API Endpoints

### Authentication Endpoints

| Method | URL                  | Description                 | Request Body                                       | Response                                       |
|--------|----------------------|-----------------------------|---------------------------------------------------|------------------------------------------------|
| POST   | `/auth/register`     | Register a new user         | `{ "name": "string", "email": "string", "password": "string" }` | `{ "user": User, "access_token": "string" }`  |
| POST   | `/auth/login`        | Login with credentials      | `{ "email": "string", "password": "string" }`      | `{ "user": User, "access_token": "string" }`  |
| GET    | `/auth/profile`      | Get authenticated user profile | None (JWT required)                            | User object                                   |

### User Management

| Method | URL                  | Description                 | Request Body                                       | Response                                       |
|--------|----------------------|-----------------------------|---------------------------------------------------|------------------------------------------------|
| GET    | `/users`             | Get all users (admin only)  | None (JWT required)                               | Array of users                                |
| GET    | `/users/:id`         | Get user by ID              | None (JWT required)                               | User object                                   |
| PATCH  | `/users/:id`         | Update user                 | UpdateUserDto (JWT required)                      | Updated user object                           |
| DELETE | `/users/:id`         | Delete user                 | None (JWT required)                               | Deleted user object                           |

### Posts Management

| Method | URL                  | Description                 | Request Body                                       | Response                                       |
|--------|----------------------|-----------------------------|---------------------------------------------------|------------------------------------------------|
| POST   | `/posts`             | Create a new post           | `{ "content": "string", "platform": "string", "scheduledDate": "date", "hashtags": ["string"] }` (JWT required) | Created post object                          |
| GET    | `/posts`             | Get all user posts          | None (JWT required)                               | Array of posts                                |
| GET    | `/posts/:id`         | Get post by ID              | None (JWT required)                               | Post object                                   |
| PATCH  | `/posts/:id`         | Update post                 | UpdatePostDto (JWT required)                      | Updated post object                           |
| DELETE | `/posts/:id`         | Delete post                 | None (JWT required)                               | Deleted post object                           |

### AI Content Generation

| Method | URL                       | Description                      | Request Body                                        | Response                                       |
|--------|---------------------------|----------------------------------|----------------------------------------------------|-------------------------------------------------|
| POST   | `/ai/content-ideas`       | Generate content ideas           | `{ "topic": "string", "platform": "string", "count": number }` (JWT required) | Array of content ideas                       |
| POST   | `/ai/hashtags`            | Generate hashtags                | `{ "topic": "string", "count": number }` (JWT required) | Array of hashtags                           |
| POST   | `/ai/improve-content`     | Improve existing content         | `{ "content": "string", "platform": "string" }` (JWT required) | Improved content string                     |
| POST   | `/ai/generate-caption`    | Generate image caption           | `{ "imageUrl": "string" }` (JWT required)            | Generated caption string                      |

### Notifications

| Method | URL                       | Description                      | Request Body                                        | Response                                        |
|--------|---------------------------|----------------------------------|----------------------------------------------------|-------------------------------------------------|
| GET    | `/notifications`          | Get all user notifications       | None (JWT required)                                | Array of notifications                          |
| GET    | `/notifications/unread`   | Get unread notifications         | None (JWT required)                                | Array of unread notifications                   |
| POST   | `/notifications/:id/read` | Mark notification as read        | None (JWT required)                                | Updated notification                            |
| POST   | `/notifications/read-all` | Mark all notifications as read   | None (JWT required)                                | None                                            |
| DELETE | `/notifications/:id`      | Delete a notification            | None (JWT required)                                | Deleted notification                            |

## Setup and Installation

### Prerequisites

- Node.js (v16+)
- MongoDB
- Redis

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/social-media-scheduler.git
cd social-media-scheduler/backend
```

2. Install dependencies
```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following environment variables:
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

4. Start the development server
```bash
pnpm run start:dev
```

## Testing API Endpoints

You can test the API using tools like Postman, Insomnia, or curl. Here are some example requests:

### Register a New User
```
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Create a Scheduled Post
```
POST http://localhost:3000/posts
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "content": "This is a test scheduled post! #testing",
  "platform": "twitter",
  "scheduledDate": "2023-12-31T12:00:00Z",
  "hashtags": ["testing", "socialMedia"]
}
```

### Generate Content Ideas
```
POST http://localhost:3000/ai/content-ideas
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "topic": "productivity tips",
  "platform": "linkedin",
  "count": 3
}
```

## License

[MIT](LICENSE)

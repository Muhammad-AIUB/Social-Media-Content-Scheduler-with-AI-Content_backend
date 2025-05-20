# Social Media Content Scheduler with AI Content

A full-stack application that enables users to schedule, manage, and analyze social media content while leveraging AI-powered content suggestions to enhance engagement. The project integrates OpenAI's ChatGPT API to generate content ideas, hashtags, and headlines based on user inputs.

## Key Features

- **AI Content Suggestions**: Integrated ChatGPT API to provide content suggestions, engaging headlines, and relevant hashtags for social media posts.
- **Content Scheduling**: Automated post scheduling with Redis and Bull, ensuring timely delivery across multiple platforms.
- **Analytics Dashboard**: Visual representation of post performance, including views, clicks, and engagement metrics.
- **User Authentication**: Secure user authentication and profile management using JWT.
- **Real-Time Notifications**: Alerts for scheduled posts, post publication, and post performance updates.

## Technologies Used

### Backend
- NestJS
- MongoDB + Mongoose
- Redis + Bull for queue management
- OpenAI ChatGPT API
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Redis

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   # Backend
   cd backend
   pnpm install

   # Frontend (to be added)
   ```

3. Configure environment variables (create a .env file in the backend directory)
4. Start the development server
   ```bash
   # Backend
   cd backend
   pnpm run start:dev
   ```

## Project Structure

```
social-media/
├── backend/         # NestJS backend application
└── frontend/        # Frontend application (to be added)
``` 
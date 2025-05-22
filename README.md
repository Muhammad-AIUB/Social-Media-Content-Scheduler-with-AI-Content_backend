# Social Media Content Scheduler

A full-stack application for scheduling and managing social media content with AI-powered content generation.

## Features

- 🔐 **User Authentication** - JWT-based authentication with Passport.js
- 📝 **Content Management** - Create, edit, and manage social media posts
- ⏰ **Post Scheduling** - Schedule posts for future publication
- 🤖 **AI Content Generation** - Generate and improve content using OpenAI
- 📊 **Analytics** - Track post performance and engagement
- 🎯 **Multi-Platform Support** - Support for Twitter, Instagram, LinkedIn, and Facebook
- 🔄 **Queue Management** - Background job processing with Bull/Redis

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Redis** - In-memory data store for queue management
- **Bull** - Queue management for background jobs
- **OpenAI API** - AI-powered content generation
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens for secure authentication

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
social-media/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── posts/          # Post management
│   │   ├── scheduler/      # Post scheduling
│   │   ├── ai/             # AI content generation
│   │   ├── common/         # Shared utilities
│   │   └── main.ts         # Application entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── vite.config.ts
├── .env                    # Environment variables
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- Redis (v6 or higher)
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-media
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Copy the `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Application
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRATION=7d
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/social-media
   
   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   
   # OpenAI
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Start the services**
   
   Make sure MongoDB and Redis are running on your system.
   
   **Start the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```
   
   **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile

### Posts
- `GET /posts` - Get all posts for authenticated user
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get a specific post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Scheduler
- `POST /scheduler/schedule` - Schedule a post
- `DELETE /scheduler/cancel/:postId` - Cancel a scheduled post

### AI Content Generation
- `POST /ai/generate` - Generate content using AI
- `POST /ai/improve` - Improve existing content

## Usage

1. **Register/Login** - Create an account or login to access the dashboard
2. **Create Posts** - Write your social media content
3. **Schedule Posts** - Set future publication dates
4. **AI Assistance** - Use AI to generate or improve content
5. **Monitor** - Track your scheduled posts and analytics

## Development

### Backend Development
```bash
cd backend
npm run start:dev    # Start in development mode
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run linter
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

## Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Start the application: `npm run start:prod`

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve the `dist` folder using a web server

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 

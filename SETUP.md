# Setup Guide - Social Media Content Scheduler

This guide will help you set up and run the Social Media Content Scheduler application.

## ✅ Completed Features

The following features have been implemented and are ready to use:

### Backend (NestJS)
- ✅ **Authentication System** - JWT-based auth with Passport.js
- ✅ **User Management** - User registration, login, and profile management
- ✅ **Post Management** - CRUD operations for social media posts
- ✅ **Post Scheduling** - Schedule posts for future publication
- ✅ **AI Content Generation** - OpenAI integration for content creation
- ✅ **Queue System** - Bull/Redis for background job processing
- ✅ **Database Integration** - MongoDB with Mongoose ODM
- ✅ **Validation** - Request validation with class-validator
- ✅ **Error Handling** - Global exception filters
- ✅ **CORS Configuration** - Cross-origin resource sharing setup

### Project Structure
- ✅ **Modular Architecture** - Well-organized NestJS modules
- ✅ **DTOs and Schemas** - Type-safe data transfer objects
- ✅ **Environment Configuration** - Centralized config management
- ✅ **Documentation** - Comprehensive README and setup guides

## 🚀 Quick Start

### Prerequisites
1. **Node.js** (v18 or higher)
2. **MongoDB** (v5 or higher)
3. **Redis** (v6 or higher)
4. **OpenAI API Key**

### Installation Steps

1. **Clone and Navigate**
   ```bash
   cd "social-media project content/social-media"
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - Set your `JWT_SECRET`
   - Add your `OPENAI_API_KEY`
   - Configure database URLs if different from defaults

3. **Install Dependencies**
   
   **Option A: Use the setup script (Windows)**
   ```bash
   start.bat
   ```
   
   **Option B: Manual installation**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend (when ready)
   cd ../frontend
   npm install
   ```

4. **Start Services**
   
   Make sure MongoDB and Redis are running, then:
   
   ```bash
   # Start backend
   cd backend
   npm run start:dev
   
   # Start frontend (in another terminal)
   cd frontend
   npm run dev
   ```

## 📋 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (requires auth)

### Posts
- `GET /posts` - Get user's posts (requires auth)
- `POST /posts` - Create new post (requires auth)
- `GET /posts/:id` - Get specific post (requires auth)
- `PUT /posts/:id` - Update post (requires auth)
- `DELETE /posts/:id` - Delete post (requires auth)

### Scheduler
- `POST /scheduler/schedule` - Schedule a post (requires auth)
- `DELETE /scheduler/cancel/:postId` - Cancel scheduled post (requires auth)

### AI Content Generation
- `POST /ai/generate` - Generate content with AI (requires auth)
- `POST /ai/improve` - Improve existing content (requires auth)

## 🔧 Configuration

### Environment Variables
```env
# Application
PORT=3000
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Database
MONGODB_URI=mongodb://localhost:27017/social-media

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# OpenAI
OPENAI_API_KEY=your-openai-key
```

## 🧪 Testing the API

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

### Create a Post (replace YOUR_TOKEN with the token from login)
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content": "My first post!", "platform": "twitter"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors in IDE**
   - These are typically IDE/linter issues
   - The code should compile and run correctly
   - Try restarting your IDE or TypeScript service

2. **MongoDB connection issues**
   - Ensure MongoDB is running: `sudo systemctl start mongod`
   - Check the connection string in `.env`

3. **Redis connection issues**
   - Ensure Redis is running: `sudo systemctl start redis`
   - Check Redis host/port in `.env`

4. **Port already in use**
   - Change the PORT in `.env` file
   - Or stop the process using the port

### Logs
- Backend logs will show in the terminal where you ran `npm run start:dev`
- Check for any error messages during startup

## 📝 Next Steps

1. **Frontend Development** - Create the React frontend
2. **Social Media Integration** - Add actual platform APIs
3. **Advanced Scheduling** - Add recurring posts
4. **Analytics Dashboard** - Post performance tracking
5. **Team Collaboration** - Multi-user support

## 🤝 Support

If you encounter any issues:
1. Check this setup guide
2. Review the main README.md
3. Check the console logs for error messages
4. Ensure all prerequisites are installed and running

The backend is now fully functional and ready for frontend integration! 

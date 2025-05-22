# MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

### 1. Create Free MongoDB Atlas Account
- Go to: https://cloud.mongodb.com/
- Click "Try Free" and sign up
- Verify your email

### 2. Create a Free Cluster
- Click "Create" to create a new cluster
- Choose "M0 Sandbox" (FREE tier)
- Select any cloud provider (AWS, Google Cloud, Azure)
- Choose a region close to you
- Name your cluster (e.g., "Cluster0")
- Click "Create Cluster"

### 3. Create Database User
- Go to "Database Access" in the left sidebar
- Click "Add New Database User"
- Choose "Password" authentication
- Username: `socialmedia` (or any name you prefer)
- Password: Generate a secure password (save it!)
- Database User Privileges: "Read and write to any database"
- Click "Add User"

### 4. Configure Network Access
- Go to "Network Access" in the left sidebar
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

### 5. Get Connection String
- Go back to "Clusters"
- Click "Connect" on your cluster
- Choose "Connect your application"
- Select "Node.js" and version "4.1 or later"
- Copy the connection string

### 6. Update Your .env File
Replace the MONGODB_URI in your `.env` file with your connection string:

```env
MONGODB_URI=mongodb+srv://socialmedia:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/social-media-scheduler?retryWrites=true&w=majority
```

**Important:** Replace `YOUR_PASSWORD` with the actual password you created!

### 7. Start Your Server
```bash
cd social-media
pnpm run start:backend
```

## Your Backend Will Be Ready! 🎉

**API Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /users` - Get users
- `POST /posts` - Create posts
- `GET /posts` - Get posts
- `POST /ai/generate-content` - AI content generation
- `POST /ai/improve-content` - AI content improvement

**Server URL:** `http://localhost:3005`

## Troubleshooting

If you get connection errors:
1. Check your username/password in the connection string
2. Ensure 0.0.0.0/0 is in Network Access
3. Wait 1-2 minutes for Atlas to propagate changes
4. Restart your server

## Free Tier Limits
- 512MB storage
- Shared RAM and CPU
- Perfect for development and testing! 

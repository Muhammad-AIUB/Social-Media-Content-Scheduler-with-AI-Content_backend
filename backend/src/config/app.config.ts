import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-scheduler',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_super_secret_key_change_in_production',
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
})); 

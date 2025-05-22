#!/bin/bash

# Install backend dependencies
cd backend
pnpm install
pnpm add @nestjs/passport passport passport-jwt passport-local
pnpm add -D @types/passport @types/passport-jwt @types/passport-local @types/express
cd ..

echo "Setup complete! You can now run the application with:"
echo "cd backend && pnpm run start:dev" 
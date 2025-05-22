# Install backend dependencies
Set-Location -Path backend
pnpm install
pnpm add @nestjs/passport passport passport-jwt passport-local
pnpm add -D @types/passport @types/passport-jwt @types/passport-local @types/express
Set-Location -Path ..

Write-Host "Setup complete! You can now run the application with:"
Write-Host "cd backend; pnpm run start:dev" 
#!/bin/bash

cd backend
echo "Testing API..."

# Test 1: Get root endpoint
echo "GET /"
curl -X GET http://localhost:3000

echo -e "\n\n"

# Test 2: Login
echo "POST /auth/login"
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

echo -e "\n\n"

# Test 3: Create a post
echo "POST /posts"
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}' | grep -o '"access_token":"[^"]*"' | cut -d':' -f2 | tr -d '"')

echo "Token: $TOKEN"

curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"content": "Test post content", "platform": "twitter", "scheduledDate": "2025-06-01T10:00:00.000Z"}' 

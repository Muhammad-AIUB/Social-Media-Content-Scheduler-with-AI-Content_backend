# Test API Endpoints with PowerShell

Write-Host "Testing API..." -ForegroundColor Green

# Test 1: Get root endpoint
Write-Host "GET /" -ForegroundColor Yellow
$rootResponse = Invoke-WebRequest -Uri 'http://localhost:3000' -Method GET
Write-Host "Status Code: $($rootResponse.StatusCode)"
Write-Host "Response: $($rootResponse.Content)"
Write-Host ""

# Test 2: User registration and login
Write-Host "POST /auth/login" -ForegroundColor Yellow
try {
  $loginResponse = Invoke-WebRequest -Uri 'http://localhost:3000/auth/login' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"email": "test@example.com", "password": "password123"}'
  Write-Host "Status Code: $($loginResponse.StatusCode)"
  
  # Extract the token from the response
  $responseObj = $loginResponse.Content | ConvertFrom-Json
  $token = $responseObj.access_token
  Write-Host "Token obtained: $($token.Substring(0, 20))..."
  
  # Test 3: Create a post
  Write-Host "`nPOST /posts" -ForegroundColor Yellow
  $postResponse = Invoke-WebRequest -Uri 'http://localhost:3000/posts' -Method POST -Headers @{
    'Content-Type'='application/json'
    'Authorization'="Bearer $token"
  } -Body '{"content": "Test post content", "platform": "twitter", "scheduledDate": "2025-06-01T10:00:00.000Z"}'
  
  Write-Host "Status Code: $($postResponse.StatusCode)"
  Write-Host "Response: $($postResponse.Content)"
  
  # Test 4: Get all posts
  Write-Host "`nGET /posts" -ForegroundColor Yellow
  $getPostsResponse = Invoke-WebRequest -Uri 'http://localhost:3000/posts' -Method GET -Headers @{
    'Authorization'="Bearer $token"
  }
  
  Write-Host "Status Code: $($getPostsResponse.StatusCode)"
  Write-Host "Response: $($getPostsResponse.Content)"
  
} catch {
  Write-Host "Error: $_" -ForegroundColor Red
  Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
  Write-Host "Response: $($_.ErrorDetails.Message)"
} 

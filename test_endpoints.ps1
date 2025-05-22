# Test API Endpoints - Posts, Users, and AI Generation

Write-Host "Testing Advanced API Endpoints..." -ForegroundColor Green

# First, get a token by logging in
try {
  Write-Host "Logging in to get auth token..." -ForegroundColor Yellow
  $loginResponse = Invoke-WebRequest -Uri 'http://localhost:3001/auth/login' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"email": "test@example.com", "password": "password123"}'
  
  $responseObj = $loginResponse.Content | ConvertFrom-Json
  $token = $responseObj.access_token
  Write-Host "Token obtained successfully!" -ForegroundColor Green
  
  # 3. POST MANAGEMENT API
  Write-Host "`n--- 3. POST MANAGEMENT API ---" -ForegroundColor Cyan
  
  # Create a post
  Write-Host "`nTest: Create Post (POST /posts)" -ForegroundColor Yellow
  try {
    $createPostResponse = Invoke-WebRequest -Uri 'http://localhost:3001/posts' -Method POST -Headers @{
      'Content-Type'='application/json'
      'Authorization'="Bearer $token"
    } -Body '{"content": "Test post content", "platform": "twitter", "scheduledDate": "2025-06-01T10:00:00.000Z"}'
    
    Write-Host "Status: SUCCESS ✅" -ForegroundColor Green
    Write-Host "Status Code: $($createPostResponse.StatusCode)"
    Write-Host "Response: $($createPostResponse.Content)"
  } catch {
    Write-Host "Status: FAILED ❌" -ForegroundColor Red
    Write-Host "Error Details: $_"
    if ($_.Exception.Response) {
        $result = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($result)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
  }
  
  # Get all posts
  Write-Host "`nTest: Get All Posts (GET /posts)" -ForegroundColor Yellow
  try {
    $getPostsResponse = Invoke-WebRequest -Uri 'http://localhost:3001/posts' -Method GET -Headers @{
      'Authorization'="Bearer $token"
    }
    
    Write-Host "Status: SUCCESS ✅" -ForegroundColor Green
    Write-Host "Status Code: $($getPostsResponse.StatusCode)"
    Write-Host "Response Preview: $($getPostsResponse.Content.Substring(0, [Math]::Min(200, $getPostsResponse.Content.Length)))..."
  } catch {
    Write-Host "Status: FAILED ❌" -ForegroundColor Red
    Write-Host "Error Details: $_"
    if ($_.Exception.Response) {
        $result = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($result)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
  }
  
  # 4. USER MANAGEMENT API
  Write-Host "`n--- 4. USER MANAGEMENT API ---" -ForegroundColor Cyan
  
  # Get user profile
  Write-Host "`nTest: Get User Profile (GET /users/profile)" -ForegroundColor Yellow
  try {
    $profileResponse = Invoke-WebRequest -Uri 'http://localhost:3001/users/profile' -Method GET -Headers @{
      'Authorization'="Bearer $token"
    }
    
    Write-Host "Status: SUCCESS ✅" -ForegroundColor Green
    Write-Host "Status Code: $($profileResponse.StatusCode)"
    Write-Host "Response: $($profileResponse.Content)"
  } catch {
    Write-Host "Status: FAILED ❌" -ForegroundColor Red
    Write-Host "Error Details: $_"
    if ($_.Exception.Response) {
        $result = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($result)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
  }
  
  # 5. AI CONTENT GENERATION API
  Write-Host "`n--- 5. AI CONTENT GENERATION API ---" -ForegroundColor Cyan
  
  # Generate content with AI
  Write-Host "`nTest: Generate Content (POST /ai/generate)" -ForegroundColor Yellow
  try {
    $aiResponse = Invoke-WebRequest -Uri 'http://localhost:3001/ai/generate' -Method POST -Headers @{
      'Content-Type'='application/json'
      'Authorization'="Bearer $token"
    } -Body '{"topic": "Social media marketing tips", "platform": "twitter", "count": 3}'
    
    Write-Host "Status: SUCCESS ✅" -ForegroundColor Green
    Write-Host "Status Code: $($aiResponse.StatusCode)"
    Write-Host "Response: $($aiResponse.Content)"
  } catch {
    Write-Host "Status: FAILED ❌" -ForegroundColor Red
    Write-Host "Error Details: $_"
    if ($_.Exception.Response) {
        $result = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($result)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
  }
  
} catch {
  Write-Host "Failed to obtain authentication token. Cannot proceed with tests." -ForegroundColor Red
  Write-Host "Error Details: $_"
  if ($_.Exception.Response) {
      $result = $_.Exception.Response.GetResponseStream()
      $reader = New-Object System.IO.StreamReader($result)
      $reader.BaseStream.Position = 0
      $reader.DiscardBufferedData()
      $responseBody = $reader.ReadToEnd()
      Write-Host "Response Body: $responseBody"
  }
} 

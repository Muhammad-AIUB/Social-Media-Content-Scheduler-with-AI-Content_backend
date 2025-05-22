# Test Post Creation Endpoint

Write-Host "Testing Post Creation Endpoint..." -ForegroundColor Green

# First, get a token by logging in
try {
  Write-Host "Logging in to get auth token..." -ForegroundColor Yellow
  $loginResponse = Invoke-WebRequest -Uri 'http://localhost:3001/auth/login' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"email": "test@example.com", "password": "password123"}'
  
  $responseObj = $loginResponse.Content | ConvertFrom-Json
  $token = $responseObj.access_token
  Write-Host "Token obtained successfully!" -ForegroundColor Green

  # Test creating a post
  Write-Host "`n--- POST CREATION TEST ---" -ForegroundColor Cyan
  
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
} catch {
  Write-Host "Failed to obtain authentication token. Cannot proceed with tests." -ForegroundColor Red
  Write-Host "Error Details: $_"
} 

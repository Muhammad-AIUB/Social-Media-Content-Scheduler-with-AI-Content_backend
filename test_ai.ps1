# Test AI API Endpoints

Write-Host "Testing AI Endpoint..." -ForegroundColor Green

# First, get a token by logging in
try {
  Write-Host "Logging in to get auth token..." -ForegroundColor Yellow
  $loginResponse = Invoke-WebRequest -Uri 'http://localhost:3001/auth/login' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"email": "test@example.com", "password": "password123"}'
  
  $responseObj = $loginResponse.Content | ConvertFrom-Json
  $token = $responseObj.access_token
  Write-Host "Token obtained successfully!" -ForegroundColor Green

  # Test AI Content Generation API
  Write-Host "`n--- AI CONTENT GENERATION API ---" -ForegroundColor Cyan
  
  # Generate content with AI
  Write-Host "`nTest: Generate Content (POST /ai/generate)" -ForegroundColor Yellow
  try {
    $aiResponse = Invoke-WebRequest -Uri 'http://localhost:3001/ai/generate' -Method POST -Headers @{
      'Content-Type'='application/json'
      'Authorization'="Bearer $token"
    } -Body '{"topic": "Social media marketing tips", "platform": "twitter"}'
    
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
} 

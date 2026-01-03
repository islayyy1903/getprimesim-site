# eSimGo API Local Test Script
$apiKey = "lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT"
$apiUrl = "https://api.esim-go.com/v2.4"

Write-Host "Testing eSimGo API Connection..." -ForegroundColor Cyan
Write-Host "API URL: $apiUrl" -ForegroundColor Yellow
Write-Host "API Key: $($apiKey.Substring(0, 10))..." -ForegroundColor Yellow
Write-Host ""

# Test 1: GET Orders (List orders)
Write-Host "Test 1: GET /orders (List orders)" -ForegroundColor Green
try {
    $headers = @{
        'X-API-Key' = $apiKey
        'Content-Type' = 'application/json'
    }
    
    $response = Invoke-WebRequest -Uri "$apiUrl/orders" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "SUCCESS - Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Cyan
    Write-Host $response.Content
} catch {
    Write-Host "ERROR" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody" -ForegroundColor Yellow
    } else {
        Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Full Error: $($_.Exception)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Gray
Write-Host ""

# Test 2: POST Purchase (Test purchase - will fail but shows connection)
Write-Host "Test 2: POST /orders (Test purchase)" -ForegroundColor Green
$headers = @{
    'X-API-Key' = $apiKey
    'Content-Type' = 'application/json'
}

# Generate UUID for profileID
$profileID = [guid]::NewGuid().ToString()

# Test 2a: version field olmadan
Write-Host "Test 2a: POST /orders (without version field)" -ForegroundColor Yellow
    $body1 = @{
        type = "purchase"
        assign = $false
        order = @(
            @{
                type = "bundle"
                quantity = 1
                item = "esim_1GB_7D_US_V2"
                iccids = @()
                allowReassign = $false
            }
        )
        profileID = $profileID
        email = "test@example.com"
        callback_url = "https://getprimesim.com/api/esimgo/webhook"
    } | ConvertTo-Json -Depth 10
    
    Write-Host "Request Body (without version):" -ForegroundColor Cyan
    Write-Host $body1
    Write-Host ""
    
    try {
        $response1 = Invoke-WebRequest -Uri "$apiUrl/orders" -Method POST -Headers $headers -Body $body1 -TimeoutSec 10
        Write-Host "SUCCESS - Status Code: $($response1.StatusCode)" -ForegroundColor Green
        Write-Host "Response:" -ForegroundColor Cyan
        Write-Host $response1.Content
    } catch {
        Write-Host "ERROR" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "Response Body: $responseBody" -ForegroundColor Yellow
        } else {
            Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor Gray
    Write-Host ""
    
    # Test 2b: version field ile v2.4
    Write-Host "Test 2b: POST /orders (with version v2.4)" -ForegroundColor Yellow
    $profileID2 = [guid]::NewGuid().ToString()
    $body2 = @{
        type = "purchase"
        assign = $false
        order = @(
            @{
                type = "bundle"
                quantity = 1
                item = "esim_1GB_7D_US_V2"
                iccids = @()
                allowReassign = $false
            }
        )
        profileID = $profileID2
        email = "test@example.com"
        callback_url = "https://getprimesim.com/api/esimgo/webhook"
        version = "v2.4"
    } | ConvertTo-Json -Depth 10
    
    Write-Host "Request Body (with version v2.4):" -ForegroundColor Cyan
    Write-Host $body2
    Write-Host ""
    
    try {
        $response2 = Invoke-WebRequest -Uri "$apiUrl/orders" -Method POST -Headers $headers -Body $body2 -TimeoutSec 10
        Write-Host "SUCCESS - Status Code: $($response2.StatusCode)" -ForegroundColor Green
        Write-Host "Response:" -ForegroundColor Cyan
        Write-Host $response2.Content
    } catch {
        Write-Host "ERROR" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "Response Body: $responseBody" -ForegroundColor Yellow
        } else {
            Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
        }
    }

Write-Host ""
Write-Host "Test completed!" -ForegroundColor Cyan

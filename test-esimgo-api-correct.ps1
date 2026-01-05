# eSimGo API Test (Correct URL and Authentication)
# PowerShell script to test eSimGo API with correct settings

Write-Host "Testing eSimGo API (Correct Settings)..." -ForegroundColor Cyan
Write-Host ""

# API Configuration (CORRECT)
$apiUrl = "https://api.esim-go.com/v2.4"
$apiKey = "lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT"

Write-Host "API URL: $apiUrl" -ForegroundColor Yellow
Write-Host "API Key: $($apiKey.Substring(0, 20))..." -ForegroundColor Yellow
Write-Host ""

# Test 1: DNS Resolution
Write-Host "1. Testing DNS Resolution..." -ForegroundColor Cyan
try {
    $dnsResult = Resolve-DnsName -Name "api.esim-go.com" -ErrorAction Stop
    Write-Host "SUCCESS: DNS Resolution OK" -ForegroundColor Green
    Write-Host "IP Address: $($dnsResult[0].IPAddress)" -ForegroundColor Gray
} catch {
    Write-Host "FAILED: DNS Resolution" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: HTTP Connection with Correct Authentication
Write-Host "2. Testing HTTP Connection (X-API-Key)..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$apiUrl/orders" -Method GET -Headers @{
        "X-API-Key" = $apiKey
        "Content-Type" = "application/json"
    } -TimeoutSec 10 -ErrorAction Stop
    
    Write-Host "SUCCESS: HTTP Connection OK" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host "Response Length: $($response.Content.Length) bytes" -ForegroundColor Gray
    
    # Try to parse JSON response
    try {
        $jsonResponse = $response.Content | ConvertFrom-Json
        Write-Host "Response is valid JSON" -ForegroundColor Green
        Write-Host "Response preview: $($response.Content.Substring(0, [Math]::Min(200, $response.Content.Length)))" -ForegroundColor Gray
    } catch {
        Write-Host "Response is not JSON (might be HTML or error page)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "FAILED: HTTP Connection" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Status Code: $statusCode" -ForegroundColor Yellow
        
        if ($statusCode -eq 401) {
            Write-Host "WARNING: Unauthorized - API Key might be wrong!" -ForegroundColor Yellow
        } elseif ($statusCode -eq 404) {
            Write-Host "WARNING: Not Found - Endpoint might be wrong!" -ForegroundColor Yellow
        } elseif ($statusCode -eq 403) {
            Write-Host "WARNING: Forbidden - API Key might not have permission!" -ForegroundColor Yellow
        }
        
        # Try to read error response
        try {
            $errorStream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorStream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Error Response: $errorBody" -ForegroundColor Red
        } catch {
            Write-Host "Could not read error response" -ForegroundColor Gray
        }
    }
}

Write-Host ""
Write-Host "Test completed!" -ForegroundColor Green










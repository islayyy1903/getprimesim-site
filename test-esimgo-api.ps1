# eSimGo API URL Test Script
# PowerShell script to test eSimGo API endpoint

Write-Host "Testing eSimGo API URL..." -ForegroundColor Cyan
Write-Host ""

# API Configuration
$apiUrl = "https://api.esimgo.io/v3"
$apiKey = "lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT"

Write-Host "API URL: $apiUrl" -ForegroundColor Yellow
Write-Host "API Key: $($apiKey.Substring(0, 20))..." -ForegroundColor Yellow
Write-Host ""

# Test 1: DNS Resolution
Write-Host "1. Testing DNS Resolution..." -ForegroundColor Cyan
try {
    $dnsResult = Resolve-DnsName -Name "api.esimgo.io" -ErrorAction Stop
    Write-Host "SUCCESS: DNS Resolution OK" -ForegroundColor Green
    Write-Host "IP Address: $($dnsResult[0].IPAddress)" -ForegroundColor Gray
} catch {
    Write-Host "FAILED: DNS Resolution" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "WARNING: DNS problem! Ask eSimGo." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 2: HTTP Connection
Write-Host "2. Testing HTTP Connection..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$apiUrl/orders" -Method GET -Headers @{
        "Authorization" = "Bearer $apiKey"
        "Content-Type" = "application/json"
        "X-API-Version" = "v3"
    } -TimeoutSec 10 -ErrorAction Stop
    
    Write-Host "SUCCESS: HTTP Connection OK" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host "Response Length: $($response.Content.Length) bytes" -ForegroundColor Gray
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
        }
    }
}

Write-Host ""
Write-Host "Test completed!" -ForegroundColor Green

# Local ZIP Parsing Test Script
# Bu script ZIP parsing'i test etmek için kullanılır

Write-Host "🧪 Local ZIP Parsing Test" -ForegroundColor Cyan
Write-Host ""

# Test 1: Server kontrolü
Write-Host "1️⃣ Checking if server is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
    Write-Host "   ✅ Server is running! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Server is not running. Please start it first:" -ForegroundColor Red
    Write-Host "      npm run dev" -ForegroundColor White
    exit 1
}

Write-Host ""

# Test 2: Yeni test siparişi oluştur
Write-Host "2️⃣ Creating test order..." -ForegroundColor Yellow
Write-Host "   Package: esim_1GB_7D_US_V2" -ForegroundColor Gray
Write-Host "   Email: test@example.com" -ForegroundColor Gray
Write-Host ""

try {
    $body = @{
        packageId = "esim_1GB_7D_US_V2"
        email = "test@example.com"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/test-qrcode" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body

    Write-Host "   ✅ Order created!" -ForegroundColor Green
    Write-Host "   Order Reference: $($response.orderReference)" -ForegroundColor White
    Write-Host "   QR Code Length: $($response.qrCodeLength) characters" -ForegroundColor White
    
    if ($response.success) {
        Write-Host "   ✅ QR Code retrieved successfully!" -ForegroundColor Green
        
        if ($response.qrCodeLength -gt 2000) {
            Write-Host "   ✅ QR Code size looks good (>2000 chars)" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️ QR Code size is small (<2000 chars), might be incomplete" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "3️⃣ Opening QR code in browser..." -ForegroundColor Yellow
        $qrCodeUrl = "http://localhost:3000/api/test-qrcode?orderReference=$($response.orderReference)"
        Write-Host "   URL: $qrCodeUrl" -ForegroundColor Gray
        Start-Process $qrCodeUrl
    } else {
        Write-Host "   ❌ Failed to get QR code: $($response.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Response: $($_.ErrorDetails.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ Test completed!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Check the browser window for QR code" -ForegroundColor White
Write-Host "2. Check terminal logs for ZIP parsing details" -ForegroundColor White
Write-Host "3. Verify QR code image is visible" -ForegroundColor White






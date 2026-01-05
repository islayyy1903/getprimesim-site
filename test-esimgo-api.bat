@echo off
REM eSimGo API URL Test Script (Simple Batch)
echo.
echo 🔍 Testing eSimGo API URL...
echo.

REM Test 1: DNS Resolution
echo 1️⃣ Testing DNS Resolution...
nslookup api.esimgo.io
if %errorlevel% equ 0 (
    echo ✅ DNS Resolution: SUCCESS
) else (
    echo ❌ DNS Resolution: FAILED
    echo ⚠️ DNS sorunu var! eSimGo'ya sorun.
    pause
    exit /b 1
)

echo.
echo 2️⃣ Testing HTTP Connection...
curl -I -X GET "https://api.esimgo.io/v3/orders" -H "Authorization: Bearer lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT" -H "Content-Type: application/json" -H "X-API-Version: v3" --max-time 10
if %errorlevel% equ 0 (
    echo ✅ HTTP Connection: SUCCESS
) else (
    echo ❌ HTTP Connection: FAILED
    echo ⚠️ API endpoint'e ulaşılamıyor!
)

echo.
echo ✅ Test completed!
pause





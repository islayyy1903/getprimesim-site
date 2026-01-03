# 🧪 Local QR Code Test Rehberi

## ✅ Test Endpoint Hazır!

QR code'u local'de test etmek için yeni bir endpoint oluşturduk:

**`/api/test-qrcode`**

---

## 📋 Kullanım Yöntemleri

### 1️⃣ Mevcut Order Reference ile Test

Eğer daha önce bir sipariş oluşturduysan ve `orderReference`'ın varsa:

**GET Request:**
```
http://localhost:3000/api/test-qrcode?orderReference=ORDER_REFERENCE_HERE
```

**Örnek:**
```
http://localhost:3000/api/test-qrcode?orderReference=ORD-123456789
```

**Tarayıcıda aç:**
- Local development: `http://localhost:3000/api/test-qrcode?orderReference=ORD-123456789`
- Production: `https://getprimesim-site.vercel.app/api/test-qrcode?orderReference=ORD-123456789`

---

### 2️⃣ Yeni Test Siparişi Oluştur ve QR Code Al

**POST Request:**
```bash
curl -X POST http://localhost:3000/api/test-qrcode \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "usa-1gb-7days",
    "email": "test@example.com"
  }'
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/test-qrcode" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"packageId":"usa-1gb-7days","email":"test@example.com"}'
```

**Response:**
```json
{
  "success": true,
  "orderReference": "ORD-123456789",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "qrCodeUrl": null,
  "qrCodeLength": 892,
  "qrCodePreview": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

---

## 🎯 Test Endpoint Özellikleri

### GET Endpoint
- ✅ Order reference ile QR code'u getirir
- ✅ HTML sayfası olarak gösterir (görsel test için)
- ✅ Debug bilgileri gösterir:
  - QR Code Length
  - Has Data URI prefix
  - Final Length
  - First/Last 50 characters
- ✅ QR code image render eder
- ✅ Image load error handling

### POST Endpoint
- ✅ Yeni test siparişi oluşturur
- ✅ 3 saniye bekler (eSimGo assignment işlemi için)
- ✅ QR code'u otomatik getirir
- ✅ JSON response döner

---

## 🔍 Debug Bilgileri

Test endpoint'i şu bilgileri gösterir:

1. **Order Reference** - Sipariş referansı
2. **Success Status** - Başarılı mı?
3. **QR Code Length** - QR code base64 uzunluğu
4. **Has Data URI** - `data:image/png;base64,` prefix var mı?
5. **Final Length** - Final base64 string uzunluğu
6. **First 50 chars** - İlk 50 karakter (format kontrolü)
7. **Last 50 chars** - Son 50 karakter (tamamlık kontrolü)

---

## 📝 Örnek Kullanım Senaryoları

### Senaryo 1: Mevcut Siparişin QR Code'unu Kontrol Et

1. Stripe webhook loglarından `orderReference`'ı bul
2. Tarayıcıda aç:
   ```
   http://localhost:3000/api/test-qrcode?orderReference=ORD-123456789
   ```
3. QR code görünüyor mu kontrol et
4. Debug bilgilerini incele

### Senaryo 2: Yeni Test Siparişi

1. Terminal'de POST request gönder:
   ```bash
   curl -X POST http://localhost:3000/api/test-qrcode \
     -H "Content-Type: application/json" \
     -d '{"packageId":"usa-1gb-7days","email":"test@example.com"}'
   ```
2. Response'dan `orderReference`'ı al
3. GET endpoint ile HTML sayfasını aç
4. QR code'u görsel olarak kontrol et

### Senaryo 3: Production'da Test

1. Production URL'ini kullan:
   ```
   https://getprimesim-site.vercel.app/api/test-qrcode?orderReference=ORD-123456789
   ```
2. Vercel Runtime Logs'u kontrol et
3. QR code görünüyor mu kontrol et

---

## ⚠️ Önemli Notlar

1. **Local Development:**
   - `npm run dev` çalışıyor olmalı
   - Environment variables (`.env.local`) yüklü olmalı
   - `ESIMGO_API_KEY` ve `ESIMGO_API_URL` gerekli

2. **Production:**
   - Vercel environment variables ayarlı olmalı
   - Test endpoint production'da da çalışır

3. **QR Code Format:**
   - Endpoint otomatik olarak `data:image/png;base64,` prefix ekler
   - Eğer zaten varsa, tekrar eklemez

4. **Timing:**
   - POST endpoint 3 saniye bekler (eSimGo assignment için)
   - Eğer QR code hemen gelmezse, birkaç saniye sonra tekrar dene

---

## 🐛 Sorun Giderme

### QR Code Görünmüyor

1. **Debug bilgilerini kontrol et:**
   - QR Code Length < 2000 → QR code eksik/kesik
   - Has Data URI: No → Prefix eklenmemiş (otomatik eklenir)
   - Image load error → Base64 format hatası

2. **Console loglarını kontrol et:**
   - Browser console'da image error var mı?
   - Network tab'de image request başarılı mı?

3. **Vercel Runtime Logs:**
   - `/esims/assignments` endpoint response'u kontrol et
   - ZIP file size kontrol et
   - PNG extraction başarılı mı?

### Order Reference Bulunamıyor

1. **Stripe webhook loglarından al:**
   - Vercel Runtime Logs → `orderReference` ara
   - eSimGo dashboard'dan order reference'ı al

2. **POST endpoint ile yeni sipariş oluştur:**
   - Test için yeni sipariş oluştur
   - Response'dan `orderReference`'ı al

---

## 📚 İlgili Dosyalar

- `app/api/test-qrcode/route.ts` - Test endpoint
- `app/lib/esimgo.ts` - eSimGo API functions
- `app/lib/email.ts` - Email sending functions

---

## ✅ Test Checklist

- [ ] Local development server çalışıyor (`npm run dev`)
- [ ] Environment variables yüklü (`.env.local`)
- [ ] GET endpoint ile mevcut order reference test edildi
- [ ] POST endpoint ile yeni test siparişi oluşturuldu
- [ ] QR code HTML sayfasında görünüyor
- [ ] Debug bilgileri doğru
- [ ] Image load error yok
- [ ] Production'da da test edildi

---

**Son Güncelleme:** Test endpoint oluşturuldu ve deploy edildi.



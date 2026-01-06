# eSimGo API v3 Kurulumu

## ✅ eSimGo v3 Callback Version

**Callback URL:** `https://getprimesim.com/api/esimgo/webhook`

Bu endpoint eSimGo v3 API'den gelen callback'leri dinler.

---

## 🔧 VERCEL ENVIRONMENT VARIABLES

### Gerekli Değişkenler:

1. **ESIMGO_API_KEY** ✅
   - Değer: `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
   - Durum: ✅ Eklendi

2. **ESIMGO_API_URL** ❓
   - Örnek: `https://api.esimgo.com` (v3 endpoint `/v3/orders` olarak eklenir)
   - Durum: ⏳ eSimGo'dan alınacak

3. **ESIMGO_WEBHOOK_SECRET** ❓ (Opsiyonel)
   - Webhook signature verification için
   - Durum: ⏳ eSimGo'dan alınacak (varsa)

---

## 📋 API v3 ENDPOINT YAPISI

### eSim Satın Alma (POST)
```
POST {ESIMGO_API_URL}/v3/orders
Headers:
  Authorization: Bearer {ESIMGO_API_KEY}
  Content-Type: application/json
  X-API-Version: v3
Body:
  {
    "package_id": "usa-1gb-7days",
    "email": "customer@example.com",
    "quantity": 1,
    "callback_url": "https://getprimesim.com/api/esimgo/webhook",
    "version": "v3"
  }
```

### Callback Response (v3)
```
POST https://getprimesim.com/api/esimgo/webhook
Body:
  {
    "event_type": "order.completed",
    "order_id": "12345",
    "status": "completed",
    "qr_code": "base64...",
    "qr_code_url": "https://...",
    "email": "customer@example.com",
    "version": "v3"
  }
```

---

## 🔍 VERCEL'E EKLEME

### Adım 1: Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Settings** → **Environment Variables**

### Adım 2: ESIMGO_API_URL Ekleme
- **Name:** `ESIMGO_API_URL`
- **Value:** `https://api.esimgo.com` (eSimGo'dan alınan base URL)
- **Environment:** Production, Preview, Development
- **Save**

### Adım 3: ESIMGO_WEBHOOK_SECRET Ekleme (varsa)
- **Name:** `ESIMGO_WEBHOOK_SECRET`
- **Value:** `whsec_xxxxx` (eSimGo'dan alınan secret)
- **Environment:** Production, Preview, Development
- **Save**

---

## ✅ KOD GÜNCELLEMELERİ

### 1. API Client (app/lib/esimgo.ts)
- ✅ v3 endpoint: `/v3/orders`
- ✅ `callback_url` parametresi eklendi
- ✅ `X-API-Version: v3` header eklendi

### 2. Webhook Endpoint (app/api/esimgo/webhook/route.ts)
- ✅ v3 callback format'ı destekleniyor
- ✅ v3 event types destekleniyor
- ✅ Detaylı logging eklendi

---

## 🧪 TEST ETME

### 1. Callback Endpoint Test
Tarayıcıda test edin:
```
https://getprimesim.com/api/esimgo/webhook
```

GET isteği gönderilirse, `{"message": "eSimGo webhook endpoint is active"}` dönmeli.

### 2. eSimGo v3 API Test
eSimGo dashboard'unda test siparişi oluşturun:
1. Test paket seçin
2. Callback URL: `https://getprimesim.com/api/esimgo/webhook`
3. Test siparişi oluşturun
4. Vercel Function Logs'da kontrol edin

---

## 📊 LOGLAR

Webhook callback'lerini kontrol etmek için:

1. **Vercel Dashboard** → Projeniz → **Functions**
2. `/api/esimgo/webhook` fonksiyonunu seçin
3. **Logs** sekmesine gidin
4. v3 callback'leri görün

**Log format:**
```
=== ESIMGO V3 CALLBACK CALLED ===
📦 eSimGo v3 Callback Details:
  - Version: v3
  - Event type: order.completed
  - Order ID: 12345
  - Status: completed
  - Email: customer@example.com
  - QR Code: Base64 provided
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **API URL Format:**
   - Base URL: `https://api.esimgo.com` (sonunda `/` yok)
   - Endpoint: `/v3/orders` (kodda otomatik eklenir)

2. **Callback URL:**
   - Production: `https://getprimesim.com/api/esimgo/webhook`
   - HTTPS zorunlu ✅

3. **Version Header:**
   - `X-API-Version: v3` header'ı otomatik eklenir

---

## ✅ CHECKLIST

- [x] v3 callback endpoint oluşturuldu
- [x] v3 API client güncellendi
- [x] Callback URL hazır: `https://getprimesim.com/api/esimgo/webhook`
- [ ] ESIMGO_API_URL eklendi (Vercel'e)
- [ ] ESIMGO_WEBHOOK_SECRET eklendi (varsa, Vercel'e)
- [ ] eSimGo'da callback URL ayarlandı
- [ ] Test siparişi oluşturuldu
- [ ] Callback logları kontrol edildi

---

## 🚀 SONRAKI ADIMLAR

1. **eSimGo'dan API URL'i alın**
   - Base URL: `https://api.esimgo.com` (veya farklı bir URL)
   - Vercel'e ekleyin: `ESIMGO_API_URL`

2. **eSimGo'da callback URL ayarlayın**
   - Dashboard → Settings → Callback URL
   - URL: `https://getprimesim.com/api/esimgo/webhook`
   - Version: v3

3. **Test edin**
   - Test siparişi oluşturun
   - Callback'in geldiğini kontrol edin
   - Logları inceleyin

---

**eSimGo API base URL'i nedir? (örn: `https://api.esimgo.com`) 🚀**












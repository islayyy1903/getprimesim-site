# eSimGo Entegrasyonu - Gerekenler

## 🚨 SORUN TESPİTİ

**Durum:**
- ✅ Email geliyor
- ❌ QR code gelmiyor
- ❌ eSim gelmiyor
- ❌ Inventory'den düşmüyor

**Anlamı:** eSimGo API'ye istek gitmiyor veya başarısız oluyor!

---

## ✅ ŞU ANDA SAHİP OLDUKLARIMIZ

### 1. API Key ✅
```
lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT
```

### 2. API URL ✅
```
https://api.esimgo.io/v3
```

### 3. Callback URL ✅
```
https://getprimesim.com/api/esimgo/webhook
```

---

## ❓ eSimGo'DAN KONTROL EDİLMESİ GEREKENLER

### 1. API Key Doğru mu? 🔑

**Kontrol:**
- eSimGo Dashboard → API Settings
- API Key'iniz aktif mi?
- API Key'iniz doğru mu?
- API Key'iniz expire olmuş mu?

**Test:**
- eSimGo API'ye basit bir test isteği atın
- 401 Unauthorized hatası alıyorsanız → API Key yanlış

---

### 2. API Endpoint Doğru mu? 🌐

**Kontrol:**
- eSimGo Dashboard → API Documentation
- API Base URL nedir?
- `/orders` endpoint'i doğru mu?
- v3 API versiyonu doğru mu?

**Mevcut:**
```
POST https://api.esimgo.io/v3/orders
```

**eSimGo'dan kontrol edin:**
- Bu endpoint doğru mu?
- Farklı bir endpoint mi kullanılıyor?
- Örn: `/purchases`, `/buy`, `/create-order`?

---

### 3. Request Format Doğru mu? 📝

**Şu anki request formatımız:**
```json
{
  "type": "purchase",
  "assign": false,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "esim_1GB_7D_US_V2",
      "iccids": [],
      "allowReassign": false
    }
  ],
  "profileID": "uuid-format",
  "email": "customer@email.com",
  "callback_url": "https://getprimesim.com/api/esimgo/webhook",
  "version": "v3"
}
```

**eSimGo'dan kontrol edin:**
- Bu format doğru mu?
- Farklı field'lar mı gerekiyor?
- `type: "purchase"` doğru mu?
- `order` array formatı doğru mu?
- `item` field'ı doğru mu? (belki `bundle`, `package_id`, `product_id`?)

---

### 4. Bundle İsimleri Doğru mu? 📦

**Mevcut bundle isimlerimiz:**
- ✅ `esim_1GB_7D_US_V2` (CSV'den görüldü)
- ⚠️ `esim_3GB_30D_US_V2` (tahmin)
- ⚠️ `esim_1GB_7D_GB_V2` (tahmin)
- ⚠️ `esim_1GB_7D_DE_V2` (tahmin)
- ⚠️ `esim_3GB_30D_GB_V2` (tahmin)
- ⚠️ `esim_3GB_30D_DE_V2` (tahmin)
- ⚠️ `esim_1GB_7D_GL_V2` (tahmin - Global)
- ⚠️ `esim_3GB_30D_GL_V2` (tahmin - Global)

**eSimGo'dan kontrol edin:**
- eSimGo Dashboard → Products / Bundles
- Tüm bundle isimlerini listeleyin
- Format doğru mu? (örn: `esim_1GB_7D_US_V2`)
- Farklı bir format mı kullanılıyor?

---

### 5. API Dokümantasyonu 📚

**eSimGo'dan isteyin:**
- API v3 dokümantasyonu
- Request format örnekleri
- Response format örnekleri
- Error code'ları ve anlamları
- Authentication yöntemi (Bearer token doğru mu?)

---

### 6. Test/Sandbox Ortamı 🧪

**eSimGo'da var mı?**
- Test API key'i
- Test API URL'i
- Test bundle'ları
- Test siparişi yapabilir miyiz?

---

## 🔍 VERCEL LOGLARINDAN KONTROL

### Vercel Dashboard → Logs

**Arayın:**

1. **eSimGo API Request:**
```
📤 eSimGo API Request Body:
📤 eSimGo API URL: https://api.esimgo.io/v3/orders
```

2. **eSimGo API Response:**
```
📥 eSimGo API Response:
  - Full response: {...}
```

3. **VEYA Hata:**
```
❌ eSimGo API error:
  - Status: 400 / 401 / 404 / 422
  - Error response: {...}
```

**Hata mesajı ne diyor?**
- "failed to parse request body" → Request format yanlış
- "Invalid bundle" → Bundle ismi yanlış
- "Unauthorized" → API key yanlış
- "404 Not Found" → API endpoint yanlış

---

## 📋 eSimGo'YA SORULACAK SORULAR

### 1. API Key Kontrolü
```
API Key'imiz: lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT
Bu key aktif mi? Doğru mu?
```

### 2. API Endpoint
```
API endpoint'imiz: POST https://api.esimgo.io/v3/orders
Bu doğru mu? Farklı bir endpoint mi kullanmalıyız?
```

### 3. Request Format
```
Request formatımız doğru mu?
{
  "type": "purchase",
  "order": [{ "type": "bundle", "item": "esim_1GB_7D_US_V2", ... }],
  ...
}
```

### 4. Bundle İsimleri
```
Tüm bundle isimlerini paylaşabilir misiniz?
Özellikle:
- USA 3GB
- UK 1GB ve 3GB
- Germany 1GB ve 3GB
- Global 1GB ve 3GB
```

### 5. API Dokümantasyonu
```
API v3 dokümantasyonunu paylaşabilir misiniz?
Request/Response örnekleri var mı?
```

---

## 🎯 HIZLI KONTROL LİSTESİ

### Vercel Environment Variables:
- [ ] `ESIMGO_API_KEY` = `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT` ✅
- [ ] `ESIMGO_API_URL` = `https://api.esimgo.io/v3` ✅

### eSimGo Dashboard Kontrol:
- [ ] API Key aktif mi?
- [ ] API endpoint doğru mu?
- [ ] Request format doğru mu?
- [ ] Bundle isimleri doğru mu?
- [ ] Inventory'de stok var mı?

### Vercel Logları:
- [ ] Request body log'u var mı?
- [ ] Response log'u var mı?
- [ ] Hata mesajı ne?

---

## 🚀 SONRAKI ADIMLAR

1. **Vercel loglarını kontrol edin**
   - Hata mesajını bulun
   - Request body'yi kontrol edin

2. **eSimGo'ya sorun:**
   - API dokümantasyonu
   - Bundle isimleri
   - Request format örneği

3. **Test siparişi yapın:**
   - eSimGo Dashboard'dan manuel test
   - Veya API'ye direkt test isteği

---

**Önce Vercel loglarını kontrol edin, sonra eSimGo'ya sorun! 🔍**












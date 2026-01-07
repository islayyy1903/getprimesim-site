# eSimGo Sipariş Sorunu

## 🚨 SORUN

**Durum:**
- ✅ Email geliyor
- ❌ QR code gelmiyor
- ❌ eSim gelmiyor
- ❌ Inventory'den düşmüyor

**Anlamı:** eSimGo API'ye istek gitmiyor veya başarısız oluyor!

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Vercel Logları Kontrol

**Vercel Dashboard → Logs** sekmesinde arayın:

**eSimGo API İsteği:**
```
📤 Sending request to eSimGo API...
  - API URL: ...
  - Package ID: ...
  - Email: ...
```

**eSimGo API Response:**
```
📥 eSimGo API Response:
  - Full response: {...}
```

**VEYA hata:**
```
❌ eSimGo API error:
  - Status: ...
  - Error: ...
```

**VEYA:**
```
❌ eSimGo purchase failed:
  - Error: ...
```

### 2. eSimGo Dashboard Kontrol

**eSimGo Dashboard → Orders:**
- Sipariş görünüyor mu?
- Hangi durumda? (Failed, Processing, Completed?)

**eSimGo Dashboard → Inventory:**
- Stok düştü mü?
- Hangi bundle'dan düştü?

---

## 🎯 OLASI SORUNLAR

### Sorun 1: eSimGo API'ye İstek Gitmiyor

**Loglarda görülecek:**
- `📤 Sending request to eSimGo API...` YOK
- `❌ eSimGo API bilgileri eksik` VAR

**Çözüm:**
- Vercel'de `ESIMGO_API_KEY` ve `ESIMGO_API_URL` kontrol edin

### Sorun 2: eSimGo API Hata Veriyor

**Loglarda görülecek:**
```
❌ eSimGo API error:
  - Status: 400 / 404 / 401
  - Error: failed to parse request body / Invalid bundle / ...
```

**Olası nedenler:**
- Request format yanlış
- Bundle ismi yanlış
- API endpoint yanlış
- API key yanlış

### Sorun 3: Bundle İsmi Yanlış

**Loglarda görülecek:**
```
❌ eSimGo API error:
  - Error: Bundle not found / Invalid bundle
  - Bundle: esim_1GB_7D_US_V2
```

**Çözüm:**
- eSimGo Dashboard'dan doğru bundle isimlerini kontrol edin
- `app/lib/esimgo.ts` dosyasındaki `bundleMap`'i güncelleyin

### Sorun 4: API Endpoint Yanlış

**Loglarda görülecek:**
```
❌ eSimGo API error:
  - Status: 404
  - Error: Not found
```

**Çözüm:**
- eSimGo API dokümantasyonundan doğru endpoint'i bulun
- Vercel'de `ESIMGO_API_URL` güncelleyin

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **Vercel Logları Kontrol**
   - `📤 Sending request to eSimGo API...` var mı?
   - `📥 eSimGo API Response:` var mı?
   - `❌ eSimGo API error:` var mı?

2. ✅ **eSimGo Dashboard Kontrol**
   - Orders'da sipariş var mı?
   - Inventory'de stok düştü mü?

3. ✅ **Hata Mesajını Paylaşın**
   - Loglardaki hata mesajını paylaşın
   - eSimGo API response'unu paylaşın

---

## 🔧 HIZLI ÇÖZÜM

**Logları kontrol edin ve şunları paylaşın:**
- `📤 Sending request to eSimGo API...` logu var mı?
- `📥 eSimGo API Response:` logu var mı?
- `❌ eSimGo API error:` logu var mı?
- Hata mesajı ne?

---

**Vercel loglarını kontrol edin ve hata mesajını paylaşın! 🔍**















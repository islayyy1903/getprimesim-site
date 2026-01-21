# eSimGo Hata Log Arama

## 🚨 SORUN TESPİT EDİLDİ

**Loglardan görülen:**
- ✅ "Notification email sent to customer about eSimGo issue"
- ❌ Bu, eSimGo purchase başarısız olduğunda gönderilen email!

**Sorun:** eSimGo API'den hata dönüyor!

---

## 🔍 ARANACAK LOGLAR

### 1. eSimGo Purchase Failed Logu

**Vercel Dashboard → Logs** sekmesinde arayın:

```
❌ eSimGo purchase failed:
  - Error: ...  ← HATA MESAJI BURADA!
  - Is Stock Error: true/false
  - Package: ...
  - eSimGo Package ID: ...
```

### 2. eSimGo API Response

**Arayın:**
```
📥 eSimGo API Response:
  - Full response: {...}  ← TAM RESPONSE BURADA!
```

**VEYA hata durumunda:**
```
❌ eSimGo API error:
  - Status: ...  ← HTTP STATUS CODE
  - Error response: {...}  ← HATA DETAYLARI
```

### 3. eSimGo API Request

**Arayın:**
```
📤 Sending request to eSimGo API...
  - API URL: ...
  - Package ID: ...
  - Email: ...
```

---

## 🎯 OLASI HATALAR

### Hata 1: Paket ID Yanlış
**Loglarda görülecek:**
```
❌ eSimGo purchase failed:
  - Error: Package not found / Invalid package ID
  - eSimGo Package ID: usa-1gb-7days
```

**Çözüm:** eSimGo'dan doğru paket ID'lerini alın ve `app/lib/esimgo.ts` dosyasındaki `mapPackageToEsimGo` fonksiyonunu güncelleyin.

### Hata 2: API Endpoint Yanlış
**Loglarda görülecek:**
```
❌ eSimGo API error:
  - Status: 404
  - Error: Not found
```

**Çözüm:** eSimGo API dokümantasyonundan doğru endpoint'i kontrol edin.

### Hata 3: API Key Yanlış
**Loglarda görülecek:**
```
❌ eSimGo API error:
  - Status: 401
  - Error: Unauthorized / Invalid API key
```

**Çözüm:** Vercel'de `ESIMGO_API_KEY` doğru mu kontrol edin.

### Hata 4: Request Format Yanlış
**Loglarda görülecek:**
```
❌ eSimGo API error:
  - Status: 400
  - Error: Bad request / Invalid request format
```

**Çözüm:** eSimGo API dokümantasyonundan request formatını kontrol edin.

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **"❌ eSimGo purchase failed"** logunu bulun
2. ✅ **Hata mesajını paylaşın**
3. ✅ **"📥 eSimGo API Response"** veya **"❌ eSimGo API error"** logunu bulun
4. ✅ **Full response veya error response'u paylaşın**

---

## 🔧 HIZLI ÇÖZÜM

**Arama terimleri:**
- `❌ eSimGo purchase failed`
- `❌ eSimGo API error`
- `📥 eSimGo API Response`
- `📤 Sending request to eSimGo API`

**Bu logları bulup paylaşın, hemen çözelim! 🔍**
















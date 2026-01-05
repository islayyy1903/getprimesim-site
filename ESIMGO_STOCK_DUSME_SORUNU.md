# eSimGo Stock Düşme Sorunu

## 🚨 SORUN

eSimGo Dashboard'da stock'ta düşme görünmüyor.

**Anlamı:** Sipariş eSimGo API'ye başarıyla gönderilmiyor veya işlenmiyor!

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Vercel Loglarını Kontrol Et

**Vercel Dashboard → Logs** sekmesinde şunları ara:

#### A. eSimGo API Request
```
📤 eSimGo API Request Body:
{
  "type": "transaction",
  "assign": true,
  ...
}
📤 eSimGo API URL: https://api.esim-go.com/v2.3/orders
```

#### B. eSimGo API Response
```
📥 eSimGo API Response:
  - Full response: {...}
  - Order Reference: ...
  - Status: 200 / 201 / 400 / 403 / 404?
```

**ÖNEMLİ:** Status code ne? (200 OK olmalı!)

#### C. Sipariş Başarılı mı?
```
✅ eSim purchased successfully
  - Order ID: ...
```
VEYA
```
❌ eSimGo purchase failed:
  - Error: ...
  - Status: ...
```

---

## 🎯 OLASI SEBEPLER

### Senaryo 1: API Request Başarısız (403, 400, 404)

**Loglarda görülecek:**
```
❌ eSimGo API error:
  - Status: 403 / 400 / 404
  - Error: access denied / invalid request / not found
```

**Çözüm:**
- API Key doğru mu?
- Request format doğru mu? (`type: transaction`, `assign: true`)
- API URL doğru mu? (`https://api.esim-go.com/v2.3`)

### Senaryo 2: API Request Başarılı Ama Stock Düşmüyor

**Loglarda görülecek:**
```
✅ eSim purchased successfully
  - Order ID: ...
📥 eSimGo API Response:
  - Status: 200
  - Full response: {...}
```

**Ama eSimGo Dashboard'da stock düşmüyor!**

**Olası Sebepler:**
1. **Request format yanlış** - `type: transaction` yerine başka bir type gerekiyor?
2. **assign: true yeterli değil** - Başka bir field eksik?
3. **Bundle ismi yanlış** - eSimGo'da bu bundle var mı?
4. **eSimGo API farklı çalışıyor** - Belki "purchase" type'ı gerekiyor?

### Senaryo 3: Request Hiç Gönderilmiyor

**Loglarda görülecek:**
```
❌ eSimGo API bilgileri eksik
```
VEYA
```
❌ Error processing eSimGo purchase
```

**Çözüm:**
- Environment variables kontrol et (`ESIMGO_API_KEY`, `ESIMGO_API_URL`)

---

## 📋 YAPILMASI GEREKENLER

### Adım 1: Vercel Loglarını Kontrol Et

**Arayacağın loglar:**
1. `📤 eSimGo API Request Body:` → Request formatı doğru mu?
2. `📥 eSimGo API Response:` → Status code ne? (200 olmalı)
3. `✅ eSim purchased successfully` → Başarılı mı?
4. `❌ eSimGo purchase failed` → Hata var mı?

### Adım 2: eSimGo Dashboard Kontrolü

1. **eSimGo Dashboard → Orders**
   - Son siparişi bul (Order ID ile)
   - Status ne? (completed, pending, failed?)
   - Stock düşmüş mü?

2. **eSimGo Dashboard → Inventory**
   - Bundle'ın stock'u ne?
   - Son düşüş ne zaman olmuş?

### Adım 3: Request Formatını Kontrol Et

**Mevcut format:**
```json
{
  "type": "transaction",
  "assign": true,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "esim_1GB_7D_US_V2",
      "allowReassign": false
    }
  ],
  "profileID": "...",
  "email": "...",
  "callback_url": "..."
}
```

**Kontrol:**
- `type: "transaction"` doğru mu? (Belki `"purchase"` olmalı?)
- `assign: true` yeterli mi?
- Bundle ismi doğru mu? (`esim_1GB_7D_US_V2` eSimGo'da var mı?)

---

## 🔧 OLASI ÇÖZÜMLER

### Çözüm 1: Request Type'ı Değiştir

Belki `type: "transaction"` yerine `type: "purchase"` gerekiyor?

**Denenecek:**
```json
{
  "type": "purchase",  // "transaction" yerine "purchase"
  "assign": true,
  ...
}
```

### Çözüm 2: Bundle İsmini Kontrol Et

eSimGo Dashboard'dan doğru bundle ismini kontrol et:
- `esim_1GB_7D_US_V2` doğru mu?
- Farklı bir format mı kullanılıyor?

### Çözüm 3: eSimGo API Dokümantasyonunu Kontrol Et

eSimGo API dokümantasyonunda:
- Order oluşturma endpoint'i ne?
- Request formatı nasıl olmalı?
- Stock düşmesi için ne gerekiyor?

---

## 📝 PAYLAŞILMASI GEREKEN BİLGİLER

Lütfen şunları paylaş:

1. **Vercel Logları:**
   - `📤 eSimGo API Request Body:` içeriği
   - `📥 eSimGo API Response:` içeriği (Full response)
   - `✅ eSim purchased successfully` var mı? Yoksa `❌ eSimGo purchase failed` var mı?

2. **eSimGo Dashboard:**
   - Orders sayfasında sipariş var mı?
   - Sipariş status'u ne?
   - Inventory'de stock düşmüş mü?

3. **Hata Mesajları:**
   - Herhangi bir hata var mı? (403, 400, 404?)

---

**Vercel loglarını kontrol et ve paylaş! Özellikle eSimGo API response'unu görmemiz lazım! 🔍**









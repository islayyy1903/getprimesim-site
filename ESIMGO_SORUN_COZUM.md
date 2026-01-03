# eSimGo Sipariş Sorunu - Çözüm

## 🚨 SORUN

**Durum:**
- ✅ Email geliyor
- ❌ QR code gelmiyor
- ❌ eSim gelmiyor
- ❌ Inventory'den düşmüyor

**Anlamı:** eSimGo API'ye istek gitmiyor veya başarısız oluyor!

---

## ✅ YAPILAN DÜZELTMELER

### 1. Detaylı Log Eklendi

**`app/lib/esimgo.ts` dosyasına eklendi:**
- Request body log'u
- API URL log'u
- Daha detaylı error logging

### 2. Request Format Kontrol Edildi

**Request body formatı:**
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

---

## 🔍 LOGLARI KONTROL EDİN

### Vercel Dashboard → Logs

**Arayın:**

1. **eSimGo API Request:**
```
📤 eSimGo API Request Body:
{
  "type": "purchase",
  ...
}
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

---

## 🎯 OLASI HATALAR VE ÇÖZÜMLERİ

### Hata 1: "failed to parse request body"

**Neden:** Request format yanlış

**Çözüm:** 
- Loglardaki request body'yi kontrol edin
- eSimGo dokümantasyonuna göre format doğru mu?

### Hata 2: "Invalid bundle" / "Bundle not found"

**Neden:** Bundle ismi yanlış

**Çözüm:**
- eSimGo Dashboard'dan doğru bundle isimlerini kontrol edin
- `app/lib/esimgo.ts` dosyasındaki `bundleMap`'i güncelleyin

**Mevcut bundle isimleri:**
- `esim_1GB_7D_US_V2` ✅ (CSV'den görüldü)
- `esim_3GB_30D_US_V2` ⚠️ (tahmin)
- `esim_1GB_7D_GB_V2` ⚠️ (tahmin)
- `esim_1GB_7D_DE_V2` ⚠️ (tahmin)
- vb.

### Hata 3: "Unauthorized" / "Invalid API key"

**Neden:** API key yanlış

**Çözüm:**
- Vercel'de `ESIMGO_API_KEY` doğru mu kontrol edin
- eSimGo Dashboard'dan yeni API key alın

### Hata 4: "404 Not Found"

**Neden:** API endpoint yanlış

**Çözüm:**
- Vercel'de `ESIMGO_API_URL` doğru mu kontrol edin
- Doğru URL: `https://api.esimgo.io/v3`

### Hata 5: "422 Unprocessable Entity"

**Neden:** Request body'de eksik/yanlış field

**Çözüm:**
- Loglardaki request body'yi kontrol edin
- eSimGo dokümantasyonuna göre tüm gerekli field'lar var mı?

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **Kod güncellendi** - Detaylı loglar eklendi
2. ⏳ **Test siparişi yapın**
3. ⏳ **Vercel loglarını kontrol edin**
4. ⏳ **Hata mesajını paylaşın**

---

## 🚀 TEST ADIMLARI

1. **Test Siparişi Yapın:**
   - `https://getprimesim.com/esim`
   - Paket seçin → "Buy Now"
   - Ödeme yapın

2. **Vercel Loglarını Kontrol Edin:**
   - Vercel Dashboard → Logs
   - `📤 eSimGo API Request Body:` arayın
   - `📥 eSimGo API Response:` arayın
   - `❌ eSimGo API error:` arayın

3. **Hata Mesajını Paylaşın:**
   - Loglardaki hata mesajını paylaşın
   - Request body'yi paylaşın
   - Response'u paylaşın

---

## 🔧 HIZLI KONTROL

**Vercel Environment Variables:**
- ✅ `ESIMGO_API_KEY` var mı?
- ✅ `ESIMGO_API_URL` = `https://api.esimgo.io/v3` mi?
- ✅ `NEXT_PUBLIC_BASE_URL` = `https://getprimesim.com` mi?

**eSimGo Dashboard:**
- ✅ API key doğru mu?
- ✅ Bundle isimleri doğru mu?
- ✅ Inventory'de stok var mı?

---

**Kod güncellendi! Test edin ve logları paylaşın! 🔍**




# eSimGo Request Format Hatası

## 🚨 HATA: "failed to parse request body"

**Anlamı:** Request body formatı yanlış!

**eSimGo API gönderdiğimiz formatı anlayamıyor.**

---

## 🔍 SORUN ANALİZİ

### Şu Anki Format (Yanlış)
```json
{
  "package_id": "usa-1gb-7days",
  "email": "customer@example.com",
  "quantity": 1,
  "callback_url": "https://getprimesim.com/api/esimgo/webhook",
  "version": "v3",
  "profileID": "9c7f2a01-8b4d-4c11-9a22-abcdef123456"
}
```

### eSimGo API Beklenen Format (Dokümantasyondan)
```json
{
  "type": "validate",
  "assign": false,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "usa-1gb-7days",
      "iccids": [],
      "allowReassign": false
    }
  ],
  "profileID": "9c7f2a01-8b4d-4c11-9a22-abcdef123456"
}
```

**VEYA eSim satın alma için:**
```json
{
  "type": "purchase",
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "usa-1gb-7days"
    }
  ],
  "profileID": "9c7f2a01-8b4d-4c11-9a22-abcdef123456",
  "email": "customer@example.com",
  "callback_url": "https://getprimesim.com/api/esimgo/webhook"
}
```

---

## 🔧 ÇÖZÜM

### eSimGo API Dokümantasyonunda Kontrol Edin

**Arayın:**
- "Create Order" veya "Purchase eSim" endpoint'i
- Request body formatı
- Required fields
- Field isimleri (package_id mi, item mi?)

### Olası Formatlar

**Format 1: Order Array Format**
```json
{
  "type": "purchase",
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "usa-1gb-7days"
    }
  ],
  "profileID": "uuid",
  "email": "customer@example.com"
}
```

**Format 2: Basit Format (Şu Anki)**
```json
{
  "package_id": "usa-1gb-7days",
  "email": "customer@example.com",
  "quantity": 1
}
```

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **eSimGo API dokümantasyonunda "Create Order" veya "Purchase" endpoint'ini bulun**
2. ✅ **Request body formatını kontrol edin**
3. ✅ **Field isimlerini kontrol edin** (package_id mi, item mi?)
4. ✅ **Bulduğunuz formatı paylaşın**

---

## 🚀 HIZLI TEST

**eSimGo API dokümantasyonunda şunları arayın:**
- `POST /orders` endpoint'i
- Request body example
- Field names

**VEYA eSimGo support'a sorun:**
```
Subject: Request Body Format Sorunu

Merhaba,

eSimGo API'ye order oluşturmak için istek gönderiyorum ama 
"failed to parse request body" hatası alıyorum.

Doğru request body formatı nedir?
Örnek request body paylaşabilir misiniz?

Teşekkürler.
```

---

**eSimGo API dokümantasyonunda doğru request formatını bulun ve paylaşın! 🔍**
















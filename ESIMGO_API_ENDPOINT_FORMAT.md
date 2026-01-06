# eSimGo API Endpoint Format

## 📋 GÖRÜLEN API FORMATI

**Gösterilen format:**
```json
{
  "type": "validate",
  "assign": false,
  "order": [
    {
      "type": "bundle",
      "quantity": 0,
      "item": "string",
      "iccids": [
        "string"
      ],
      "allowReassign": false
    }
  ],
  "profileID": "string"
}
```

**Bu bir "validate" veya "assign" endpoint'i gibi görünüyor.**

---

## 🔍 BİZİM İHTİYACIMIZ OLAN ENDPOINT

**Bizim ihtiyacımız olan:** eSim satın alma endpoint'i

**Şu anki kodumuz:**
```typescript
POST ${apiUrl}/orders
Body: {
  "package_id": "usa-1gb-7days",
  "email": "customer@example.com",
  "quantity": 1,
  "callback_url": "https://getprimesim.com/api/esimgo/webhook",
  "version": "v3"
}
```

---

## 🎯 YAPILMASI GEREKENLER

### 1. eSimGo API Dokümantasyonunda Arayın

**Arayın:**
- "Purchase eSim" veya "Buy eSim" endpoint'i
- "Create Order" endpoint'i
- "POST /orders" endpoint'i
- Request format örnekleri

### 2. API Base URL'ini Bulun

**Dokümantasyonda şunları arayın:**
- `Base URL: https://api.esimgo.com`
- `API Endpoint: https://api.esimgo.io/v3`
- `API URL: https://esimgo.com/api/v3`

### 3. eSim Satın Alma Endpoint Formatını Bulun

**Dokümantasyonda şunları arayın:**
- Request body formatı
- Required fields
- Response formatı

---

## 🔧 OLASI ENDPOINT FORMATLARI

### Format 1: Basit Format (Şu Anki)
```json
POST /orders
{
  "package_id": "usa-1gb-7days",
  "email": "customer@example.com",
  "quantity": 1,
  "callback_url": "https://getprimesim.com/api/esimgo/webhook"
}
```

### Format 2: Validate/Assign Format (Gösterilen)
```json
POST /orders/validate
{
  "type": "validate",
  "assign": false,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "usa-1gb-7days",
      "allowReassign": false
    }
  ],
  "profileID": "customer@example.com"
}
```

### Format 3: Karma Format
```json
POST /orders
{
  "type": "purchase",
  "order": {
    "package_id": "usa-1gb-7days",
    "email": "customer@example.com",
    "quantity": 1
  },
  "callback_url": "https://getprimesim.com/api/esimgo/webhook"
}
```

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **eSimGo API dokümantasyonunda "Purchase" veya "Create Order" endpoint'ini bulun**
2. ✅ **Request formatını kontrol edin**
3. ✅ **API base URL'ini bulun**
4. ✅ **Bulduğunuz bilgileri paylaşın**

---

## 🚀 SONRAKI ADIMLAR

**Bulduğunuz bilgilere göre:**
1. API base URL'ini Vercel'e ekleyeceğiz
2. Request formatını güncelleyeceğiz
3. Test edeceğiz

---

**eSimGo API dokümantasyonunda "Purchase" veya "Create Order" endpoint'ini bulun ve paylaşın! 🔍**












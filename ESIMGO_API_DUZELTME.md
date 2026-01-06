# eSimGo API Düzeltmeleri

## 🚨 BULUNAN SORUNLAR

Dokümantasyonu inceledim: [eSimGo API v2.4 Documentation](https://docs.esim-go.com/api/v2_4/)

### Sorun 1: API URL Yanlış ❌
**Mevcut:** `https://api.esimgo.io/v3`  
**Doğru:** `https://api.esim-go.com/v2.4` veya `https://api.esim-go.com/v2.5`

### Sorun 2: Authentication Yanlış ❌
**Mevcut:** `Authorization: Bearer ${apiKey}`  
**Doğru:** `X-API-Key: ${apiKey}`

### Sorun 3: API Versiyonu Yanlış ❌
**Mevcut:** v3 (böyle bir versiyon yok!)  
**Doğru:** v2.4 veya v2.5

---

## ✅ YAPILAN DÜZELTMELER

### 1. Authentication Header Düzeltildi

**Önceki:**
```typescript
headers: {
  "Authorization": `Bearer ${apiKey}`,
  "X-API-Version": "v3",
}
```

**Yeni:**
```typescript
headers: {
  "X-API-Key": apiKey, // eSimGo API uses X-API-Key header
  "Content-Type": "application/json",
}
```

### 2. API URL Güncellenmeli

**Vercel Environment Variables'da:**
- `ESIMGO_API_URL` = `https://api.esim-go.com/v2.4` (veya v2.5)

---

## 📋 DOKÜMANTASYONDAN ÖĞRENİLENLER

### Authentication
- **Header:** `X-API-Key`
- **Value:** API key'iniz
- **Örnek:**
```bash
curl -H 'X-API-Key: $API_KEY' https://api.esim-go.com/v2.4/orders
```

### API Versiyonları
- v2.0, v2.1, v2.2, v2.3, v2.4, v2.5 (v3 yok!)
- En güncel: v2.5

### API Base URL
- `https://api.esim-go.com` (tire ile: `esim-go.com`)
- Versiyon: `/v2.4/` veya `/v2.5/`

---

## 🔧 YAPILMASI GEREKENLER

### 1. Vercel Environment Variables Güncelle

**Vercel Dashboard → Environment Variables:**
- `ESIMGO_API_URL` = `https://api.esim-go.com/v2.4` (veya v2.5)

### 2. Request Format Kontrol Et

**Dokümantasyonda "Create orders" endpoint'ini kontrol et:**
- Request body formatı doğru mu?
- Field'lar doğru mu?

### 3. Test Et

**Test komutu:**
```bash
curl -H 'X-API-Key: lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT' https://api.esim-go.com/v2.4/orders
```

---

## 📚 DOKÜMANTASYON LİNKLERİ

- **API v2.4:** https://docs.esim-go.com/api/v2_4/
- **API v2.5:** https://docs.esim-go.com/api/v2_5/
- **Create Orders:** https://docs.esim-go.com/api/v2_4/orders/create-orders/

---

**Kod güncellendi! Vercel'de API URL'i güncelleyin! 🚀**














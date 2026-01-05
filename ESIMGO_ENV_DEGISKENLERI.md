# eSimGo Environment Variables Açıklaması

## 📋 ENVIRONMENT VARIABLES AÇIKLAMASI

### 1. ESIMGO_API_KEY ✅ (ZATEN VAR)
**Değer:** `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`

**Ne işe yarar?**
- eSimGo API'ye istek atarken authentication (kimlik doğrulama) için kullanılır
- Her API isteğinde header'da gönderilir
- eSimGo'dan aldığınız API key buraya yazılır

**Örnek kullanım:**
```typescript
headers: {
  "Authorization": `Bearer ${ESIMGO_API_KEY}`,
  // veya
  "X-API-Key": ESIMGO_API_KEY,
}
```

---

### 2. ESIMGO_API_URL ❓ (EKSİK - eSimGo'dan alınacak)

**Ne işe yarar?**
- eSimGo API'nin base URL'i (temel adresi)
- Tüm API istekleri bu URL'e yapılır

**Örnekler:**
- `https://api.esimgo.com/v1/`
- `https://api.esimgo.com/api/v1/`
- `https://esimgo.com/api/v1/`
- `https://partner.esimgo.com/api/`

**Nasıl bulunur?**
1. eSimGo API dokümantasyonunda yazar
2. eSimGo dashboard'unda API Settings'te görünür
3. eSimGo support'a sorabilirsiniz

**Örnek kullanım:**
```typescript
// eSim satın alma isteği
fetch(`${ESIMGO_API_URL}/purchases`, {
  method: "POST",
  // ...
})
```

**Nereden alınır?**
- eSimGo API dokümantasyonu
- eSimGo reseller dashboard → API Settings
- eSimGo support: support@esimgo.com

---

### 3. ESIMGO_WEBHOOK_SECRET ❓ (OPSİYONEL - Varsa eSimGo'dan alınacak)

**Ne işe yarar?**
- eSimGo webhook'larının güvenliğini sağlar
- eSimGo'dan gelen webhook'ların gerçekten eSimGo'dan geldiğini doğrular
- Webhook signature verification için kullanılır

**Örnek:**
- `whsec_xxxxx`
- `secret_xxxxx`
- `webhook_secret_xxxxx`

**Nasıl bulunur?**
1. eSimGo dashboard → Webhooks → Webhook Settings
2. Webhook secret görünür (varsa)
3. Eğer yoksa, eSimGo webhook signature kullanmıyor demektir

**Örnek kullanım:**
```typescript
// Webhook signature doğrulama
const signature = request.headers.get("x-esimgo-signature");
// Signature'ı ESIMGO_WEBHOOK_SECRET ile doğrula
```

**Önemli:**
- ⚠️ Bu değişken **opsiyonel**dir
- Eğer eSimGo webhook signature göndermiyorsa, eklemenize gerek yok
- Güvenlik için varsa mutlaka ekleyin

---

## 🔍 NASIL BULUNUR?

### ESIMGO_API_URL Bulma:

1. **eSimGo API Dokümantasyonu:**
   - Dokümantasyonda "Base URL" veya "API Endpoint" bölümüne bakın
   - Örn: "All API requests should be made to: https://api.esimgo.com/v1/"

2. **eSimGo Dashboard:**
   - Reseller dashboard → **API Settings** veya **Developer** bölümü
   - API endpoint URL'i görünür

3. **eSimGo Support:**
   - Email: support@esimgo.com
   - "What is the API endpoint URL for reseller accounts?" diye sorun

### ESIMGO_WEBHOOK_SECRET Bulma:

1. **eSimGo Dashboard:**
   - **Webhooks** bölümüne gidin
   - Webhook secret görünür (varsa)

2. **eSimGo Support:**
   - "Do you use webhook signatures? If yes, what is the webhook secret?" diye sorun

---

## 📝 ÖRNEK DEĞERLER

### Senaryo 1: eSimGo Standart API
```env
ESIMGO_API_KEY=lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT
ESIMGO_API_URL=https://api.esimgo.com/v1/
ESIMGO_WEBHOOK_SECRET=whsec_xxxxx (varsa)
```

### Senaryo 2: eSimGo Farklı Format
```env
ESIMGO_API_KEY=lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT
ESIMGO_API_URL=https://partner.esimgo.com/api/v1/
ESIMGO_WEBHOOK_SECRET= (yoksa boş bırakın)
```

---

## ✅ VERCEL'E EKLEME

### Adım 1: Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Settings** → **Environment Variables**

### Adım 2: ESIMGO_API_KEY Ekleme
- **Name:** `ESIMGO_API_KEY`
- **Value:** `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
- **Environment:** Production, Preview, Development

### Adım 3: ESIMGO_API_URL Ekleme (eSimGo'dan alındıktan sonra)
- **Name:** `ESIMGO_API_URL`
- **Value:** `https://api.esimgo.com/v1/` (eSimGo'dan alınan URL)
- **Environment:** Production, Preview, Development

### Adım 4: ESIMGO_WEBHOOK_SECRET Ekleme (varsa)
- **Name:** `ESIMGO_WEBHOOK_SECRET`
- **Value:** `whsec_xxxxx` (eSimGo'dan alınan secret)
- **Environment:** Production, Preview, Development

---

## ❓ SORULAR

### eSimGo API URL'i bulamıyorum:
1. eSimGo API dokümantasyonunu kontrol edin
2. eSimGo dashboard → API Settings'e bakın
3. eSimGo support'a email atın: support@esimgo.com

### Webhook secret yok:
- Sorun değil! Eğer eSimGo webhook signature kullanmıyorsa, bu değişkeni eklemenize gerek yok
- Webhook endpoint yine de çalışır

### API URL format'ı nasıl olmalı?
- Genellikle şu formatta olur: `https://api.esimgo.com/v1/`
- Sonunda `/` olabilir veya olmayabilir (kod her iki durumu da destekler)

---

## 🚀 SONRAKI ADIMLAR

1. **eSimGo'dan API URL'i alın**
   - API dokümantasyonu veya dashboard'dan
   - Veya support'a sorun

2. **Vercel'e ekleyin**
   - `ESIMGO_API_KEY` ✅ (zaten var)
   - `ESIMGO_API_URL` ❓ (eSimGo'dan alınacak)
   - `ESIMGO_WEBHOOK_SECRET` ❓ (varsa)

3. **Deploy edin**
   - Environment variables eklendikten sonra redeploy yapın

---

**eSimGo'dan API URL'i aldıktan sonra, bana gönderin. Ben Vercel'e ekleme talimatlarını vereceğim! 🚀**










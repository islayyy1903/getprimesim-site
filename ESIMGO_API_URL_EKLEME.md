# eSimGo API URL Vercel'e Ekleme

## ✅ eSimGo API URL

**API Base URL:** `https://api.esimgo.io/v3`

Bu URL'i Vercel Environment Variables'a eklemeniz gerekiyor.

---

## 🔧 VERCEL'E EKLEME ADIMLARI

### Adım 1: Vercel Dashboard'a Giriş
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz (`getprimesim-site`)
2. **Settings** sekmesine tıklayın
3. Sol menüden **Environment Variables** seçin

### Adım 2: ESIMGO_API_URL Ekleme
1. **"Add New"** butonuna tıklayın
2. Formu doldurun:
   - **Name:** `ESIMGO_API_URL`
   - **Value:** `https://api.esimgo.io/v3`
   - **Environment:** 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
     - (Hepsini seçin)
3. **Save** butonuna tıklayın

### Adım 3: ESIMGO_API_KEY Kontrolü
Mevcut environment variables'da `ESIMGO_API_KEY` var mı kontrol edin:
- **Name:** `ESIMGO_API_KEY`
- **Value:** `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
- Eğer yoksa, ekleyin

### Adım 4: Redeploy
1. Environment variables eklendikten sonra **redeploy** yapın
2. Vercel Dashboard → **Deployments** → En son deployment → **"..."** → **Redeploy**
3. Veya terminal'de: `vercel --prod`

---

## 📋 ENVIRONMENT VARIABLES LİSTESİ

### Gerekli Değişkenler:

1. **ESIMGO_API_KEY** ✅
   - Value: `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
   - Durum: Kontrol edin, yoksa ekleyin

2. **ESIMGO_API_URL** ⏳
   - Value: `https://api.esimgo.io/v3`
   - Durum: Şimdi eklenecek

3. **ESIMGO_WEBHOOK_SECRET** ❓ (Opsiyonel)
   - Value: (eSimGo'dan alınacak, varsa)
   - Durum: Opsiyonel, şimdilik gerekli değil

---

## 🔍 API ENDPOINT YAPISI

### eSim Satın Alma Endpoint:
```
POST https://api.esimgo.io/v3/orders
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

**Not:** Kodda `${apiUrl}/orders` kullanılıyor, çünkü `ESIMGO_API_URL` zaten `/v3` içeriyor.

---

## ✅ KOD GÜNCELLEMELERİ

### app/lib/esimgo.ts
- ✅ API endpoint: `${apiUrl}/orders` (çünkü apiUrl zaten `/v3` içeriyor)
- ✅ Callback URL: `https://getprimesim.com/api/esimgo/webhook`
- ✅ v3 headers eklendi

---

## 🧪 TEST ETME

### 1. Environment Variables Kontrolü
Vercel Dashboard'da kontrol edin:
- `ESIMGO_API_KEY` var mı?
- `ESIMGO_API_URL` var mı? (`https://api.esimgo.io/v3`)

### 2. Test Siparişi
1. Website'den test siparişi oluşturun
2. Vercel Function Logs'da kontrol edin
3. eSimGo API'ye istek gitti mi kontrol edin

### 3. Callback Test
1. eSimGo'da test callback gönderin
2. Vercel Function Logs'da kontrol edin
3. Callback geldi mi kontrol edin

---

## 📊 LOGLAR

API isteklerini kontrol etmek için:

1. **Vercel Dashboard** → Projeniz → **Functions**
2. `/api/webhooks/stripe` fonksiyonunu seçin (eSimGo API çağrısı buradan yapılıyor)
3. **Logs** sekmesine gidin
4. eSimGo API isteklerini görün

**Beklenen Log:**
```
📦 Purchasing eSim from eSimGo...
Package: USA eSIM – 1GB
eSimGo Package ID: usa-1gb-7days
Email: customer@example.com
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **API URL Format:**
   - Base URL: `https://api.esimgo.io/v3` (zaten `/v3` içeriyor)
   - Endpoint: `/orders` (kodda otomatik eklenir)
   - Tam URL: `https://api.esimgo.io/v3/orders`

2. **Redeploy:**
   - Environment variables eklendikten sonra mutlaka redeploy yapın
   - Aksi halde yeni değişkenler kullanılmaz

3. **Environment:**
   - Production, Preview, Development hepsine ekleyin
   - Test için Preview environment'ı kullanabilirsiniz

---

## ✅ CHECKLIST

- [ ] Vercel Dashboard'a giriş yapıldı
- [ ] Settings → Environment Variables açıldı
- [ ] `ESIMGO_API_URL` eklendi: `https://api.esimgo.io/v3`
- [ ] `ESIMGO_API_KEY` kontrol edildi (varsa ✅)
- [ ] Environment: Production, Preview, Development seçildi
- [ ] Save butonuna tıklandı
- [ ] Redeploy yapıldı
- [ ] Test siparişi oluşturuldu
- [ ] Loglar kontrol edildi

---

## 🚀 SONRAKI ADIMLAR

1. **Vercel'e ESIMGO_API_URL ekleyin**
   - Value: `https://api.esimgo.io/v3`
   - Environment: Production, Preview, Development

2. **Redeploy yapın**
   - Vercel Dashboard → Deployments → Redeploy
   - Veya terminal: `vercel --prod`

3. **Test edin**
   - Test siparişi oluşturun
   - Logları kontrol edin
   - eSimGo API'ye istek gitti mi kontrol edin

---

**Vercel'e ESIMGO_API_URL eklediniz mi? Redeploy yaptınız mı? 🚀**
















# Local Development Setup

## 🚀 Local'de Çalıştırma

### Adım 1: .env.local Dosyası Oluşturun

Proje root dizininde (`.gitignore` yanında) `.env.local` dosyası oluşturun:

```env
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE

# Base URL (Localhost için)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj

# eSimGo API
ESIMGO_API_KEY=lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT
ESIMGO_API_URL=https://api.esimgo.io/v3

# Resend Email API
RESEND_API_KEY=re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv

# Google Analytics (Opsiyonel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-JSG44TK9QV
```

### Adım 2: Dependencies Yükleyin (İlk Kez)

```bash
npm install
```

### Adım 3: Development Server'ı Başlatın

```bash
npm run dev
```

### Adım 4: Tarayıcıda Açın

```
http://localhost:3000
```

---

## 📋 Environment Variables Açıklaması

### Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (frontend'de kullanılır)
- `STRIPE_SECRET_KEY` - Stripe secret key (backend'de kullanılır)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret (local'de çalışmaz ama ekleyin)

### Base URL
- `NEXT_PUBLIC_BASE_URL` - Localhost için `http://localhost:3000`

### eSimGo
- `ESIMGO_API_KEY` - eSimGo API key
- `ESIMGO_API_URL` - eSimGo API URL

### Email (Resend)
- `RESEND_API_KEY` - Resend email API key

### Google Analytics
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics measurement ID (opsiyonel)

---

## ⚠️ ÖNEMLİ NOTLAR

1. **.env.local Dosyası:**
   - `.gitignore`'da olduğu için Git'e commit edilmez
   - Sadece local'de çalışır
   - Production'da Vercel Environment Variables kullanılır

2. **Webhook:**
   - Local'de Stripe webhook çalışmaz (Stripe localhost'a webhook gönderemez)
   - Production'da (`https://getprimesim.com`) webhook çalışır

3. **Test vs Production:**
   - Local'de test key'leri kullanabilirsiniz
   - Production'da live key'leri kullanmalısınız

---

## 🧪 Test Etme

### 1. Website'i Açın
```
http://localhost:3000
```

### 2. eSim Sayfasına Gidin
```
http://localhost:3000/esim
```

### 3. Test Siparişi Yapın
- Paket seçin → "Buy Now"
- Stripe test kartı:
  - **Kart:** `4242 4242 4242 4242`
  - **Son Kullanma:** `12/25`
  - **CVC:** `123`
  - **ZIP:** `12345`

### 4. Terminal Loglarını Kontrol Edin
Terminal'de şu logları göreceksiniz:
```
=== CHECKOUT API CALLED ===
Secret key exists: true
Stripe session created: cs_test_...
```

---

## 🐛 Sorun Giderme

### Port 3000 Kullanımda
```bash
# Port'u değiştirin
npm run dev -- -p 3001
```

### Dependencies Hatası
```bash
# node_modules'ı silin ve yeniden yükleyin
rm -rf node_modules
npm install
```

### Environment Variables Yüklenmiyor
- `.env.local` dosyası proje root'unda mı?
- Dosya adı tam olarak `.env.local` mi? (nokta ile başlıyor)
- Server'ı yeniden başlatın (`Ctrl+C` sonra `npm run dev`)

---

**Local server başlatıldı! `http://localhost:3000` adresine gidin! 🚀**




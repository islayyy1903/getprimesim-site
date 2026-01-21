# Production'da Çalıştırma (https://getprimesim.com)

## Önemli
Production'da çalıştırmak için Vercel'de deployment yapılması gerekiyor. Localhost'ta çalıştıramazsınız.

## Adımlar

### 1. GitHub'a Push Yapın
```bash
git add .
git commit -m "Fix all production issues"
git push
```

### 2. Vercel Otomatik Deploy
- Vercel GitHub'a bağlıysa otomatik deploy başlar
- Vercel Dashboard'da deployment'ı kontrol edin

### 3. Vercel Environment Variables (KRİTİK!)
Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**

**Şu 3 variable'ın ekli olduğundan emin olun:**

#### NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- **Value:** `pk_live_YOUR_PUBLISHABLE_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

#### STRIPE_SECRET_KEY
- **Value:** `sk_live_YOUR_SECRET_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

#### NEXT_PUBLIC_BASE_URL
- **Value:** `https://getprimesim.com`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

### 4. Deployment Yenileme
1. Vercel Dashboard → **Deployments**
2. En son deployment'ın yanındaki **"..."** → **"Redeploy"**
3. **"Use existing Build Cache"** seçeneğini **KAPATIN**
4. **"Redeploy"** butonuna tıklayın
5. 2-3 dakika bekleyin

### 5. Test
1. `https://getprimesim.com` sayfasını açın
2. Dil İngilizce mi kontrol edin
3. `https://getprimesim.com/esim` sayfasına gidin
4. Bir paket seçip "Buy Now" butonuna tıklayın
5. Stripe checkout sayfası açılmalı

## Not
- Localhost'ta (`http://localhost:3000`) test edebilirsiniz
- Production'da (`https://getprimesim.com`) test etmek için Vercel deployment gerekli
- Ben sadece localhost'ta server başlatabilirim
- Production'da Vercel otomatik olarak server'ı çalıştırır




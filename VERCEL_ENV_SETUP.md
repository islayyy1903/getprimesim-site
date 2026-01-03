# Vercel Environment Variables Kurulumu

## Sorun
Localhost'ta ödeme çalışıyor ama production'da (https://getprimesim.com) çalışmıyor.

## Çözüm: Vercel'de Environment Variables Ayarlama

### Adım 1: Vercel Dashboard'a Giriş
1. [Vercel Dashboard](https://vercel.com/dashboard) → Giriş yapın
2. `getprimesim-site` projenizi seçin

### Adım 2: Environment Variables Ekleme
1. Proje sayfasında **"Settings"** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçin
3. Şu değişkenleri ekleyin:

#### 1. Stripe Publishable Key
- **Name:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value:** `pk_live_YOUR_PUBLISHABLE_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:** Production, Preview, Development (hepsini seçin)

#### 2. Stripe Secret Key
- **Name:** `STRIPE_SECRET_KEY`
- **Value:** `sk_live_YOUR_SECRET_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:** Production, Preview, Development (hepsini seçin)

#### 3. Base URL
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://getprimesim.com`
- **Environment:** Production, Preview, Development (hepsini seçin)

### Adım 3: Deployment Yenileme
1. Environment variables ekledikten sonra
2. **"Deployments"** sekmesine gidin
3. En son deployment'ın yanındaki **"..."** menüsünden **"Redeploy"** seçin
4. **"Use existing Build Cache"** seçeneğini kapatın (varsa)
5. **"Redeploy"** butonuna tıklayın

### Adım 4: Kontrol
1. Deployment tamamlandıktan sonra (2-3 dakika)
2. `https://getprimesim.com/esim` sayfasına gidin
3. Bir paket seçip "Buy Now" butonuna tıklayın
4. Stripe checkout sayfası açılmalı

## Önemli Notlar

⚠️ **Güvenlik:**
- `STRIPE_SECRET_KEY` asla public olmamalı
- Vercel'de environment variables güvenli şekilde saklanır
- `.env.local` dosyasını GitHub'a commit etmeyin (zaten .gitignore'da)

⚠️ **Environment Seçimi:**
- Production: Canlı site için
- Preview: Pull request'ler için
- Development: Local development için (opsiyonel)

## Sorun Giderme

### Hala çalışmıyorsa:
1. Vercel deployment loglarını kontrol edin
2. Browser console'da (F12) hata mesajlarını kontrol edin
3. Stripe Dashboard'da API key'lerin doğru olduğundan emin olun

### Kontrol Komutları:
```bash
# Vercel CLI ile kontrol (opsiyonel)
vercel env ls
```

## Alternatif: Vercel CLI ile Ekleme

Eğer Vercel CLI kuruluysa:
```bash
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
# Value'yu yapıştırın

vercel env add STRIPE_SECRET_KEY production
# Value'yu yapıştırın

vercel env add NEXT_PUBLIC_BASE_URL production
# https://getprimesim.com yazın
```




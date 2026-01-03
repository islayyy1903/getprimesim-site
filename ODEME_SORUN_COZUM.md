# Ödeme Sorunu Çözümü

## Sorun
"Satın Al" butonuna tıklayınca ödeme çalışmıyor.

## Hızlı Kontrol Listesi

### 1. Vercel Environment Variables Kontrolü
Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**

Şu 3 variable'ın ekli olduğundan emin olun:
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
- ✅ `STRIPE_SECRET_KEY` = `sk_live_...`
- ✅ `NEXT_PUBLIC_BASE_URL` = `https://getprimesim.com`

**Her birinin yanında:**
- ✅ Production seçili olmalı
- ✅ Preview seçili olmalı
- ✅ Development seçili olmalı

### 2. Deployment Yenileme
1. Vercel Dashboard → **Deployments**
2. En son deployment'ın yanındaki **"..."** → **"Redeploy"**
3. **"Use existing Build Cache"** seçeneğini KAPATIN
4. **"Redeploy"** butonuna tıklayın
5. 2-3 dakika bekleyin

### 3. Tarayıcı Kontrolü
1. `https://getprimesim.com/esim` sayfasına gidin
2. F12 tuşuna basın (Developer Tools)
3. **Console** sekmesine gidin
4. "Buy Now" butonuna tıklayın
5. Hata mesajlarını kontrol edin

### 4. Hata Mesajları

#### "Stripe API keys are not configured"
**Çözüm:** Vercel'de environment variables ekleyin (yukarıdaki adım 1)

#### "Invalid API key provided"
**Çözüm:** 
- Stripe Dashboard'da API key'lerin doğru olduğundan emin olun
- Vercel'de key'leri güncelleyin
- Deployment'ı yenileyin

#### "Failed to create checkout session"
**Çözüm:**
- Stripe Dashboard'da hesabınızın aktif olduğundan emin olun
- API key'lerin live modda olduğundan emin olun
- Vercel deployment loglarını kontrol edin

#### Network hatası
**Çözüm:**
- İnternet bağlantınızı kontrol edin
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
- Farklı bir tarayıcıda deneyin

## Adım Adım Çözüm

### Adım 1: Vercel'de Environment Variables Kontrol
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Settings** → **Environment Variables**
3. Her variable'ı kontrol edin:
   - Değer doğru mu?
   - Placeholder içeriyor mu? (YOUR_SECRET_KEY gibi)
   - Environment seçimi doğru mu?

### Adım 2: Variable'ları Güncelle (Gerekirse)
1. Variable'ın yanındaki **"..."** → **"Edit"**
2. Doğru değeri yapıştırın
3. **"Save"** butonuna tıklayın

### Adım 3: Deployment Yenile
1. **Deployments** → En son deployment → **"..."** → **"Redeploy"**
2. **"Use existing Build Cache"** KAPATIN
3. **"Redeploy"** tıklayın

### Adım 4: Test Et
1. `https://getprimesim.com/esim` sayfasına gidin
2. F12 → Console açın
3. Bir paket seçip "Buy Now" tıklayın
4. Hata mesajını kontrol edin

## Hata Mesajına Göre Çözüm

### Hangi hatayı alıyorsunuz?
1. Tarayıcı konsolunda (F12) hata mesajını bulun
2. Yukarıdaki hata mesajlarından birini seçin
3. İlgili çözümü uygulayın

## Hala Çalışmıyorsa

1. **Vercel Deployment Loglarını Kontrol:**
   - Deployment sayfasında → **"View Build Logs"**
   - Hata var mı kontrol edin

2. **Stripe Dashboard Kontrol:**
   - [Stripe Dashboard](https://dashboard.stripe.com/)
   - API keys → Live keys'in aktif olduğundan emin olun
   - Events → Son ödemeleri kontrol edin

3. **Destek:**
   - Hata mesajını not edin
   - Vercel deployment loglarını kontrol edin
   - Stripe Dashboard'da hata var mı kontrol edin




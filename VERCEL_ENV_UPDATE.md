# Vercel Environment Variables Güncelleme

## Sorun
Environment variable'lar zaten var ama ödeme çalışmıyor.

## Çözüm: Mevcut Variable'ları Güncelleme

### Adım 1: Mevcut Variable'ları Kontrol
1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. Şu variable'ları kontrol edin:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_BASE_URL`

### Adım 2: Değerleri Güncelle
Eğer değerler yanlışsa veya placeholder içeriyorsa:

1. Variable'ın yanındaki **"..."** menüsüne tıklayın
2. **"Edit"** seçin
3. Doğru değeri yapıştırın:

#### NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```
pk_live_YOUR_PUBLISHABLE_KEY_HERE (Stripe Dashboard'dan alın)
```

#### STRIPE_SECRET_KEY
```
sk_live_YOUR_SECRET_KEY_HERE (Stripe Dashboard'dan alın)
```

#### NEXT_PUBLIC_BASE_URL
```
https://getprimesim.com
```

4. **"Save"** butonuna tıklayın

### Adım 3: Environment Seçimi
Her variable için şunları seçin:
- ✅ Production
- ✅ Preview  
- ✅ Development

### Adım 4: Deployment Yenileme (ÖNEMLİ!)
1. **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. **"Use existing Build Cache"** seçeneğini KAPATIN (önemli!)
5. **"Redeploy"** butonuna tıklayın

### Adım 5: Bekleme ve Test
1. Deployment tamamlanana kadar bekleyin (2-3 dakika)
2. `https://getprimesim.com/esim` sayfasına gidin
3. Bir paket seçip "Buy Now" butonuna tıklayın
4. Stripe checkout açılmalı

## Sorun Giderme

### Hala çalışmıyorsa:

1. **Deployment Loglarını Kontrol:**
   - Deployment sayfasında → **"View Build Logs"** tıklayın
   - Hata var mı kontrol edin

2. **Browser Console Kontrol:**
   - `https://getprimesim.com/esim` sayfasında F12 → Console
   - Hata mesajlarını kontrol edin

3. **Stripe Dashboard Kontrol:**
   - [Stripe Dashboard](https://dashboard.stripe.com/) → API keys
   - Live key'lerin doğru olduğundan emin olun

4. **Cache Temizleme:**
   - Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
   - Hard refresh yapın (Ctrl+F5)

## Alternatif: Variable'ı Silip Yeniden Ekle

Eğer güncelleme çalışmazsa:

1. Variable'ı **"Delete"** ile silin
2. Yeniden ekleyin (VERCEL_ENV_SETUP.md'deki adımları takip edin)
3. Deployment'ı yenileyin




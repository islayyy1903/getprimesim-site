# Production Sorunları - Final Çözüm

## Sorun Analizi
Production'da hala çalışmıyor. Tüm adımlar yapıldı ama sorun devam ediyor.

## Olası Nedenler

### 1. Vercel Environment Variables Yanlış veya Eksik
- Variable'lar eklenmiş ama değerler yanlış olabilir
- Production için seçilmemiş olabilir
- Deployment yenilenmemiş olabilir

### 2. Deployment Cache Sorunu
- Eski kod hala cache'lenmiş olabilir
- Build cache temizlenmemiş olabilir

### 3. Stripe API Key Sorunu
- Live key'ler yanlış olabilir
- Key'ler geçersiz olabilir

## Kesin Çözüm

### Adım 1: Vercel Environment Variables'ı SİL ve YENİDEN EKLE

1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. **TÜM Stripe variable'larını SİL:**
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Delete
   - `STRIPE_SECRET_KEY` → Delete
   - `NEXT_PUBLIC_BASE_URL` → Delete (varsa)

3. **YENİDEN EKLE (dikkatli kopyala-yapıştır):**

#### Variable 1: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- **Name:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value:** `pk_live_YOUR_PUBLISHABLE_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:** 
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **Save**

#### Variable 2: STRIPE_SECRET_KEY
- **Name:** `STRIPE_SECRET_KEY`
- **Value:** `sk_live_YOUR_SECRET_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:**
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **Save**

#### Variable 3: NEXT_PUBLIC_BASE_URL
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://getprimesim.com`
- **Environment:**
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **Save**

### Adım 2: GitHub'a Push (Eğer yapmadıysanız)
```bash
git add .
git commit -m "Final production fixes"
git push
```

### Adım 3: Vercel Deployment Yenileme (KRİTİK!)

1. Vercel Dashboard → **Deployments**
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. **ÖNEMLİ:** **"Use existing Build Cache"** seçeneğini **KAPATIN** (toggle OFF)
5. **"Redeploy"** butonuna tıklayın
6. **2-3 dakika bekleyin** (deployment tamamlanana kadar)

### Adım 4: Tarayıcı Cache Temizleme

1. Tarayıcıda `https://getprimesim.com` açın
2. **Ctrl + Shift + Delete** (cache temizle)
3. Veya **Ctrl + F5** (hard refresh)
4. Veya **Incognito/Private mod** kullanın

### Adım 5: Test ve Debug

1. `https://getprimesim.com/esim` sayfasına gidin
2. **F12** tuşuna basın (Developer Tools)
3. **Console** sekmesine gidin
4. Bir paket seçip **"Buy Now"** butonuna tıklayın
5. Konsolda şunları görmelisiniz:
   - `=== CHECKOUT START ===`
   - `=== CHECKOUT RESPONSE ===`
   - Hata varsa hata mesajı

### Adım 6: Vercel Function Logs Kontrol

1. Vercel Dashboard → **Deployments**
2. En son deployment'a tıklayın
3. **"Functions"** sekmesine gidin
4. `/api/checkout` function'ına tıklayın
5. **"Logs"** sekmesine bakın
6. Hata mesajlarını kontrol edin

## Hata Mesajlarına Göre Çözüm

### "Stripe API keys are not configured"
**Çözüm:** Environment variables eklenmemiş veya yanlış. Adım 1'i tekrar yapın.

### "Invalid API key provided"
**Çözüm:** 
- Stripe Dashboard'da key'leri kontrol edin
- Key'leri yeniden kopyalayıp yapıştırın
- Deployment'ı yenileyin

### "Failed to create checkout session"
**Çözüm:**
- Stripe Dashboard'da hesabınızın aktif olduğundan emin olun
- API key'lerin live modda olduğundan emin olun
- Vercel function logs'u kontrol edin

### Hiçbir şey olmuyor (butona tıklayınca)
**Çözüm:**
- Browser console'da (F12) hata var mı kontrol edin
- Network sekmesinde API call var mı kontrol edin
- JavaScript hatası olabilir

## Son Kontrol

✅ Environment variables eklendi (3 adet)
✅ Her variable Production için seçili
✅ Deployment yenilendi (cache kapalı)
✅ Tarayıcı cache temizlendi
✅ Test edildi

## Hala Çalışmıyorsa

1. **Vercel Function Logs'u paylaşın:**
   - Deployment → Functions → /api/checkout → Logs

2. **Browser Console'u paylaşın:**
   - F12 → Console → Hata mesajları

3. **Network sekmesini kontrol edin:**
   - F12 → Network → "Buy Now" tıklayın → /api/checkout request'ini kontrol edin

Bu bilgilerle sorunu kesin çözebiliriz!




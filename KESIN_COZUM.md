# Production Sorunları - Kesin Çözüm

## ⚠️ ÖNEMLİ: Tüm Adımları Sırayla Yapın

### ADIM 1: Vercel Environment Variables'ı SİL ve YENİDEN EKLE

1. **Vercel Dashboard** → Projeniz → **Settings** → **Environment Variables**

2. **TÜM Stripe variable'larını SİL:**
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → **Delete**
   - `STRIPE_SECRET_KEY` → **Delete**  
   - `NEXT_PUBLIC_BASE_URL` → **Delete** (varsa)

3. **YENİDEN EKLE (dikkatli kopyala-yapıştır, boşluk olmasın):**

#### Variable 1:
- **Name:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value:** `pk_live_YOUR_PUBLISHABLE_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:** ✅ Production ✅ Preview ✅ Development
- **Save**

#### Variable 2:
- **Name:** `STRIPE_SECRET_KEY`
- **Value:** `sk_live_YOUR_SECRET_KEY_HERE` (Stripe Dashboard'dan alın)
- **Environment:** ✅ Production ✅ Preview ✅ Development
- **Save**

#### Variable 3:
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://getprimesim.com`
- **Environment:** ✅ Production ✅ Preview ✅ Development
- **Save**

### ADIM 2: GitHub'a Push (Eğer yapmadıysanız)
```bash
git add .
git commit -m "Final production fixes"
git push
```

### ADIM 3: Vercel Deployment Yenileme (KRİTİK!)

1. **Vercel Dashboard** → **Deployments**
2. En son deployment'ın yanındaki **"..."** → **"Redeploy"**
3. **ÖNEMLİ:** **"Use existing Build Cache"** toggle'ını **KAPATIN** (OFF)
4. **"Redeploy"** butonuna tıklayın
5. **2-3 dakika bekleyin** (deployment tamamlanana kadar)

### ADIM 4: Tarayıcı Cache Temizleme

1. **Ctrl + Shift + Delete** (cache temizle)
2. Veya **Incognito/Private mod** kullanın
3. Veya **Ctrl + F5** (hard refresh)

### ADIM 5: Test ve Debug

1. `https://getprimesim.com/esim` sayfasına gidin
2. **F12** → **Console** sekmesi
3. **"Buy Now"** butonuna tıklayın
4. Konsolda ne görüyorsunuz? Hata mesajı var mı?

### ADIM 6: Vercel Function Logs Kontrol

1. **Vercel Dashboard** → **Deployments**
2. En son deployment'a tıklayın
3. **"Functions"** sekmesi → `/api/checkout` function'ına tıklayın
4. **"Logs"** sekmesine bakın
5. Hata mesajı var mı?

## Hangi Hata Mesajını Görüyorsunuz?

Lütfen şunları paylaşın:
1. **Browser Console'da** (F12) hangi hata var?
2. **Vercel Function Logs'da** ne görünüyor?
3. **"Buy Now"** butonuna tıklayınca ne oluyor? (Hiçbir şey olmuyor mu? Hata mesajı mı görünüyor?)

Bu bilgilerle sorunu kesin çözebiliriz!




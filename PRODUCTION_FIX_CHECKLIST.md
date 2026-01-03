# Production Sorunları Çözüm Checklist

## Sorunlar
1. ❌ Dil hala Türkçe görünüyor
2. ❌ Ödeme alınamıyor

## Çözüm Adımları

### 1. GitHub'a Push Yapın
```bash
git add .
git commit -m "Fix all production issues: English language, payment fixes"
git push
```

### 2. Vercel Environment Variables Kontrolü (KRİTİK!)
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

### 3. Deployment Yenileme (ÖNEMLİ!)
1. Vercel Dashboard → **Deployments**
2. En son deployment'ın yanındaki **"..."** → **"Redeploy"**
3. **"Use existing Build Cache"** seçeneğini **KAPATIN** (çok önemli!)
4. **"Redeploy"** butonuna tıklayın
5. 2-3 dakika bekleyin

### 4. Cache Temizleme
1. Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
2. Hard refresh yapın (Ctrl+F5)
3. Farklı bir tarayıcıda test edin
4. Incognito/Private modda test edin

### 5. Test
1. `https://getprimesim.com` sayfasını açın
2. Dil İngilizce mi kontrol edin
3. `https://getprimesim.com/esim` sayfasına gidin
4. Bir paket seçip "Buy Now" butonuna tıklayın
5. Stripe checkout sayfası açılmalı

## Sorun Giderme

### Hala Türkçe görünüyorsa:
- Tarayıcı cache'ini temizleyin
- Hard refresh yapın (Ctrl+F5)
- Farklı bir tarayıcıda test edin
- Vercel deployment'ın tamamlandığından emin olun

### Hala ödeme çalışmıyorsa:
1. F12 → Console açın
2. "Buy Now" butonuna tıklayın
3. Hata mesajını kontrol edin
4. Vercel deployment loglarını kontrol edin
5. Environment variables'ların doğru olduğundan emin olun

## Kontrol Listesi

- [ ] GitHub'a push yapıldı
- [ ] Vercel otomatik deploy başladı
- [ ] Deployment tamamlandı (2-3 dakika)
- [ ] Environment variables eklendi (3 adet)
- [ ] Her variable Production için seçili
- [ ] Deployment yenilendi (cache kapalı)
- [ ] Tarayıcı cache temizlendi
- [ ] Test edildi

## Beklenen Sonuç

✅ Tüm metinler İngilizce
✅ "Buy Now" butonu çalışıyor
✅ Stripe checkout sayfası açılıyor
✅ Ödeme alınabiliyor




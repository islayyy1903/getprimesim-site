# Vercel Google Analytics Environment Variable Ekleme

## ✅ Measurement ID: G-JSG44TK9QV

### Adım 1: Vercel Dashboard'a Giriş
1. [Vercel Dashboard](https://vercel.com/dashboard) → Giriş yapın
2. `getprimesim-site` projenizi seçin

### Adım 2: Environment Variable Ekleme
1. **Settings** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçin
3. **"Add New"** butonuna tıklayın

### Adım 3: Değerleri Girin
- **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Value:** `G-JSG44TK9QV`
- **Environment:** 
  - ✅ Production
  - ✅ Preview
  - ✅ Development
  (Hepsini seçin!)

4. **"Save"** butonuna tıklayın

### Adım 4: Deployment Yenileme (ÖNEMLİ!)
1. **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. **"Use existing Build Cache"** seçeneğini KAPATIN (önemli!)
5. **"Redeploy"** butonuna tıklayın
6. 2-3 dakika bekleyin

### Adım 5: Test Etme
1. Deployment tamamlandıktan sonra
2. `https://getprimesim.com` adresini açın
3. [Google Analytics Realtime](https://analytics.google.com/analytics/web/#/realtime) raporuna gidin
4. Kendi ziyaretiniz görünmeli (1-2 dakika içinde)

## ✅ Local Test (.env.local)

`.env.local` dosyasına şunu ekleyin:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-JSG44TK9QV
```

Sonra:
```bash
npm run dev
```

Localhost'ta test edebilirsiniz.

## 🎯 Kontrol

- ✅ Measurement ID: `G-JSG44TK9QV`
- ✅ Vercel Environment Variable eklendi
- ✅ Deployment yenilendi
- ✅ Realtime raporunda test edildi

## 📊 Google Analytics'te Göreceğiniz Veriler

- Ziyaretçi sayısı
- Hangi sayfalar popüler
- Nereden geliyorlar (ülke, kaynak)
- Ne kadar süre kalıyorlar
- Hangi cihazlardan giriyorlar

## ⚠️ Önemli Notlar

1. **Veri Gecikmesi:** Analytics verileri 24-48 saat içinde tam olarak görünür
2. **Realtime:** Anlık veriler 1-2 dakika içinde görünür
3. **Privacy:** GDPR için cookie consent ekleyebiliriz (opsiyonel)










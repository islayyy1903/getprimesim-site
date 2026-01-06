# Google Analytics Kurulum Rehberi

## ✅ Adım 1: Google Analytics Hesabı Oluşturma

1. [Google Analytics](https://analytics.google.com) → Giriş yapın (Google hesabınızla)
2. **"Start measuring"** veya **"Create Account"** butonuna tıklayın
3. **Account name:** `PrimeSim` (veya istediğiniz isim)
4. **Account Data Sharing Settings:** İstediğiniz seçenekleri işaretleyin
5. **"Next"** butonuna tıklayın

## ✅ Adım 2: Property (Özellik) Oluşturma

1. **Property name:** `getprimesim.com` (veya `PrimeSim Website`)
2. **Reporting time zone:** Seçin (örn: `(GMT+03:00) Istanbul`)
3. **Currency:** `United States Dollar (USD)`
4. **"Next"** butonuna tıklayın

## ✅ Adım 3: Business Information

1. **Industry category:** `Technology` veya `Travel`
2. **Business size:** Seçin
3. **"Next"** butonuna tıklayın

## ✅ Adım 4: Business Objectives

1. İstediğiniz hedefleri seçin:
   - ✅ Generate leads
   - ✅ Drive online sales
   - ✅ Raise brand awareness
2. **"Create"** butonuna tıklayın

## ✅ Adım 5: Measurement ID Alma

1. **"Web"** seçeneğini seçin
2. **Website URL:** `https://getprimesim.com`
3. **Stream name:** `PrimeSim Website`
4. **"Create stream"** butonuna tıklayın
5. **Measurement ID** görünecek (örn: `G-XXXXXXXXXX`)
6. Bu ID'yi kopyalayın!

## ✅ Adım 6: Environment Variable Ekleme

### Local (.env.local)

`.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**ÖNEMLİ:** `G-XXXXXXXXXX` yerine kendi Measurement ID'nizi yazın!

### Vercel (Production)

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Settings** → **Environment Variables**
3. **Add New:**
   - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (kendi ID'niz)
   - **Environment:** Production, Preview, Development (hepsini seçin)
4. **Save**
5. **Deployments** → En son deployment'ı **Redeploy** edin

## ✅ Adım 7: Test Etme

1. Deployment tamamlandıktan sonra
2. `https://getprimesim.com` adresini açın
3. Google Analytics'te **Realtime** raporuna bakın
4. Kendi ziyaretiniz görünmeli (1-2 dakika içinde)

## ✅ Adım 8: Google Search Console Bağlama (Opsiyonel)

1. Google Analytics'te **Admin** → **Property Settings**
2. **Google Search Console** bölümünde **Adjust Search Console**
3. Google Search Console hesabınızı bağlayın

---

## 📊 Google Search Console Kurulumu

### Adım 1: Hesap Oluşturma

1. [Google Search Console](https://search.google.com/search-console) → Giriş yapın
2. **"Add Property"** butonuna tıklayın
3. **"URL prefix"** seçin
4. URL: `https://getprimesim.com`
5. **"Continue"** butonuna tıklayın

### Adım 2: Site Doğrulama

**Yöntem 1: HTML Dosyası (Kolay)**

1. **"HTML file upload"** seçeneğini seçin
2. HTML dosyasını indirin
3. `public/` klasörüne koyun (biz ekleyebiliriz)
4. Vercel'e deploy edin
5. Google Search Console'da **"Verify"** butonuna tıklayın

**Yöntem 2: HTML Tag (Kolay)**

1. **"HTML tag"** seçeneğini seçin
2. Meta tag'i kopyalayın
3. `app/layout.tsx` dosyasına ekleyin (biz ekleyebiliriz)
4. Deploy edin
5. Google Search Console'da **"Verify"** butonuna tıklayın

**Yöntem 3: DNS (Zor - Namecheap'te)**

1. **"Domain name provider"** seçin
2. DNS kaydı eklemeniz gerekir
3. Namecheap'te TXT kaydı ekleyin

### Adım 3: Sitemap Gönderme

1. Google Search Console'da **"Sitemaps"** sekmesine gidin
2. **"Add a new sitemap"** tıklayın
3. Sitemap URL: `sitemap.xml`
4. **"Submit"** butonuna tıklayın
5. Birkaç gün içinde indekslenmeye başlar

---

## 🎯 Hızlı Checklist

### Google Analytics
- [ ] Google Analytics hesabı oluşturuldu
- [ ] Property oluşturuldu
- [ ] Measurement ID alındı: `G-XXXXXXXXXX`
- [ ] `.env.local` dosyasına eklendi
- [ ] Vercel Environment Variable eklendi
- [ ] Site deploy edildi
- [ ] Realtime raporunda test edildi

### Google Search Console
- [ ] Google Search Console hesabı oluşturuldu
- [ ] Site eklendi: `https://getprimesim.com`
- [ ] Site doğrulandı (HTML tag veya dosya ile)
- [ ] Sitemap gönderildi: `sitemap.xml`
- [ ] URL Inspection ile test edildi

---

## 💡 İpuçları

1. **Measurement ID:** `G-` ile başlar, 10-11 karakter
2. **Test:** Realtime raporunda kendi ziyaretinizi görebilirsiniz
3. **Veri:** Analytics verileri 24-48 saat içinde tam olarak görünür
4. **Privacy:** GDPR için cookie consent ekleyebiliriz (opsiyonel)

---

## 🚀 Sonraki Adımlar

1. **Google Analytics:** Measurement ID'nizi aldıktan sonra bana söyleyin, ekleyeyim
2. **Google Search Console:** HTML tag'i eklememi isterseniz, söyleyin
3. **Sitemap:** Zaten hazır, sadece Google Search Console'a göndermeniz gerekiyor

---

## ❓ Sorun mu var?

- **Measurement ID bulamıyorum:** Google Analytics → Admin → Property Settings → Measurement ID
- **Site doğrulanmıyor:** HTML tag yöntemini kullanın, daha kolay
- **Sitemap gönderilmiyor:** URL'yi `sitemap.xml` olarak yazın (tam URL değil)












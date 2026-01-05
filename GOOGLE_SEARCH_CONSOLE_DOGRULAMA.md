# Google Search Console Doğrulama Kontrolü

## ✅ Meta Tag Eklendi - Şimdi Ne Yapmalı?

### Adım 1: Deployment Kontrolü
Meta tag eklendiyse, deployment yapıldı mı kontrol edin:
- ✅ Vercel'de son deployment başarılı mı?
- ✅ `https://getprimesim.com` güncel mi?

### Adım 2: Meta Tag Kontrolü
Tarayıcıda kontrol edin:
1. `https://getprimesim.com` adresini açın
2. Sağ tık → **"View Page Source"** (veya F12 → Elements)
3. `<head>` bölümünde şunu arayın:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXX" />
   ```
4. Eğer görünüyorsa ✅, görünmüyorsa ❌

### Adım 3: Google Search Console'da Doğrulama
1. [Google Search Console](https://search.google.com/search-console) → Giriş yapın
2. Site doğrulama sayfasına gidin
3. **"Verify"** butonuna tıklayın
4. Başarılı olursa ✅, hata verirse ❌

---

## ❌ Eğer Meta Tag Görünmüyorsa

### Next.js'te Meta Tag Ekleme
Next.js'te meta tag'i `metadata` objesine eklemek gerekiyor. Ben ekleyebilirim:

1. Google Search Console'dan meta tag'i kopyalayın
2. Bana gönderin, `app/layout.tsx` dosyasına ekleyeyim
3. Deploy edelim

**Örnek meta tag:**
```html
<meta name="google-site-verification" content="XXXXXXXXXXXXX" />
```

---

## ✅ Eğer Meta Tag Görünüyorsa

### Doğrulama Yapın:
1. Google Search Console'da **"Verify"** butonuna tıklayın
2. Başarılı olursa:
   - ✅ Site doğrulandı
   - ✅ Sitemap gönderebilirsiniz
   - ✅ URL Inspection kullanabilirsiniz

### Sitemap Gönderme:
1. Google Search Console'da **"Sitemaps"** sekmesine gidin
2. **"Add a new sitemap"** tıklayın
3. Sitemap URL: `sitemap.xml` (sadece bu, tam URL değil!)
4. **"Submit"** butonuna tıklayın

---

## 🔍 Meta Tag Nerede Olmalı?

### Next.js App Router'da:
`app/layout.tsx` dosyasında `metadata` objesine eklenmeli:

```typescript
export const metadata: Metadata = {
  // ... diğer metadata
  verification: {
    google: 'XXXXXXXXXXXXX', // Google verification code
  },
};
```

**VEYA** `<head>` içinde:

```typescript
<head>
  <meta name="google-site-verification" content="XXXXXXXXXXXXX" />
</head>
```

---

## 🚀 Hızlı Kontrol

1. **Meta tag görünüyor mu?**
   - `https://getprimesim.com` → View Source → `<head>` içinde ara

2. **Deployment yapıldı mı?**
   - Vercel Dashboard → Deployments → En son deployment

3. **Google Search Console'da doğrulama yapıldı mı?**
   - Google Search Console → Verify butonuna tıkla

---

## ❓ Sorun mu var?

### Meta tag görünmüyor:
- Deployment yapıldı mı kontrol edin
- Vercel'de redeploy yapın
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+R)

### Doğrulama başarısız:
- Meta tag'in doğru yerde olduğundan emin olun
- Deployment'ın tamamlandığından emin olun
- 1-2 dakika bekleyip tekrar deneyin

---

**Meta tag'i görebiliyor musunuz? Doğrulama yaptınız mı? Sonucu paylaşın! 🚀**










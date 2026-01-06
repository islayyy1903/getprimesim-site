# Google Search Console Doğrulama - Adım Adım

## ✅ Meta Tag Zaten Eklendi!

Meta tag zaten sitede var ve deploy edildi. Kopyala-yapıştır yapmanıza gerek yok!

---

## 🚀 ŞİMDİ YAPMANIZ GEREKENLER

### Adım 1: Google Search Console'a Gidin
1. [Google Search Console](https://search.google.com/search-console) → Giriş yapın
2. Site doğrulama sayfasına gidin (eğer değilseniz, "Add Property" → `https://getprimesim.com`)

### Adım 2: Doğrulama Yapın
1. Sayfada **"Verify"** veya **"Verify ownership"** butonunu görüyor musunuz?
2. **"Verify"** butonuna tıklayın
3. Google meta tag'i kontrol edecek
4. Başarılı olursa ✅ "Ownership verified" mesajı görünecek

### Adım 3: Sitemap Gönderin
1. Google Search Console'da sol menüden **"Sitemaps"** sekmesine gidin
2. **"Add a new sitemap"** veya **"Submit sitemap"** butonuna tıklayın
3. Sitemap URL kutusuna şunu yazın: `sitemap.xml`
   - ⚠️ **ÖNEMLİ:** Sadece `sitemap.xml` yazın, tam URL değil!
   - ❌ Yanlış: `https://getprimesim.com/sitemap.xml`
   - ✅ Doğru: `sitemap.xml`
4. **"Submit"** veya **"Send"** butonuna tıklayın
5. Birkaç dakika içinde "Success" mesajı görünecek

---

## ❓ SORUN MU VAR?

### "Verify" butonu görünmüyor:
- Sayfayı yenileyin (F5)
- Farklı bir tarayıcı deneyin
- Google Search Console'da site eklediğinizden emin olun

### Doğrulama başarısız:
1. **1-2 dakika bekleyin** (deployment yeni yapıldı)
2. `https://getprimesim.com` → View Source → Meta tag görünüyor mu kontrol edin
3. Tarayıcı cache'ini temizleyin (Ctrl+Shift+R)
4. Tekrar "Verify" butonuna tıklayın

### Meta tag görünmüyor:
1. Deployment tamamlandı mı kontrol edin (Vercel Dashboard)
2. 2-3 dakika bekleyin (CDN cache)
3. `https://getprimesim.com` → View Source → `<head>` içinde ara:
   ```html
   <meta name="google-site-verification" content="hicGUyJdEwjxF5oH3e6FQ" />
   ```

---

## ✅ BAŞARILI DOĞRULAMA SONRASI

Doğrulama başarılı olduğunda:

1. ✅ **Site doğrulandı** mesajı görünecek
2. ✅ **Sitemap gönderebilirsiniz**
3. ✅ **URL Inspection** kullanabilirsiniz
4. ✅ **Performance** raporlarını görebilirsiniz

---

## 📊 SITEMAP GÖNDERME (ÖNEMLİ!)

Sitemap göndermeyi unutmayın:

1. **Sitemaps** sekmesine gidin
2. **"Add a new sitemap"** tıklayın
3. `sitemap.xml` yazın (sadece bu!)
4. **"Submit"** tıklayın

Bu sayede Google tüm sayfalarınızı indeksleyecek!

---

## 🎯 HIZLI CHECKLIST

- [ ] Google Search Console'a giriş yapıldı
- [ ] Site eklendi: `https://getprimesim.com`
- [ ] "Verify" butonuna tıklandı
- [ ] Doğrulama başarılı oldu ✅
- [ ] Sitemap gönderildi: `sitemap.xml`
- [ ] Sitemap başarılı oldu ✅

---

**Meta tag zaten sitede! Sadece Google Search Console'da "Verify" butonuna tıklayın! 🚀**












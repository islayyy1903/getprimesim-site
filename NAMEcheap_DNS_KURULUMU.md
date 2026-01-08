# 🌐 Namecheap DNS Kurulumu - getprimesim.com

## ✅ Durum
- ✅ Domain Vercel'e eklendi: **getprimesim.com**
- ⏳ DNS ayarları yapılacak (Namecheap'te)

---

## 📋 Adım Adım: DNS Kayıtlarını Ekle (Önerilen)

### Adım 1: Namecheap'e Giriş
1. https://www.namecheap.com adresine git
2. Giriş yap
3. **Domain List** sekmesine tıkla

### Adım 2: Domain'i Seç
1. **getprimesim.com** domain'ini bul
2. Domain'in yanındaki **Manage** butonuna tıkla

### Adım 3: Advanced DNS Sekmesi
1. **Advanced DNS** sekmesine git
2. **Host Records** bölümüne scroll yap

### Adım 4: Mevcut Kayıtları Kontrol Et
- Eğer eski A kayıtları varsa, onları sil veya düzenle

### Adım 5: Yeni DNS Kayıtlarını Ekle

#### A Kaydı (Ana Domain - getprimesim.com)
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic (veya 30 min)
```

**Nasıl eklenir:**
1. **Add New Record** butonuna tıkla
2. **Type:** A Record seç
3. **Host:** @ yaz
4. **Value:** 76.76.21.21 yaz
5. **TTL:** Automatic seç
6. **Save** (✓) butonuna tıkla

#### CNAME Kaydı (www.getprimesim.com)
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic (veya 30 min)
```

**Nasıl eklenir:**
1. **Add New Record** butonuna tıkla
2. **Type:** CNAME Record seç
3. **Host:** www yaz
4. **Value:** cname.vercel-dns.com yaz
5. **TTL:** Automatic seç
6. **Save** (✓) butonuna tıkla

### Adım 6: Kaydet
- Tüm değişiklikler otomatik kaydedilir
- **Save All Changes** butonu varsa ona tıkla

---

## ⏱️ Bekleme Süresi

**DNS Yayılımı:**
- Genellikle: **5-30 dakika**
- Bazen: **1-2 saat** (nadir)
- Maksimum: **24-48 saat** (çok nadir)

**SSL Sertifikası:**
- DNS yayıldıktan sonra: **5-10 dakika**
- Vercel otomatik olarak Let's Encrypt SSL sağlar

---

## ✅ Kontrol

### 1. DNS Yayılımını Kontrol Et
Terminal'de:
```bash
nslookup getprimesim.com
```
veya online: https://dnschecker.org/#A/getprimesim.com

### 2. Vercel Dashboard'da Kontrol
1. https://vercel.com/dashboard
2. Projeyi seç → **Settings** → **Domains**
3. Domain durumunu kontrol et:
   - ✅ Yeşil tik = Çalışıyor
   - ⚠️ Sarı uyarı = DNS yayılıyor
   - ❌ Kırmızı = DNS hatası

### 3. Website'i Test Et
- https://getprimesim.com (birkaç dakika sonra)
- https://www.getprimesim.com (www ile)

---

## 🔧 Sorun Giderme

### Domain Çalışmıyor
1. DNS kayıtlarını kontrol et (doğru IP: 76.76.21.21)
2. 30 dakika bekle (DNS yayılımı için)
3. Vercel dashboard'da domain durumunu kontrol et
4. Browser cache'ini temizle

### SSL Sertifikası Yok
1. DNS ayarları yapıldıktan sonra otomatik oluşturulur
2. 5-10 dakika bekle
3. Vercel dashboard'da SSL durumunu kontrol et

### "Domain not configured" Hatası
1. DNS kayıtlarının doğru eklendiğinden emin ol
2. TTL değerini düşür (5 min) ve tekrar dene
3. Vercel support'a başvur

---

## 📞 Yardım

- **Vercel Domain Docs:** https://vercel.com/docs/concepts/projects/domains
- **Namecheap Support:** https://www.namecheap.com/support/
- **DNS Checker:** https://dnschecker.org

---

## 🎯 Özet

**Yapılacaklar:**
1. ✅ Namecheap → Advanced DNS
2. ✅ A kaydı ekle: `@` → `76.76.21.21`
3. ✅ CNAME kaydı ekle: `www` → `cname.vercel-dns.com`
4. ⏳ 5-30 dakika bekle
5. ✅ https://getprimesim.com çalışır!

















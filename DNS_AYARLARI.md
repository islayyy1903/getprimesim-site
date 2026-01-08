# 🌐 Namecheap DNS Ayarları

## ✅ Domain Vercel'e Eklendi
Domain başarıyla Vercel'e eklendi: **getprimesim.com**

---

## 📋 Namecheap'te Yapılacaklar

### Adım 1: Namecheap Dashboard'a Git
1. https://www.namecheap.com adresine git
2. Giriş yap
3. **Domain List** sekmesine git
4. **getprimesim.com** domain'ini bul ve tıkla

### Adım 2: Advanced DNS Sekmesi
1. Domain detay sayfasında **Advanced DNS** sekmesine git
2. **Host Records** bölümüne git

### Adım 3: DNS Kayıtlarını Ekle

**Mevcut kayıtları sil (gerekirse) ve şunları ekle:**

#### A Kaydı (Ana Domain)
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic (veya 30 min)
```

#### CNAME Kaydı (www için)
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic (veya 30 min)
```

### Adım 4: Kaydet
- **Save All Changes** butonuna tıkla
- Değişikliklerin kaydedildiğini onayla

---

## ⏱️ Bekleme Süresi

- **DNS yayılımı:** 5-30 dakika (bazen 24 saat)
- **SSL sertifikası:** DNS yayıldıktan sonra 5-10 dakika
- **Website aktif:** https://getprimesim.com

---

## ✅ Kontrol

DNS ayarları yapıldıktan sonra:

1. **Vercel Dashboard'da kontrol et:**
   - https://vercel.com/dashboard
   - Projeyi seç → Settings → Domains
   - Domain durumunu kontrol et

2. **Website'i test et:**
   - https://getprimesim.com (birkaç dakika sonra çalışır)

---

## 🔧 Sorun Giderme

**Domain çalışmıyor:**
- DNS kayıtlarını kontrol et
- 30 dakika bekle (DNS yayılımı için)
- Vercel dashboard'da domain durumunu kontrol et

**SSL sertifikası yok:**
- DNS ayarları yapıldıktan sonra otomatik oluşturulur
- 5-10 dakika bekle
- Vercel otomatik olarak Let's Encrypt SSL sağlar

---

## 📞 Yardım

- Vercel Domain Docs: https://vercel.com/docs/concepts/projects/domains
- Namecheap Support: https://www.namecheap.com/support/

















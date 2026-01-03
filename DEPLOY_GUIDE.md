# 🚀 Vercel'e Deploy Etme - Basit Rehber

## ✅ Seçenek 1: Vercel CLI ile Deploy (GitHub Gerektirmez)

### Adım 1: Vercel'e Giriş Yap
Terminal'de şu komutu çalıştır:
```bash
vercel login
```
- Browser otomatik açılacak
- Vercel hesabınla giriş yap (yoksa ücretsiz oluştur)

### Adım 2: Deploy Et
```bash
vercel
```

Sorulara şu şekilde cevap ver:
- **Set up and deploy?** → `Y` (Enter)
- **Which scope?** → Vercel hesabını seç (Enter)
- **Link to existing project?** → `N` (Enter)
- **Project name?** → `getprimesim-site` (Enter)
- **Directory?** → `.` (Enter - mevcut klasör)
- **Override settings?** → `N` (Enter)

### Adım 3: Production Deploy
```bash
vercel --prod
```

Bu komut production'a deploy eder ve bir URL verir (örn: `getprimesim-site.vercel.app`)

---

## 🌐 Domain Bağlama

### Adım 1: Vercel Dashboard
1. https://vercel.com/dashboard adresine git
2. Deploy edilen projeyi seç (`getprimesim-site`)

### Adım 2: Domain Ekle
1. **Settings** sekmesine tıkla
2. **Domains** sekmesine git
3. **Add Domain** butonuna tıkla
4. `getprimesim.com` yaz
5. **Add** tıkla

### Adım 3: DNS Ayarları (Namecheap)
Vercel size DNS kayıtları gösterecek. Örnek:

**Namecheap'te:**
1. Namecheap Dashboard → Domain List → getprimesim.com
2. **Advanced DNS** sekmesi
3. Vercel'in verdiği kayıtları ekle:

**Örnek (Vercel'in verdiği gerçek değerleri kullan):**
```
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

**ÖNEMLİ:** Vercel dashboard'da gösterilen gerçek DNS kayıtlarını kullan!

### Adım 4: SSL
- Vercel otomatik SSL sertifikası sağlar
- DNS ayarları yapıldıktan sonra 5-10 dakika içinde aktif olur

---

## ✅ Seçenek 2: GitHub ile Deploy (Alternatif)

Eğer GitHub kullanmak istersen:

### Adım 1: GitHub Repository Oluştur
1. https://github.com/new adresine git
2. Repository adı: `getprimesim-site`
3. **Create repository** tıkla

### Adım 2: Remote Ekle ve Push
Terminal'de:
```bash
git remote add origin https://github.com/KULLANICI_ADI/getprimesim-site.git
git branch -M main
git push -u origin main
```

**Not:** `KULLANICI_ADI` yerine GitHub kullanıcı adını yaz!

### Adım 3: Vercel Web Dashboard
1. https://vercel.com/new adresine git
2. GitHub ile giriş yap
3. Repository'yi seç
4. **Deploy** tıkla

---

## 🔧 Sorun Giderme

### "origin does not appear to be a git repository" Hatası
Bu hata GitHub remote'u eklenmediğinde olur. 

**Çözüm:** Seçenek 1'i kullan (Vercel CLI - GitHub gerektirmez)

### Vercel Login Sorunu
```bash
vercel logout
vercel login
```

### DNS Yayılımı
- DNS değişiklikleri 5-30 dakika içinde yayılır
- Bazen 24 saat sürebilir (nadir)

---

## 📝 Hızlı Komutlar

```bash
# Vercel'e giriş
vercel login

# Preview deploy
vercel

# Production deploy
vercel --prod

# Mevcut deployment'ları gör
vercel ls

# Domain'leri gör
vercel domains
```





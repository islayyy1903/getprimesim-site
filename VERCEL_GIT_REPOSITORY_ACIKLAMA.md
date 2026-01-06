# Vercel Git Repository Açıklaması

## 🔍 VERCEL KODU NEREDEN ALIR?

Vercel, kodunuzu **Git repository'den** (GitHub, GitLab, Bitbucket) alır.

---

## 📋 MEVCUT DURUM

### Git Remote (GitHub Repository)
```
origin: https://github.com/islayy1903/getprimesim-site.git
```

**Bu demek ki:**
- ✅ GitHub repository: `islayy1903/getprimesim-site`
- ✅ Bu repository'ye push yapıyorsunuz
- ✅ Vercel bu repository'yi dinliyor ve otomatik deploy yapıyor

---

## 🔄 VERCEL NASIL ÇALIŞIR?

### 1. GitHub'a Push Yapın
```bash
git add .
git commit -m "Your changes"
git push
```

### 2. Vercel Otomatik Deploy
- Vercel GitHub repository'nizi dinler
- Yeni commit görünce otomatik deploy başlar
- 2-3 dakika içinde production'a çıkar

---

## 🔍 VERCEL'DE REPOSITORY'Yİ KONTROL ETME

### Adım 1: Vercel Dashboard'a Gidin
1. https://vercel.com/dashboard
2. Projenizi seçin (`getprimesim-site`)

### Adım 2: Settings → Git
1. **Settings** sekmesine tıklayın
2. **Git** sekmesine gidin
3. Burada şunları görürsünüz:
   - **Repository:** `islayy1903/getprimesim-site`
   - **Production Branch:** `main` (veya `master`)
   - **Deploy Hooks:** Otomatik deploy ayarları

---

## ✅ KONTROL LİSTESİ

### Git Repository Kontrolü
- [ ] Git remote doğru mu? (`git remote -v`)
- [ ] GitHub repository var mı ve erişilebilir mi?
- [ ] Vercel Dashboard'da Git bağlantısı var mı?

### Vercel Deployment Kontrolü
- [ ] Vercel Dashboard → Settings → Git
- [ ] Repository bağlı mı?
- [ ] Production branch doğru mu? (`main` veya `master`)

---

## 🚀 PUSH VE DEPLOY AKIŞI

```
1. Kod değişikliği yap
   ↓
2. git add .
   ↓
3. git commit -m "Changes"
   ↓
4. git push (GitHub'a gönder)
   ↓
5. Vercel otomatik deploy başlar
   ↓
6. 2-3 dakika sonra production'da çalışır
```

---

## ❓ SORUN GİDERME

### "Repository not found" Hatası
**Sebep:** GitHub repository'ye erişim izni yok veya repository private.

**Çözüm:**
1. GitHub'da repository'nin private olup olmadığını kontrol edin
2. Vercel Dashboard → Settings → Git → Repository'yi yeniden bağlayın
3. GitHub ile giriş yaparken repository erişim izni verin

### Vercel Deploy Etmiyor
**Sebep:** Vercel GitHub repository'nizi dinlemiyor.

**Çözüm:**
1. Vercel Dashboard → Settings → Git
2. Repository bağlı mı kontrol edin
3. Production branch doğru mu kontrol edin (`main` veya `master`)
4. Deploy Hooks'lar aktif mi kontrol edin

### Manuel Deploy Yapmak İsterseniz
1. Vercel Dashboard → Deployments
2. **"Create Deployment"** butonuna tıklayın
3. GitHub repository'yi seçin
4. Branch seçin (`main`)
5. **"Deploy"** butonuna tıklayın

---

## 📝 ÖZET

**Kısacası:**
- ✅ Kod **GitHub'a** push ediliyor (`islayy1903/getprimesim-site`)
- ✅ Vercel bu **GitHub repository'sini** dinliyor
- ✅ Push yapınca Vercel **otomatik deploy** yapıyor
- ✅ Production'da **https://getprimesim.com** adresinde çalışıyor

**Kontrol etmek için:**
- `git remote -v` → Hangi repository'ye push yapıyorsunuz?
- Vercel Dashboard → Settings → Git → Hangi repository bağlı?

---

**Şu an push yaptığınız yer:** `https://github.com/islayy1903/getprimesim-site.git`  
**Vercel'in dinlediği yer:** Aynı repository (Vercel Dashboard'dan kontrol edin)











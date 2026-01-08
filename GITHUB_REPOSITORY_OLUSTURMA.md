# GitHub Repository Oluşturma ve Push

## 🚨 SORUN

GitHub'da kodunuzu göremiyorsunuz çünkü:
- ✅ Commit'ler local'de var
- ❌ GitHub'da repository yok veya push edilmemiş

---

## ✅ ÇÖZÜM: GITHUB REPOSITORY OLUŞTUR VE PUSH YAP

### Adım 1: GitHub'da Repository Oluştur

1. **GitHub'a giriş yap:**
   - https://github.com adresine git
   - `islayy1903` hesabıyla giriş yap

2. **Yeni Repository Oluştur:**
   - Sağ üst köşede **"+"** → **"New repository"** tıkla
   - **Repository name:** `getprimesim-site`
   - **Description:** (opsiyonel) "eSIM Store Website"
   - **Public** veya **Private** seç (önerilen: Private)
   - ⚠️ **ÖNEMLİ:** "Initialize this repository with a README" kutusunu **İŞARETLEME!**
   - **"Create repository"** butonuna tıkla

---

### Adım 2: Local'deki Kodu GitHub'a Push Et

Terminal'de şu komutları sırayla çalıştır:

```bash
# 1. Tüm değişiklikleri ekle
git add .

# 2. Commit yap
git commit -m "Initial commit: eSIM store website"

# 3. GitHub repository'sine push yap
git push -u origin main
```

**Not:** Eğer `main` branch'i yoksa `master` kullan:
```bash
git branch -M main  # Eğer master branch'indeyse
git push -u origin main
```

---

## 🔐 GITHUB AUTHENTICATION

Push yaparken GitHub'a giriş isteyebilir. İki seçenek var:

### Seçenek 1: GitHub Desktop (Kolay)
1. GitHub Desktop'u indir: https://desktop.github.com
2. GitHub hesabınla giriş yap
3. Repository'yi aç
4. "Publish repository" butonuna tıkla

### Seçenek 2: Personal Access Token (Terminal)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. Scopes: `repo` seç
4. Token'ı kopyala
5. Push yaparken password yerine bu token'ı kullan

---

## 📋 KONTROL LİSTESİ

### GitHub'da:
- [ ] Repository oluşturuldu mu? (`islayy1903/getprimesim-site`)
- [ ] Repository public/private ayarı doğru mu?

### Local'de:
- [ ] `git remote -v` → `origin` doğru mu?
- [ ] `git status` → Commit edilecek dosya var mı?
- [ ] `git push -u origin main` → Başarılı mı?

### Kontrol:
- [ ] https://github.com/islayy1903/getprimesim-site adresinde kodlar görünüyor mu?

---

## 🔍 MEVCUT DURUM KONTROLÜ

Terminal'de şu komutları çalıştırarak durumu kontrol edin:

```bash
# Git remote kontrolü
git remote -v

# Commit'leri kontrol et
git log --oneline -5

# Branch kontrolü
git branch -a
```

---

## ❓ SORUN GİDERME

### "Repository not found" Hatası
**Sebep:** Repository GitHub'da yok veya erişim izni yok.

**Çözüm:**
1. GitHub'da repository oluşturun (Adım 1)
2. Repository'nin private/public ayarını kontrol edin
3. Doğru GitHub hesabıyla giriş yaptığınızdan emin olun

### "Authentication failed" Hatası
**Sebep:** GitHub'a giriş yapamıyor.

**Çözüm:**
1. GitHub Desktop kullanın (önerilen)
2. Veya Personal Access Token oluşturun

### "Permission denied" Hatası
**Sebep:** Repository'ye push yetkisi yok.

**Çözüm:**
1. Repository'nin sahibi olduğunuzdan emin olun
2. Doğru GitHub hesabıyla giriş yapın (`islayy1903`)

---

## 🚀 SONRAKI ADIMLAR

1. ✅ GitHub'da repository oluştur
2. ✅ Local kodları push et
3. ✅ Vercel Dashboard → Settings → Git → Repository'yi kontrol et
4. ✅ Vercel otomatik deploy yapacak

---

**GitHub'da repository oluşturduktan sonra push yapabilirsiniz! 🚀**















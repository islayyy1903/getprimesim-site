# 🚀 GitHub'a Push Rehberi

## ⚠️ Sorun: Repository Bulunamadı

GitHub'da repository yok veya erişim izni yok.

---

## ✅ Çözüm: Repository Oluştur ve Push Yap

### ADIM 1: GitHub'da Repository Oluştur

1. **GitHub'a git:**
   - https://github.com → Giriş yap

2. **Yeni repository oluştur:**
   - Sağ üst köşede **"+"** → **"New repository"**
   - **Repository name:** `getprimesim-site`
   - **Description:** `PrimeSim eSIM Services Website`
   - **Public** veya **Private** seç (istediğin gibi)
   - **"Add a README file"** → ❌ İşaretleme (zaten kod var)
   - **"Add .gitignore"** → ❌ İşaretleme
   - **"Choose a license"** → İsteğe bağlı
   - **"Create repository"** butonuna tıkla

3. **Repository URL'ini kopyala:**
   - Repository oluşturulduktan sonra
   - Yeşil **"Code"** butonuna tıkla
   - HTTPS URL'ini kopyala:
     ```
     https://github.com/KULLANICI_ADIN/getprimesim-site.git
     ```

---

### ADIM 2: Local Git Remote'u Güncelle

**Terminal'de çalıştır:**

```powershell
# Mevcut remote'u kontrol et
git remote -v

# Eğer yanlış URL varsa, remote'u sil ve yeniden ekle
git remote remove origin

# Yeni repository URL'ini ekle (KULLANICI_ADIN yerine kendi GitHub kullanıcı adını yaz)
git remote add origin https://github.com/KULLANICI_ADIN/getprimesim-site.git

# Remote'u kontrol et
git remote -v
```

---

### ADIM 3: GitHub'a Push Yap

**Terminal'de çalıştır:**

```powershell
# Tüm değişiklikleri ekle (zaten yapıldı)
git add .

# Commit yap (zaten yapıldı)
git commit -m "Update: Currency support, QR code improvements, favicon update, and documentation"

# GitHub'a push yap
git push -u origin main
```

**Eğer hata alırsan:**

```powershell
# Branch'i kontrol et
git branch

# Eğer "master" branch'indeyse:
git branch -M main

# Sonra push yap
git push -u origin main
```

---

### ADIM 4: GitHub Authentication

**Eğer authentication hatası alırsan:**

#### Yöntem 1: Personal Access Token (Önerilen)

1. **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** `getprimesim-site-push`
4. **Expiration:** İstediğin süre (örn: 90 days)
5. **Scopes:** ✅ `repo` (tüm repo izinleri)
6. **"Generate token"** butonuna tıkla
7. **Token'ı kopyala** (bir daha gösterilmeyecek!)

8. **Push yaparken token kullan:**
   ```powershell
   git push -u origin main
   # Username: GitHub kullanıcı adın
   # Password: Token'ı yapıştır (şifre değil!)
   ```

#### Yöntem 2: GitHub CLI

```powershell
# GitHub CLI yükle (eğer yoksa)
winget install GitHub.cli

# GitHub'a login ol
gh auth login

# Push yap
git push -u origin main
```

#### Yöntem 3: SSH Key

1. **SSH key oluştur:**
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Public key'i kopyala:**
   ```powershell
   cat ~/.ssh/id_ed25519.pub
   ```

3. **GitHub'a ekle:**
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - Public key'i yapıştır
   - **"Add SSH key"** butonuna tıkla

4. **Remote URL'ini SSH'a çevir:**
   ```powershell
   git remote set-url origin git@github.com:KULLANICI_ADIN/getprimesim-site.git
   ```

5. **Push yap:**
   ```powershell
   git push -u origin main
   ```

---

## ✅ Başarılı Push Sonrası

1. **GitHub'da kontrol et:**
   - https://github.com/KULLANICI_ADIN/getprimesim-site
   - Tüm dosyalar görünmeli

2. **Vercel otomatik deploy:**
   - Eğer Vercel GitHub'a bağlıysa
   - Otomatik olarak yeni deployment başlar
   - Vercel Dashboard'da kontrol et

---

## 🔍 Sorun Giderme

### Sorun: "Repository not found"

**Çözüm:**
- GitHub'da repository oluşturuldu mu kontrol et
- Repository URL'i doğru mu kontrol et
- GitHub kullanıcı adın doğru mu kontrol et

### Sorun: "Authentication failed"

**Çözüm:**
- Personal Access Token kullan
- Veya SSH key kullan
- Veya GitHub CLI kullan

### Sorun: "Permission denied"

**Çözüm:**
- Repository sahibi sen misin kontrol et
- Personal Access Token'da `repo` scope'u var mı kontrol et

---

## 📋 Hızlı Komutlar

```powershell
# Remote'u kontrol et
git remote -v

# Remote'u güncelle
git remote set-url origin https://github.com/KULLANICI_ADIN/getprimesim-site.git

# Branch'i kontrol et
git branch

# Push yap
git push -u origin main
```

---

**Son Güncelleme:** GitHub push rehberi hazır! 🚀













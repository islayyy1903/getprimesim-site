# Vercel Loglarına Alternatif Erişim Yöntemleri

## 🔍 ENDPOINT GÖRÜNMÜYORSA

Functions sekmesinde endpoint görünmüyorsa, şu alternatif yöntemleri deneyin:

---

## YÖNTEM 1: Deployments Üzerinden (EN KOLAY)

### Adım 1: Deployments Sekmesine Gidin
1. Vercel Dashboard → Projeniz
2. **"Deployments"** sekmesine tıklayın
3. **En son deployment'a** tıklayın (en üstteki)

### Adım 2: Functions Sekmesine Gidin
1. Deployment sayfasında **"Functions"** sekmesine tıklayın
2. Veya **"View Function Logs"** butonuna tıklayın

### Adım 3: Endpoint'i Seçin
1. Functions listesinde endpoint'leri göreceksiniz:
   - `/api/checkout`
   - `/api/webhooks/stripe`
   - `/api/esimgo/webhook`
2. Endpoint'e tıklayın → Loglar görünecek

---

## YÖNTEM 2: Vercel CLI ile (TERMINAL)

### Adım 1: Vercel CLI Kurulumu
```powershell
# Eğer kurulu değilse
npm install -g vercel
```

### Adım 2: Login
```powershell
vercel login
```

### Adım 3: Logları Görüntüle
```powershell
# Tüm logları görüntüle
vercel logs getprimesim-site

# Belirli bir endpoint'in loglarını görüntüle
vercel logs getprimesim-site --follow
```

### Adım 4: Canlı Logları İzle
```powershell
# Canlı logları izle (real-time)
vercel logs getprimesim-site --follow
```

---

## YÖNTEM 3: Deployment Logları

### Adım 1: Deployment'a Gidin
1. Vercel Dashboard → Projeniz → **Deployments**
2. En son deployment'a tıklayın

### Adım 2: Build Logları
1. Deployment sayfasında **"Build Logs"** sekmesine tıklayın
2. Build sırasındaki logları göreceksiniz

### Adım 3: Runtime Logları
1. Deployment sayfasında **"Runtime Logs"** sekmesine tıklayın
2. Runtime sırasındaki logları göreceksiniz

---

## YÖNTEM 4: Inspect Komutu (Vercel CLI)

### Adım 1: Deployment URL'ini Bulun
1. Vercel Dashboard → Deployments
2. En son deployment'ın URL'ini kopyalayın
3. Örnek: `https://getprimesim-site-xxxxx.vercel.app`

### Adım 2: Inspect Komutu
```powershell
vercel inspect https://getprimesim-site-xxxxx.vercel.app
```

### Adım 3: Logları Görüntüle
- Tarayıcıda inspect sayfası açılacak
- Logları görebilirsiniz

---

## 🔍 HANGİ YÖNTEMİ KULLANMALIYIM?

### Eğer Functions Sekmesi Yoksa:
→ **Yöntem 1: Deployments Üzerinden** (En kolay)

### Eğer Terminal Kullanmak İstiyorsanız:
→ **Yöntem 2: Vercel CLI ile**

### Eğer Sadece Build Logları Gerekiyorsa:
→ **Yöntem 3: Deployment Logları**

---

## 📋 ADIM ADIM: DEPLOYMENTS ÜZERİNDEN

### 1. Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2. Projenizi Seçin
```
getprimesim-site → Tıklayın
```

### 3. Deployments Sekmesi
```
Proje Sayfası:
├── Overview
├── Deployments  ← BURAYA TIKLAYIN
├── Settings
└── ...
```

### 4. En Son Deployment
```
Deployments Listesi:
├── [En Son] Production  ← BURAYA TIKLAYIN
├── [Önceki] Production
└── ...
```

### 5. Functions Sekmesi
```
Deployment Sayfası:
├── Overview
├── Build Logs
├── Functions  ← BURAYA TIKLAYIN
└── ...
```

### 6. Endpoint Seçin
```
Functions Listesi:
├── /api/checkout          [View Logs]
├── /api/webhooks/stripe   [View Logs]  ← BURAYA TIKLAYIN
├── /api/esimgo/webhook    [View Logs]
└── ...
```

---

## ⚠️ ENDPOINT GÖRÜNMÜYORSA

### Sorun 1: Endpoint Henüz Çağrılmamış
**Belirtiler:**
- Functions listesinde endpoint yok
- Sadece build logları var

**Çözüm:**
- Test siparişi yapın
- Endpoint çağrıldıktan sonra görünecek

### Sorun 2: Functions Sekmesi Yok
**Belirtiler:**
- Deployment sayfasında Functions sekmesi yok

**Çözüm:**
- Vercel CLI kullanın
- Veya Runtime Logs sekmesine bakın

---

## 🚀 HIZLI ÇÖZÜM: VERCEL CLI

### Terminal'de:
```powershell
# Proje dizinine gidin
cd C:\Users\Admin\getprimesim-site

# Logları görüntüle
vercel logs getprimesim-site --follow
```

Bu komut canlı logları gösterecek!

---

## ✅ SONRAKI ADIM

**Şimdi deneyin:**
1. **Deployments** sekmesine gidin
2. En son deployment'a tıklayın
3. **Functions** sekmesine tıklayın
4. Endpoint'leri görüyor musunuz?

**Veya terminal'de:**
```powershell
vercel logs getprimesim-site --follow
```

**Hangi yöntemi denediniz? Endpoint'leri görüyor musunuz? 🔍**





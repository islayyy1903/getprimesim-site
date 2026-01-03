# Log Görüntüleme - Alternatif Yöntemler

## 🔍 FUNCTIONS SEKMESİ YOKSA

Deployment sayfasında "Functions" sekmesi yoksa, şu alternatif yöntemleri deneyin:

---

## YÖNTEM 1: Runtime Logs (EN KOLAY)

### Adım 1: Deployment Sayfası
1. Vercel Dashboard → Projeniz → Deployments
2. En son deployment'a tıklayın

### Adım 2: Runtime Logs Sekmesi
1. Deployment sayfasında **"Runtime Logs"** sekmesine tıklayın
2. Veya **"Logs"** sekmesine tıklayın
3. Tüm runtime loglarını göreceksiniz

### Adım 3: Logları Filtreleyin
1. Loglarda şunları arayın:
   - `=== STRIPE WEBHOOK CALLED ===`
   - `=== ESIMGO V3 CALLBACK CALLED ===`
   - `📦 Purchasing eSim from eSimGo...`
2. Ctrl+F ile arama yapabilirsiniz

---

## YÖNTEM 2: Inspect Komutu (Vercel CLI)

### Adım 1: Deployment URL'ini Bulun
1. Vercel Dashboard → Deployments
2. En son deployment'ın URL'ini kopyalayın
3. Örnek: `https://getprimesim-site-xxxxx.vercel.app`

### Adım 2: Inspect Komutu
Terminal'de (PowerShell):
```powershell
vercel inspect https://getprimesim-site-xxxxx.vercel.app
```

### Adım 3: Tarayıcıda Açılacak
- Inspect sayfası tarayıcıda açılacak
- Logları görebilirsiniz

---

## YÖNTEM 3: Direkt URL ile

### Adım 1: Deployment ID'yi Bulun
1. Vercel Dashboard → Deployments
2. En son deployment'a tıklayın
3. URL'de deployment ID'yi görün
4. Örnek: `https://vercel.com/[kullanici]/getprimesim-site/[deployment-id]`

### Adım 2: Logs URL'i
URL'yi şu şekilde değiştirin:
```
https://vercel.com/[kullanici]/getprimesim-site/[deployment-id]/logs
```

---

## YÖNTEM 4: Vercel CLI ile Canlı Loglar

### Terminal'de:
```powershell
# Proje dizinine gidin
cd C:\Users\Admin\getprimesim-site

# Canlı logları izle
vercel logs --follow
```

Bu komut canlı logları gösterecek!

---

## 🔍 DEPLOYMENT SAYFASINDA NE VAR?

Deployment sayfasında hangi sekmeler görünüyor?

Muhtemelen şunlar:
- Overview
- Build Logs
- Runtime Logs ← **BURAYA TIKLAYIN**
- Settings
- Başka bir şey?

---

## 📋 ADIM ADIM: RUNTIME LOGS

### 1. Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2. Projeniz
```
getprimesim-site → Tıklayın
```

### 3. Deployments
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
└── ...
```

### 5. Runtime Logs
```
Deployment Sayfası:
├── Overview
├── Build Logs
├── Runtime Logs  ← BURAYA TIKLAYIN
└── ...
```

### 6. Logları Arayın
```
Runtime Logs:
[2024-01-15 10:30:45] === STRIPE WEBHOOK CALLED ===
[2024-01-15 10:30:45] ✅ Payment successful: cs_test_xxxxx
[2024-01-15 10:30:45] 📦 Purchasing eSim from eSimGo...
```

**Ctrl+F ile arama yapın:**
- `STRIPE WEBHOOK`
- `ESIMGO`
- `Purchasing eSim`

---

## ⚠️ LOGLAR GÖRÜNMÜYORSA

### Sorun 1: Henüz Test Siparişi Yapılmadı
**Belirtiler:**
- Runtime Logs boş
- Sadece build logları var

**Çözüm:**
1. Test siparişi yapın
2. Sonra tekrar kontrol edin

### Sorun 2: Loglar Çok Eski
**Belirtiler:**
- Eski loglar görünüyor
- Yeni loglar yok

**Çözüm:**
1. Test siparişi yapın
2. Logları yenileyin (F5)
3. En son logları kontrol edin

---

## 🚀 HIZLI ÇÖZÜM

**Şimdi yapın:**

1. ✅ Vercel Dashboard → Projeniz → Deployments
2. ✅ En son deployment'a tıklayın
3. ✅ **Runtime Logs** sekmesine tıklayın
4. ✅ Logları görüyor musunuz?

**Eğer hala göremiyorsanız:**
- Test siparişi yapın
- Sonra tekrar kontrol edin

---

## ✅ SONRAKI ADIM

**Runtime Logs sekmesine gittiniz mi? Logları görüyor musunuz? 🔍**

Eğer görüyorsanız, şunları arayın:
- `STRIPE WEBHOOK`
- `ESIMGO`
- `Purchasing eSim`




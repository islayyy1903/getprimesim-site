# Vercel Loglarına Erişim Rehberi

## 🔍 VERCEL LOGLARINA NASIL ULAŞILIR?

### Adım 1: Vercel Dashboard'a Giriş
1. Tarayıcıda [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin
2. Giriş yapın (eğer giriş yapmadıysanız)

### Adım 2: Projenizi Seçin
1. Dashboard'da **"getprimesim-site"** projenizi bulun
2. Projeye tıklayın

### Adım 3: Functions Sekmesine Gidin
1. Proje sayfasında üst menüden **"Functions"** sekmesine tıklayın
2. Veya sol menüden **"Functions"** seçeneğine tıklayın

### Adım 4: Endpoint'i Seçin
1. Functions listesinde şu endpoint'leri göreceksiniz:
   - `/api/checkout`
   - `/api/webhooks/stripe`
   - `/api/esimgo/webhook`
2. **Hangi endpoint'in loglarını görmek istiyorsanız ona tıklayın**

### Adım 5: Logs Sekmesine Gidin
1. Endpoint'e tıkladıktan sonra:
   - **"Logs"** sekmesine tıklayın
   - Veya **"View Logs"** butonuna tıklayın
2. Loglar görünecek

---

## 📋 ADIM ADIM GÖRSEL REHBER

### 1. Vercel Dashboard
```
https://vercel.com/dashboard
```
- Giriş yapın
- Projenizi bulun

### 2. Proje Sayfası
```
Proje Adı: getprimesim-site
├── Overview
├── Deployments
├── Functions  ← BURAYA TIKLAYIN
├── Settings
└── ...
```

### 3. Functions Sayfası
```
Functions Listesi:
├── /api/checkout          [View Logs]
├── /api/webhooks/stripe   [View Logs]  ← BURAYA TIKLAYIN
├── /api/esimgo/webhook    [View Logs]  ← VEYA BURAYA
└── ...
```

### 4. Logs Sayfası
```
Logs:
[2024-01-15 10:30:45] === STRIPE WEBHOOK CALLED ===
[2024-01-15 10:30:45] ✅ Payment successful: cs_test_xxxxx
[2024-01-15 10:30:45] 📦 Purchasing eSim from eSimGo...
[2024-01-15 10:30:46] Package: USA eSIM – 1GB
[2024-01-15 10:30:46] eSimGo Package ID: usa-1gb-7days
[2024-01-15 10:30:46] Email: customer@example.com
```

---

## 🔍 HANGİ LOGLARI KONTROL ETMELİYİM?

### 1. `/api/webhooks/stripe` Logları (ÖNEMLİ!)
**Ne arayalım:**
- `=== STRIPE WEBHOOK CALLED ===` → Webhook tetiklendi mi?
- `✅ Payment successful` → Ödeme başarılı mı?
- `📦 Purchasing eSim from eSimGo...` → eSimGo API'ye istek gitti mi?
- `❌ eSimGo purchase failed` → Hata var mı?
- `✅ eSim purchased successfully` → eSim satın alındı mı?

### 2. `/api/esimgo/webhook` Logları
**Ne arayalım:**
- `=== ESIMGO V3 CALLBACK CALLED ===` → Callback geldi mi?
- `📦 eSimGo v3 Callback Details:` → Callback detayları
- `QR Code: Base64 provided` → QR kod geldi mi?

### 3. `/api/checkout` Logları
**Ne arayalım:**
- `✅ Checkout session created` → Checkout oluşturuldu mu?
- `Session ID: cs_test_xxxxx` → Session ID var mı?

---

## 🚀 HIZLI ERİŞİM

### Direkt Link (Projeniz için):
1. **Functions:** `https://vercel.com/[your-username]/getprimesim-site/functions`
2. **Deployments:** `https://vercel.com/[your-username]/getprimesim-site/deployments`

### Alternatif: Deployments Üzerinden
1. Vercel Dashboard → Projeniz
2. **"Deployments"** sekmesine tıklayın
3. En son deployment'a tıklayın
4. **"Functions"** sekmesine tıklayın
5. Endpoint'e tıklayın → **"Logs"** sekmesine tıklayın

---

## 📸 EKRAN GÖRÜNTÜSÜ PAYLAŞIN

Eğer logları bulamıyorsanız:
1. Ekran görüntüsü alın
2. Paylaşın
3. Size tam olarak nerede olduğunu göstereyim

---

## ⚠️ LOGLAR GÖRÜNMÜYORSA

### Sorun 1: Functions Sekmesi Yok
- Proje sayfasında **"Functions"** sekmesi görünmüyor
- **Çözüm:** Deployments → En son deployment → Functions

### Sorun 2: Endpoint Görünmüyor
- Functions listesinde endpoint görünmüyor
- **Çözüm:** Endpoint henüz çağrılmamış olabilir, test siparişi yapın

### Sorun 3: Loglar Boş
- Endpoint var ama loglar boş
- **Çözüm:** Test siparişi yapın, sonra logları kontrol edin

---

## ✅ CHECKLIST

- [ ] Vercel Dashboard'a giriş yapıldı
- [ ] Proje seçildi: `getprimesim-site`
- [ ] Functions sekmesine gidildi
- [ ] `/api/webhooks/stripe` endpoint'i seçildi
- [ ] Logs sekmesine gidildi
- [ ] Loglar görüntülendi

---

**Logları buldunuz mu? Hangi endpoint'in loglarını görüyorsunuz? 🔍**












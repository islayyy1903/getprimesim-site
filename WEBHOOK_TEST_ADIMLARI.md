# Webhook Test Adımları

## ✅ WEBHOOK SECRET EKLENDİ VE REDEPLOY YAPILDI

Artık Stripe webhook çalışmalı! Test edelim:

---

## 🧪 TEST SİPARİŞİ YAPMA

### Adım 1: Website'ye Gidin
1. `https://getprimesim.com/esim` adresine gidin
2. Bir paket seçin (örn: USA eSIM – 1GB)
3. **"Buy Now"** butonuna tıklayın

### Adım 2: Test Kartı ile Ödeme
Stripe test kartı bilgileri:
- **Kart:** `4242 4242 4242 4242`
- **Tarih:** `12/25` (gelecek bir tarih)
- **CVC:** `123`
- **ZIP:** `12345`

### Adım 3: Ödemeyi Tamamlayın
- **"Pay"** butonuna tıklayın
- Success sayfasına yönlendirileceksiniz

---

## 🔍 LOGLARI KONTROL ETME

### 1. Vercel Dashboard'a Gidin
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Deployments** → En son deployment'a tıklayın
3. **Runtime Logs** sekmesine tıklayın

### 2. Logları Arayın
Ctrl+F ile şunları arayın:

**Stripe Webhook:**
- `=== STRIPE WEBHOOK CALLED ===` → Webhook tetiklendi mi?
- `✅ Payment successful` → Ödeme başarılı mı?
- `📦 Purchasing eSim from eSimGo...` → eSimGo API'ye istek gitti mi?
- `❌ eSimGo purchase failed` → Hata var mı?

**eSimGo Callback:**
- `=== ESIMGO V3 CALLBACK CALLED ===` → Callback geldi mi?
- `QR Code: Base64 provided` → QR kod geldi mi?

---

## ✅ BEKLENEN SONUÇLAR

### Senaryo 1: Her Şey Çalışıyor ✅
Loglarda şunları göreceksiniz:
```
=== STRIPE WEBHOOK CALLED ===
✅ Payment successful: cs_test_xxxxx
📦 Purchasing eSim from eSimGo...
Package: USA eSIM – 1GB
eSimGo Package ID: usa-1gb-7days
Email: customer@example.com
✅ eSim purchased successfully
Order ID: 12345
QR Code URL: https://...
```

**Sonuç:** Sistem çalışıyor! ✅

### Senaryo 2: eSimGo API Hatası ❌
Loglarda şunları göreceksiniz:
```
=== STRIPE WEBHOOK CALLED ===
✅ Payment successful: cs_test_xxxxx
📦 Purchasing eSim from eSimGo...
❌ eSimGo purchase failed: [hata mesajı]
```

**Sonuç:** eSimGo API'de sorun var. Hata mesajını kontrol edin.

### Senaryo 3: Webhook Hala Tetiklenmiyor ❌
Loglarda `/api/webhooks/stripe` ile ilgili hiçbir şey yok.

**Sonuç:** Webhook hala tetiklenmiyor. Stripe Dashboard'da kontrol edin.

---

## 🔍 STRIPE DASHBOARD KONTROLÜ

### Webhook Attempts Kontrolü
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Webhook endpoint'inize tıklayın
3. **"Attempts"** sekmesine tıklayın
4. Webhook isteği görünüyor mu?
5. Başarılı mı? (200 status)

**Eğer hata varsa:**
- Hata mesajını not edin
- Bana gönderin, düzeltelim

---

## 📋 CHECKLIST

- [x] Webhook secret Vercel'e eklendi ✅
- [x] Redeploy yapıldı ✅
- [ ] Test siparişi yapıldı
- [ ] Loglar kontrol edildi
- [ ] Stripe webhook tetiklendi mi?
- [ ] eSimGo API'ye istek gitti mi?
- [ ] QR kod geldi mi?

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Email Sistemi Henüz Yok:**
   - QR kod şu an sadece loglarda görünecek
   - Email sistemi eklenene kadar manuel göndermeniz gerekebilir

2. **Paket ID'leri:**
   - Eğer eSimGo API hatası varsa, paket ID'leri yanlış olabilir
   - eSimGo'dan gerçek paket ID'lerini alıp güncellemeniz gerekebilir

3. **Webhook Secret:**
   - Eğer webhook hala tetiklenmiyorsa, secret'ı kontrol edin
   - Redeploy yaptığınızdan emin olun

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Test siparişi yapın**
2. ✅ **Logları kontrol edin**
3. ✅ **Stripe Dashboard'da webhook attempts kontrol edin**
4. ✅ **Sonuçları bana bildirin**

---

**Test siparişi yaptınız mı? Loglarda ne görüyorsunuz? Stripe webhook tetiklendi mi? 🔍**










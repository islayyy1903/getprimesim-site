# eSimGo Webhook Kurulumu

## ✅ Webhook URL Hazır

**Webhook URL:** `https://getprimesim.com/api/esimgo/webhook`

Bu URL'i eSimGo'ya bildirmeniz gerekiyor.

---

## 🔧 eSimGo'da Webhook Ayarlama

### Adım 1: eSimGo Dashboard'a Giriş
1. eSimGo reseller dashboard'una giriş yapın
2. **Settings** veya **API Settings** bölümüne gidin
3. **Webhooks** sekmesine gidin

### Adım 2: Webhook URL Ekleme
1. **"Add Webhook"** veya **"Configure Webhook"** butonuna tıklayın
2. **Webhook URL:** `https://getprimesim.com/api/esimgo/webhook`
3. **Events to listen:** (eSimGo'da hangi event'ler varsa seçin)
   - Order completed
   - Order failed
   - QR code ready
   - vb.

### Adım 3: Webhook Secret (Varsa)
Eğer eSimGo webhook signature gönderiyorsa:
1. Webhook secret'i kopyalayın
2. Vercel Environment Variables'a ekleyin:
   - `ESIMGO_WEBHOOK_SECRET` = webhook secret

---

## 📋 WEBHOOK İŞ AKIŞI

### Senaryo 1: eSimGo Webhook Gönderiyorsa
```
1. Müşteri ödeme yapar (Stripe)
2. Stripe webhook → eSimGo API'ye eSim satın alma isteği
3. eSimGo eSim satın alır
4. eSimGo webhook gönderir → /api/esimgo/webhook
5. QR code alınır
6. Email gönderilir
```

### Senaryo 2: eSimGo Webhook Göndermiyorsa
```
1. Müşteri ödeme yapar (Stripe)
2. Stripe webhook → eSimGo API'ye eSim satın alma isteği
3. eSimGo API response'unda QR code döner
4. QR code direkt email ile gönderilir
```

---

## 🔍 WEBHOOK TEST ETME

### 1. Webhook Endpoint Kontrolü
Tarayıcıda test edin:
```
https://getprimesim.com/api/esimgo/webhook
```

GET isteği gönderilirse, `{"message": "eSimGo webhook endpoint is active"}` dönmeli.

### 2. eSimGo'dan Test Webhook
eSimGo dashboard'unda **"Test Webhook"** butonu varsa:
1. Test webhook gönderin
2. Vercel Function Logs'da kontrol edin
3. Webhook geldi mi kontrol edin

---

## 📊 WEBHOOK LOGLARI

Webhook'ları kontrol etmek için:

1. **Vercel Dashboard** → Projeniz → **Functions**
2. `/api/esimgo/webhook` fonksiyonunu seçin
3. **Logs** sekmesine gidin
4. Webhook isteklerini görün

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Webhook URL:** `https://getprimesim.com/api/esimgo/webhook` (production)
2. **Webhook Secret:** eSimGo varsa, Vercel'e ekleyin
3. **HTTPS:** Webhook URL mutlaka HTTPS olmalı (zaten ✅)
4. **Timeout:** Webhook response'u hızlı olmalı (< 10 saniye)

---

## ✅ CHECKLIST

- [x] Webhook endpoint oluşturuldu: `/api/esimgo/webhook`
- [ ] eSimGo'da webhook URL eklendi: `https://getprimesim.com/api/esimgo/webhook`
- [ ] Webhook events seçildi (eSimGo'da)
- [ ] Webhook secret eklendi (varsa, Vercel'e)
- [ ] Test webhook gönderildi
- [ ] Webhook logları kontrol edildi

---

**Webhook URL'i eSimGo'ya bildirdiniz mi? eSimGo'da webhook ayarlarını yaptınız mı? 🚀**





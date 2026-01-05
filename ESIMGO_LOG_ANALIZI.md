# eSimGo Log Analizi

## ✅ AKTİF ENDPOINT'LER

Vercel Functions'da görünen endpoint'ler:

1. **`/api/checkout`** - 4 çağrı, 830ms
   - Stripe Checkout Session oluşturma
   - Müşteri ödeme sayfasına yönlendiriliyor

2. **`/api/esimgo/webhook`** - 3 çağrı, 220ms
   - eSimGo callback'leri geliyor ✅
   - QR code bildirimleri alınıyor

---

## 🔍 LOG KONTROLÜ

### 1. `/api/checkout` Logları
**Ne yapıyor:**
- Stripe Checkout Session oluşturuyor
- Paket bilgilerini metadata'ya ekliyor
- Müşteriyi Stripe ödeme sayfasına yönlendiriyor

**Kontrol edin:**
- Checkout session başarıyla oluşturuldu mu?
- Metadata doğru mu? (packageName, packageId)
- Discount uygulandı mı? (ilk alışveriş için %15)

### 2. `/api/esimgo/webhook` Logları
**Ne yapıyor:**
- eSimGo'dan callback'leri alıyor
- QR code bildirimlerini işliyor
- Sipariş durumlarını logluyor

**Kontrol edin:**
- Callback body'si ne?
- QR code geldi mi?
- Order ID var mı?
- Event type ne? (order.completed, order.failed, vb.)

---

## ⚠️ EKSİK ENDPOINT

**`/api/webhooks/stripe`** görünmüyor!

Bu endpoint şunları yapıyor:
- Stripe ödeme başarılı olduğunda tetiklenir
- eSimGo API'ye eSim satın alma isteği gönderir
- QR code'u alır

**Neden görünmüyor olabilir:**
1. Stripe webhook henüz tetiklenmedi
2. Stripe webhook URL'i yanlış yapılandırılmış
3. Stripe webhook secret eksik

---

## 🔧 STRIPE WEBHOOK KONTROLÜ

### 1. Stripe Dashboard Kontrolü
1. [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. Webhook endpoint'lerini kontrol edin
3. Şu URL olmalı: `https://getprimesim.com/api/webhooks/stripe`
4. Event: `checkout.session.completed` seçili olmalı

### 2. Webhook Secret Kontrolü
1. Stripe Dashboard → Webhooks → Endpoint → **Signing secret**
2. Secret'i kopyalayın
3. Vercel → Environment Variables → `STRIPE_WEBHOOK_SECRET` ekleyin

---

## 📊 LOG DETAYLARI

### `/api/checkout` Log Örneği:
```
✅ Checkout session created
Session ID: cs_test_xxxxx
Package: USA eSIM – 1GB
Price: $6.99
Discount: 15% (first purchase)
```

### `/api/esimgo/webhook` Log Örneği:
```
=== ESIMGO V3 CALLBACK CALLED ===
📦 eSimGo v3 Callback Details:
  - Version: v3
  - Event type: order.completed
  - Order ID: 12345
  - Status: completed
  - Email: customer@example.com
  - QR Code: Base64 provided
```

---

## 🚀 SONRAKI ADIMLAR

### 1. Logları Detaylı İnceleyin
1. Vercel Dashboard → Functions → `/api/esimgo/webhook` → **Logs**
2. Callback body'sini kontrol edin
3. QR code geldi mi kontrol edin
4. Hata var mı kontrol edin

### 2. Stripe Webhook Kontrolü
1. Stripe Dashboard → Webhooks
2. Webhook URL'i doğru mu kontrol edin
3. `STRIPE_WEBHOOK_SECRET` Vercel'de var mı kontrol edin

### 3. Test Siparişi
1. Yeni bir test siparişi oluşturun
2. Tüm logları takip edin:
   - `/api/checkout` → Checkout oluşturuldu
   - Stripe → Ödeme tamamlandı
   - `/api/webhooks/stripe` → eSimGo API'ye istek gitti
   - `/api/esimgo/webhook` → QR code geldi

---

## ❓ SORULAR

1. **`/api/esimgo/webhook` loglarında ne görüyorsunuz?**
   - Callback body'si ne?
   - QR code var mı?
   - Hata var mı?

2. **Stripe webhook çalışıyor mu?**
   - Stripe Dashboard'da webhook event'leri görünüyor mu?
   - `/api/webhooks/stripe` endpoint'i tetikleniyor mu?

3. **Test siparişi başarılı oldu mu?**
   - Ödeme tamamlandı mı?
   - eSimGo API'ye istek gitti mi?
   - QR code geldi mi?

---

**Logları paylaşabilir misiniz? Özellikle `/api/esimgo/webhook` loglarını görmek istiyorum! 🔍**





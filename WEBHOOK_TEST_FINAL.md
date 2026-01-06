# Webhook Final Test

## ✅ DURUM

- ✅ Webhook endpoint URL doğru: `https://getprimesim.com/api/webhooks/stripe`
- ✅ `STRIPE_WEBHOOK_SECRET` Vercel'de var
- ✅ Event seçildi: `checkout.session.completed`

**Şimdi test edelim!**

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

### 1. Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Deployments** → En son deployment'a tıklayın
3. **Runtime Logs** sekmesine tıklayın

### 2. Logları Arayın
Ctrl+F ile şunları arayın:

**Stripe Webhook:**
- `=== STRIPE WEBHOOK CALLED ===` → Webhook tetiklendi mi?
- `✅ Payment successful` → Ödeme başarılı mı?
- `📦 Purchasing eSim from eSimGo...` → eSimGo API'ye istek gitti mi?

**eSimGo Callback:**
- `=== ESIMGO V3 CALLBACK CALLED ===` → Callback geldi mi?
- `QR Code: Base64 provided` → QR kod geldi mi?

---

## 🔍 STRIPE DASHBOARD KONTROLÜ

### Webhook Attempts Kontrolü
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Webhook endpoint'inize tıklayın
3. **"Event deliveries"** sekmesine tıklayın
4. Webhook isteği görünüyor mu?
5. Başarılı mı? (200 status)

**Eğer webhook attempts görünüyorsa:**
- ✅ Webhook tetiklendi!
- Logları kontrol edin

**Eğer webhook attempts boşsa:**
- ⚠️ Webhook henüz tetiklenmedi
- Test siparişi yaptıktan sonra tekrar kontrol edin

---

## ✅ BEKLENEN SONUÇLAR

### Senaryo 1: Her Şey Çalışıyor ✅
**Vercel Logları:**
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

**Stripe Dashboard:**
- Event deliveries'de webhook isteği görünüyor
- Status: 200 (Success)

**Sonuç:** Sistem çalışıyor! ✅

### Senaryo 2: eSimGo API Hatası ❌
**Vercel Logları:**
```
=== STRIPE WEBHOOK CALLED ===
✅ Payment successful: cs_test_xxxxx
📦 Purchasing eSim from eSimGo...
❌ eSimGo purchase failed: [hata mesajı]
```

**Sonuç:** eSimGo API'de sorun var. Hata mesajını kontrol edin.

### Senaryo 3: Webhook Hala Tetiklenmiyor ❌
**Vercel Logları:**
- `/api/webhooks/stripe` ile ilgili hiçbir şey yok

**Stripe Dashboard:**
- Event deliveries boş

**Sonuç:** Webhook hala tetiklenmiyor. Redeploy yapıldı mı kontrol edin.

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Redeploy:**
   - `STRIPE_WEBHOOK_SECRET` eklendikten sonra redeploy yaptınız mı?
   - Eğer yapmadıysanız, yapın:
     - Vercel Dashboard → Deployments → En son deployment → "..." → Redeploy

2. **Webhook Tetiklenmesi:**
   - Webhook, ödeme tamamlandıktan sonra Stripe tarafından otomatik gönderilir
   - Bazen birkaç saniye gecikebilir

3. **Email Sistemi:**
   - Email sistemi henüz yok
   - QR kod şu an sadece loglarda görünecek

---

## 📋 CHECKLIST

- [x] Webhook endpoint URL doğru ✅
- [x] `STRIPE_WEBHOOK_SECRET` Vercel'de var ✅
- [x] Event seçildi: `checkout.session.completed` ✅
- [ ] Redeploy yapıldı mı? ❓
- [ ] Test siparişi yapıldı mı? ❓
- [ ] Loglar kontrol edildi mi? ❓
- [ ] Stripe Dashboard'da webhook attempts görünüyor mu? ❓

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Redeploy yapın** (eğer yapmadıysanız)
2. ✅ **Test siparişi yapın**
3. ✅ **Vercel loglarını kontrol edin**
4. ✅ **Stripe Dashboard'da webhook attempts kontrol edin**
5. ✅ **Sonuçları bana bildirin**

---

**Redeploy yaptınız mı? Test siparişi yaptınız mı? Loglarda ne görüyorsunuz? 🔍**














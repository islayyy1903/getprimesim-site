# Detaylı Log Kontrolü

## ✅ WEBHOOK ÇALIŞIYOR!

**Loglardan görülenler:**
- ✅ Stripe webhook tetiklendi
- ✅ eSimGo API çağrıldı (`api.esimgo.io/v3/orders`)
- ✅ Email gönderildi (`api.resend.com/emails`)

**Sorun:** QR code email'de yok ❌

---

## 🔍 DETAYLI RUNTIME LOGLARINI BULMA

### Adım 1: Request ID'yi Bulun

**Request ID:** `dktfb-1767120405813-3682579fc...`

Bu ID'yi kullanarak detaylı logları bulabilirsiniz.

### Adım 2: Vercel Runtime Logs'a Gidin

1. **Vercel Dashboard** → **Deployments** → En son deployment
2. **Runtime Logs** sekmesine tıklayın
3. **Filter** veya **Search** kutusuna şunları yazın:
   - `dktfb-1767120405813` (Request ID'nin başlangıcı)
   - Veya `📥 eSimGo API Response:`
   - Veya `📧 Attempting to send email`

### Adım 3: Arayacağınız Loglar

**eSimGo API Response:**
```
📥 eSimGo API Response:
  - Full response: {...}
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
  - QR Code URL: ... / Not provided
```

**Email Gönderimi:**
```
📧 Attempting to send email to: ...
📦 QR Code: Base64 provided / Not provided
📤 Sending email via Resend API...
✅ Email sent successfully!
```

---

## 🎯 ÖNEMLİ SORULAR

### 1. eSimGo API Response'unda QR Code Var mı?

**Loglarda arayın:**
- `📥 eSimGo API Response:`
- `Full response:` → Burada QR code var mı?
- `QR Code: Base64 provided` → Varsa bu yazacak
- `QR Code: Not provided` → Yoksa bu yazacak

**Eğer "Not provided" ise:**
- eSimGo v3'te QR code callback ile gelir
- Callback bekleniyor olabilir
- eSimGo Dashboard'dan order'ı kontrol edin

### 2. Email'de QR Code Gönderildi mi?

**Loglarda arayın:**
- `📧 Attempting to send email to: ...`
- `📦 QR Code: Base64 provided / Not provided`
- `📤 Sending email via Resend API...`

**Eğer QR code "Not provided" ise:**
- Email gönderildi ama QR code olmadan
- Email'de "QR Code is being processed" mesajı var

### 3. eSimGo Callback Geldi mi?

**Loglarda arayın:**
- `=== ESIMGO V3 CALLBACK CALLED ===`
- `Full callback body: ...`
- `QR Code: Base64 provided / Not provided`

**Eğer callback gelmediyse:**
- eSimGo Dashboard'dan callback URL'i kontrol edin
- Callback ayarlarını kontrol edin

---

## 📋 YAPILMASI GEREKENLER

### 1. Runtime Logları Kontrol Edin

1. Vercel Dashboard → Deployments → En son deployment
2. **Runtime Logs** sekmesine tıklayın
3. Request ID'yi veya `📥 eSimGo API Response:` arayın
4. Şu logları bulun:
   - `📥 eSimGo API Response:`
   - `Full response: ...`
   - `QR Code: ...`
   - `📧 Attempting to send email...`

### 2. eSimGo Dashboard Kontrolü

1. eSimGo Dashboard → **Orders**
2. Son siparişi bulun (Order ID ile)
3. Kontrol edin:
   - **QR Code:** Var mı?
   - **Status:** Ne durumda?
   - **Callback:** Gönderildi mi?

### 3. Logları Paylaşın

**Özellikle şunları paylaşın:**
- `📥 eSimGo API Response:` logları
- `Full response: ...` içeriği
- `QR Code: ...` durumu
- `=== ESIMGO V3 CALLBACK CALLED ===` var mı?

---

## 🔧 OLASI ÇÖZÜMLER

### Senaryo 1: eSimGo Response'unda QR Code Yok
**Çözüm:** eSimGo v3'te QR code callback ile gelir. Callback bekleniyor.

### Senaryo 2: Callback Gelmedi
**Çözüm:** 
- eSimGo Dashboard'dan callback URL'i kontrol edin
- Callback ayarlarını aktif edin
- Manuel callback tetikleyin (eğer mümkünse)

### Senaryo 3: QR Code Farklı Field'da
**Çözüm:** Logları paylaşın, field ismini bulalım ve kodu güncelleyelim.

---

**Runtime loglarını kontrol edip `📥 eSimGo API Response:` loglarını paylaşın! 🔍**















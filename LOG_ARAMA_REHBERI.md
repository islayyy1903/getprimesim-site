# Log Arama Rehberi

## 🔍 DETAYLI LOGLARI BULMA

### Adım 1: Request ID ile Arama

**Request ID:** `dktfb-1767120405813-3682579fc...`

1. Vercel Dashboard → **Logs** sekmesi
2. Arama kutusuna Request ID'yi yazın: `dktfb-1767120405813`
3. Veya tam Request ID: `dktfb-1767120405813-3682579fc`

### Adım 2: Farklı Arama Terimleri

**eSimGo API:**
- `📦 Purchasing eSim from eSimGo`
- `📥 eSimGo API Response`
- `eSimGo API error`
- `eSim purchased successfully`

**Email:**
- `📧 Attempting to send email`
- `✅ QR code email sent`
- `❌ Failed to send QR code email`
- `Notification email sent`

**Webhook:**
- `=== STRIPE WEBHOOK CALLED ===`
- `✅ Payment successful`
- `checkout.session.completed`

### Adım 3: Function Logs vs Runtime Logs

**Function Logs:**
- Vercel Dashboard → **Logs** → **Function** checkbox'ını işaretleyin
- Console.log çıktıları burada görünür

**Runtime Logs:**
- Vercel Dashboard → **Deployments** → En son deployment → **Runtime Logs**
- Daha detaylı loglar burada olabilir

---

## 🎯 ÖNEMLİ LOGLAR

### 1. eSimGo API Response

**Arayın:**
```
📥 eSimGo API Response:
  - Full response: {...}
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
```

**Eğer bulamazsanız:**
- `eSimGo` yazın
- `API Response` yazın
- `Full response` yazın

### 2. eSimGo Purchase Result

**Arayın:**
```
✅ eSim purchased successfully
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
```

**Veya:**
```
❌ eSimGo purchase failed:
  - Error: ...
  - Is Stock Error: true/false
```

### 3. Email Gönderimi

**Arayın:**
```
📧 Attempting to send email to: ...
📦 QR Code: Base64 provided / Not provided
✅ Email sent successfully!
```

---

## 🚨 "Notification email sent" Mesajı

**Bu mesaj şu durumlarda görünür:**

1. **eSimGo purchase başarısız oldu:**
   - `❌ eSimGo purchase failed`
   - `✅ Notification email sent to customer about eSimGo issue`
   - Email'de hata mesajı var, QR code yok

2. **eSimGo purchase başarılı ama QR code yok:**
   - `✅ eSim purchased successfully`
   - `QR Code: Not provided`
   - Email gönderildi ama QR code olmadan

---

## 📋 YAPILMASI GEREKENLER

### 1. Request ID ile Arama

1. Vercel Dashboard → **Logs**
2. Arama kutusuna: `dktfb-1767120405813`
3. **Function** checkbox'ını işaretleyin
4. Tüm logları görmek için scroll edin

### 2. eSimGo Loglarını Arayın

**Arama terimleri:**
- `eSimGo`
- `Purchasing eSim`
- `API Response`
- `purchase failed`
- `purchased successfully`

### 3. Email Loglarını Arayın

**Arama terimleri:**
- `Attempting to send email`
- `QR code email`
- `Notification email`

---

## 🔧 ALTERNATIF YÖNTEM

### Vercel CLI ile Logları Görüntüleme

Eğer web arayüzünde bulamazsanız:

```bash
vercel logs getprimesim-site --follow
```

Veya belirli bir zaman aralığı için:

```bash
vercel logs getprimesim-site --since 10m
```

---

**Request ID ile arama yapın ve tüm logları paylaşın! Özellikle:**
- `📦 Purchasing eSim from eSimGo`
- `📥 eSimGo API Response`
- `❌ eSimGo purchase failed` veya `✅ eSim purchased successfully`
- `📧 Attempting to send email`















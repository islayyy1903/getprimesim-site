# Log Devamını Bulma

## ✅ GÖRÜLEN LOGLAR

**Şu ana kadar görülenler:**
- ✅ Stripe webhook tetiklendi
- ✅ Signature verification başarılı
- ✅ Payment successful: `checkout.session.completed`

**Eksik olanlar:**
- ❌ eSimGo API çağrısı logları
- ❌ Email gönderimi logları

---

## 🔍 LOGLARIN DEVAMINI BULMA

### Adım 1: Aynı Request ID'de Devamını Bulun

**Request ID:** `dktfb-1767120405813-3682579fc...`

1. **Aynı log sayfasında scroll edin** (aşağı kaydırın)
2. Aynı Request ID'ye ait diğer logları arayın
3. Şu logları bulun:
   - `📦 Purchasing eSim from eSimGo...`
   - `📤 Sending request to eSimGo API...`
   - `📥 eSimGo API Response:`
   - `📧 Attempting to send email...`

### Adım 2: Farklı Arama Terimleri

**Vercel Dashboard → Logs** sekmesinde şunları arayın:

**eSimGo:**
- `Purchasing eSim`
- `eSimGo API`
- `Sending request to eSimGo`
- `eSim purchased`
- `eSimGo purchase failed`

**Email:**
- `Attempting to send email`
- `QR code email`
- `Notification email`
- `Email sent successfully`

### Adım 3: Zaman Aralığı

**Aynı zaman aralığında (10:46:45 civarı) tüm logları kontrol edin:**
- `DEC 30 10:46:45` ile başlayan tüm loglar
- `DEC 30 10:46:46` ile başlayan tüm loglar
- `DEC 30 10:46:47` ile başlayan tüm loglar

---

## 🎯 ARANACAK LOGLAR

### 1. eSimGo API Çağrısı

**Beklenen loglar:**
```
📦 Purchasing eSim from eSimGo...
Package: USA eSIM – 1GB
eSimGo Package ID: usa-1gb-7days
Email: ...
```

```
📤 Sending request to eSimGo API...
  - API URL: https://api.esimgo.io/v3
  - Package ID: usa-1gb-7days
  - Email: ...
```

### 2. eSimGo API Response

**Beklenen loglar:**
```
📥 eSimGo API Response:
  - Full response: {...}
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
  - QR Code URL: ... / Not provided
```

**VEYA hata durumunda:**
```
❌ eSimGo purchase failed:
  - Error: ...
  - Is Stock Error: true/false
  - Package: ...
  - eSimGo Package ID: ...
```

### 3. Email Gönderimi

**Beklenen loglar:**
```
📧 Attempting to send email to: ...
📦 Package: ...
📷 QR Code: Base64 provided / Not provided
📤 Sending email via Resend API...
✅ Email sent successfully!
```

**VEYA hata durumunda:**
```
❌ Failed to send QR code email: ...
```

---

## 🔧 ALTERNATIF YÖNTEMLER

### Yöntem 1: Function Logs Filtresi

1. Vercel Dashboard → **Logs**
2. **Function** checkbox'ını işaretleyin
3. Arama kutusuna: `eSimGo` yazın
4. Tüm eSimGo ile ilgili logları görün

### Yöntem 2: Time Range Filtresi

1. Vercel Dashboard → **Logs**
2. Zaman filtresini `10:46:00` - `10:47:00` arasına ayarlayın
3. Tüm logları görmek için scroll edin

### Yöntem 3: Request ID ile Arama

1. Vercel Dashboard → **Logs**
2. Arama kutusuna: `dktfb-1767120405813` yazın
3. Tüm bu request'e ait logları görün

---

## 🚨 ÖNEMLİ NOT

**Eğer eSimGo API logları hiç görünmüyorsa:**

1. **eSimGo API çağrısı yapılmamış olabilir**
   - Webhook handler'da bir hata olmuş olabilir
   - eSimGo API çağrısından önce bir exception fırlatılmış olabilir

2. **Loglar farklı bir request'te olabilir**
   - Belki eSimGo API çağrısı ayrı bir request olarak görünüyor
   - Tüm logları kontrol edin

3. **Loglar henüz yazılmamış olabilir**
   - eSimGo API çağrısı çok uzun sürüyor olabilir
   - Biraz bekleyip tekrar kontrol edin

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **Aynı log sayfasında scroll edin** (aşağı kaydırın)
2. ✅ **Arama kutusuna `eSimGo` yazın**
3. ✅ **Arama kutusuna `Purchasing eSim` yazın**
4. ✅ **Arama kutusuna `Attempting to send email` yazın**
5. ✅ **Zaman aralığını genişletin** (10:46:00 - 10:47:00)

---

**Logların devamını bulun ve paylaşın! Özellikle:**
- `📦 Purchasing eSim from eSimGo...`
- `📥 eSimGo API Response:`
- `❌ eSimGo purchase failed` veya `✅ eSim purchased successfully`
- `📧 Attempting to send email...`












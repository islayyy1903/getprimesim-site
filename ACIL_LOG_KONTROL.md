# Acil Log Kontrolü

## 🚨 SORUN: Email Geliyor Ama QR Code Yok

**Şimdi yapılması gerekenler:**

---

## 1. VERCEL LOGLARINI KONTROL EDİN

**Vercel Dashboard → Logs** sekmesinde şunları arayın:

### A. eSimGo API Response
```
📥 eSimGo API Response:
  - Full response: {...}
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
```

**ÖNEMLİ:** `Full response:` içeriğini paylaşın! Tüm field'ları görmemiz lazım.

### B. Order Status Kontrolü
```
⚠️ QR code not in initial response, checking order status...
📥 Checking order status for QR code...
❌ eSimGo order status error: ...  ← BURAYA BAKIN!
```

**Eğer hata varsa:**
- Status code ne? (404, 400, 401?)
- Error message ne?

### C. eSimGo Callback
```
=== ESIMGO V3 CALLBACK CALLED ===
📦 eSimGo v3 Callback Details:
  - Full callback body: {...}
  - QR Code: Base64 provided / Not provided
```

**ÖNEMLİ:** Callback geldi mi? `Full callback body:` içeriğini paylaşın!

### D. Email Gönderimi
```
✅ QR code email sent successfully
  - QR Code included: true/false  ← BURAYA BAKIN!
```

---

## 2. PAYLAŞILMASI GEREKEN LOGLAR

**Lütfen şu logları paylaşın:**

1. **`📥 eSimGo API Response:`** → `Full response:` içeriği
2. **`❌ eSimGo order status error:`** → Varsa hata mesajı
3. **`=== ESIMGO V3 CALLBACK CALLED ===`** → Callback geldi mi?
4. **`📦 eSimGo v3 Callback Details:`** → `Full callback body:` içeriği
5. **`✅ QR code email sent successfully`** → `QR Code included:` true/false?

---

## 3. OLASI SORUNLAR

### Sorun 1: eSimGo API Response'unda QR Code Farklı Field'da
**Çözüm:** `Full response:` içeriğini paylaşın, field ismini bulalım.

### Sorun 2: Order Status Endpoint Yanlış
**Çözüm:** Hata mesajını paylaşın, endpoint formatını düzeltelim.

### Sorun 3: Callback Gelmiyor
**Çözüm:** eSimGo Dashboard'dan callback durumunu kontrol edin.

---

**LOG PAYLAŞIN, HEMEN ÇÖZELİM! 🔍**










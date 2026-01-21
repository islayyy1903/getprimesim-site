# eSimGo Callback Kaydetme

## ✅ CALLBACK AYARLARI DOĞRU

**Görünen ayarlar:**
- ✅ Callback URL: `https://getprimesim.com/api/esimgo/webhook`
- ✅ Callback Version: `v3`

---

## 🚀 ADIMLAR

### 1. "Save Changes" Butonuna Tıklayın
- eSimGo Dashboard'da **"Save Changes"** butonuna tıklayın
- Callback URL kaydedilecek

### 2. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Ödeme yapın

### 3. Logları Kontrol Edin

**Vercel Dashboard → Logs** sekmesinde arayın:

**eSimGo API:**
```
📥 eSimGo API Response:
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
```

**eSimGo Callback:**
```
=== ESIMGO V3 CALLBACK CALLED ===
📦 eSimGo v3 Callback Details:
  - QR Code: Base64 provided / Not provided
```

**Order Status Kontrolü:**
```
⚠️ QR code not in initial response, checking order status...
📥 Checking order status for QR code...
✅ QR code found in order status!
```

**Email:**
```
✅ QR code email sent successfully
  - QR Code included: true
```

---

## 🔍 BEKLENEN SONUÇ

### Senaryo 1: QR Code İlk Response'da Gelir
- ✅ eSimGo API response'unda QR code var
- ✅ Direkt email gönderilir (QR code ile)

### Senaryo 2: QR Code Callback ile Gelir
- ✅ eSimGo callback gelir
- ✅ Callback'te QR code var
- ✅ Email gönderilir (QR code ile)

### Senaryo 3: QR Code Order Status ile Gelir
- ✅ İlk response'da QR code yok
- ✅ 3 saniye sonra order status kontrolü
- ✅ QR code bulunur
- ✅ Email gönderilir (QR code ile)

---

## ⚠️ SORUN GİDERME

### Sorun 1: Callback Gelmiyor
**Kontrol edin:**
- Callback URL doğru mu? (`https://getprimesim.com/api/esimgo/webhook`)
- "Save Changes" butonuna tıklandı mı?
- eSimGo Dashboard'da callback durumu nedir?

### Sorun 2: Order Status Endpoint Çalışmıyor
**Loglarda görülecek:**
```
❌ eSimGo order status error:
  - Status: 404
```

**Çözüm:**
- eSimGo API dokümantasyonunu kontrol edin
- Endpoint formatını doğrulayın

---

**"Save Changes" butonuna tıklayın ve test edin! 🚀**
















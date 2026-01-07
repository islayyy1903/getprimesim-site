# QR Code Debug Rehberi

## 🔍 DEBUG YÖNTEMLERİ

### 1. Console Logları (Vercel Runtime Logs)

**Vercel Dashboard → Logs → Runtime Logs** sekmesinde şunları göreceksin:

#### A. Email Gönderme Öncesi:
```
📧 Attempting to send email to: ...
📦 Package: ...
📷 QR Code: Base64 provided (XXXX characters)
📷 QR Code preview (first 100 chars): ...
📷 QR Code format check: Plain base64 / Has data URI prefix
```

#### B. QR Code Display Oluşturma:
```
🔍 [DEBUG] generateEmailHTML - QR Code Debug:
  - qrCode exists: true/false
  - qrCode type: string
  - qrCode length: XXXX
  - qrCode first 50 chars: ...
  - qrCode last 50 chars: ...
  - qrCode starts with 'data:image': true/false
  - qrCodeUrl exists: true/false
```

#### C. QR Code Display Format:
```
🔍 [DEBUG] QR Code Display:
  - Has data URI prefix: true/false
  - Final base64Code length: XXXX
  - Final base64Code first 100 chars: ...
```

---

### 2. Email'de Debug Bilgisi (Geçici)

Email'de QR code'un üstünde sarı bir kutu görünecek:
- **QR Code Length:** Kaç karakter?
- **Has Data URI:** Data URI prefix var mı?
- **Final Length:** Final base64 uzunluğu
- **First 50 chars:** İlk 50 karakter

**Not:** Bu debug bilgisi geçici, sorun çözüldükten sonra kaldırılmalı!

---

### 3. QR Code Image Debug

Email'deki QR code image'ine `onerror` handler eklendi:
- Image yüklenemezse browser console'da hata görünecek
- Image gizlenecek

---

## 📋 DEBUG ADIMLARI

### Adım 1: Test Siparişi Ver

1. https://getprimesim.com/esim
2. Paket seç → "Buy Now"
3. Ödeme yap

### Adım 2: Vercel Runtime Loglarını Kontrol Et

**Vercel Dashboard → Logs → Runtime Logs:**

1. `🔍 [DEBUG] generateEmailHTML` loglarını bul
2. Şunları kontrol et:
   - QR Code length: Normal mi? (1000-5000 karakter arası)
   - QR Code first 50 chars: Geçerli base64 mi?
   - Has data URI prefix: true/false?

### Adım 3: Email'i Kontrol Et

1. Email'i aç
2. Sarı debug kutusunu kontrol et:
   - QR Code Length: Kaç?
   - Final Length: Kaç?
   - First 50 chars: Ne?

### Adım 4: Browser Console Kontrol Et

1. Email'i browser'da aç (HTML view)
2. F12 → Console
3. QR code image yüklenemezse hata görünecek

---

## 🔍 NE ARAMALISIN?

### QR Code Format Kontrolü:

**Normal:**
```
QR Code first 50 chars: iVBORw0KGgoAAAANSUhEUgAA...
QR Code format check: Plain base64
Has data URI prefix: false
Final base64Code first 100 chars: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

**Yanlış (ZIP base64):**
```
QR Code first 50 chars: PK... (ZIP file signature)
QR Code length: Çok uzun (10000+ karakter)
```

**Boş/Geçersiz:**
```
QR Code length: 0 veya çok kısa (< 100 karakter)
QR Code first 50 chars: Boş veya geçersiz karakterler
```

---

## 🚨 YAYGIN SORUNLAR VE ÇÖZÜMLERİ

### Sorun 1: QR Code ZIP Base64

**Belirtiler:**
- QR Code length: 10000+ karakter
- QR Code first 50 chars: `PK...` (ZIP signature)

**Çözüm:**
- ZIP parsing çalışmıyor
- `getQRCodeFromAssignments()` fonksiyonunu kontrol et

### Sorun 2: QR Code Çok Kısa

**Belirtiler:**
- QR Code length: < 100 karakter

**Çözüm:**
- QR code extract edilemiyor
- ZIP içinde PNG dosyası bulunamıyor

### Sorun 3: QR Code Boş

**Belirtiler:**
- QR Code length: 0
- qrCode exists: false

**Çözüm:**
- `/esims/assignments` endpoint'i QR code döndürmüyor
- Callback bekleniyor olabilir

---

## 📝 DEBUG SONRASI

**Sorun çözüldükten sonra:**
1. Email'deki sarı debug kutusunu kaldır
2. `onerror` handler'ı kaldır (veya bırak, zararsız)
3. Console loglarını kaldırmaya gerek yok (production'da faydalı)

---

**Debug logları eklendi! Test siparişi ver ve Vercel loglarını kontrol et! 🔍**














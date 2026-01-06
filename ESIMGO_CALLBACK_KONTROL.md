# eSimGo Callback Kontrolü

## ✅ DURUM: Stok Düştü, Sipariş Başarılı

**Stok:** 5 → 4 (Sipariş başarılı ✅)

**Sorun:** QR code gelmedi ❌

---

## 🔍 YAPILAN İYİLEŞTİRMELER

### 1. **eSimGo Callback Handler Güncellendi**
- Tüm olası field isimlerini kontrol ediyor
- `qr_code`, `qrCode`, `qr_code_base64`, `qr` gibi tüm varyasyonlar
- `qr_code_url`, `qrCodeUrl`, `qr_url`, `qrUrl` gibi tüm URL field'ları
- Event type'ları daha esnek kontrol ediliyor

### 2. **Detaylı Logging**
- Callback body'si tam olarak loglanıyor
- Tüm field'lar ayrı ayrı loglanıyor
- QR code var mı yok mu net görülüyor

### 3. **Fallback Email Gönderimi**
- Eğer event type bilinmiyorsa ama QR code varsa email gönderiliyor
- Her durumda QR code kontrol ediliyor

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Vercel Logları - eSimGo Callback

**Arayın:**
- `=== ESIMGO V3 CALLBACK CALLED ===` → Callback geldi mi?
- `Full callback body:` → Callback'te ne var?
- `QR Code: Base64 provided` → QR code var mı?
- `QR Code URL: ...` → QR code URL var mı?

**Eğer callback gelmediyse:**
- eSimGo Dashboard'dan callback URL'i kontrol edin
- Callback URL doğru mu: `https://getprimesim.com/api/esimgo/webhook`
- eSimGo'da callback ayarları aktif mi?

### 2. eSimGo Dashboard Kontrolü

1. **eSimGo Dashboard** → **Orders** veya **Siparişler**
2. Son siparişi bulun (Order ID ile)
3. Kontrol edin:
   - **Order Status:** Ne durumda?
   - **QR Code:** Var mı? Nerede?
   - **Callback Status:** Callback gönderildi mi?

### 3. eSimGo API Response Kontrolü

**Vercel Logları'nda arayın:**
- `📥 eSimGo API Response:`
- `Full response:` → İlk response'da ne var?
- `Order ID:` → Order ID alındı mı?

**Eğer Order ID varsa:**
- eSimGo'da bu order ID ile QR code'u manuel kontrol edin
- Belki eSimGo'da order status endpoint'i var, QR code'u çekebiliriz

---

## 🚀 SONRAKI ADIMLAR

### Senaryo 1: Callback Gelmedi
**Çözüm:**
1. eSimGo Dashboard'dan callback URL'i kontrol edin
2. Callback URL doğru mu: `https://getprimesim.com/api/esimgo/webhook`
3. eSimGo'da callback ayarlarını aktif edin
4. Manuel olarak callback tetikleyin (eğer mümkünse)

### Senaryo 2: Callback Geldi Ama QR Code Yok
**Çözüm:**
1. Callback body'sini kontrol edin (loglarda `Full callback body:`)
2. eSimGo'da order'ı kontrol edin - QR code hazır mı?
3. Belki eSimGo'da order status endpoint'i var, QR code'u çekebiliriz

### Senaryo 3: QR Code Farklı Field'da
**Çözüm:**
1. Callback body'sindeki tüm field'ları kontrol edin
2. QR code farklı bir field'da olabilir
3. Logları paylaşın, field ismini bulalım

---

## 📋 TEST ADIMLARI

1. ✅ **Vercel Logları Kontrol**
   - `=== ESIMGO V3 CALLBACK CALLED ===` var mı?
   - Callback body'sinde ne var?

2. ✅ **eSimGo Dashboard Kontrol**
   - Order durumu nedir?
   - QR code var mı?
   - Callback gönderildi mi?

3. ✅ **Test Siparişi**
   - Yeni bir test siparişi yapın
   - Logları takip edin
   - Callback gelip gelmediğini kontrol edin

---

## 🔧 MANUEL QR CODE GÖNDERİMİ

Eğer callback gelmezse veya QR code gelmezse:

1. **eSimGo Dashboard'dan QR code'u alın**
2. **Manuel olarak email gönderin** veya
3. **Order ID ile QR code'u çekmek için endpoint ekleyebiliriz**

---

**Logları kontrol edip sonuçları paylaşın! Özellikle:**
- `=== ESIMGO V3 CALLBACK CALLED ===` geldi mi?
- Callback body'sinde ne var?
- QR code var mı?














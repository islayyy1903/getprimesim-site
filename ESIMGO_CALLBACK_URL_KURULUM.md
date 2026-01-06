# eSimGo Callback URL Kurulumu

## ✅ Callback URL Hazır

**Callback URL:** `https://getprimesim.com/api/esimgo/webhook`

Bu URL aktif ve çalışıyor. eSimGo'ya bu URL'i callback olarak eklemeniz gerekiyor.

---

## 🔧 eSimGo'da Callback URL Ayarlama

### Adım 1: eSimGo Dashboard'a Giriş
1. eSimGo reseller dashboard'una giriş yapın
2. **Settings** veya **API Settings** bölümüne gidin
3. **Callbacks** veya **Webhooks** sekmesine gidin

### Adım 2: Callback URL Ekleme
1. **"Add Callback URL"** veya **"Configure Callback"** butonuna tıklayın
2. **Callback URL:** `https://getprimesim.com/api/esimgo/webhook`
3. **Version:** `v3` (callback version v3)
4. **Events:** (eSimGo'da hangi event'ler varsa seçin)
   - Order completed
   - Order failed
   - QR code ready
   - vb.

### Adım 3: Callback URL Test Etme
1. eSimGo dashboard'unda **"Test Callback"** butonu varsa tıklayın
2. Veya test siparişi oluşturun
3. Callback'in geldiğini kontrol edin

---

## 📋 CALLBACK URL ÖZELLİKLERİ

### ✅ Aktif ve Çalışıyor
- URL: `https://getprimesim.com/api/esimgo/webhook`
- GET isteği: `{"message":"eSimGo webhook endpoint is active"}`
- POST isteği: v3 callback'leri dinler

### ✅ v3 Desteği
- Callback version: v3
- Event types destekleniyor
- QR code handling hazır

### ✅ Güvenlik
- HTTPS zorunlu ✅
- Signature verification (varsa) destekleniyor

---

## 🔍 CALLBACK İŞ AKIŞI

### Senaryo 1: eSimGo Callback Gönderiyorsa
```
1. Müşteri ödeme yapar (Stripe)
2. Stripe webhook → eSimGo API'ye eSim satın alma isteği
3. eSimGo eSim satın alır
4. eSimGo callback gönderir → https://getprimesim.com/api/esimgo/webhook
5. QR code alınır
6. Email gönderilir (yakında)
```

### Senaryo 2: eSimGo Callback Göndermiyorsa
```
1. Müşteri ödeme yapar (Stripe)
2. Stripe webhook → eSimGo API'ye eSim satın alma isteği
3. eSimGo API response'unda QR code döner
4. QR code direkt email ile gönderilir
```

---

## 🧪 CALLBACK TEST ETME

### 1. Callback Endpoint Kontrolü
Tarayıcıda test edin:
```
https://getprimesim.com/api/esimgo/webhook
```

**Beklenen Response:**
```json
{"message":"eSimGo webhook endpoint is active"}
```

### 2. eSimGo'dan Test Callback
eSimGo dashboard'unda **"Test Callback"** butonu varsa:
1. Test callback gönderin
2. Vercel Function Logs'da kontrol edin
3. Callback geldi mi kontrol edin

### 3. Test Siparişi
1. eSimGo dashboard'unda test siparişi oluşturun
2. Callback URL: `https://getprimesim.com/api/esimgo/webhook`
3. Siparişi tamamlayın
4. Vercel Function Logs'da callback'i kontrol edin

---

## 📊 CALLBACK LOGLARI

Callback'leri kontrol etmek için:

1. **Vercel Dashboard** → Projeniz → **Functions**
2. `/api/esimgo/webhook` fonksiyonunu seçin
3. **Logs** sekmesine gidin
4. Callback isteklerini görün

**Log format:**
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

## ⚠️ ÖNEMLİ NOTLAR

1. **Callback URL:**
   - Production: `https://getprimesim.com/api/esimgo/webhook`
   - HTTPS zorunlu ✅
   - Aktif ve çalışıyor ✅

2. **Version:**
   - Callback version: v3
   - eSimGo'da v3 olarak ayarlayın

3. **Events:**
   - Order completed
   - Order failed
   - QR code ready
   - vb. (eSimGo'da hangi event'ler varsa seçin)

---

## ✅ CHECKLIST

- [x] Callback endpoint oluşturuldu: `/api/esimgo/webhook`
- [x] Callback URL hazır: `https://getprimesim.com/api/esimgo/webhook`
- [x] v3 callback desteği eklendi
- [x] Production'a deploy edildi
- [ ] eSimGo'da callback URL eklendi: `https://getprimesim.com/api/esimgo/webhook`
- [ ] Callback version v3 olarak ayarlandı
- [ ] Callback events seçildi (eSimGo'da)
- [ ] Test callback gönderildi
- [ ] Callback logları kontrol edildi

---

## 🚀 SONRAKI ADIMLAR

1. **eSimGo'da callback URL ekleyin**
   - Dashboard → Settings → Callbacks
   - URL: `https://getprimesim.com/api/esimgo/webhook`
   - Version: v3

2. **Test edin**
   - Test callback gönderin
   - Veya test siparişi oluşturun
   - Logları kontrol edin

3. **ESIMGO_API_URL ekleyin (Vercel'e)**
   - eSimGo API base URL'i alın
   - Vercel → Environment Variables → `ESIMGO_API_URL`

---

**Callback URL hazır! eSimGo'da bu URL'i eklediniz mi? 🚀**












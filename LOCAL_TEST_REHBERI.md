# Local Test Rehberi

## 🚀 Local Test Adımları

### 1. Development Server Başlatıldı ✅

Server çalışıyor: `http://localhost:3000`

---

## 🧪 TEST ADIMLARI

### Adım 1: Tarayıcıda Açın

```
http://localhost:3000
```

### Adım 2: eSim Sayfasına Gidin

```
http://localhost:3000/esim
```

### Adım 3: Test Siparişi Yapın

1. **Paket Seçin:**
   - Örn: "USA eSIM – 1GB"
   - "Buy Now" butonuna tıklayın

2. **Stripe Test Kartı:**
   - **Kart:** `4242 4242 4242 4242`
   - **Son Kullanma:** `12/25`
   - **CVC:** `123`
   - **ZIP:** `12345`

3. **Ödeme Yapın**

---

## 🔍 KONTROL EDİLECEKLER

### Terminal Logları

**Arayın:**

1. **Checkout API:**
```
=== CHECKOUT API CALLED ===
Secret key exists: true
Stripe session created: cs_test_...
```

2. **eSimGo API (Webhook'ta):**
```
🔍 eSimGo API Configuration:
  - API URL: https://api.esim-go.com/v2.4
  - API Key exists: true
📤 eSimGo API Request Body:
  {
    "type": "purchase",
    ...
  }
```

3. **eSimGo API Response:**
```
📥 eSimGo API Response:
  - Full response: {...}
  - Order ID: ...
  - QR Code: ...
```

---

## ⚠️ ÖNEMLİ NOTLAR

### Local'de Webhook Çalışmaz

**Neden:**
- Stripe localhost'a webhook gönderemez
- Webhook sadece production'da (`https://getprimesim.com`) çalışır

**Çözüm:**
- Local'de test için Stripe CLI kullanabilirsiniz
- Veya production'da test edin

### Environment Variables

**Local'de (.env.local):**
- `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
- `ESIMGO_API_URL=https://api.esim-go.com/v2.4` ✅ (güncellenmeli)

---

## 🐛 SORUN GİDERME

### Port 3000 Kullanımda
```bash
# Farklı port kullan
npm run dev -- -p 3001
```

### Environment Variables Yüklenmiyor
- `.env.local` dosyası proje root'unda mı?
- Server'ı yeniden başlatın (`Ctrl+C` sonra `npm run dev`)

### eSimGo API Hatası
- `ESIMGO_API_URL` = `https://api.esim-go.com/v2.4` mi?
- `X-API-Key` header'ı kullanılıyor mu?

---

**Local server çalışıyor! Test edin! 🚀**


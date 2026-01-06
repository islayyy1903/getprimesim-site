# Test Siparişi Adımları

## 🚀 TEST SİPARİŞİ YAPMA

### Adım 1: Website'ye Gidin
1. `https://getprimesim.com/esim` adresine gidin
2. Bir paket seçin (örn: USA eSIM – 1GB)

### Adım 2: "Buy Now" Butonuna Tıklayın
1. Paket kartında **"Buy Now"** butonuna tıklayın
2. Stripe Checkout sayfasına yönlendirileceksiniz

### Adım 3: Test Kartı ile Ödeme
Stripe test kartı bilgileri:
- **Kart Numarası:** `4242 4242 4242 4242`
- **Son Kullanma Tarihi:** Gelecek bir tarih (örn: `12/25`)
- **CVC:** Herhangi bir 3 rakam (örn: `123`)
- **ZIP/Postal Code:** Herhangi bir 5 rakam (örn: `12345`)

### Adım 4: Ödemeyi Tamamlayın
1. Test kartı bilgilerini girin
2. **"Pay"** veya **"Complete payment"** butonuna tıklayın
3. Başarılı ödeme sonrası success sayfasına yönlendirileceksiniz

---

## 🔍 LOG KONTROLÜ

### 1. Vercel Dashboard'a Gidin
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Functions** sekmesine tıklayın

### 2. `/api/checkout` Loglarını Kontrol Edin
1. `/api/checkout` fonksiyonunu seçin
2. **Logs** sekmesine gidin
3. Şu logları arayın:
   ```
   ✅ Checkout session created
   Session ID: cs_test_xxxxx
   Package: USA eSIM – 1GB
   ```

### 3. `/api/webhooks/stripe` Loglarını Kontrol Edin
1. `/api/webhooks/stripe` fonksiyonunu seçin
2. **Logs** sekmesine gidin
3. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   ⚠️ Webhook secret not set, skipping signature verification
   ✅ Payment successful: cs_test_xxxxx
   📦 Purchasing eSim from eSimGo...
   Package: USA eSIM – 1GB
   eSimGo Package ID: usa-1gb-7days
   Email: customer@example.com
   ```

### 4. `/api/esimgo/webhook` Loglarını Kontrol Edin
1. `/api/esimgo/webhook` fonksiyonunu seçin
2. **Logs** sekmesine gidin
3. Şu logları arayın:
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

## ✅ BEKLENEN SONUÇLAR

### Başarılı Senaryo:
1. ✅ Checkout session oluşturuldu
2. ✅ Ödeme tamamlandı
3. ✅ Stripe webhook tetiklendi
4. ✅ eSimGo API'ye istek gitti
5. ✅ eSimGo callback geldi
6. ✅ QR code alındı

### Hata Senaryosu:
Eğer hata görürseniz:
- Logları kopyalayın
- Hata mesajını not edin
- Bana gönderin, düzeltelim

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Webhook Secret:**
   - Şu an webhook secret yok (test için sorun değil)
   - Uyarı görünecek: "⚠️ Webhook secret not set"
   - Ama çalışacak!

2. **eSimGo API:**
   - eSimGo API'ye istek gidecek
   - Eğer paket ID'leri yanlışsa hata verebilir
   - Logları kontrol edin

3. **QR Code:**
   - eSimGo callback'ten QR code gelecek
   - Şu an email gönderme yok (yakında eklenecek)
   - QR code loglarda görünecek

---

## 🚀 HEMEN TEST EDİN

1. **Website'ye gidin:** `https://getprimesim.com/esim`
2. **Paket seçin:** Herhangi bir paket
3. **"Buy Now" tıklayın**
4. **Test kartı ile ödeme yapın:**
   - Kart: `4242 4242 4242 4242`
   - Tarih: `12/25`
   - CVC: `123`
   - ZIP: `12345`
5. **Logları kontrol edin:** Vercel Dashboard → Functions → Logs

---

**Test siparişi yaptınız mı? Loglarda ne görüyorsunuz? 🔍**














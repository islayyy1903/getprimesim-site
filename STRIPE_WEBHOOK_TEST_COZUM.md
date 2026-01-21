# Stripe Webhook Test Çözümü

## 🔍 DURUM

Stripe Dashboard'da "Add destination" içinde:
- ❌ "Webhook endpoint" yok
- ❌ "HTTP endpoint" yok
- ❌ "HTTP" yok

**Çözüm:** Webhook endpoint eklemeden önce test edelim!

---

## ✅ ÇÖZÜM: WEBHOOK OLMADAN TEST

Kod zaten webhook secret olmadan da çalışabiliyor (test için). Önce test edelim:

### 1. Test Siparişi Oluşturun
1. Website'den test siparişi: `https://getprimesim.com/esim`
2. Test kartı ile ödeme yapın:
   - Kart: `4242 4242 4242 4242`
   - Tarih: Gelecek bir tarih (örn: 12/25)
   - CVC: Herhangi bir 3 rakam (örn: 123)
   - ZIP: Herhangi bir 5 rakam (örn: 12345)

### 2. Logları Kontrol Edin
1. **Vercel Dashboard** → Projeniz → **Functions**
2. `/api/webhooks/stripe` fonksiyonunu seçin
3. **Logs** sekmesine gidin
4. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   ✅ Payment successful: cs_test_xxxxx
   📦 Purchasing eSim from eSimGo...
   ```

**Not:** Webhook secret olmadan da çalışır (test için), ama uyarı verir:
```
⚠️ Webhook secret not set, skipping signature verification
```

---

## 🔧 ALTERNATIF: STRIPE CLI İLE TEST

Webhook endpoint eklemeden önce Stripe CLI ile test edebilirsiniz:

### Windows için Stripe CLI Kurulumu:

1. **Stripe CLI İndir:**
   - https://github.com/stripe/stripe-cli/releases/latest
   - `stripe_X.X.X_windows_x86_64.zip` dosyasını indirin

2. **Kurulum:**
   - ZIP dosyasını açın
   - `stripe.exe` dosyasını bir klasöre koyun (örn: `C:\stripe\`)
   - PowerShell'de PATH'e ekleyin (opsiyonel)

3. **Login:**
   ```powershell
   stripe login
   ```
   - Tarayıcı açılacak, Stripe hesabınızla giriş yapın

4. **Webhook'u Dinle:**
   ```powershell
   stripe listen --forward-to https://getprimesim.com/api/webhooks/stripe
   ```
   - Webhook secret otomatik alınacak
   - Format: `whsec_xxxxxxxxxxxxx`

5. **Test Event Gönder:**
   ```powershell
   stripe trigger checkout.session.completed
   ```

---

## 📋 "ADD DESTINATION" İÇİNDE NE VAR?

Lütfen "Add destination" butonuna tıkladığınızda hangi seçenekler görünüyor, listeleyin:

Örnek:
- Amazon EventBridge
- Google Cloud Pub/Sub
- Azure Event Grid
- Custom destination
- Başka bir şey?

---

## 🚀 HIZLI TEST ADIMLARI

### Yöntem 1: Direkt Test Siparişi (En Hızlı)
1. `https://getprimesim.com/esim` → Paket seçin
2. "Buy Now" → Test kartı ile ödeme
3. Vercel Logs'da kontrol edin

### Yöntem 2: Stripe CLI (Daha Detaylı)
1. Stripe CLI kur
2. `stripe listen --forward-to https://getprimesim.com/api/webhooks/stripe`
3. Test event gönder

---

## ⚠️ ÖNEMLİ NOT

**Webhook secret olmadan test:**
- ✅ Çalışır (test için)
- ⚠️ Uyarı verir: "Webhook secret not set"
- ❌ Production'da mutlaka webhook secret kullanın!

**Webhook secret ekleme:**
- Stripe CLI ile alabilirsiniz
- Veya Stripe Dashboard'dan (eğer endpoint ekleyebilirseniz)

---

## 🔍 STRIPE DASHBOARD'DA FARKLI YERLER

Webhook endpoint eklemek için farklı yerleri deneyin:

1. **Developers → Webhooks → "+" butonu** (sağ üst)
2. **Settings → Webhooks** (eğer varsa)
3. **API → Webhooks** (eğer varsa)
4. **Integrations → Webhooks** (eğer varsa)

---

## 📞 STRIPE SUPPORT

Eğer hiçbir yöntem çalışmıyorsa:

1. **Stripe Support:**
   - Stripe Dashboard → Help → Contact Support
   - "How do I add a webhook endpoint in the new interface?" diye sorun

2. **Stripe Dokümantasyon:**
   - https://stripe.com/docs/webhooks/quickstart
   - Güncel adımları takip edin

---

## ✅ SONRAKI ADIM

**Şimdi yapın:**
1. Test siparişi oluşturun
2. Logları kontrol edin
3. Webhook çalışıyor mu görün

**"Add destination" içinde ne görüyorsunuz? Listeleyebilir misiniz? 🔍**
















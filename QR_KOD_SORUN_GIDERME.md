# QR Kod Sorun Giderme

## ❌ SORUN: QR Kod Gelmedi

Test siparişi yaptınız ama QR kod gelmedi. Logları kontrol edelim.

---

## 🔍 LOG KONTROLÜ

### 1. Vercel Dashboard'a Gidin
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Functions** sekmesine tıklayın

### 2. `/api/webhooks/stripe` Loglarını Kontrol Edin
1. `/api/webhooks/stripe` fonksiyonunu seçin
2. **Logs** sekmesine gidin
3. **En son logları** kontrol edin

**Ne arayalım:**
- ✅ `=== STRIPE WEBHOOK CALLED ===` görünüyor mu?
- ✅ `✅ Payment successful` görünüyor mu?
- ✅ `📦 Purchasing eSim from eSimGo...` görünüyor mu?
- ❌ Hata var mı? (error, failed, vb.)

### 3. `/api/esimgo/webhook` Loglarını Kontrol Edin
1. `/api/esimgo/webhook` fonksiyonunu seçin
2. **Logs** sekmesine gidin
3. **En son logları** kontrol edin

**Ne arayalım:**
- ✅ `=== ESIMGO V3 CALLBACK CALLED ===` görünüyor mu?
- ✅ QR code geldi mi?
- ❌ Hata var mı?

---

## ⚠️ OLASI SORUNLAR

### Sorun 1: Stripe Webhook Tetiklenmedi
**Belirtiler:**
- `/api/webhooks/stripe` loglarında hiçbir şey yok
- Sadece `/api/checkout` logları var

**Çözüm:**
- Stripe webhook endpoint eklenmemiş olabilir
- Webhook secret olmadan da çalışması gerekir (test için)
- Logları kontrol edin

### Sorun 2: eSimGo API'ye İstek Gitmedi
**Belirtiler:**
- `/api/webhooks/stripe` loglarında `📦 Purchasing eSim from eSimGo...` var
- Ama `❌ eSimGo purchase failed` veya hata var

**Çözüm:**
- eSimGo API URL doğru mu? (`https://api.esimgo.io/v3`)
- eSimGo API key doğru mu?
- Paket ID'leri doğru mu?

### Sorun 3: eSimGo Callback Gelmedi
**Belirtiler:**
- `/api/webhooks/stripe` loglarında `✅ eSim purchased successfully` var
- Ama `/api/esimgo/webhook` loglarında hiçbir şey yok

**Çözüm:**
- eSimGo'da callback URL ayarlandı mı?
- eSimGo callback gönderiyor mu?
- Callback URL doğru mu? (`https://getprimesim.com/api/esimgo/webhook`)

### Sorun 4: Paket ID'leri Yanlış
**Belirtiler:**
- eSimGo API'ye istek gitti
- Ama `❌ eSimGo purchase failed: Invalid package ID` gibi hata var

**Çözüm:**
- eSimGo'dan gerçek paket ID'lerini alın
- `app/lib/esimgo.ts` dosyasındaki `mapPackageToEsimGo` fonksiyonunu güncelleyin

---

## 📋 LOGLARI PAYLAŞIN

Lütfen şu logları paylaşın:

1. **`/api/webhooks/stripe` logları:**
   - En son 5-10 satır
   - Hata var mı?

2. **`/api/esimgo/webhook` logları:**
   - En son 5-10 satır
   - Callback geldi mi?

3. **`/api/checkout` logları:**
   - En son 5-10 satır
   - Checkout session oluşturuldu mu?

---

## 🔧 HIZLI DÜZELTME

### Eğer Stripe Webhook Tetiklenmediyse:

1. **Stripe Dashboard'da kontrol edin:**
   - Developers → Webhooks
   - Webhook endpoint var mı?
   - Event'ler görünüyor mu?

2. **Manuel test:**
   - Stripe CLI ile test edin (eğer kuruluysa)
   - Veya webhook endpoint ekleyin

### Eğer eSimGo API Hata Veriyorsa:

1. **Environment Variables kontrol edin:**
   - Vercel → Settings → Environment Variables
   - `ESIMGO_API_URL` = `https://api.esimgo.io/v3` var mı?
   - `ESIMGO_API_KEY` = `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT` var mı?

2. **Paket ID'leri kontrol edin:**
   - eSimGo'dan gerçek paket ID'lerini alın
   - `app/lib/esimgo.ts` dosyasını güncelleyin

---

## 🚀 SONRAKI ADIM

**Lütfen logları paylaşın:**
1. `/api/webhooks/stripe` logları
2. `/api/esimgo/webhook` logları
3. Hata mesajları varsa

Böylece tam olarak neyin yanlış gittiğini görebilirim ve düzeltebilirim! 🔍














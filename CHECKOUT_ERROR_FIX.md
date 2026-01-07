# Checkout Error Fix

## ❌ SORUN: "Invalid API Key" Hatası

Checkout sırasında "Invalid API Key" hatası görünüyor. Bu muhtemelen Stripe secret key ile ilgili.

---

## 🔧 YAPILAN DÜZELTMELER

### 1. Error Message İyileştirildi
- API key'ler error mesajlarında gizleniyor
- Daha açıklayıcı hata mesajları

### 2. Input Validation Eklendi
- Package name ve price kontrolü eklendi

### 3. Stripe API Key Error Handling
- Stripe authentication error'ları daha iyi handle ediliyor

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Vercel'de STRIPE_SECRET_KEY Doğru mu?

**Kontrol:**
1. Vercel Dashboard → Settings → Environment Variables
2. `STRIPE_SECRET_KEY` değerini kontrol edin
3. Değer `sk_live_` veya `sk_test_` ile başlamalı
4. Tırnak işareti veya boşluk var mı? → Silin

**Eğer yanlışsa:**
1. Stripe Dashboard → Developers → API keys
2. Secret key'i kopyalayın
3. Vercel'de güncelleyin
4. Redeploy yapın

### 2. Vercel'de NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY Doğru mu?

**Kontrol:**
1. Vercel Dashboard → Settings → Environment Variables
2. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` değerini kontrol edin
3. Değer `pk_live_` veya `pk_test_` ile başlamalı
4. Tırnak işareti veya boşluk var mı? → Silin

**Eğer yanlışsa:**
1. Stripe Dashboard → Developers → API keys
2. Publishable key'i kopyalayın
3. Vercel'de güncelleyin
4. Redeploy yapın

---

## 🧪 TEST ADIMLARI

### Adım 1: Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### Adım 2: Hata Kontrolü
- Hata hala görünüyor mu?
- Hata mesajı daha açıklayıcı mı?
- API key'ler gizleniyor mu?

### Adım 3: Vercel Loglarını Kontrol Edin
1. Vercel Dashboard → Deployments → Runtime Logs
2. Şu logları arayın:
   ```
   === CHECKOUT API CALLED ===
   Secret key exists: true
   Secret key starts with: sk_live_...
   Publishable key exists: true
   ```

---

## ✅ BAŞARILI TEST KRİTERLERİ

- [ ] Checkout başarılı (Stripe checkout sayfasına yönlendiriliyor)
- [ ] Hata mesajı görünmüyor
- [ ] Vercel loglarında "Stripe session created" görünüyor
- [ ] Ödeme tamamlanıyor

---

## ❌ OLASI SORUNLAR VE ÇÖZÜMLER

### Sorun 1: "Invalid API Key"
**Sebep:** Stripe secret key yanlış veya eksik.

**Çözüm:**
1. Stripe Dashboard → Developers → API keys
2. Secret key'i kopyalayın
3. Vercel'de `STRIPE_SECRET_KEY` güncelleyin
4. Redeploy yapın

### Sorun 2: "Stripe API keys are not configured"
**Sebep:** Environment variable'lar eksik.

**Çözüm:**
1. Vercel'de `STRIPE_SECRET_KEY` ve `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` var mı kontrol edin
2. Yoksa ekleyin
3. Redeploy yapın

---

**Deployment tamamlandı. Test edin! 🚀**















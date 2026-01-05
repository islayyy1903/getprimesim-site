# Webhook Secret Kontrolü

## ⚠️ SORUN: Webhook Signature Verification Failed

Loglarda "Webhook signature verification failed" hatası görünüyor.

**Secret:** `whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj`
**Secret Length:** 43 karakter ✅ (Doğru)

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Vercel'de Secret Doğru mu?

**Kontrol:**
1. Vercel Dashboard → Settings → Environment Variables
2. `STRIPE_WEBHOOK_SECRET` değerini kontrol edin
3. Değer: `whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj` olmalı
4. **ÖNEMLİ:** Başında veya sonunda boşluk var mı? Varsa silin!
5. **ÖNEMLİ:** Tırnak işareti var mı? Varsa silin!

**Doğru Format:**
```
whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj
```

**Yanlış Formatlar:**
```
"whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj"  ❌ (Tırnak işareti)
 whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj   ❌ (Başında boşluk)
whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj    ❌ (Sonunda boşluk)
```

### 2. Stripe Dashboard'dan Secret Tekrar Kontrol Edin

**Kontrol:**
1. Stripe Dashboard → Webhooks
2. `https://getprimesim.com/api/webhooks/stripe` webhook'una tıklayın
3. "Signing secret" → "Reveal" → Secret'ı kopyalayın
4. Vercel'deki secret ile karşılaştırın
5. **Aynı mı?** → Redeploy yapın
6. **Farklı mı?** → Vercel'de güncelleyin ve redeploy yapın

---

## 🔧 DÜZELTME ADIMLARI

### Adım 1: Vercel'de Secret'ı Kontrol Edin
1. Vercel Dashboard → Settings → Environment Variables
2. `STRIPE_WEBHOOK_SECRET` değerini **Edit** edin
3. Değeri **tamamen silin**
4. Stripe Dashboard'dan **yeni kopyalayın**
5. **Yapıştırın** (Ctrl+V, tırnak işareti veya boşluk eklemeyin)
6. **Save**

### Adım 2: Redeploy Yapın
1. Vercel Dashboard → Deployments
2. En son deployment → **"..."** → **"Redeploy"**

---

## 🧪 TEST ETME

### Adım 1: Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### Adım 2: Vercel Loglarını Kontrol Edin
1. Vercel Dashboard → Deployments → Runtime Logs
2. Şu logları arayın:

**Başarılı olmalı:**
```
=== STRIPE WEBHOOK CALLED ===
📝 Webhook received:
  - Webhook secret starts with: whsec_6rE6...
  - Webhook secret length: 43
🔐 Attempting signature verification...
✅ Webhook signature verified successfully
```

**Hata varsa:**
```
❌ Webhook signature verification failed:
  - Webhook secret starts with: whsec_6rE6...
  - Webhook secret length: 43
⚠️ WARNING: Webhook secret should start with 'whsec_'
```

---

## ✅ BAŞARILI TEST KRİTERLERİ

- [ ] Vercel'de secret doğru format'ta (whsec_ ile başlıyor)
- [ ] Secret'da tırnak işareti veya boşluk yok
- [ ] Stripe Dashboard'dan secret ile aynı
- [ ] Redeploy yapıldı
- [ ] Vercel loglarında "✅ Webhook signature verified successfully" görünüyor
- [ ] Stripe Dashboard'da event başarılı (yeşil ✅)
- [ ] Email geldi

---

## ❌ OLASI SORUNLAR

### Sorun 1: Secret'da Tırnak İşareti Var
**Belirti:** Loglarda secret doğru görünüyor ama verification başarısız.

**Çözüm:**
1. Vercel'de secret'ı edit edin
2. Tırnak işaretlerini silin
3. Save → Redeploy

### Sorun 2: Secret'da Boşluk Var
**Belirti:** Secret length 43'ten fazla görünüyor.

**Çözüm:**
1. Vercel'de secret'ı edit edin
2. Başındaki ve sonundaki boşlukları silin
3. Save → Redeploy

### Sorun 3: Secret Yanlış
**Belirti:** Stripe Dashboard'dan secret farklı.

**Çözüm:**
1. Stripe Dashboard'dan yeni secret kopyalayın
2. Vercel'de güncelleyin
3. Save → Redeploy

---

**Vercel'de secret'ı kontrol edin, tırnak işareti veya boşluk var mı? Redeploy yapın ve test edin! 🔍**










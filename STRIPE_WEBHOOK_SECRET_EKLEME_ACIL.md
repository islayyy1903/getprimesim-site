# STRIPE_WEBHOOK_SECRET Ekleme - ACİL

## ❌ SORUN: STRIPE_WEBHOOK_SECRET Vercel'de Yok

Webhook çalışmıyor çünkü `STRIPE_WEBHOOK_SECRET` Vercel'de yok!

---

## 🔧 HEMEN EKLEME ADIMLARI

### Adım 1: Stripe Dashboard'dan Secret Alın
1. [Stripe Dashboard](https://dashboard.stripe.com) → Giriş yapın
2. Sol menüden **"Webhooks"** seçin
3. `https://getprimesim.com/api/webhooks/stripe` webhook'una tıklayın
4. **"Signing secret"** bölümüne gidin
5. **"Reveal"** veya **"Click to reveal"** butonuna tıklayın
6. Secret'ı kopyalayın: `whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj`

### Adım 2: Vercel'e Ekleyin
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz (`getprimesim-site`)
2. **Settings** sekmesine tıklayın
3. Sol menüden **"Environment Variables"** seçin
4. **"Add New"** butonuna tıklayın
5. Formu doldurun:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj`
   - **Environment:** 
     - ✅ **Production**
     - ✅ **Preview**
     - ✅ **Development**
     - (Hepsini seçin - önemli!)
6. **"Save"** butonuna tıklayın

### Adım 3: Kontrol Edin
1. Environment Variables listesinde `STRIPE_WEBHOOK_SECRET` görünüyor mu?
2. Değer doğru mu? (`whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj`)
3. Environment'lar seçili mi? (Production, Preview, Development)

### Adım 4: Redeploy Yapın
1. Vercel Dashboard → **Deployments**
2. En son deployment → **"..."** → **"Redeploy"**
3. Veya terminal'de: `vercel --prod`

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Secret Formatı:**
   - Mutlaka `whsec_` ile başlamalı
   - Tırnak işareti EKLEMEYİN
   - Boşluk EKLEMEYİN
   - Tam değer: `whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj`

2. **Environment Seçimi:**
   - Production, Preview, Development **hepsini seçin**
   - Aksi halde sadece production'da çalışır

3. **Redeploy:**
   - Environment variable eklendikten sonra **mutlaka redeploy yapın**
   - Aksi halde webhook çalışmaz

---

## ✅ KONTROL LİSTESİ

- [ ] Stripe Dashboard'dan secret kopyalandı
- [ ] Vercel Dashboard'a giriş yapıldı
- [ ] Settings → Environment Variables'a gidildi
- [ ] "Add New" butonuna tıklandı
- [ ] Name: `STRIPE_WEBHOOK_SECRET` yazıldı
- [ ] Value: `whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj` yapıştırıldı
- [ ] Environment: Production, Preview, Development (hepsini seçin)
- [ ] Save butonuna tıklandı
- [ ] Environment Variables listesinde görünüyor mu kontrol edildi
- [ ] Redeploy yapıldı

---

## 🧪 TEST ETME

### Adım 1: Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### Adım 2: Vercel Loglarını Kontrol Edin
1. Vercel Dashboard → Deployments → Runtime Logs
2. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   📝 Webhook received:
     - Webhook secret exists: true
   ✅ Webhook signature verified successfully
   ```

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Stripe Dashboard'dan secret'ı kopyalayın**
2. ✅ **Vercel'e `STRIPE_WEBHOOK_SECRET` olarak ekleyin**
3. ✅ **Environment: Production, Preview, Development (hepsini seçin)**
4. ✅ **Save → Redeploy**
5. ✅ **Test siparişi yapın**
6. ✅ **Logları kontrol edin**

---

**Hemen ekleyin ve redeploy yapın! Sonra test edin! 🚀**
















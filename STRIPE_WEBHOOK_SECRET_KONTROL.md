# STRIPE_WEBHOOK_SECRET Kontrolü

## 🔍 VERCEL'DE STRIPE_WEBHOOK_SECRET KONTROLÜ

### Adım 1: Vercel Dashboard'a Giriş
1. [Vercel Dashboard](https://vercel.com/dashboard) → Giriş yapın
2. Projenizi bulun: **`getprimesim-site`**
3. Projeye tıklayın

### Adım 2: Settings → Environment Variables
1. Üst menüden **"Settings"** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçin

### Adım 3: STRIPE_WEBHOOK_SECRET Kontrolü
1. Environment Variables listesinde **`STRIPE_WEBHOOK_SECRET`** var mı?
2. Değer görünüyor mu? (genellikle `whsec_` ile başlar)
3. Environment'lar seçili mi? (Production, Preview, Development)

---

## ❌ EĞER YOKSA: STRIPE_WEBHOOK_SECRET EKLEME

### Adım 1: Stripe Dashboard'dan Secret Alın
1. [Stripe Dashboard](https://dashboard.stripe.com) → Giriş yapın
2. Sol menüden **"Webhooks"** seçin
3. `https://getprimesim.com/api/webhooks/stripe` webhook'una tıklayın
4. **"Signing secret"** bölümüne gidin
5. **"Reveal"** veya **"Click to reveal"** butonuna tıklayın
6. Secret'ı kopyalayın (örn: `whsec_xxxxxxxxxxxxx`)

### Adım 2: Vercel'e Ekleyin
1. Vercel Dashboard → Settings → **Environment Variables**
2. **"Add New"** butonuna tıklayın
3. Formu doldurun:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_xxxxxxxxxxxxx` (Stripe'dan kopyaladığınız)
   - **Environment:** 
     - ✅ **Production**
     - ✅ **Preview**
     - ✅ **Development**
     - (Hepsini seçin - önemli!)
4. **"Save"** butonuna tıklayın

### Adım 3: Redeploy
1. Vercel Dashboard → **Deployments**
2. En son deployment → **"..."** → **"Redeploy"**
3. Veya yeni bir commit push edin

---

## ✅ KONTROL LİSTESİ

- [ ] Vercel Dashboard'a giriş yapıldı
- [ ] Settings → Environment Variables'a gidildi
- [ ] `STRIPE_WEBHOOK_SECRET` var mı kontrol edildi
- [ ] Eğer yoksa, Stripe Dashboard'dan secret alındı
- [ ] Vercel'e eklendi
- [ ] Environment: Production, Preview, Development (hepsini seçin)
- [ ] Save butonuna tıklandı
- [ ] Redeploy yapıldı

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Webhook Secret Formatı:**
   - Genellikle `whsec_` ile başlar
   - Örnek: `whsec_xxxxxxxxxxxxx`
   - Her webhook'un kendine özel secret'ı vardır

2. **Environment Seçimi:**
   - Mutlaka 3 environment'ı da seçin:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Aksi halde sadece production'da çalışır

3. **Redeploy:**
   - Environment variable eklendikten sonra mutlaka redeploy yapın
   - Aksi halde webhook signature verification çalışmaz

---

## 🔍 SORUN GİDERME

### Sorun 1: "Webhook signature verification failed"
**Çözüm:**
- `STRIPE_WEBHOOK_SECRET` Vercel'de var mı kontrol edin
- Secret doğru mu kontrol edin (Stripe Dashboard'dan kopyaladığınız)
- Redeploy yapın

### Sorun 2: "No signature found"
**Çözüm:**
- Stripe Dashboard'da webhook endpoint doğru mu kontrol edin
- Webhook aktif mi kontrol edin

### Sorun 3: Secret'ı bulamıyorum
**Çözüm:**
- Stripe Dashboard → Webhooks → Webhook'unuzu seçin
- "Signing secret" bölümüne gidin
- "Reveal" butonuna tıklayın
- Secret'ı kopyalayın

---

**Vercel'de `STRIPE_WEBHOOK_SECRET` var mı? Kontrol edin ve paylaşın! 🔍**












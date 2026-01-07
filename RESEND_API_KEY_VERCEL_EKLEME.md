# Resend API Key Vercel'e Ekleme

## ⚠️ ÖNEMLİ: RESEND_API_KEY Vercel'de Olmalı

Email sistemi çalışması için `RESEND_API_KEY` değişkenini Vercel'e eklemeniz gerekiyor.

---

## 🔧 VERCEL'E EKLEME ADIMLARI

### Adım 1: Vercel Dashboard'a Giriş
1. [Vercel Dashboard](https://vercel.com/dashboard) → Giriş yapın
2. Projenizi bulun: **`getprimesim-site`**
3. Projeye tıklayın

### Adım 2: Settings Sekmesine Gidin
1. Üst menüden **"Settings"** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçin

### Adım 3: RESEND_API_KEY Ekleme
1. **"Add New"** butonuna tıklayın
2. Formu doldurun:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`
   - **Environment:** 
     - ✅ **Production**
     - ✅ **Preview**
     - ✅ **Development**
     - (Hepsini seçin - önemli!)
3. **"Save"** butonuna tıklayın

### Adım 4: Kontrol Edin
1. Environment Variables listesinde `RESEND_API_KEY` görünüyor mu?
2. Değer doğru mu? (`re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`)
3. Environment'lar seçili mi? (Production, Preview, Development)

---

## ✅ KONTROL LİSTESİ

- [ ] Vercel Dashboard'a giriş yapıldı
- [ ] Settings → Environment Variables'a gidildi
- [ ] `RESEND_API_KEY` eklendi
- [ ] Value: `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`
- [ ] Environment: Production, Preview, Development (hepsini seçin)
- [ ] Save butonuna tıklandı
- [ ] Environment Variables listesinde görünüyor mu?

---

## ⚠️ ÖNEMLİ NOTLAR

### 1. Environment Seçimi
**Mutlaka 3 environment'ı da seçin:**
- ✅ Production
- ✅ Preview
- ✅ Development

**Neden?**
- Production: Canlı site için
- Preview: Test deployment'ları için
- Development: Local development için

### 2. Redeploy Gerekli mi?
**Evet!** Environment variable eklendikten sonra:
1. Vercel Dashboard → **Deployments**
2. En son deployment → **"..."** → **"Redeploy"**
3. Veya yeni bir commit push edin

**Not:** Environment variable eklendikten sonra otomatik redeploy olmaz, manuel redeploy yapmanız gerekir.

---

## 🔍 KONTROL ETME

### Vercel Dashboard'da Kontrol:
1. Settings → Environment Variables
2. `RESEND_API_KEY` var mı?
3. Değer doğru mu?
4. Environment'lar seçili mi?

### Loglarda Kontrol:
1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Test siparişi yapın
3. Şu logları arayın:
   ```
   🔑 Resend API key exists: true
   ```
   Eğer `false` görüyorsanız, environment variable eklenmemiş demektir.

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Vercel'e `RESEND_API_KEY` ekleyin**
2. ✅ **Environment: Production, Preview, Development (hepsini seçin)**
3. ✅ **Save butonuna tıklayın**
4. ✅ **Redeploy yapın**
5. ✅ **Test siparişi yapın**
6. ✅ **Email'in geldiğini kontrol edin**

---

## ❌ SORUN GİDERME

### Sorun 1: "Email service not configured"
**Çözüm:**
- Vercel'e `RESEND_API_KEY` ekleyin
- Redeploy yapın

### Sorun 2: "Resend API key exists: false"
**Çözüm:**
- Environment variable doğru eklendi mi kontrol edin
- Environment'lar seçili mi kontrol edin
- Redeploy yapın

### Sorun 3: "Invalid API key"
**Çözüm:**
- API key değerini kontrol edin
- Doğru key'i kopyaladığınızdan emin olun
- Resend Dashboard'dan yeni key alın (gerekirse)

---

**Vercel'e `RESEND_API_KEY` eklediniz mi? Kontrol edin ve redeploy yapın! 🔍**















# Resend API Key Vercel'e Ekleme

## ✅ RESEND API KEY ALINDI

**API Key:** `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`

Şimdi bu API key'i Vercel'e eklemeniz gerekiyor.

---

## 🔧 VERCEL'E EKLEME ADIMLARI

### Adım 1: Vercel Dashboard'a Giriş
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz (`getprimesim-site`)
2. **Settings** sekmesine tıklayın
3. Sol menüden **Environment Variables** seçin

### Adım 2: RESEND_API_KEY Ekleme
1. **"Add New"** butonuna tıklayın
2. Formu doldurun:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`
   - **Environment:** 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
     - (Hepsini seçin)
3. **Save** butonuna tıklayın

### Adım 3: Redeploy
1. Environment variable eklendikten sonra **redeploy** yapın
2. Vercel Dashboard → **Deployments** → En son deployment → **"..."** → **Redeploy**
3. Veya terminal'de: `vercel --prod`

---

## ✅ KONTROL LİSTESİ

- [x] Resend API key alındı ✅
- [x] `.env.local` dosyasına eklendi ✅
- [ ] Vercel'e `RESEND_API_KEY` eklendi
- [ ] Environment: Production, Preview, Development seçildi
- [ ] Save butonuna tıklandı
- [ ] Redeploy yapıldı

---

## 🧪 TEST ETME

### 1. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### 2. Email Kontrolü
1. Email'inizi kontrol edin (spam klasörüne de bakın)
2. QR code email'i geldi mi?
3. QR code görünüyor mu?

### 3. Logları Kontrol Edin
1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Şu logları arayın:
   ```
   ✅ QR code email sent successfully to: customer@example.com
   ```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Environment Variables:**
   - Production, Preview, Development hepsine ekleyin
   - Aksi halde sadece production'da çalışır

2. **Redeploy:**
   - Environment variable eklendikten sonra mutlaka redeploy yapın
   - Aksi halde email sistemi çalışmaz

3. **Email Delivery:**
   - Email'ler genellikle birkaç saniye içinde gelir
   - Spam klasörüne düşebilir, kontrol edin

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Vercel'e `RESEND_API_KEY` ekleyin**
2. ✅ **Redeploy yapın**
3. ✅ **Test siparişi yapın**
4. ✅ **Email'i kontrol edin**

---

**Vercel'e `RESEND_API_KEY` eklediniz mi? Redeploy yaptınız mı? 🔍**












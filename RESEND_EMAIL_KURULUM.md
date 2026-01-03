# Resend Email Kurulumu

## ✅ EMAIL SİSTEMİ EKLENDİ

Resend email servisi entegre edildi. QR code'lar artık otomatik olarak email ile gönderilecek.

---

## 🔧 RESEND API KEY ALMA

### Adım 1: Resend Hesabı Oluşturun
1. [Resend.com](https://resend.com) → Sign up
2. Ücretsiz hesap oluşturun (ayda 3,000 email ücretsiz)

### Adım 2: API Key Oluşturun
1. Resend Dashboard → **API Keys**
2. **"Create API Key"** butonuna tıklayın
3. API key adı verin (örn: "PrimeSim Production")
4. **"Create"** butonuna tıklayın
5. API key'i kopyalayın (örn: `re_xxxxxxxxxxxxx`)

**Önemli:** API key'i kopyaladıktan sonra kaydedin, tekrar gösterilmez!

---

## 🔧 VERCEL'E EKLEME

### Adım 1: Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz (`getprimesim-site`)
2. **Settings** → **Environment Variables**

### Adım 2: RESEND_API_KEY Ekleme
1. **"Add New"** butonuna tıklayın
2. Formu doldurun:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxx` (Resend'den kopyaladığınız API key)
   - **Environment:** 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
     - (Hepsini seçin)
3. **Save** butonuna tıklayın

### Adım 3: Domain Verification (Opsiyonel)
1. Resend Dashboard → **Domains**
2. **"Add Domain"** butonuna tıklayın
3. Domain: `getprimesim.com`
4. DNS kayıtlarını ekleyin (Resend size verecek)
5. Domain doğrulandıktan sonra `noreply@getprimesim.com` kullanabilirsiniz

**Şimdilik:** `noreply@getprimesim.com` kullanıyoruz (Resend'in default domain'i ile çalışır)

---

## ✅ KONTROL LİSTESİ

- [ ] Resend hesabı oluşturuldu
- [ ] API key oluşturuldu
- [ ] API key kopyalandı
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

## 📧 EMAIL FORMATI

Email şunları içerecek:
- ✅ Package bilgisi
- ✅ Order ID
- ✅ QR code (görsel)
- ✅ Aktivasyon talimatları
- ✅ Destek bilgileri

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Resend Ücretsiz Plan:**
   - Ayda 3,000 email ücretsiz
   - Yeterli olmalı başlangıç için

2. **Domain Verification:**
   - Domain doğrulandıktan sonra `noreply@getprimesim.com` kullanabilirsiniz
   - Şimdilik Resend'in default domain'i ile çalışır

3. **Email Delivery:**
   - Email'ler genellikle birkaç saniye içinde gelir
   - Spam klasörüne düşebilir, kontrol edin

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Resend hesabı oluşturun**
2. ✅ **API key alın**
3. ✅ **Vercel'e `RESEND_API_KEY` ekleyin**
4. ✅ **Redeploy yapın**
5. ✅ **Test siparişi yapın**
6. ✅ **Email'i kontrol edin**

---

**Resend API key'i aldınız mı? Vercel'e eklediniz mi? 🔍**




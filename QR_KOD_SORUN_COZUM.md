# QR Kod Sorun Çözümü

## ❌ SORUN: QR Kod ve Email Gelmiyor

Test siparişi yaptınız ama QR kod ve email gelmedi. İşte olası nedenler ve çözümler:

---

## 🔍 OLASI SORUNLAR

### 1. Stripe Webhook Tetiklenmedi ⚠️ (EN ÖNEMLİ)

**Sorun:**
- Stripe webhook endpoint eklenmemiş
- Ödeme yapıldığında webhook tetiklenmiyor
- eSimGo API'ye istek gitmiyor

**Belirtiler:**
- Ödeme başarılı
- Success sayfasına yönlendirildi
- Ama QR kod gelmedi

**Çözüm:**
1. Stripe Dashboard → Developers → Webhooks
2. Webhook endpoint ekleyin (ama "Add destination" çalışmıyor)
3. Alternatif: Stripe CLI ile test edin

---

### 2. eSimGo API Entegrasyonu Çalışmıyor

**Sorun:**
- eSimGo API URL/key yanlış olabilir
- Paket ID'leri yanlış olabilir
- API hatası olabilir

**Çözüm:**
- Vercel Environment Variables kontrol edin
- eSimGo API dokümantasyonunu kontrol edin
- Paket ID'lerini doğrulayın

---

### 3. Email Sistemi Henüz Kurulmamış

**Sorun:**
- Email gönderme fonksiyonu henüz eklenmemiş
- QR kod email ile gönderilmiyor

**Çözüm:**
- Email servisi ekleyin (Resend, SendGrid, vb.)
- Email template oluşturun
- Email gönderme fonksiyonu ekleyin

---

## 🚀 HIZLI ÇÖZÜM

### Adım 1: Success Sayfasını Güncelledim ✅

Success sayfasına order status kontrolü ekledim. Artık:
- Order ID görünecek
- Package bilgisi görünecek
- Email adresi görünecek

### Adım 2: Stripe Webhook Kontrolü

Stripe webhook'un çalışıp çalışmadığını kontrol edin:

1. **Stripe Dashboard:**
   - Developers → Webhooks
   - Webhook endpoint var mı?
   - Event'ler görünüyor mu?

2. **Vercel Environment Variables:**
   - `STRIPE_WEBHOOK_SECRET` var mı?
   - Eğer yoksa, webhook çalışmaz

### Adım 3: Test Siparişi Tekrar Yapın

1. Test siparişi yapın
2. Success sayfasında order bilgilerini kontrol edin
3. Email'i kontrol edin (spam klasörüne de bakın)

---

## 📋 CHECKLIST

- [ ] Success sayfası güncellendi (order bilgileri görünüyor)
- [ ] Stripe webhook endpoint eklendi mi?
- [ ] `STRIPE_WEBHOOK_SECRET` Vercel'de var mı?
- [ ] eSimGo API URL/key doğru mu?
- [ ] Test siparişi yapıldı mı?
- [ ] Email kontrol edildi mi?

---

## 🔧 SONRAKI ADIMLAR

1. **Success sayfasını kontrol edin:**
   - Order ID görünüyor mu?
   - Package bilgisi görünüyor mu?

2. **Stripe webhook ekleyin:**
   - Stripe Dashboard → Webhooks
   - Endpoint ekleyin (mümkünse)

3. **Email sistemi ekleyin:**
   - Resend veya SendGrid kurun
   - Email template oluşturun
   - Email gönderme fonksiyonu ekleyin

---

## ⚠️ ÖNEMLİ NOT

**Şu an email sistemi yok!** QR kod sadece loglarda görünecek. Email sistemi eklenene kadar:
- QR kod'u manuel olarak göndermeniz gerekebilir
- Veya email sistemi kurulana kadar bekleyin

---

**Success sayfasını kontrol edin. Order bilgileri görünüyor mu? 🔍**





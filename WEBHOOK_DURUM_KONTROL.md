# Webhook Durum Kontrolü

## ✅ BAŞARILI: Success Sayfası Çalışıyor

Order bilgileri görünüyor:
- ✅ Order ID: `cs_live_a1ODKpEXMzO3...`
- ✅ Package: USA eSIM – 1GB
- ✅ Email: `islamyavuz09@gmail.com`

---

## ❌ SORUN: QR Kod Gelmedi

QR kod gelmemesinin muhtemel nedeni: **Stripe webhook tetiklenmedi**

### Neden?
1. Stripe webhook endpoint eklenmemiş olabilir
2. Webhook secret eksik olabilir
3. Webhook event seçilmemiş olabilir

---

## 🔍 KONTROL EDELİM

### 1. Stripe Dashboard Kontrolü

1. [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. Webhook endpoint var mı kontrol edin:
   - URL: `https://getprimesim.com/api/webhooks/stripe`
   - Event: `checkout.session.completed` seçili mi?

### 2. Vercel Environment Variables Kontrolü

1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. `STRIPE_WEBHOOK_SECRET` var mı kontrol edin
3. Eğer yoksa, webhook çalışmaz

### 3. Test: Stripe CLI ile

Eğer Stripe CLI kuruluysa:
```powershell
stripe listen --forward-to https://getprimesim.com/api/webhooks/stripe
```

---

## 🚀 ÇÖZÜM

### Senaryo 1: Webhook Endpoint Yok

**Çözüm:**
1. Stripe Dashboard → Webhooks
2. Webhook endpoint ekleyin (mümkünse)
3. Veya Stripe Support'a ulaşın

### Senaryo 2: Webhook Secret Yok

**Çözüm:**
1. Stripe Dashboard → Webhooks → Endpoint → **Signing secret**
2. Secret'ı kopyalayın
3. Vercel → Environment Variables → `STRIPE_WEBHOOK_SECRET` ekleyin
4. Redeploy yapın

### Senaryo 3: Webhook Tetiklenmiyor

**Çözüm:**
1. Test siparişi yapın
2. Stripe Dashboard → Webhooks → **Attempts** sekmesine gidin
3. Webhook isteği görünüyor mu kontrol edin
4. Hata var mı kontrol edin

---

## 📋 CHECKLIST

- [x] Success sayfası çalışıyor
- [x] Order bilgileri görünüyor
- [ ] Stripe webhook endpoint eklendi mi?
- [ ] `STRIPE_WEBHOOK_SECRET` Vercel'de var mı?
- [ ] Webhook event seçildi mi? (`checkout.session.completed`)
- [ ] Test siparişi yapıldı mı?
- [ ] Webhook attempts görünüyor mu?

---

## ⚠️ ÖNEMLİ NOT

**Email sistemi henüz yok!** QR kod şu an sadece loglarda görünecek. Email sistemi eklenene kadar:
- QR kod'u manuel olarak göndermeniz gerekebilir
- Veya email sistemi kurulana kadar bekleyin

---

**Stripe Dashboard'da webhook endpoint var mı? `STRIPE_WEBHOOK_SECRET` Vercel'de var mı? 🔍**










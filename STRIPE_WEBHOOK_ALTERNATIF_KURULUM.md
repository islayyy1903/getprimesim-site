# Stripe Webhook Alternatif Kurulum Yöntemleri

## 🔧 STRIPE WEBHOOK ENDPOINT EKLEME (YENİ ARAYÜZ)

Stripe Dashboard'da "Add endpoint" butonu görünmüyorsa, şu alternatif yöntemleri deneyin:

---

## YÖNTEM 1: "Add destination" Kullanma

### Adım 1: Add destination'a Tıklayın
1. Stripe Dashboard → **Developers** → **Webhooks**
2. **"Add destination"** butonuna tıklayın

### Adım 2: Destination Type Seçin
1. **"Webhook endpoint"** seçeneğini seçin
2. Devam edin

### Adım 3: Endpoint Bilgilerini Girin
1. **Endpoint URL:**
   ```
   https://getprimesim.com/api/webhooks/stripe
   ```
2. **Description** (opsiyonel):
   ```
   PrimeSim eSim Purchase Webhook
   ```
3. **Events to send:**
   - `checkout.session.completed` seçin
4. **Save** veya **"Add destination"** butonuna tıklayın

---

## YÖNTEM 2: "Import" Kullanma

### Adım 1: Import'a Tıklayın
1. Stripe Dashboard → **Developers** → **Webhooks**
2. **"Import"** butonuna tıklayın

### Adım 2: Endpoint Bilgilerini Girin
1. Endpoint URL'i girin: `https://getprimesim.com/api/webhooks/stripe`
2. Event'leri seçin: `checkout.session.completed`
3. Import edin

---

## YÖNTEM 3: Direkt URL ile Ekleme

### Adım 1: Stripe CLI Kullanma (Alternatif)
Eğer Stripe CLI kuruluysa:
```bash
stripe listen --forward-to https://getprimesim.com/api/webhooks/stripe
```

### Adım 2: Manuel Ekleme
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Sayfanın üst kısmında **"+"** veya **"New"** butonunu arayın
3. Veya sağ üst köşede **"Create"** butonunu arayın

---

## YÖNTEM 4: Settings Üzerinden

### Adım 1: Settings'e Gidin
1. Stripe Dashboard → **Settings** → **Webhooks**
2. **"Add webhook endpoint"** butonunu arayın

---

## 🔍 EKRANDA NE GÖRÜYORSUNUZ?

Lütfen şunları kontrol edin:

1. **"Add destination"** butonuna tıkladığınızda ne oluyor?
   - Bir form açılıyor mu?
   - Webhook endpoint seçeneği var mı?

2. **"Import"** butonuna tıkladığınızda ne oluyor?
   - Endpoint URL girebiliyor musunuz?

3. **Sayfanın üst kısmında** başka butonlar var mı?
   - "Create", "New", "+" gibi butonlar?

4. **Sağ üst köşede** butonlar var mı?
   - "Add", "Create", "New" gibi butonlar?

---

## 📸 EKRAN GÖRÜNTÜSÜ PAYLAŞIN

Eğer mümkünse, Stripe Dashboard'daki Webhooks sayfasının ekran görüntüsünü paylaşabilir misiniz? Böylece tam olarak hangi butonları görmeniz gerektiğini söyleyebilirim.

---

## ✅ ALTERNATIF: Stripe CLI ile Test

Eğer webhook endpoint ekleyemiyorsanız, önce Stripe CLI ile test edebilirsiniz:

### Stripe CLI Kurulumu:
```bash
# Windows için (PowerShell)
# Stripe CLI'yi indirin: https://stripe.com/docs/stripe-cli
```

### Test Webhook Gönderme:
```bash
stripe listen --forward-to https://getprimesim.com/api/webhooks/stripe
```

---

## 🚀 HIZLI ÇÖZÜM

### Eğer "Add destination" görüyorsanız:

1. **"Add destination"** butonuna tıklayın
2. **"Webhook endpoint"** seçeneğini seçin
3. Endpoint URL: `https://getprimesim.com/api/webhooks/stripe`
4. Event: `checkout.session.completed`
5. Save

---

## 📞 DESTEK

Eğer hala webhook endpoint ekleyemiyorsanız:

1. **Stripe Support'a ulaşın:**
   - Stripe Dashboard → Help → Contact Support
   - "How do I add a webhook endpoint?" diye sorun

2. **Stripe Dokümantasyonu:**
   - https://stripe.com/docs/webhooks/quickstart
   - Adım adım rehberi takip edin

---

**"Add destination" butonuna tıkladığınızda ne görüyorsunuz? Webhook endpoint seçeneği var mı? 🔍**










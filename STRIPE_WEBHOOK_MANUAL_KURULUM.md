# Stripe Webhook Manuel Kurulum

## 🔧 "Add destination" İÇİNDE NE VAR?

"Add destination" butonuna tıkladığınızda hangi seçenekler görünüyor?

Muhtemelen şunlardan biri:
- Amazon EventBridge
- Google Cloud Pub/Sub
- Azure Event Grid
- HTTP endpoint (bu olabilir!)
- Custom destination

---

## ✅ ÇÖZÜM: HTTP ENDPOINT SEÇİN

Eğer "HTTP endpoint" veya benzer bir seçenek görüyorsanız:

1. **"HTTP endpoint"** veya **"HTTP"** seçeneğini seçin
2. Endpoint URL girin: `https://getprimesim.com/api/webhooks/stripe`
3. Event seçin: `checkout.session.completed`
4. Save

---

## 🔍 ALTERNATIF YÖNTEMLER

### Yöntem 1: Stripe CLI ile Test (Hızlı)
Webhook endpoint eklemeden önce test edebilirsiniz:

```bash
# Stripe CLI kurulumu (Windows)
# https://stripe.com/docs/stripe-cli

# Webhook'u dinle
stripe listen --forward-to https://getprimesim.com/api/webhooks/stripe
```

### Yöntem 2: Settings Üzerinden
1. Stripe Dashboard → **Settings** → **Webhooks**
2. Veya **Settings** → **Developers** → **Webhooks**
3. **"Add webhook endpoint"** butonunu arayın

### Yöntem 3: Direkt URL ile
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Sayfanın üst kısmında **"+"** veya **"Create"** butonunu arayın
3. Veya sağ üst köşede **"New"** butonunu arayın

### Yöntem 4: API ile Ekleme
Stripe API kullanarak webhook endpoint ekleyebilirsiniz (kod ile).

---

## 📸 EKRAN GÖRÜNTÜSÜ

"Add destination" butonuna tıkladığınızda hangi seçenekler görünüyor?

Lütfen şunları paylaşın:
1. Hangi destination type'ları görüyorsunuz?
2. "HTTP endpoint" veya "HTTP" seçeneği var mı?
3. Başka hangi seçenekler var?

---

## 🚀 HIZLI TEST: Stripe CLI

Webhook endpoint eklemeden önce Stripe CLI ile test edebilirsiniz:

### Windows için Stripe CLI:
1. **Stripe CLI İndir:**
   - https://github.com/stripe/stripe-cli/releases
   - Windows için `.exe` dosyasını indirin

2. **Kurulum:**
   - İndirilen dosyayı çalıştırın
   - Veya PowerShell'de:
   ```powershell
   # Stripe CLI'yi PATH'e ekleyin
   ```

3. **Login:**
   ```bash
   stripe login
   ```

4. **Webhook'u Dinle:**
   ```bash
   stripe listen --forward-to https://getprimesim.com/api/webhooks/stripe
   ```

5. **Test Event Gönder:**
   ```bash
   stripe trigger checkout.session.completed
   ```

---

## ✅ GEÇICI ÇÖZÜM: Webhook Secret Olmadan Test

Kod zaten webhook secret olmadan da çalışabilir (test için):

```typescript
// app/api/webhooks/stripe/route.ts
// Webhook secret yoksa uyarı veriyor ama çalışıyor
```

**⚠️ UYARI:** Production'da mutlaka webhook secret kullanın!

---

## 🔍 SORUN GİDERME

### Eğer hiçbir yöntem çalışmıyorsa:

1. **Stripe Support'a Ulaşın:**
   - Stripe Dashboard → Help → Contact Support
   - "How do I add a webhook endpoint in the new interface?" diye sorun

2. **Stripe Dokümantasyonu:**
   - https://stripe.com/docs/webhooks/quickstart
   - Güncel adımları takip edin

3. **Stripe Community:**
   - https://github.com/stripe/stripe-cli
   - Sorunuzu sorun

---

## 📋 CHECKLIST

- [ ] "Add destination" butonuna tıklandı
- [ ] Hangi seçenekler görünüyor? (listeleyin)
- [ ] "HTTP endpoint" veya "HTTP" var mı?
- [ ] Alternatif yöntemler denendi mi?
- [ ] Stripe CLI ile test edildi mi?

---

**"Add destination" içinde hangi seçenekler görünüyor? "HTTP endpoint" veya benzer bir seçenek var mı? 🔍**





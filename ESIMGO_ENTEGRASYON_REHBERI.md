# eSimGo Entegrasyon Rehberi - PrimeSim

## 📋 ÖN HAZIRLIK

### 1. eSimGo'dan Alınması Gerekenler

eSimGo'dan reseller onayı aldıktan sonra şunları isteyin:

- [ ] **API Endpoint URL** (örn: `https://api.esimgo.com/v1/`)
- [ ] **API Key** veya **API Token** (authentication için)
- [ ] **API Dokümantasyonu** (PDF veya web link)
- [ ] **Test/Sandbox ortamı** (varsa)
- [ ] **Webhook URL** (eğer eSimGo webhook gönderiyorsa)

### 2. eSimGo API Fonksiyonları (Genellikle)

eSimGo API'lerinde genellikle şunlar olur:

- **eSim Paket Listesi:** Tüm mevcut paketleri çekme
- **eSim Satın Alma:** Paket satın alma endpoint'i
- **QR Code Alma:** Satın alınan eSim'in QR code'unu alma
- **Sipariş Durumu:** Sipariş durumunu sorgulama
- **Webhook:** Sipariş durumu değişiklikleri için (opsiyonel)

---

## 🔧 ENTEGRASYON ADIMLARI

### ADIM 1: Environment Variables Ekleme

#### Local (.env.local)
```env
# eSimGo API
ESIMGO_API_KEY=your_api_key_here
ESIMGO_API_URL=https://api.esimgo.com/v1
ESIMGO_WEBHOOK_SECRET=your_webhook_secret_here
```

#### Vercel (Production)
1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. Şu değişkenleri ekleyin:
   - `ESIMGO_API_KEY`
   - `ESIMGO_API_URL`
   - `ESIMGO_WEBHOOK_SECRET` (opsiyonel)

---

### ADIM 2: eSimGo API Client Oluşturma

`app/lib/esimgo.ts` dosyası oluşturacağız (API çağrıları için)

---

### ADIM 3: Stripe Webhook Oluşturma

Ödeme başarılı olduğunda eSimGo'dan eSim satın almak için:

`app/api/webhooks/stripe/route.ts` dosyası oluşturacağız

---

### ADIM 4: Email Gönderme Sistemi

QR code'u müşteriye göndermek için:

- Resend, SendGrid, veya Nodemailer entegrasyonu
- Email template'leri

---

## 📝 İŞ AKIŞI

### Mevcut İş Akışı (Manuel):
```
Müşteri → Ödeme Yapar (Stripe) → Başarılı → "QR code email ile gönderilecek" mesajı
                                                      ↓
                                            MANUEL: eSimGo'dan eSim satın al ve gönder
```

### İstenen İş Akışı (Otomatik):
```
Müşteri → Ödeme Yapar (Stripe) → Başarılı → Stripe Webhook → eSimGo API'den eSim satın al → QR code al → Email gönder
```

---

## 🚀 KOD YAPISI

### 1. eSimGo API Client (`app/lib/esimgo.ts`)

```typescript
// eSimGo API çağrıları için client
export async function purchaseEsim(packageId: string, email: string) {
  // eSimGo API'ye istek at
  // eSim satın al
  // QR code'u al
  // Döndür
}
```

### 2. Stripe Webhook (`app/api/webhooks/stripe/route.ts`)

```typescript
// Stripe webhook'u dinle
// Ödeme başarılı olduğunda
// eSimGo API'yi çağır
// QR code'u al
// Email gönder
```

### 3. Email Sistemi (`app/lib/email.ts`)

```typescript
// QR code email gönderme
export async function sendQRCodeEmail(email: string, qrCode: string, packageName: string) {
  // Email gönder
}
```

---

## 📋 CHECKLIST

### eSimGo'dan Alınması Gerekenler:
- [ ] API Endpoint URL
- [ ] API Key/Token
- [ ] API Dokümantasyonu
- [ ] Test ortamı bilgileri (varsa)

### Kod Entegrasyonu:
- [ ] eSimGo API client oluşturuldu
- [ ] Stripe webhook oluşturuldu
- [ ] Email sistemi kuruldu
- [ ] Test edildi

### Production:
- [ ] Environment variables eklendi (Vercel)
- [ ] Webhook URL eklendi (Stripe Dashboard)
- [ ] Test edildi

---

## ❓ SORULAR

eSimGo'dan şunları öğrenmemiz gerekiyor:

1. **API Endpoint nedir?**
   - Örn: `https://api.esimgo.com/v1/`

2. **Authentication nasıl yapılıyor?**
   - API Key header'da mı? (örn: `Authorization: Bearer API_KEY`)
   - API Token mı kullanılıyor?

3. **eSim satın alma endpoint'i nedir?**
   - Örn: `POST /purchases` veya `POST /orders`

4. **Request format nedir?**
   - JSON body'de ne gönderiliyor?
   - Örn: `{ "package_id": "usa-1gb", "email": "customer@example.com" }`

5. **Response format nedir?**
   - QR code nasıl dönüyor?
   - Örn: `{ "qr_code": "data:image/png;base64,...", "order_id": "123" }`

6. **Webhook var mı?**
   - eSimGo sipariş durumu değişikliklerini webhook ile bildiriyor mu?

---

## 🎯 SONRAKI ADIMLAR

1. **eSimGo'dan API bilgilerini alın**
   - API dokümantasyonunu isteyin
   - Test hesabı oluşturun

2. **API bilgilerini paylaşın**
   - Bana API endpoint, key, ve dokümantasyonu gönderin
   - Ben entegrasyonu yapacağım

3. **Test edin**
   - Test ortamında deneyin
   - Production'da test edin

---

## 💡 ÖRNEK API ÇAĞRISI (Tahmini)

```typescript
// eSimGo API'ye eSim satın alma isteği
const response = await fetch('https://api.esimgo.com/v1/purchases', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.ESIMGO_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    package_id: 'usa-1gb-7days',
    email: 'customer@example.com',
    quantity: 1,
  }),
});

const data = await response.json();
// data.qr_code veya data.qr_code_url dönecek
```

---

**eSimGo'dan API bilgilerini aldıktan sonra, bana gönderin. Ben entegrasyonu yapacağım! 🚀**




# eSimGo Entegrasyonu - Kurulum Adımları

## ✅ YAPILANLAR

### 1. eSimGo API Client Oluşturuldu
- ✅ `app/lib/esimgo.ts` - eSimGo API çağrıları için
- ✅ `purchaseEsim()` fonksiyonu hazır
- ✅ Paket ID mapping fonksiyonu hazır

### 2. Stripe Webhook Oluşturuldu
- ✅ `app/api/webhooks/stripe/route.ts` - Ödeme başarılı olduğunda çalışacak
- ✅ Webhook signature verification
- ✅ Ödeme sonrası eSimGo API çağrısı

---

## 🔧 ŞİMDİ YAPMANIZ GEREKENLER

### ADIM 1: eSimGo'dan API Bilgilerini Alın

eSimGo'dan şunları isteyin:

1. **API Endpoint URL**
   - Örn: `https://api.esimgo.com/v1/`
   - Veya: `https://api.esimgo.com/api/v1/`

2. **API Key veya API Token**
   - Authentication için kullanılacak
   - Örn: `Bearer token_xxxxx` veya `API-Key: xxxxx`

3. **API Dokümantasyonu**
   - eSim satın alma endpoint'i nedir?
   - Request format nedir?
   - Response format nedir?

4. **Paket ID'leri**
   - Website'deki paketlerin eSimGo'daki karşılıkları nedir?
   - Örn: "USA eSIM – 1GB" → eSimGo'da hangi ID?

---

### ADIM 2: Environment Variables Ekleme

#### Local (.env.local)
```env
# eSimGo API
ESIMGO_API_KEY=your_api_key_here
ESIMGO_API_URL=https://api.esimgo.com/v1
```

#### Vercel (Production)
1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. Şu değişkenleri ekleyin:
   - `ESIMGO_API_KEY` = eSimGo API key'iniz
   - `ESIMGO_API_URL` = eSimGo API endpoint URL'i
3. **Environment:** Production, Preview, Development (hepsini seçin)
4. **Save**

---

### ADIM 3: Stripe Webhook Kurulumu

1. [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. **"Add endpoint"** butonuna tıklayın
3. **Endpoint URL:** `https://getprimesim.com/api/webhooks/stripe`
4. **Events to send:** `checkout.session.completed` seçin
5. **"Add endpoint"** tıklayın
6. **Signing secret** kopyalayın (örn: `whsec_xxxxx`)
7. Vercel Environment Variables'a ekleyin:
   - `STRIPE_WEBHOOK_SECRET` = `whsec_xxxxx`

---

### ADIM 4: Paket ID Mapping Güncelleme

`app/lib/esimgo.ts` dosyasındaki `mapPackageToEsimGo()` fonksiyonunu eSimGo'dan aldığınız paket ID'lerine göre güncelleyin.

**Örnek:**
```typescript
const packageMap: Record<string, string> = {
  "USA eSIM – 1GB": "esimgo-usa-1gb-7d", // eSimGo'dan alınan gerçek ID
  "USA eSIM – 3GB": "esimgo-usa-3gb-30d",
  // ... diğer paketler
};
```

---

### ADIM 5: API Request/Response Format Güncelleme

eSimGo API dokümantasyonuna göre `app/lib/esimgo.ts` dosyasındaki request ve response format'ını güncelleyin.

**Örnek Request:**
```typescript
body: JSON.stringify({
  package_id: packageId,
  email: email,
  quantity: 1,
  // eSimGo'nun istediği diğer alanlar
})
```

**Örnek Response:**
```typescript
{
  order_id: "...",
  qr_code: "data:image/png;base64,...",
  // veya
  qr_code_url: "https://..."
}
```

---

## 📋 CHECKLIST

### eSimGo'dan Alınması Gerekenler:
- [ ] API Endpoint URL
- [ ] API Key/Token
- [ ] API Dokümantasyonu
- [ ] Paket ID'leri (her paket için)
- [ ] Request format örneği
- [ ] Response format örneği

### Kod Güncellemeleri:
- [ ] `app/lib/esimgo.ts` - API endpoint ve format güncellendi
- [ ] `app/lib/esimgo.ts` - Paket ID mapping güncellendi
- [ ] Environment variables eklendi (local ve Vercel)

### Stripe Webhook:
- [ ] Stripe Dashboard'da webhook eklendi
- [ ] Webhook URL: `https://getprimesim.com/api/webhooks/stripe`
- [ ] Event: `checkout.session.completed` seçildi
- [ ] Webhook secret Vercel'e eklendi

### Test:
- [ ] Test ödeme yapıldı
- [ ] Webhook çalıştı mı kontrol edildi
- [ ] eSimGo API çağrısı başarılı mı kontrol edildi
- [ ] QR code alındı mı kontrol edildi

---

## 🔄 İŞ AKIŞI

### Otomatik İş Akışı (Entegrasyon Sonrası):
```
1. Müşteri ödeme yapar (Stripe)
2. Ödeme başarılı olur
3. Stripe webhook tetiklenir → /api/webhooks/stripe
4. Webhook eSimGo API'yi çağırır → purchaseEsim()
5. eSimGo eSim satın alır ve QR code döner
6. QR code email ile gönderilir (sonraki adım)
```

---

## 📧 eSimGo İletişim

eSimGo'dan API bilgilerini almak için:

- **Sales:** sales@esimgo.com
- **Partnerships:** partnerships@esimgo.com
- **Business:** business@esimgo.com
- **Support:** support@esimgo.com
- **Technical:** tech@esimgo.com (varsa)

**Email Template:**
```
Subject: API Access Request - PrimeSim Reseller Account

Dear eSimGo Team,

I have a reseller account with eSimGo and would like to integrate your API into my platform.

Company: PrimeSim
Website: https://getprimesim.com
Email: info@getprimesim.com

I need:
- API endpoint URL
- API key/token for authentication
- API documentation
- Package IDs for my products

Could you please provide me with API access and documentation?

Thank you!
```

---

## 🚀 SONRAKI ADIMLAR

1. **eSimGo'dan API bilgilerini alın**
2. **API bilgilerini bana gönderin** (veya ben güncelleyebilirim)
3. **Environment variables ekleyin**
4. **Stripe webhook kurun**
5. **Test edin**

---

## 💡 ÖNEMLİ NOTLAR

1. **API Format:** eSimGo API format'ı farklı olabilir, dokümantasyona göre güncelleme yapılacak
2. **Error Handling:** eSimGo API hata verirse, ödeme zaten yapıldığı için admin'e bildirim gönderilmeli
3. **Email Sistemi:** QR code göndermek için email servisi kurulması gerekiyor (sonraki adım)

---

**eSimGo'dan API bilgilerini aldıktan sonra, bana gönderin. Ben entegrasyonu tamamlayacağım! 🚀**














# Backend API Structure

## 📁 Backend Dosyaları

Backend API route'larınız **`app/api`** klasöründe:

```
app/api/
├── checkout/
│   └── route.ts          → Stripe checkout API
├── webhooks/
│   └── stripe/
│       └── route.ts      → Stripe webhook handler
├── esimgo/
│   └── webhook/
│       └── route.ts      → eSimGo webhook handler
└── order-status/
    └── route.ts          → Order status API
```

---

## 🔧 API Endpoints

### 1. `/api/checkout` (POST)
**Dosya:** `app/api/checkout/route.ts`

**Ne yapar:**
- Stripe Checkout Session oluşturur
- Ödeme linki döner
- İndirim uygular (ilk alışveriş için %15)

**Kullanım:**
```typescript
POST /api/checkout
Body: {
  packageId: "usa-1gb-7days",
  packageName: "USA eSIM – 1GB",
  price: 6.99,
  email: "customer@email.com",
  isFirstPurchase: true
}
```

---

### 2. `/api/webhooks/stripe` (POST)
**Dosya:** `app/api/webhooks/stripe/route.ts`

**Ne yapar:**
- Stripe'dan gelen webhook'ları dinler
- Ödeme başarılı olduğunda eSimGo API'ye istek atar
- QR code'u email ile gönderir

**Kullanım:**
- Stripe Dashboard → Webhooks → `https://getprimesim.com/api/webhooks/stripe`
- Event: `checkout.session.completed`

---

### 3. `/api/esimgo/webhook` (POST)
**Dosya:** `app/api/esimgo/webhook/route.ts`

**Ne yapar:**
- eSimGo'dan gelen callback'leri dinler
- QR code geldiğinde email gönderir

**Kullanım:**
- eSimGo Dashboard → Callback URL: `https://getprimesim.com/api/esimgo/webhook`

---

### 4. `/api/order-status` (GET)
**Dosya:** `app/api/order-status/route.ts`

**Ne yapar:**
- Stripe session ID ile sipariş durumunu kontrol eder
- Success sayfasında gösterilir

**Kullanım:**
```typescript
GET /api/order-status?session_id=cs_test_...
```

---

## 📚 Backend Library Dosyaları

### `app/lib/esimgo.ts`
**Ne yapar:**
- eSimGo API client
- `purchaseEsim()` - eSim satın alma
- `getOrderStatus()` - Sipariş durumu sorgulama
- `mapPackageToEsimGo()` - Paket ID mapping

### `app/lib/email.ts`
**Ne yapar:**
- Resend email servisi
- `sendQRCodeEmail()` - QR code email gönderme

---

## 🌐 API URL'leri

### Local (Development):
```
http://localhost:3000/api/checkout
http://localhost:3000/api/webhooks/stripe
http://localhost:3000/api/esimgo/webhook
http://localhost:3000/api/order-status
```

### Production:
```
https://getprimesim.com/api/checkout
https://getprimesim.com/api/webhooks/stripe
https://getprimesim.com/api/esimgo/webhook
https://getprimesim.com/api/order-status
```

---

## 🔍 Backend Dosyalarını Görüntüleme

### Terminal'den:
```bash
# Tüm API route'larını listele
dir app\api /s

# Veya PowerShell'de
Get-ChildItem -Path app\api -Recurse -Filter *.ts
```

### VS Code'da:
1. `app/api` klasörünü açın
2. Alt klasörlerde `route.ts` dosyalarını görün

---

## 📝 Backend Dosyaları Özeti

| Dosya | Endpoint | Method | Açıklama |
|-------|----------|--------|----------|
| `app/api/checkout/route.ts` | `/api/checkout` | POST | Stripe checkout |
| `app/api/webhooks/stripe/route.ts` | `/api/webhooks/stripe` | POST | Stripe webhook |
| `app/api/esimgo/webhook/route.ts` | `/api/esimgo/webhook` | POST | eSimGo webhook |
| `app/api/order-status/route.ts` | `/api/order-status` | GET | Order status |
| `app/lib/esimgo.ts` | - | - | eSimGo API client |
| `app/lib/email.ts` | - | - | Email service |

---

**Backend'iniz `app/api` klasöründe! 🚀**










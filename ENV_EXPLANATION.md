# Environment Variables Açıklaması

## .env.local vs Vercel Environment Variables

### .env.local (Localhost için)
- Sadece **localhost'ta** (`http://localhost:3000`) çalışır
- Development/test için kullanılır
- Production'da **KULLANILMAZ**

### Vercel Environment Variables (Production için)
- Sadece **production'da** (`https://getprimesim.com`) çalışır
- Vercel Dashboard'da ayarlanır
- `.env.local` dosyası production'da okunmaz

## Neden İkisi Ayrı?

1. **Güvenlik:** Production key'leri localhost'ta olmamalı
2. **Esneklik:** Her ortam için farklı ayarlar
3. **Best Practice:** Development ve production ayrı tutulmalı

## Doğru Kullanım

### Localhost (.env.local):
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (test key)
STRIPE_SECRET_KEY=sk_test_... (test key)
```

### Production (Vercel Environment Variables):
```
NEXT_PUBLIC_BASE_URL=https://getprimesim.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (live key)
STRIPE_SECRET_KEY=sk_live_... (live key)
```

## Kod Nasıl Çalışıyor?

`app/api/checkout/route.ts` dosyasında:
```typescript
success_url: `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? "https://getprimesim.com" : "http://localhost:3000")}/success?session_id={CHECKOUT_SESSION_ID}`
```

Bu kod:
1. Önce `process.env.NEXT_PUBLIC_BASE_URL` değerini kontrol eder
2. Eğer yoksa:
   - Production'da → `https://getprimesim.com` kullanır
   - Development'ta → `http://localhost:3000` kullanır

## Sonuç

✅ **.env.local'de `http://localhost:3000` olması DOĞRU**
✅ **Production'da Vercel'de `https://getprimesim.com` olmalı**

Production'da `.env.local` dosyası kullanılmaz, Vercel Environment Variables kullanılır!










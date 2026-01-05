# Google Search Console Meta Tag Ekleme

## ❌ Meta Tag Görünmüyor

HTML source'da `google-site-verification` meta tag'i yok. Next.js'te eklememiz gerekiyor.

---

## ✅ ÇÖZÜM: Meta Tag'i Ekleyelim

### Adım 1: Google Search Console'dan Meta Tag'i Alın

1. [Google Search Console](https://search.google.com/search-console) → Giriş yapın
2. Site doğrulama sayfasına gidin
3. **"HTML tag"** seçeneğini seçin
4. Meta tag'i kopyalayın:

**Örnek format:**
```html
<meta name="google-site-verification" content="hicGUyJdEwjxF5oH3e6FQ" />
```

**VEYA sadece content kısmı:**
```
hicGUyJdEwjxF5oH3e6FQ
```

### Adım 2: Bana Gönderin

Meta tag'in **content** kısmını bana gönderin (örn: `hicGUyJdEwjxF5oH3e6FQ`)

Ben `app/layout.tsx` dosyasına ekleyeceğim.

### Adım 3: Deploy ve Doğrulama

1. Ben ekledikten sonra deploy edeceğiz
2. `https://getprimesim.com` → View Source → Meta tag görünecek
3. Google Search Console'da **"Verify"** yapın

---

## 📝 Next.js'te Meta Tag Formatı

Next.js'te meta tag'i şu şekilde ekliyoruz:

```typescript
export const metadata: Metadata = {
  // ... diğer metadata
  verification: {
    google: 'hicGUyJdEwjxF5oH3e6FQ', // Google verification code
  },
};
```

---

## 🚀 HIZLI: Meta Tag Content Kısmını Gönderin

Google Search Console'dan aldığınız meta tag'in **content** kısmını buraya yazın:

**Örnek:**
- `hicGUyJdEwjxF5oH3e6FQ`
- `abc123xyz789`
- vb.

Gönderin, hemen ekleyeyim! 🚀










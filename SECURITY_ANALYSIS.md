# 🔒 Güvenlik Analizi: SIM Paketi Seçimi → Stripe Ödeme Akışı

**Tarih:** 26 Ocak 2026  
**Analiz Edilen Akış:** eSIM paketi seçimi → Stripe checkout → Ödeme işleme

---

## 📋 Mevcut Akış Özeti

### 1. Frontend (Kullanıcı Tarafı)
- Kullanıcı `data/countries.json`'dan yüklenen paketlerden birini seçer
- Frontend %15 indirim hesaplar: `discountedPrice = originalPrice * 0.85`
- `/api/checkout` endpoint'ine POST isteği gönderir:
  ```json
  {
    "packageId": "esim_3GB_30D_US_V2",
    "packageName": "United States – 3GB",
    "price": 8.49,  // İndirimli fiyat
    "currency": "$"
  }
  ```

### 2. Backend (`/api/checkout`)
- Gelen verileri alır
- **Sadece şu kontrolleri yapar:**
  - ✅ `packageName` ve `price` var mı?
  - ✅ Disposable email kontrolü (email varsa)
  - ✅ Minimum fiyat kontrolü ($3)
- **Stripe checkout session oluşturur** (gelen fiyatla)

### 3. Webhook (`/api/webhooks/stripe`)
- Ödeme tamamlandığında tetiklenir
- `payment_status === 'paid'` kontrolü
- Minimum tutar kontrolü ($3)
- eSimGo API'ye sipariş gönderir

---

## 🚨 Tespit Edilen Güvenlik Riskleri

### ⚠️ KRİTİK RİSKLER

#### 1. **Fiyat Manipülasyonu (Price Manipulation)**
**Risk Seviyesi:** 🔴 **KRİTİK**

**Açıklama:**
- Backend, frontend'den gelen fiyatı doğrulamıyor
- Kullanıcı browser DevTools ile fiyatı değiştirebilir
- Örnek saldırı:
  ```javascript
  // Saldırgan DevTools'da şunu yapabilir:
  fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      packageId: "esim_100GB_30D_US_V2",  // $100 paket
      packageName: "United States – 100GB",
      price: 0.01,  // ❌ Manipüle edilmiş fiyat!
      currency: "$"
    })
  })
  ```

**Etki:**
- Saldırgan $100'luk paketi $0.01'e alabilir
- Minimum $3 kontrolü varsa, $3'e düşürebilir
- İşletme ciddi finansal kayıp yaşar

**Mevcut Koruma:**
- ❌ Yok (sadece minimum $3 kontrolü var)

---

#### 2. **Paket ID Manipülasyonu (Package ID Manipulation)**
**Risk Seviyesi:** 🔴 **KRİTİK**

**Açıklama:**
- Backend, `packageId`'nin geçerli olup olmadığını kontrol etmiyor
- Saldırgan var olmayan veya farklı bir `packageId` gönderebilir
- Örnek saldırı:
  ```javascript
  {
    packageId: "esim_FAKE_PACKAGE_V2",  // ❌ Geçersiz paket
    packageName: "Fake Package",
    price: 3.00,
    currency: "$"
  }
  ```

**Etki:**
- eSimGo API'ye geçersiz paket gönderilir
- Sipariş başarısız olur veya yanlış paket sağlanır
- Müşteri memnuniyetsizliği

**Mevcut Koruma:**
- ❌ Yok

---

#### 3. **Para Birimi Manipülasyonu (Currency Manipulation)**
**Risk Seviyesi:** 🟡 **ORTA**

**Açıklama:**
- Frontend para birimini gönderiyor, backend sadece mapping yapıyor
- Saldırgan farklı para birimi gönderebilir
- Örnek: USD paketi EUR olarak göndermek

**Etki:**
- Fiyat karşılaştırması yanlış olabilir
- Döviz kuru farklarından kaynaklanan kayıplar

**Mevcut Koruma:**
- ⚠️ Kısmi (sadece mapping var, doğrulama yok)

---

#### 4. **İndirim Manipülasyonu (Discount Manipulation)**
**Risk Seviyesi:** 🟡 **ORTA**

**Açıklama:**
- Frontend %15 indirim hesaplıyor
- Backend indirimli fiyatı doğrulamıyor
- Saldırgan daha yüksek indirim uygulayabilir

**Etki:**
- Beklenenden daha düşük gelir
- İndirim politikası ihlali

**Mevcut Koruma:**
- ❌ Yok

---

### ⚠️ ORTA RİSKLER

#### 5. **Rate Limiting Eksikliği**
**Risk Seviyesi:** 🟡 **ORTA**

**Açıklama:**
- `/api/checkout` endpoint'inde rate limiting yok
- Saldırgan çok sayıda istek gönderebilir

**Etki:**
- DDoS saldırısı
- Stripe API quota aşımı
- Sunucu kaynaklarının tükenmesi

**Mevcut Koruma:**
- ❌ Yok (Next.js/Vercel varsayılan koruması dışında)

---

#### 6. **CSRF Koruması Eksikliği**
**Risk Seviyesi:** 🟡 **ORTA**

**Açıklama:**
- CSRF token kontrolü yok
- Kötü niyetli site kullanıcı adına checkout başlatabilir

**Etki:**
- İstenmeyen ödemeler
- Kullanıcı deneyimi sorunları

**Mevcut Koruma:**
- ❌ Yok

---

#### 7. **Paket Verisi Doğrulama Eksikliği**
**Risk Seviyesi:** 🟡 **ORTA**

**Açıklama:**
- Backend, paket bilgilerini `countries.json`'dan doğrulamıyor
- Paket fiyatı, para birimi, geçerliliği kontrol edilmiyor

**Etki:**
- Tutarsız siparişler
- Yanlış paket sağlanması

**Mevcut Koruma:**
- ❌ Yok

---

### ✅ İYİ UYGULAMALAR (Mevcut)

1. ✅ **3D Secure (3DS)**: Stripe checkout'ta `request_three_d_secure: "automatic"` aktif
2. ✅ **Disposable Email Kontrolü**: Checkout'ta ve webhook'ta kontrol var
3. ✅ **Minimum Tutar Kontrolü**: $3 minimum tutar hem checkout'ta hem webhook'ta
4. ✅ **Webhook Signature Verification**: Stripe webhook imzası doğrulanıyor
5. ✅ **Payment Status Kontrolü**: Webhook'ta sadece `paid` durumunda eSIM sağlanıyor
6. ✅ **Stripe Radar Rules**: STRIPE_RADAR_RULES.md'de ek kurallar belgelenmiş

---

## 🛡️ Önerilen Güvenlik Önlemleri

### 🔴 ÖNCELİKLİ (Hemen Uygulanmalı)

#### 1. **Server-Side Paket Doğrulama**
**Açıklama:**
- Backend'de `countries.json`'dan paket bilgilerini yükle
- Gelen `packageId`'ye göre gerçek fiyatı bul
- Frontend'den gelen fiyatı gerçek fiyatla karşılaştır
- İndirim hesaplamasını backend'de yap

**Uygulama:**
```typescript
// app/api/checkout/route.ts içinde
import countriesData from "@/data/countries.json";

function findPackageById(packageId: string) {
  for (const country of countriesData) {
    const allPackages = [
      ...(country.standardPackages || []),
      ...(country.unlimitedLitePackages || []),
      ...(country.unlimitedPlusPackages || [])
    ];
    const pkg = allPackages.find(p => p.bundleId === packageId);
    if (pkg) return pkg;
  }
  return null;
}

// POST handler içinde:
const actualPackage = findPackageById(packageId);
if (!actualPackage) {
  return NextResponse.json({ error: "Invalid package" }, { status: 400 });
}

// İndirim hesaplaması backend'de
const DISCOUNT_RATE = 0.15; // %15
const expectedPrice = Math.round(actualPackage.price * (1 - DISCOUNT_RATE) * 100) / 100;

// Fiyat toleransı (yuvarlama hataları için ±0.01)
if (Math.abs(price - expectedPrice) > 0.01) {
  return NextResponse.json({ error: "Price mismatch" }, { status: 400 });
}
```

**Etki:**
- ✅ Fiyat manipülasyonu engellenir
- ✅ Geçersiz paket ID'leri engellenir
- ✅ İndirim manipülasyonu engellenir

---

#### 2. **Para Birimi Doğrulama**
**Açıklama:**
- Paket verisinden gerçek para birimini al
- Frontend'den gelen para birimiyle karşılaştır

**Uygulama:**
```typescript
if (actualPackage.currency !== currency) {
  return NextResponse.json({ error: "Currency mismatch" }, { status: 400 });
}
```

---

#### 3. **Rate Limiting**
**Açıklama:**
- IP bazlı rate limiting ekle
- Örnek: 10 dakikada 5 checkout denemesi

**Uygulama:**
- Next.js için: `@upstash/ratelimit` veya `@vercel/kv` kullan
- Veya Vercel Edge Middleware ile rate limiting

---

### 🟡 ÖNEMLİ (Kısa Vadede)

#### 4. **CSRF Token Koruması**
**Açıklama:**
- Next.js'in built-in CSRF korumasını aktif et
- Veya custom CSRF token implementasyonu

**Uygulama:**
- Next.js 13+ App Router'da genelde otomatik koruma var
- Ekstra güvenlik için token tabanlı sistem eklenebilir

---

#### 5. **Request Validation (Zod/Schema)**
**Açıklama:**
- Gelen request body'yi schema ile doğrula
- Type safety ve validation bir arada

**Uygulama:**
```typescript
import { z } from 'zod';

const checkoutSchema = z.object({
  packageId: z.string().min(1),
  packageName: z.string().min(1),
  price: z.number().positive().min(3),
  currency: z.enum(['$', '€', '£', 'USD', 'EUR', 'GBP']),
  email: z.string().email().optional(),
  isFirstPurchase: z.boolean().optional(),
});
```

---

#### 6. **Logging ve Monitoring**
**Açıklama:**
- Şüpheli aktiviteleri logla
- Fiyat uyumsuzluklarını alert et

**Uygulama:**
- Fiyat uyumsuzluğu tespit edildiğinde:
  - Log'a kaydet (IP, packageId, beklenen fiyat, gelen fiyat)
  - Monitoring sistemine bildir (Sentry, LogRocket, vb.)

---

### 🟢 İYİLEŞTİRME (Uzun Vadede)

#### 7. **Paket Veritabanı**
**Açıklama:**
- `countries.json` yerine veritabanı kullan
- Daha hızlı arama ve güncelleme

#### 8. **Caching**
**Açıklama:**
- Paket verilerini cache'le (Redis, Vercel KV)
- Her istekte JSON dosyasını okumayı önle

#### 9. **Webhook'ta Ek Doğrulama**
**Açıklama:**
- Webhook'ta da paket doğrulaması yap
- Metadata'daki fiyatı gerçek fiyatla karşılaştır

---

## 📊 Risk Özeti

| Risk | Seviye | Mevcut Koruma | Önerilen Önlem | Öncelik |
|------|--------|---------------|----------------|---------|
| Fiyat Manipülasyonu | 🔴 Kritik | ❌ Yok | Server-side doğrulama | 🔴 Yüksek |
| Paket ID Manipülasyonu | 🔴 Kritik | ❌ Yok | Paket doğrulama | 🔴 Yüksek |
| Para Birimi Manipülasyonu | 🟡 Orta | ⚠️ Kısmi | Para birimi doğrulama | 🟡 Orta |
| İndirim Manipülasyonu | 🟡 Orta | ❌ Yok | Backend'de indirim hesaplama | 🟡 Orta |
| Rate Limiting | 🟡 Orta | ❌ Yok | IP bazlı limit | 🟡 Orta |
| CSRF | 🟡 Orta | ❌ Yok | CSRF token | 🟡 Orta |
| Paket Verisi Doğrulama | 🟡 Orta | ❌ Yok | JSON'dan doğrulama | 🟡 Orta |

---

## 🎯 Uygulama Önceliği

1. **Hemen (Bugün):**
   - ✅ Server-side paket doğrulama
   - ✅ Fiyat doğrulama
   - ✅ Para birimi doğrulama

2. **Bu Hafta:**
   - ✅ Rate limiting
   - ✅ Request validation (Zod)
   - ✅ Logging iyileştirme

3. **Bu Ay:**
   - ✅ CSRF koruması
   - ✅ Webhook'ta ek doğrulama
   - ✅ Monitoring kurulumu

---

## 📝 Notlar

- Mevcut Stripe Radar Rules iyi yapılandırılmış (STRIPE_RADAR_RULES.md)
- Webhook signature verification çalışıyor
- 3D Secure aktif
- Minimum tutar kontrolü var

**En kritik eksiklik:** Frontend'den gelen fiyat ve paket bilgilerinin server-side doğrulanmaması.

---

## ✅ Onay Gereken Değişiklikler

Aşağıdaki önlemler uygulanmadan önce onayınız gerekiyor:

1. **Server-side paket doğrulama** (countries.json'dan paket bulma)
2. **Backend'de indirim hesaplama** (frontend'den fiyat almak yerine)
3. **Rate limiting ekleme** (hangi servis kullanılacak?)
4. **Request validation** (Zod kütüphanesi ekleme)

Lütfen hangi önlemleri uygulamak istediğinizi belirtin, ben de kod değişikliklerini yapayım.

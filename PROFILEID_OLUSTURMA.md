# profileID Oluşturma

## ✅ KOD GÜNCELLENDİ

**profileID artık otomatik olarak oluşturuluyor!**

---

## 🔧 NASIL ÇALIŞIYOR?

### Seçenek 1: Stripe Session ID ile (Önerilen)
```typescript
profileID: "primesim_cs_live_a1Bkvwljv1iABagyeEibh4eeBhPhS1TAUbBH7L6xMrKdH3yYDruQ0Jro"
```
✅ **En unique** - Her sipariş için farklı
✅ **Stripe session ID kullanılıyor**

### Seçenek 2: Email + Timestamp ile
```typescript
profileID: "primesim_customer_12345678"
```
✅ **Unique** - Email + timestamp kombinasyonu
✅ **Her sipariş için farklı**

### Seçenek 3: Sadece Email (Eski)
```typescript
profileID: "customer@example.com"
```
⚠️ **Aynı müşteri için aynı ID**

---

## 📋 KOD DETAYLARI

**`generateProfileID()` fonksiyonu:**
1. Stripe Session ID varsa → `primesim_{sessionId}`
2. Yoksa → `primesim_{emailHash}_{timestamp}`

**Örnek profileID'ler:**
- `primesim_cs_live_a1Bkvwljv1iABagyeEibh4eeBhPhS1TAUbBH7L6xMrKdH3yYDruQ0Jro`
- `primesim_customer_12345678`
- `primesim_testuser_87654321`

---

## 🎯 AVANTAJLAR

1. ✅ **Her sipariş için unique ID**
2. ✅ **Stripe session ID ile kolay takip**
3. ✅ **Email'den hash oluşturma (güvenlik)**
4. ✅ **Otomatik oluşturuluyor**

---

## ⚠️ ÖNEMLİ NOT

**Eğer eSimGo API profileID formatını değiştirmek isterseniz:**

`app/lib/esimgo.ts` dosyasındaki `generateProfileID()` fonksiyonunu düzenleyin:

```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // İstediğiniz formatı yazın
  return "your-custom-format";
}
```

---

**Kod güncellendi! profileID artık otomatik oluşturuluyor. ✅**





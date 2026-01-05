# eSimGo'da profileID Oluşturma

## ✅ ÖNEMLİ: profileID'yi BİZ OLUŞTURUYORUZ!

**eSimGo Dashboard'da profileID oluşturmanıza gerek YOK!**

Kod otomatik olarak profileID oluşturuyor ve eSimGo API'ye gönderiyor.

---

## 🔧 NASIL ÇALIŞIYOR?

### 1. Kod Otomatik Oluşturuyor

**`app/lib/esimgo.ts` dosyasında:**
```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // Stripe Session ID varsa kullan
  if (sessionId) {
    return `primesim_${sessionId.replace('cs_', '').substring(0, 20)}`;
  }
  
  // Yoksa email + timestamp
  const timestamp = Date.now().toString().slice(-8);
  const emailHash = email.split('@')[0].substring(0, 10);
  return `primesim_${emailHash}_${timestamp}`;
}
```

### 2. eSimGo API'ye Gönderiliyor

**Her siparişte:**
```json
{
  "package_id": "usa-1gb-7days",
  "email": "customer@example.com",
  "quantity": 1,
  "callback_url": "https://getprimesim.com/api/esimgo/webhook",
  "version": "v3",
  "profileID": "primesim_cs_live_a1Bkvwljv1iABagyeEibh4eeBhPhS1TAUbBH7L6xMrKdH3yYDruQ0Jro"
}
```

---

## 📋 eSimGo Dashboard'da Ne Yapmalısınız?

### Hiçbir Şey! ✅

**eSimGo Dashboard'da:**
- ❌ Profile oluşturmanıza gerek YOK
- ❌ profileID oluşturmanıza gerek YOK
- ❌ Manuel işlem yapmanıza gerek YOK

**Kod otomatik olarak:**
- ✅ profileID oluşturuyor
- ✅ eSimGo API'ye gönderiyor
- ✅ Her sipariş için unique ID kullanıyor

---

## 🎯 profileID FORMATI

**Oluşturulan profileID formatı:**
```
primesim_{stripe_session_id}
```

**Örnek:**
```
primesim_cs_live_a1Bkvwljv1iABagyeEibh4eeBhPhS1TAUbBH7L6xMrKdH3yYDruQ0Jro
```

---

## ⚠️ ÖNEMLİ NOTLAR

### 1. eSimGo API profileID'yi Otomatik Kabul Eder

**eSimGo API:**
- profileID'yi otomatik olarak kabul eder
- Her sipariş için unique profileID kullanılır
- eSimGo Dashboard'da manuel işlem gerekmez

### 2. Eğer eSimGo API Hata Verirse

**Hata mesajı:**
```
Invalid profileID
Profile not found
```

**Çözüm:**
- eSimGo API dokümantasyonunda profileID formatını kontrol edin
- Veya eSimGo support'a sorun: "profileID formatı nasıl olmalı?"

### 3. profileID Formatını Değiştirmek İsterseniz

**`app/lib/esimgo.ts` dosyasında:**
```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // İstediğiniz formatı yazın
  return "your-custom-format";
}
```

---

## 🚀 TEST ETME

### 1. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Ödeme yapın

### 2. Logları Kontrol Edin

**Vercel Dashboard → Logs** sekmesinde:
```
📝 Generated profileID: primesim_cs_live_a1Bkvwljv1iABagyeEibh4eeBhPhS1TAUbBH7L6xMrKdH3yYDruQ0Jro
```

### 3. eSimGo Dashboard'da Kontrol Edin

**eSimGo Dashboard → Orders:**
- Sipariş görünüyor mu?
- profileID doğru mu?

---

## ✅ ÖZET

**eSimGo Dashboard'da:**
- ❌ Hiçbir şey yapmanıza gerek YOK
- ✅ Kod otomatik olarak profileID oluşturuyor
- ✅ eSimGo API'ye otomatik gönderiliyor

**Sadece test edin ve çalıştığını kontrol edin! 🚀**





# 🔧 eSIM Otomatik Assign Sorunu Çözümü

## 🚨 Sorun

- Email'de gelen eSIM çalışmıyor
- Inventory'den düşmüyor
- Manuel assign edince çalışıyor

**Anlamı:** `assign: true` var ama otomatik assign olmuyor.

---

## ✅ Yapılan Değişiklik

### profileID Formatı Değiştirildi

**Önceki (UUID):**
```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // UUID v4 formatında profileID oluştur
  return generateUUID(); // Örn: 9c7f2a01-8b4d-4c11-9a22-abcdef123456
}
```

**Yeni (Email):**
```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // eSimGo API'de profileID genelde email olarak kullanılır
  // Manuel assign edince çalışıyorsa, profileID formatı sorunlu olabilir
  return email; // Örn: customer@example.com
}
```

---

## 🔍 Neden Bu Değişiklik?

1. **Manuel assign çalışıyor** → API request formatı doğru
2. **Otomatik assign çalışmıyor** → `profileID` formatı yanlış olabilir
3. **eSimGo genelde email'i profileID olarak kabul eder** → UUID yerine email kullanıyoruz

---

## 📋 Request Formatı (Değişmedi)

```json
{
  "type": "transaction",
  "assign": true,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "esim_1GB_7D_US_V2",
      "allowReassign": false
    }
  ],
  "profileID": "customer@example.com",  // ✅ Artık email formatında
  "email": "customer@example.com",
  "callback_url": "https://getprimesim.com/api/esimgo/webhook"
}
```

---

## 🧪 Test

1. **Yeni bir test siparişi ver**
2. **Vercel Runtime Logs'da kontrol et:**
   ```
   🔍 eSimGo Assignment Debug:
     - assign: true (otomatik assign aktif)
     - profileID: customer@example.com (email formatında)
     - email: customer@example.com
     - callback_url: https://getprimesim.com/api/esimgo/webhook
   ```
3. **eSimGo Dashboard'da kontrol et:**
   - Inventory'den düştü mü?
   - eSIM otomatik assign oldu mu?
   - QR code geldi mi?

---

## ⚠️ Eğer Hala Çalışmazsa

### Alternatif 1: UUID + Email Kombinasyonu

```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // Email + UUID kombinasyonu
  const uuid = generateUUID();
  return `${email}_${uuid}`;
}
```

### Alternatif 2: Session ID Kullan

```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // Session ID varsa kullan, yoksa email
  return sessionId || email;
}
```

### Alternatif 3: eSimGo Support'a Sor

- "profileID formatı ne olmalı?"
- "assign: true ile otomatik assign neden çalışmıyor?"
- "Manuel assign edince çalışıyor, otomatik neden çalışmıyor?"

---

## 📝 Log Kontrolü

**Vercel Runtime Logs'da şu logları ara:**

```
📝 Generated profileID: customer@example.com
🔍 eSimGo Assignment Debug:
  - assign: true (otomatik assign aktif)
  - profileID: customer@example.com (email formatında)
  - email: customer@example.com
  - callback_url: https://getprimesim.com/api/esimgo/webhook
```

**Eğer bu loglar görünüyorsa:**
- Request doğru gönderiliyor
- eSimGo API'den response bekleniyor

---

## ✅ Başarı Kriterleri

- [ ] eSIM otomatik assign oluyor
- [ ] Inventory'den düşüyor
- [ ] QR code email'de geliyor
- [ ] eSimGo Dashboard'da görünüyor

---

**Deploy edildi! Test et ve sonucu bildir. 🚀**











# eSimGo profileID Format Kontrolü

## ⚠️ ÖNEMLİ: Format Ben Oluşturdum!

**`primesim_cs_live_...` formatını ben oluşturdum, eSimGo API dokümantasyonundan değil!**

**eSimGo API'nin gerçek formatını bilmiyoruz!**

---

## 🔍 NE YAPMALIYIZ?

### 1. eSimGo API Dokümantasyonunu Kontrol Edin

**eSimGo API dokümantasyonunda şunları arayın:**
- `profileID` alanı var mı?
- `profileID` formatı nasıl olmalı?
- `profileID` zorunlu mu, opsiyonel mi?
- Örnek `profileID` değerleri neler?

### 2. eSimGo Support'a Sorun

**Email atın:**
```
Subject: profileID Format Sorunu

Merhaba,

eSimGo API'yi entegre etmeye çalışıyorum.

profileID alanına ne yazmalıyım?
- Format nasıl olmalı?
- Zorunlu mu, opsiyonel mi?
- Örnek değer nedir?

Teşekkürler.
```

### 3. Test Edin

**Farklı formatları deneyin:**
- Email: `customer@example.com`
- Stripe Session ID: `cs_live_...`
- Custom format: `primesim_...`
- Boş bırakın (opsiyonel ise)

---

## 🔧 ŞU ANKİ KOD

**`app/lib/esimgo.ts` dosyasında:**
```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // Ben oluşturdum - eSimGo API formatını bilmiyoruz!
  if (sessionId) {
    return `primesim_${sessionId.replace('cs_', '').substring(0, 20)}`;
  }
  const timestamp = Date.now().toString().slice(-8);
  const emailHash = email.split('@')[0].substring(0, 10);
  return `primesim_${emailHash}_${timestamp}`;
}
```

**Bu format eSimGo API'de çalışmayabilir!**

---

## 🎯 OLASI FORMATLAR

### Format 1: Email (En Basit)
```json
{
  "profileID": "customer@example.com"
}
```
✅ **En güvenli** - Email zaten var

### Format 2: Stripe Customer ID
```json
{
  "profileID": "cus_xxxxx"
}
```
⚠️ Stripe'dan customer ID almak gerekir

### Format 3: Custom Format (Şu Anki)
```json
{
  "profileID": "primesim_cs_live_..."
}
```
❓ **eSimGo API kabul eder mi bilinmiyor**

### Format 4: Boş Bırakma
```json
{
  // profileID yok
}
```
✅ **Eğer opsiyonel ise** - En güvenli

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **eSimGo API dokümantasyonunda profileID formatını kontrol edin**
2. ✅ **eSimGo support'a email atın**
3. ✅ **Test siparişi yapın ve hata mesajını kontrol edin**

---

## 🔧 HIZLI ÇÖZÜM

**Eğer eSimGo API profileID'yi kabul etmezse:**

**Seçenek 1: Email kullan**
```typescript
profileID: email
```

**Seçenek 2: Boş bırak**
```typescript
// profileID: undefined (opsiyonel ise)
```

**Seçenek 3: eSimGo formatını öğren**
- Dokümantasyondan öğren
- Support'tan sor

---

**eSimGo API dokümantasyonunda profileID formatını kontrol edin veya support'a sorun! 🔍**
















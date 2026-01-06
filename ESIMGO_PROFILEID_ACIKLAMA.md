# eSimGo profileID Açıklaması

## ✅ PROFILEID NE OLACAK?

**profileID için:** Müşteri email adresini kullanıyoruz

**Sebep:**
- profileID genelde müşteri kimliğini temsil eder
- Email adresi müşteriyi benzersiz olarak tanımlar
- eSimGo API'de profileID opsiyonel olabilir, ama email zorunlu

---

## 📋 KOD GÜNCELLEMESİ

**Güncellenen kod:**
```typescript
body: JSON.stringify({
  package_id: packageId,
  email: email,
  quantity: 1,
  callback_url: callbackUrl,
  version: "v3",
  profileID: email, // ✅ Email kullanıyoruz
}),
```

---

## 🔍 ALTERNATIF SEÇENEKLER

### Seçenek 1: Email (Şu Anki)
```json
{
  "profileID": "customer@example.com"
}
```
✅ **Önerilen** - Email zaten var, ekstra işlem yok

### Seçenek 2: Stripe Customer ID
```json
{
  "profileID": "cus_xxxxx"
}
```
⚠️ Stripe'dan customer ID almak gerekir

### Seçenek 3: Matching ID (CSV'deki)
```json
{
  "profileID": "matching-id-from-csv"
}
```
⚠️ CSV'den Matching ID almak gerekir, ama bu sipariş sonrası gelir

### Seçenek 4: Boş Bırakma
```json
{
  // profileID yok
}
```
⚠️ eSimGo API profileID zorunlu ise hata verir

---

## 🎯 ÖNERİLEN ÇÖZÜM

**Email kullanın:**
- ✅ Zaten elimizde var
- ✅ Müşteriyi benzersiz tanımlar
- ✅ Ekstra işlem gerektirmez

---

## ⚠️ ÖNEMLİ NOT

**Eğer eSimGo API profileID'yi kabul etmezse:**
- eSimGo API dokümantasyonunda profileID'nin zorunlu olup olmadığını kontrol edin
- Veya eSimGo support'a sorun: "profileID alanına ne yazmalıyım?"

---

**Kod güncellendi! profileID için email kullanılıyor. ✅**














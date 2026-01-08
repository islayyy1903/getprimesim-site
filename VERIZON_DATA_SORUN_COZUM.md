# 🔧 Verizon eSIM Data Sorunu Çözümü

## 🚨 Sorun

- Verizon görünüyor (eSIM assign oluyor)
- Ama data çalışmıyor
- Inventory'den düşmüyor

**Anlamı:** Bundle ID yanlış veya bundle aktif değil!

---

## 🔍 Muhtemel Nedenler

### 1. Bundle ID Yanlış
- `esim_1GB_7D_US_V2` yerine başka bir bundle gönderiliyor
- eSimGo'da bundle ismi farklı olabilir

### 2. Bundle Aktif Değil
- eSimGo Dashboard'da bundle aktif değil
- Stok yok
- Bundle expire olmuş

### 3. Bundle Formatı Yanlış
- eSimGo API'de bundle formatı farklı olabilir
- Örn: `esim_1GB_7D_US_V2` yerine `1GB_7D_US` gibi

---

## ✅ Yapılan Değişiklikler

### 1. Bundle ID Debug Logları Eklendi

**Vercel Runtime Logs'da şu logları göreceksin:**

```
🔍 Bundle ID Debug:
  - Input packageId: usa-1gb-7days
  - Bundle name sent to API: esim_1GB_7D_US_V2
  - Expected format: esim_{DATA}_{DAYS}_{COUNTRY}_V2
  - ⚠️ If bundle name is wrong, eSIM will assign but data won't work!
```

### 2. Response Bundle Kontrolü Eklendi

**eSimGo API response'unda bundle bilgisi kontrol ediliyor:**

```
📦 Bundle Info from Response:
  - Bundle: esim_1GB_7D_US_V2
  - Sent bundle: esim_1GB_7D_US_V2
```

**Eğer bundle mismatch varsa:**
```
⚠️ WARNING: Bundle mismatch!
  - Sent: esim_1GB_7D_US_V2
  - Received: farkli_bundle_ismi
  - This may cause data not to work!
```

---

## 🧪 Test ve Kontrol

### ADIM 1: Vercel Runtime Logs Kontrol

1. **Yeni bir test siparişi ver**
2. **Vercel Runtime Logs'da şu logları ara:**

```
📦 Package: USA eSIM – 1GB → Bundle: esim_1GB_7D_US_V2
🔍 Bundle ID Debug:
  - Input packageId: ...
  - Bundle name sent to API: esim_1GB_7D_US_V2
📦 Bundle Info from Response:
  - Bundle: ...
  - Sent bundle: esim_1GB_7D_US_V2
```

### ADIM 2: eSimGo Dashboard Kontrol

1. **eSimGo Dashboard'a git**
2. **Orders sekmesine git**
3. **Son siparişi bul**
4. **Bundle ismini kontrol et:**
   - Hangi bundle gönderilmiş?
   - `esim_1GB_7D_US_V2` mi?
   - Yoksa farklı bir bundle mı?

### ADIM 3: Bundle Mapping Kontrol

**Eğer bundle ismi farklıysa:**

1. **eSimGo Dashboard'dan doğru bundle ismini bul**
2. **`app/lib/esimgo.ts` dosyasındaki `bundleMap`'i güncelle:**

```typescript
const bundleMap: Record<string, string> = {
  "USA eSIM – 1GB": "DOGRU_BUNDLE_ISMI_BURAYA", // ⬅️ Güncelle
  // ...
};
```

---

## 🔧 Olası Çözümler

### Çözüm 1: Bundle İsmini Düzelt

**eSimGo Dashboard'dan doğru bundle ismini bul ve güncelle:**

```typescript
// app/lib/esimgo.ts
const bundleMap: Record<string, string> = {
  "USA eSIM – 1GB": "esim_1GB_7D_US_V2", // ⬅️ Doğru bundle ismi
  // ...
};
```

### Çözüm 2: eSimGo API'den Bundle Listesi Al

**eSimGo API'den mevcut bundle'ları al:**

```bash
GET /v2.3/catalogue
Headers:
  X-API-Key: YOUR_API_KEY
  Accept: application/json
```

**Response'dan doğru bundle isimlerini bul ve güncelle.**

### Çözüm 3: eSimGo Support'a Sor

**eSimGo support'a sor:**
- "USA 1GB 7 gün bundle'ının doğru ismi nedir?"
- "Verizon görünüyor ama data çalışmıyor, bundle ID doğru mu?"
- "Inventory'den düşmüyor, bundle aktif mi?"

---

## 📋 Kontrol Checklist

- [ ] Vercel Runtime Logs'da bundle ID logları görünüyor
- [ ] Bundle name sent to API doğru mu?
- [ ] eSimGo Dashboard'da bundle ismi kontrol edildi
- [ ] Bundle mapping güncellendi (eğer yanlışsa)
- [ ] Yeni test siparişi verildi
- [ ] Data çalışıyor mu kontrol edildi

---

## 🎯 Hızlı Test

1. **Yeni bir test siparişi ver**
2. **Vercel Runtime Logs'da bundle ID loglarını kontrol et**
3. **eSimGo Dashboard'da bundle ismini kontrol et**
4. **Eğer farklıysa, bundle mapping'i güncelle**

---

## ⚠️ Önemli Notlar

- **Bundle ID yanlışsa:** eSIM assign olur ama data çalışmaz
- **Bundle aktif değilse:** eSIM assign olmaz
- **Stok yoksa:** eSimGo API hata verir

**Deploy edildi! Test et ve logları kontrol et. 🚀**















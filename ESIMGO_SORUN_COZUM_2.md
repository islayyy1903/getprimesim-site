# eSimGo Sorun Çözümü - DNS ve Package ID

## 🚨 SORUNLAR

### Sorun 1: DNS Hatası
```
Error: getaddrinfo ENOTFOUND api.esimgo.io
```

**Anlamı:** `api.esimgo.io` domain'i bulunamıyor!

### Sorun 2: Package ID Yanlış
```
eSimGo Package ID: uk-1gb-7days
```

**Olması gereken:** `esim_1GB_7D_GB_V2`

**Neden:** `mapPackageToEsimGo` fonksiyonu fallback'e düşüyor!

---

## ✅ YAPILAN DÜZELTMELER

### 1. Detaylı Log Eklendi

**`app/lib/esimgo.ts` dosyasına eklendi:**
- API URL log'u
- API Key log'u
- Package mapping hata log'u

### 2. Package Mapping Hata Mesajı İyileştirildi

**Önceki:**
```typescript
console.warn(`⚠️ Bundle name not found for package: ${packageName}`);
```

**Yeni:**
```typescript
console.error(`❌ Bundle name not found for package: "${packageName}"`);
console.error(`   Available packages:`, Object.keys(bundleMap));
console.error(`   Using fallback: "${fallback}" (THIS MAY BE WRONG!)`);
```

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. DNS Test

**Terminal'de:**
```bash
nslookup api.esimgo.io
```

**Eğer bulamazsa:**
- eSimGo'ya sorun: API URL doğru mu?
- Alternatif domain var mı?

### 2. Package Name Kontrolü

**Vercel Loglarında:**
```
📦 Package: UK eSIM – 1GB → Bundle: esim_1GB_7D_GB_V2
```

**VEYA hata:**
```
❌ Bundle name not found for package: "UK eSIM – 1GB"
   Available packages: [...]
```

**Eğer hata görürseniz:**
- Package name Stripe metadata'da doğru mu?
- `app/esim/page.tsx` dosyasında package name doğru mu?

### 3. API URL Kontrolü

**Vercel Loglarında:**
```
🔍 eSimGo API Configuration:
  - API URL: https://api.esimgo.io/v3
  - API Key exists: true
```

**Eğer farklı görürseniz:**
- Vercel Environment Variables'da `ESIMGO_API_URL` doğru mu?
- eSimGo Dashboard'dan doğru URL'i kontrol edin

---

## 🎯 OLASI ÇÖZÜMLER

### Çözüm 1: DNS Sorunu

**eSimGo'ya sorun:**
- API URL doğru mu? (`https://api.esimgo.io/v3`)
- Domain aktif mi?
- DNS kayıtları doğru mu?
- Alternatif domain var mı?

### Çözüm 2: Package Name Sorunu

**Kontrol:**
- `app/esim/page.tsx` dosyasında package name'ler doğru mu?
- Stripe metadata'da `packageName` doğru gönderiliyor mu?

**Örnek:**
```typescript
// Doğru
name: "UK eSIM – 1GB"

// Yanlış
name: "UK eSIM - 1GB"  // Tire farklı olabilir
```

### Çözüm 3: API URL Değiştirme

**Eğer DNS sorunu devam ederse:**
- eSimGo'dan alternatif API URL isteyin
- Vercel'de `ESIMGO_API_URL` güncelleyin

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **Kod güncellendi** - Detaylı loglar eklendi
2. ⏳ **DNS test yapın** (`nslookup api.esimgo.io`)
3. ⏳ **Vercel loglarını kontrol edin**
4. ⏳ **eSimGo'ya sorun** (API URL ve DNS)

---

## 🚀 TEST ADIMLARI

1. **Test Siparişi Yapın:**
   - `https://getprimesim.com/esim`
   - UK eSIM – 1GB seçin
   - Ödeme yapın

2. **Vercel Loglarını Kontrol Edin:**
   - `🔍 eSimGo API Configuration:` logunu bulun
   - `📦 Package: UK eSIM – 1GB → Bundle:` logunu bulun
   - `❌ Bundle name not found` hatası var mı?

3. **DNS Test:**
   - Terminal'de `nslookup api.esimgo.io` çalıştırın
   - Eğer bulamazsa, eSimGo'ya sorun

---

**Kod güncellendi! Test edin ve logları paylaşın! 🔍**















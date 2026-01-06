# eSimGo Bundle İsimleri

## ✅ BULUNAN BUNDLE

**CSV'den görülen:**
- **USA eSIM – 1GB** → Bundle: `esim_1GB_7D_US_V2` ✅

---

## 📋 TÜM BUNDLE İSİMLERİ

**Website Paketleri → eSimGo Bundle İsimleri:**

1. ✅ **USA eSIM – 1GB** → `esim_1GB_7D_US_V2` (CSV'den görüldü)
2. ⚠️ **USA eSIM – 3GB** → `esim_3GB_30D_US_V2` (Tahmin - kontrol edin)
3. ⚠️ **UK eSIM – 1GB** → `esim_1GB_7D_UK_V2` (Tahmin - kontrol edin)
4. ⚠️ **UK eSIM – 3GB** → `esim_3GB_30D_UK_V2` (Tahmin - kontrol edin)
5. ⚠️ **Germany eSIM – 1GB** → `esim_1GB_7D_DE_V2` (Tahmin - kontrol edin)
6. ⚠️ **Germany eSIM – 3GB** → `esim_3GB_30D_DE_V2` (Tahmin - kontrol edin)
7. ⚠️ **Global eSIM – 1GB** → `esim_1GB_7D_GL_V2` (Tahmin - kontrol edin)
8. ⚠️ **Global eSIM – 3GB** → `esim_3GB_30D_GL_V2` (Tahmin - kontrol edin)

---

## 🔍 BUNDLE İSİMLERİNİ BULMA

### Yöntem 1: eSimGo Dashboard'dan

**eSimGo Dashboard → Orders veya Inventory:**
- Her siparişte bundle ismi görünür
- CSV export yapın → Bundle kolonuna bakın

### Yöntem 2: eSimGo API Dokümantasyonu

**Dokümantasyonda arayın:**
- "Bundle names" veya "Package bundles"
- "Available bundles" listesi
- Bundle ID'leri

### Yöntem 3: Test Siparişi

**Her paket için test siparişi yapın:**
- eSimGo Dashboard'da siparişi kontrol edin
- Bundle ismini not edin
- Mapping'i güncelleyin

---

## 🔧 KOD GÜNCELLENDİ

**`app/lib/esimgo.ts` dosyasında:**
```typescript
const bundleMap: Record<string, string> = {
  "USA eSIM – 1GB": "esim_1GB_7D_US_V2", // ✅ CSV'den
  "USA eSIM – 3GB": "esim_3GB_30D_US_V2", // ⚠️ Tahmin
  // ... diğer paketler
};
```

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **eSimGo Dashboard'dan diğer paketlerin bundle isimlerini bulun**
2. ✅ **CSV export yapın ve tüm bundle isimlerini not edin**
3. ✅ **`app/lib/esimgo.ts` dosyasındaki `bundleMap`'i güncelleyin**

---

## 🚀 HIZLI ÇÖZÜM

**eSimGo Dashboard'da:**
1. **Orders** veya **Inventory** sekmesine gidin
2. **CSV Export** yapın
3. **Bundle** kolonuna bakın
4. **Tüm bundle isimlerini paylaşın**

**VEYA:**
- Her paket için test siparişi yapın
- Bundle ismini not edin
- Mapping'i güncelleyin

---

**eSimGo Dashboard'dan tüm bundle isimlerini bulun ve paylaşın! 🔍**












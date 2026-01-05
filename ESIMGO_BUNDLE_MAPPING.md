# eSimGo Bundle Mapping

## ✅ BUNDLE FORMATI

**Format:** `esim_{DATA}_{DAYS}_{COUNTRY}_V2`

**Örnekler:**
- `esim_1GB_7D_US_V2` → USA 1GB 7 gün
- `esim_3GB_30D_US_V2` → USA 3GB 30 gün
- `esim_1GB_7D_GB_V2` → UK 1GB 7 gün
- `esim_1GB_7D_DE_V2` → Germany 1GB 7 gün
- `esim_1GB_7D_FR_V2` → France 1GB 7 gün

---

## 📋 TÜM BUNDLE İSİMLERİ

**Website Paketleri → eSimGo Bundle İsimleri:**

1. ✅ **USA eSIM – 1GB** → `esim_1GB_7D_US_V2`
2. ✅ **USA eSIM – 3GB** → `esim_3GB_30D_US_V2`
3. ✅ **UK eSIM – 1GB** → `esim_1GB_7D_GB_V2`
4. ✅ **UK eSIM – 3GB** → `esim_3GB_30D_GB_V2`
5. ✅ **Germany eSIM – 1GB** → `esim_1GB_7D_DE_V2`
6. ✅ **Germany eSIM – 3GB** → `esim_3GB_30D_DE_V2`
7. ⚠️ **Global eSIM – 1GB** → `esim_1GB_7D_GL_V2` (kontrol edin)
8. ⚠️ **Global eSIM – 3GB** → `esim_3GB_30D_GL_V2` (kontrol edin)

---

## 🔍 ÜLKE KODLARI

- **US** = USA (United States)
- **GB** = UK (Great Britain)
- **DE** = Germany (Deutschland)
- **FR** = France
- **GL** = Global (tahmin - kontrol edin)

---

## ⚠️ ÖNEMLİ NOTLAR

### Global Paketler

**Global paketler için bundle formatı farklı olabilir:**
- `esim_1GB_7D_GL_V2` (tahmin)
- `esim_1GB_7D_WW_V2` (Worldwide)
- `esim_1GB_7D_MULTI_V2` (Multi-country)
- Veya başka bir format

**eSimGo Dashboard'dan Global paketlerin bundle isimlerini kontrol edin!**

---

## 🚀 TEST ETME

### 1. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Ödeme yapın

### 2. Logları Kontrol Edin

**Vercel Dashboard → Logs** sekmesinde:
```
📦 Package: USA eSIM – 1GB → Bundle: esim_1GB_7D_US_V2
```

### 3. eSimGo API Response'unu Kontrol Edin

**Başarılı olursa:**
```
✅ eSim purchased successfully
  - Order ID: ...
```

**Hata olursa:**
```
❌ eSimGo API error:
  - Error: Invalid bundle / Bundle not found
```

---

## 🔧 BUNDLE İSİMLERİNİ GÜNCELLEME

**Eğer bundle ismi yanlışsa:**

`app/lib/esimgo.ts` dosyasındaki `bundleMap`'i güncelleyin:

```typescript
const bundleMap: Record<string, string> = {
  "USA eSIM – 1GB": "esim_1GB_7D_US_V2",
  "USA eSIM – 3GB": "esim_3GB_30D_US_V2",
  // ... diğer paketler
};
```

---

**Kod güncellendi! Test edin ve Global paketlerin bundle isimlerini kontrol edin! 🚀**










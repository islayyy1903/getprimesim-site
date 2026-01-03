# eSimGo profileID UUID Formatı

## ✅ FORMAT BULUNDU!

**eSimGo API profileID formatı:** UUID v4

**Örnek:** `9c7f2a01-8b4d-4c11-9a22-abcdef123456`

**Format:** `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`

---

## 🔧 KOD GÜNCELLENDİ

**`app/lib/esimgo.ts` dosyasında:**
```typescript
function generateProfileID(email: string, sessionId?: string): string {
  // UUID v4 formatında profileID oluştur
  function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // Her sipariş için yeni UUID oluştur
  return generateUUID();
}
```

---

## 📋 ÖRNEK profileID'LER

**Oluşturulacak profileID'ler:**
- `9c7f2a01-8b4d-4c11-9a22-abcdef123456`
- `a3b2c1d0-4e5f-4a6b-8c9d-0123456789ab`
- `f1e2d3c4-5b6a-4c7d-8e9f-abcdef123456`

**Her sipariş için farklı UUID!**

---

## ✅ AVANTAJLAR

1. ✅ **eSimGo API formatına uygun**
2. ✅ **Her sipariş için unique**
3. ✅ **UUID v4 standardı**
4. ✅ **Otomatik oluşturuluyor**

---

## 🚀 TEST ETME

### 1. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Ödeme yapın

### 2. Logları Kontrol Edin

**Vercel Dashboard → Logs** sekmesinde:
```
📝 Generated profileID: 9c7f2a01-8b4d-4c11-9a22-abcdef123456
```

### 3. eSimGo API Response'unu Kontrol Edin

**Loglarda:**
```
📥 eSimGo API Response:
  - Full response: {...}
  - profileID kabul edildi mi?
```

---

## ⚠️ ÖNEMLİ NOT

**Eğer eSimGo API hata verirse:**
- Logları kontrol edin
- Hata mesajını paylaşın
- profileID formatını tekrar kontrol edin

---

**Kod güncellendi! profileID artık UUID v4 formatında oluşturuluyor. ✅**




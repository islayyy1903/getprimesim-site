# eSimGo Request Format Güncellendi

## ✅ FORMAT GÜNCELLENDİ

**"failed to parse request body" hatası için format güncellendi!**

---

## 🔧 YENİ FORMAT

### Önceki Format (Yanlış)
```json
{
  "package_id": "usa-1gb-7days",
  "email": "customer@example.com",
  "quantity": 1,
  "callback_url": "https://getprimesim.com/api/esimgo/webhook",
  "version": "v3",
  "profileID": "9c7f2a01-8b4d-4c11-9a22-abcdef123456"
}
```

### Yeni Format (eSimGo API Formatı)
```json
{
  "type": "purchase",
  "assign": false,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "usa-1gb-7days",
      "iccids": [],
      "allowReassign": false
    }
  ],
  "profileID": "9c7f2a01-8b4d-4c11-9a22-abcdef123456",
  "email": "customer@example.com",
  "callback_url": "https://getprimesim.com/api/esimgo/webhook"
}
```

---

## 📋 DEĞİŞİKLİKLER

### 1. `package_id` → `item`
- ❌ `package_id: "usa-1gb-7days"`
- ✅ `item: "usa-1gb-7days"` (order array içinde)

### 2. `order` Array Eklendi
- ✅ `order: [{ type: "bundle", quantity: 1, item: "...", ... }]`

### 3. `type: "purchase"` Eklendi
- ✅ eSim satın alma için "purchase" type'ı

### 4. `assign: false` Eklendi
- ✅ Otomatik atama için false

### 5. `iccids: []` Eklendi
- ✅ Boş array (eSimGo otomatik atar)

---

## 🚀 TEST ETME

### 1. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Ödeme yapın

### 2. Logları Kontrol Edin

**Vercel Dashboard → Logs** sekmesinde:
```
📤 Sending request to eSimGo API...
📥 eSimGo API Response:
  - Full response: {...}
```

**Başarılı olursa:**
```
✅ eSim purchased successfully
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
```

**Hata olursa:**
```
❌ eSimGo API error:
  - Status: 400
  - Error response: {...}
```

---

## ⚠️ ÖNEMLİ NOTLAR

### 1. Paket ID Formatı
**`item` field'ına ne yazılacak?**
- Website'deki paket adı mı? (`USA eSIM – 1GB`)
- eSimGo paket ID'si mi? (`usa-1gb-7days`)
- eSimGo'dan alınan gerçek paket ID'si mi?

**eSimGo API dokümantasyonunda kontrol edin!**

### 2. Eğer Hala Hata Verirse

**Olası sorunlar:**
- `item` field'ı yanlış format
- `type: "purchase"` yerine başka bir type gerekebilir
- `order` array formatı farklı olabilir

**Logları kontrol edin ve hata mesajını paylaşın!**

---

## 🔧 ALTERNATIF FORMATLAR

### Format 1: Purchase Type (Şu Anki)
```json
{
  "type": "purchase",
  "order": [...],
  "profileID": "...",
  "email": "..."
}
```

### Format 2: Validate Type
```json
{
  "type": "validate",
  "assign": false,
  "order": [...],
  "profileID": "..."
}
```

### Format 3: Direkt Order
```json
{
  "order": [...],
  "profileID": "...",
  "email": "..."
}
```

---

**Kod güncellendi! Test edin ve sonuçları paylaşın! 🚀**















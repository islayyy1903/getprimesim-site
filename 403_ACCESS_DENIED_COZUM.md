# 403 Access Denied Hatası - Çözüm

## 🚨 SORUN

```
eSimGo API error: { message: 'access denied' }
❌ eSimGo purchase failed:
- Error: HTTP error! status: 403
```

**Sebep:** Request formatı yanlış veya eksik header'lar!

---

## ✅ ÇÖZÜM: REQUEST FORMATINI DÜZELT

### Hazır Prompt'a Göre Düzeltmeler

**Hazır prompt'ta (`ESIMGO_API_HAZIR_PROMPT.md`) belirtilen format:**

```json
{
  "type": "transaction",
  "assign": true,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "BUNDLE_NAME",
      "allowReassign": false
    }
  ]
}
```

### Yapılan Düzeltmeler

#### 1. `type` Değiştirildi
- ❌ `type: "purchase"` → Yanlış
- ✅ `type: "transaction"` → Doğru (hazır prompt'a göre)

#### 2. `assign` Değiştirildi
- ❌ `assign: false` → Yanlış
- ✅ `assign: true` → Doğru (hazır prompt'a göre)

#### 3. `Accept` Header Eklendi
- ✅ `Accept: application/json` → Hazır prompt'a göre gerekli

#### 4. Gereksiz Field'lar Kaldırıldı
- ❌ `version: "v3"` → Kaldırıldı (v2.3 kullanılıyor)
- ❌ `iccids: []` → Kaldırıldı (hazır prompt'ta yok)

---

## 📋 KONTROL LİSTESİ

### Vercel Environment Variables
- ✅ `ESIMGO_API_URL` = `https://api.esim-go.com/v2.3` (tire ile!)
- ✅ `ESIMGO_API_KEY` = Doğru API key

### Request Format
- ✅ `type: "transaction"`
- ✅ `assign: true`
- ✅ `Accept: application/json` header var

---

## 🔍 HATALI vs DOĞRU FORMAT

### ❌ Hatalı Format (Önceki)
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
  "version": "v3"
}
```

### ✅ Doğru Format (Yeni)
```json
{
  "type": "transaction",
  "assign": true,
  "order": [
    {
      "type": "bundle",
      "quantity": 1,
      "item": "usa-1gb-7days",
      "allowReassign": false
    }
  ]
}
```

---

## 🚀 SONRAKI ADIMLAR

1. ✅ Kod güncellendi (`app/lib/esimgo.ts`)
2. ⏳ **Commit ve push yap**
3. ⏳ **Vercel otomatik deploy yapacak**
4. ⏳ **Test et** (yeni sipariş ver)

---

**Kod düzeltildi! Commit yap ve test et! 🚀**



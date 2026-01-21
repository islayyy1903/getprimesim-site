# QR Code Sorunu - Final Çözüm

## 🚨 SORUN

QR code email'de gönderilmiyor (`QR Code included: false`)

**Sebep:** ZIP parsing implement edilmedi! ZIP dosyası base64 olarak gönderiliyor, ama email PNG base64 bekliyor.

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Vercel Loglarını Kontrol Et

**Arayacağın loglar:**

```
📥 Fetching QR code from /esims/assignments:
  - URL: ...
  - Order Reference: ...
```

**Sonuç ne?**

#### Senaryo A: Endpoint Çağrılıyor Ama Hata Alıyor
```
❌ eSimGo assignments error:
  - Status: 404 / 400 / 401
  - Error: ...
```
**Çözüm:** Endpoint URL'i veya orderReference yanlış olabilir

#### Senaryo B: ZIP Geliyor Ama Parse Edilmiyor
```
✅ ZIP file received, size: XXXX bytes
⚠️ ZIP parsing not implemented yet, returning ZIP as base64
```
**Çözüm:** ZIP parsing implement et (aşağıya bak)

#### Senaryo C: Endpoint Çağrılmıyor
```
⚠️ QR code not in /orders response (expected), fetching from /esims/assignments...
```
Ama `/esims/assignments` logu yok?
**Çözüm:** Kod çalışmıyor, kontrol et

---

## ✅ ÇÖZÜM: ZIP PARSING EKLE

### Seçenek 1: jszip Kullan (Önerilen)

1. **jszip paketini ekle:**
```bash
npm install jszip
```

2. **ZIP parsing kodunu ekle:**

`app/lib/esimgo.ts` dosyasında `getQRCodeFromAssignments()` fonksiyonunu güncelle:

```typescript
import JSZip from 'jszip';

// ZIP dosyasını parse et
const zip = await JSZip.loadAsync(zipBuffer);

// ZIP içindeki dosyaları bul
const fileNames = Object.keys(zip.files);
console.log("📦 ZIP files:", fileNames);

// QR code PNG dosyasını bul (genellikle .png veya .qr uzantılı)
const qrCodeFile = fileNames.find(name => 
  name.toLowerCase().endsWith('.png') || 
  name.toLowerCase().endsWith('.qr')
);

if (qrCodeFile) {
  // PNG dosyasını al
  const qrCodeBlob = await zip.file(qrCodeFile)!.async('blob');
  const qrCodeArrayBuffer = await qrCodeBlob.arrayBuffer();
  const qrCodeBase64 = Buffer.from(qrCodeArrayBuffer).toString('base64');
  
  console.log("✅ QR code PNG extracted from ZIP:", qrCodeFile);
  
  return {
    success: true,
    orderId: orderReference,
    qrCode: qrCodeBase64, // PNG base64
    qrCodeUrl: undefined,
  };
} else {
  console.error("❌ QR code PNG not found in ZIP");
  return {
    success: false,
    error: "QR code PNG not found in ZIP file",
  };
}
```

### Seçenek 2: Accept: application/json Dene (Alternatif)

Belki JSON formatında QR code geliyor? Dene:

```typescript
// Önce JSON dene
const jsonResponse = await fetch(assignmentsUrl, {
  method: "GET",
  headers: {
    "X-API-Key": apiKey,
    "Accept": "application/json",
  },
});

if (jsonResponse.ok) {
  const jsonData = await jsonResponse.json();
  console.log("📥 JSON response:", JSON.stringify(jsonData, null, 2));
  
  // QR code field'ını kontrol et
  const qrCode = jsonData.qr_code || jsonData.qrCode || jsonData.qr_code_base64;
  if (qrCode) {
    return {
      success: true,
      orderId: orderReference,
      qrCode: qrCode,
    };
  }
}

// JSON'da yoksa ZIP dene
const zipResponse = await fetch(assignmentsUrl, {
  method: "GET",
  headers: {
    "X-API-Key": apiKey,
    "Accept": "application/zip",
  },
});
// ... ZIP parsing
```

---

## 📋 YAPILMASI GEREKENLER

1. ⏳ **Vercel loglarını kontrol et** - `/esims/assignments` çağrılıyor mu?
2. ⏳ **jszip paketini ekle** - `npm install jszip`
3. ⏳ **ZIP parsing kodunu ekle** - `app/lib/esimgo.ts` dosyasını güncelle
4. ⏳ **Deploy et ve test et**

---

## 🔍 ALTERNATIF: VERCEL LOGLARINI PAYLAŞ

Eğer logları paylaşırsan:
- `/esims/assignments` endpoint'i çağrılıyor mu?
- Hata var mı? (404, 400, 401?)
- ZIP dosyası geliyor mu?
- Response ne döndürüyor?

Bu bilgilerle daha spesifik çözüm üretebilirim!

---

**Şimdilik Vercel loglarını kontrol et ve paylaş! 🔍**















# eSimGo API URL Test Kodu

## 📋 KOD HAZIR

**Dosya:** `test-esimgo-api.js`

Bu kodu kullanarak eSimGo API endpoint URL'ini test edebilirsiniz.

---

## 🚀 KULLANIM

### Yöntem 1: Node.js'de Çalıştırma

```bash
node test-esimgo-api.js
```

### Yöntem 2: Browser Console'da Çalıştırma

1. Browser'da `test-esimgo-api.js` dosyasını açın
2. Console'da `testEsimGoApi()` yazın
3. Enter'a basın

### Yöntem 3: Online Test (Postman/Insomnia)

**Test edilecek URL'ler:**
- `https://api.esimgo.com/v3/orders`
- `https://api.esimgo.io/v3/orders`
- `https://esimgo.com/api/v3/orders`
- `https://api.esimgo.com/api/v3/orders`
- `https://api.esimgo.io/api/v3/orders`

**Request:**
```
POST {URL}
Headers:
  Authorization: Bearer lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT
  Content-Type: application/json
  X-API-Version: v3
Body:
{
  "package_id": "usa-1gb-7days",
  "email": "test@example.com",
  "quantity": 1,
  "callback_url": "https://getprimesim.com/api/esimgo/webhook",
  "version": "v3"
}
```

---

## 📊 BEKLENEN SONUÇ

**Başarılı olursa:**
```
✅ SUCCESS! Bu URL çalışıyor: https://api.esimgo.com/v3
```

**Başarısız olursa:**
```
❌ Error: getaddrinfo ENOTFOUND api.esimgo.io
⚠️  DNS hatası: Domain bulunamadı
```

---

## 🔧 VERCEL'E EKLEME

**Çalışan URL'i bulduktan sonra:**

1. **Vercel Dashboard → Settings → Environment Variables**
2. **`ESIMGO_API_URL` → Edit**
3. **Value:** Çalışan URL (örn: `https://api.esimgo.com/v3`)
4. **Save → Redeploy**

---

**Kodu çalıştırın ve çalışan URL'i bulun! 🚀**
















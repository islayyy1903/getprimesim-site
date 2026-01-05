# eSimGo API URL Hatası

## 🚨 SORUN BULUNDU!

**Hata:** `getaddrinfo ENOTFOUND api.esimgo.io`

**Anlamı:** `api.esimgo.io` domain'i bulunamıyor (DNS hatası)

---

## 🔍 SORUN ANALİZİ

**Loglardan görülen:**
```
Error: getaddrinfo ENOTFOUND api.esimgo.io
hostname: 'api.esimgo.io'
```

**Bu şu anlama geliyor:**
- eSimGo API URL'i yanlış olabilir
- Veya eSimGo API URL'i Vercel'de doğru ayarlanmamış olabilir

---

## 🔧 ÇÖZÜM

### 1. eSimGo API URL'ini Kontrol Edin

**eSimGo Dashboard'dan doğru API URL'ini alın:**
- eSimGo Dashboard → **API Settings** veya **API Details**
- **API Endpoint URL** nedir?
- Genelde şöyle olur:
  - `https://api.esimgo.com/v3`
  - `https://api.esimgo.io/v3`
  - `https://esimgo.com/api/v3`
  - Veya başka bir format

### 2. Vercel'de Environment Variable'ı Güncelleyin

**Vercel Dashboard → Settings → Environment Variables:**

1. **`ESIMGO_API_URL`** değişkenini bulun
2. **Edit** → Değeri güncelleyin
3. **Doğru API URL'ini yazın** (eSimGo Dashboard'dan aldığınız)
4. **Environment:** Production, Preview, Development (hepsini seçin)
5. **Save**

### 3. Redeploy Yapın

1. Vercel Dashboard → **Deployments**
2. En son deployment → **"..."** → **"Redeploy"**

---

## ⚠️ ÖNEMLİ NOTLAR

### API URL Formatı

**Şu an kullanılan:** `https://api.esimgo.io/v3`

**Ama eSimGo API formatı farklı olabilir:**
- `https://api.esimgo.com/v3`
- `https://esimgo.com/api/v3`
- `https://api.esimgo.io/api/v3`

**eSimGo Dashboard'dan doğru URL'i alın!**

### Environment Variable Kontrolü

**Vercel'de kontrol edin:**
- `ESIMGO_API_URL` var mı?
- Değeri doğru mu?
- Environment'lar seçili mi? (Production, Preview, Development)

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **eSimGo Dashboard'dan API URL'ini alın**
2. ✅ **Vercel'de `ESIMGO_API_URL` güncelleyin**
3. ✅ **Redeploy yapın**
4. ✅ **Test siparişi yapın**

---

## 🔍 eSimGo Dashboard'da Nereye Bakmalı?

**eSimGo Dashboard'da şunları kontrol edin:**
- **API Settings** sekmesi
- **API Details** sekmesi
- **Documentation** veya **API Docs** sekmesi
- **Callback Settings** yanında API URL olabilir

**API URL genelde şöyle görünür:**
- `Base URL: https://api.esimgo.com`
- `API Endpoint: https://api.esimgo.com/v3`
- `API URL: https://api.esimgo.io/v3`

---

**eSimGo Dashboard'dan doğru API URL'ini alın ve Vercel'de güncelleyin! 🚀**





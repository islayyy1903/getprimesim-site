# eSimGo API URL Bulma

## 🚨 SORUN: API Endpoint URL Bulunamıyor

**Durum:**
- ✅ Callback URL var: `https://getprimesim.com/api/esimgo/webhook`
- ✅ Callback Version: `v3`
- ❌ API Endpoint URL yok

**Hata:** `getaddrinfo ENOTFOUND api.esimgo.io` (DNS hatası)

---

## 🔍 API URL'İNİ BULMA YÖNTEMLERİ

### Yöntem 1: eSimGo API Dokümantasyonu

**eSimGo Dashboard'da:**
1. **"Instructions on how to authenticate and use the eSIM Go API can be found here"** linkine tıklayın
2. API dokümantasyonunda **Base URL** veya **API Endpoint** arayın
3. Genelde şöyle görünür:
   - `Base URL: https://api.esimgo.com`
   - `API Endpoint: https://api.esimgo.com/v3`
   - `API URL: https://api.esimgo.io/v3`

### Yöntem 2: eSimGo Support'a Sorma

**eSimGo Support'a email atın:**
```
Subject: API Endpoint URL Sorunu

Merhaba,

eSimGo API'yi entegre etmeye çalışıyorum ama API endpoint URL'ini bulamıyorum.

Callback URL ve v3 version ayarlarını yaptım ama API endpoint URL'i nerede?

API endpoint URL'i nedir?
Örnek: https://api.esimgo.com/v3 veya https://api.esimgo.io/v3

Teşekkürler.
```

### Yöntem 3: Standart Formatları Deneme

**Olası API URL formatları:**
1. `https://api.esimgo.com/v3` ← En yaygın
2. `https://api.esimgo.io/v3` ← Şu an kullanılan (ama çalışmıyor)
3. `https://esimgo.com/api/v3`
4. `https://api.esimgo.com/api/v3`

---

## 🔧 HIZLI TEST

**Vercel'de şu URL'leri deneyin:**

### Test 1: api.esimgo.com
1. Vercel Dashboard → Settings → Environment Variables
2. `ESIMGO_API_URL` → Edit
3. Value: `https://api.esimgo.com/v3`
4. Save → Redeploy
5. Test siparişi yapın

### Test 2: esimgo.com/api
1. `ESIMGO_API_URL` → Edit
2. Value: `https://esimgo.com/api/v3`
3. Save → Redeploy
4. Test siparişi yapın

---

## 📋 YAPILMASI GEREKENLER

### Öncelik 1: eSimGo API Dokümantasyonu
1. ✅ eSimGo Dashboard'da **"here"** linkine tıklayın
2. ✅ API dokümantasyonunda **Base URL** arayın
3. ✅ Doğru API URL'ini bulun

### Öncelik 2: eSimGo Support
1. ✅ eSimGo Support'a email atın
2. ✅ API endpoint URL'ini sorun

### Öncelik 3: Test
1. ✅ `https://api.esimgo.com/v3` deneyin
2. ✅ Çalışmazsa `https://esimgo.com/api/v3` deneyin

---

## 🎯 HIZLI ÇÖZÜM

**Şimdi yapın:**
1. eSimGo Dashboard'da **"here"** linkine tıklayın (API dokümantasyonu)
2. **Base URL** veya **API Endpoint** arayın
3. Bulduğunuz URL'i Vercel'de `ESIMGO_API_URL` olarak ekleyin
4. Redeploy yapın
5. Test edin

**Eğer dokümantasyonda yoksa:**
- eSimGo Support'a email atın
- Veya `https://api.esimgo.com/v3` deneyin (en yaygın format)

---

**eSimGo API dokümantasyonuna bakın veya support'a sorun! 🔍**





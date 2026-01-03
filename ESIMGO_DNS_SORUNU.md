# eSimGo DNS Sorunu Çözümü

## 🚨 SORUN

**Hata:**
```
eSimGo purchase error: TypeError: fetch failed
Error: getaddrinfo ENOTFOUND api.esimgo.io
```

**Anlamı:** `api.esimgo.io` domain'i bulunamıyor! ❌

**Neden:** Yanlış domain kullanılıyor!

---

## ✅ ÇÖZÜM: DOĞRU DOMAIN

### Doğru API URL:

```
https://api.esim-go.com/v2.3
```

**ÖNEMLİ:** Domain'de **tire (-)** var: `esim-go.com` (esimgo.com değil!)

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. API URL Doğru mu?

**YANLIŞ (Mevcut):**
```
ESIMGO_API_URL=https://api.esimgo.io/v3  ❌
```

**DOĞRU:**
```
ESIMGO_API_URL=https://api.esim-go.com/v2.3  ✅
```

**Farklar:**
- ❌ `api.esimgo.io` → ❌ Yanlış domain (tire yok)
- ✅ `api.esim-go.com` → ✅ Doğru domain (tire var)
- ❌ `/v3` → ❌ Yanlış versiyon
- ✅ `/v2.3` → ✅ Doğru versiyon (hazır prompt'ta belirtilen)

### 2. DNS Test (Doğru Domain ile)

**Test:**
```powershell
# Windows PowerShell - DOĞRU DOMAIN
nslookup api.esim-go.com

# Veya
ping api.esim-go.com
```

**Sonuç:**
- ✅ `api.esim-go.com` → DNS çözümlenebilir
- ❌ `api.esimgo.io` → DNS çözümlenemez (yanlış domain)

### 3. Package ID Yanlış

**Log'da görülen:**
```
eSimGo Package ID: uk-1gb-7days
```

**Olması gereken:**
```
eSimGo Package ID: esim_1GB_7D_GB_V2
```

**Sorun:** `mapPackageToEsimGo` fonksiyonu fallback'e düşüyor!

---

## 🔧 ÇÖZÜM: VERCEL'DE GÜNCELLE

### Adım 1: Vercel Dashboard'a Git

1. **Vercel Dashboard** → Projeniz
2. **Settings** → **Environment Variables**
3. `ESIMGO_API_URL` değişkenini bulun

### Adım 2: Değeri Güncelle

**Eski Değer (Yanlış):**
```
https://api.esimgo.io/v3
```

**Yeni Değer (Doğru):**
```
https://api.esim-go.com/v2.3
```

### Adım 3: Redeploy

1. Değişkeni kaydedin
2. **Deployments** → **Redeploy** (son deployment'ı redeploy edin)
3. Veya yeni bir commit push edin

---

## 🔧 ÇÖZÜMLER

### Çözüm 1: API URL'i Vercel'de Güncelle ✅

**Vercel Environment Variables:**
- `ESIMGO_API_URL` → `https://api.esim-go.com/v2.3` olarak güncelleyin
- Redeploy yapın

### Çözüm 2: Package Name Kontrolü

**Stripe metadata'da `packageName` doğru mu?**

**Kontrol:**
- `app/api/checkout/route.ts` dosyasında `packageName` doğru gönderiliyor mu?
- Stripe metadata'da `packageName` field'ı var mı?

### Çözüm 3: DNS Test

**eSimGo'ya sorun:**
- API URL doğru mu?
- Domain aktif mi?
- DNS kayıtları doğru mu?

---

## 📋 YAPILMASI GEREKENLER

1. ✅ **Vercel'de `ESIMGO_API_URL` güncelle** → `https://api.esim-go.com/v2.3`
2. ✅ **Redeploy yap**
3. ✅ **Test et** (yeni sipariş ver)

---

## 🚀 HIZLI TEST

**Terminal'de (Doğru Domain):**
```powershell
# DNS test - DOĞRU DOMAIN
nslookup api.esim-go.com

# Sonuç: DNS çözümlenecek ✅
```

**Vercel Loglarında (Güncelleme Sonrası):**
- `📤 eSimGo API URL:` → `https://api.esim-go.com/v2.3/orders` görmeli
- DNS hatası gitmeli ✅

---

## 📝 NOTLAR

**Hazır Prompt'ta belirtilen:**
- Base URL: `https://api.esim-go.com/v2.4/` (discovery için)
- **Gerçek işlemler:** `/v2.3/` kullanılmalı ✅

**Domain Önemli:**
- ❌ `api.esimgo.io` → Yanlış (tire yok)
- ✅ `api.esim-go.com` → Doğru (tire var)

---

**Vercel'de güncelle ve redeploy yap! 🚀**



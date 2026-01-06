# DNS Hatası - Acil Çözüm

## 🚨 SORUN

```
eSimGo purchase error: TypeError: fetch failed
Error: getaddrinfo ENOTFOUND api.esimgo.io
```

**Sebep:** Yanlış domain kullanılıyor!

---

## ✅ ÇÖZÜM (2 DAKİKA)

### 1. Vercel Dashboard'a Git

1. **Vercel Dashboard** → Projeniz
2. **Settings** → **Environment Variables**
3. `ESIMGO_API_URL` değişkenini bul

### 2. Değeri Güncelle

**❌ Eski (Yanlış):**
```
https://api.esimgo.io/v3
```

**✅ Yeni (Doğru):**
```
https://api.esim-go.com/v2.3
```

**ÖNEMLİ:** Domain'de **tire (-)** var! `esim-go.com`

### 3. Redeploy

1. Değişkeni kaydet
2. **Deployments** → Son deployment → **Redeploy**
3. Veya yeni commit push et

---

## 🔍 DOĞRU DOMAIN

**Doğru:**
- ✅ `api.esim-go.com/v2.3` → Tire var, versiyon 2.3

**Yanlış:**
- ❌ `api.esimgo.io/v3` → Tire yok, yanlış versiyon

---

## 📝 KAYNAK

Hazır prompt'ta (`ESIMGO_API_HAZIR_PROMPT.md`) belirtilen:
- Base URL: `https://api.esim-go.com/v2.4/` (discovery)
- **Gerçek işlemler:** `/v2.3/` kullanılmalı ✅

---

**Vercel'de güncelle ve redeploy yap! 🚀**













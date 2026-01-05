# Webhook Endpoint URL Girişi

## 📋 ŞİMDİ NE YAPMALIYIM?

Endpoint URL giriş sayfasındasınız. Şu adımları takip edin:

---

## 🔧 ADIM ADIM

### 1. Endpoint URL Input Alanını Bulun
Sayfada bir input alanı göreceksiniz:
- **"Endpoint URL"** veya **"Webhook URL"** etiketi ile
- Buraya webhook URL'inizi gireceksiniz

### 2. Endpoint URL'i Girin
**Endpoint URL:**
```
https://getprimesim.com/api/webhooks/stripe
```

**Önemli:**
- ✅ HTTPS kullanın (HTTP değil)
- ✅ Tam URL'i girin
- ✅ Sonunda `/` olmamalı

### 3. Description (Opsiyonel)
- **Description** alanı varsa, boş bırakabilirsiniz
- Veya "PrimeSim eSim Purchase Webhook" yazabilirsiniz

### 4. Events Kontrolü
- Events zaten seçili olmalı (`checkout.session.completed`)
- Eğer seçili değilse, seçin

### 5. "Add endpoint" veya "Save" Butonuna Tıklayın
- Sayfanın alt kısmında **"Add endpoint"** veya **"Save"** butonu olmalı
- Bu butona tıklayın
- Webhook oluşturulacak

---

## ✅ DOĞRU URL FORMATI

**✅ Doğru:**
```
https://getprimesim.com/api/webhooks/stripe
```

**❌ Yanlış:**
```
http://getprimesim.com/api/webhooks/stripe  (HTTP değil)
/api/webhooks/stripe  (sadece path)
https://getprimesim.com/api/webhooks/stripe/  (sonunda / var)
```

---

## 🔍 SAYFADA NE GÖRÜYORSUNUZ?

Lütfen sayfada şunları kontrol edin:

1. **Endpoint URL** input alanı var mı?
2. **Description** input alanı var mı?
3. **Events** seçimi var mı? (`checkout.session.completed` seçili mi?)
4. **"Add endpoint"** veya **"Save"** butonu var mı?

---

## ⚠️ ÖNEMLİ NOTLAR

1. **HTTPS Zorunlu:**
   - Stripe webhook'ları sadece HTTPS URL'lerini kabul eder
   - HTTP URL'ler çalışmaz

2. **Tam URL:**
   - Sadece path değil, tam URL girin
   - `https://getprimesim.com/api/webhooks/stripe`

3. **Sonunda `/` Olmamalı:**
   - URL'in sonunda `/` olmamalı
   - `https://getprimesim.com/api/webhooks/stripe/` ❌
   - `https://getprimesim.com/api/webhooks/stripe` ✅

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Endpoint URL'i girin:** `https://getprimesim.com/api/webhooks/stripe`
2. ✅ **"Add endpoint" veya "Save" butonuna tıklayın**
3. ✅ **Webhook oluşturulacak**
4. ✅ **Signing secret'ı kopyalayın**
5. ✅ **Vercel'e ekleyin**

---

**Endpoint URL'i girdiniz mi? "Add endpoint" veya "Save" butonuna tıkladınız mı? 🔍**





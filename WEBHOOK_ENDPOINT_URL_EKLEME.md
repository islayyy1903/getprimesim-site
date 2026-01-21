# Webhook Endpoint URL Ekleme

## ✅ DESTINATION TYPE SEÇİLDİ

"Webhook endpoint" seçeneği seçili (mor border ile). Şimdi endpoint URL'i eklemeniz gerekiyor.

---

## 📋 SONRAKI ADIMLAR

### 1. "Continue" Butonuna Tıklayın
- Sayfanın alt kısmında **"Continue ->"** veya **"Next"** butonu olmalı
- Bu butona tıklayın

### 2. Endpoint URL Girişi
Bir sonraki sayfada şunları göreceksiniz:
- **Endpoint URL** input alanı
- Buraya webhook URL'inizi gireceksiniz

### 3. Endpoint URL'i Girin
**Endpoint URL:**
```
https://getprimesim.com/api/webhooks/stripe
```

**Önemli:**
- HTTPS kullanın (HTTP değil)
- Tam URL'i girin (sadece path değil)
- Sonunda `/` olmamalı

### 4. "Add endpoint" veya "Save" Butonuna Tıklayın
- Endpoint URL'i girdikten sonra
- **"Add endpoint"** veya **"Save"** butonuna tıklayın
- Webhook oluşturulacak

---

## 🔍 BEKLENEN SAYFA

Bir sonraki sayfada şunları göreceksiniz:

1. **Endpoint URL** input alanı
2. **Description** (opsiyonel) input alanı
3. **Events** seçimi (zaten `checkout.session.completed` seçili olmalı)
4. **"Add endpoint"** veya **"Save"** butonu

---

## ✅ KONTROL LİSTESİ

- [x] "Webhook endpoint" seçildi ✅
- [ ] "Continue" butonuna tıklandı
- [ ] Endpoint URL girildi: `https://getprimesim.com/api/webhooks/stripe`
- [ ] "Add endpoint" veya "Save" butonuna tıklandı
- [ ] Webhook oluşturuldu
- [ ] Signing secret kopyalandı

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Endpoint URL Format:**
   - ✅ `https://getprimesim.com/api/webhooks/stripe`
   - ❌ `http://getprimesim.com/api/webhooks/stripe` (HTTP değil)
   - ❌ `/api/webhooks/stripe` (sadece path değil)
   - ❌ `https://getprimesim.com/api/webhooks/stripe/` (sonunda `/` olmamalı)

2. **HTTPS Zorunlu:**
   - Stripe webhook'ları sadece HTTPS URL'lerini kabul eder
   - HTTP URL'ler çalışmaz

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **"Continue" butonuna tıklayın**
2. ✅ **Endpoint URL'i girin:** `https://getprimesim.com/api/webhooks/stripe`
3. ✅ **"Add endpoint" veya "Save" butonuna tıklayın**
4. ✅ **Webhook oluşturulacak**
5. ✅ **Signing secret'ı kopyalayın**

---

**"Continue" butonuna tıkladınız mı? Endpoint URL'i girebiliyor musunuz? 🔍**
















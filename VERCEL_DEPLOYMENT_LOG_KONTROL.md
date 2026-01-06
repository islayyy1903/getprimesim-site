# Vercel Deployment Log Kontrolü

## 🔍 LOGLARI BULMAK İÇİN

Vercel Dashboard'da Deployments sekmesindesiniz. Logları görmek için:

---

## ADIM ADIM

### 1. En Son Deployment'a Tıklayın
- **"2SVUERG13"** (Production Current) - En üstteki deployment'a tıklayın
- Veya herhangi bir deployment'a tıklayın

### 2. Deployment Sayfası Açılacak
Deployment sayfasında şu sekmeler olabilir:
- **Overview**
- **Build Logs**
- **Functions** ← **BURAYA TIKLAYIN**
- **Runtime Logs** ← **VEYA BURAYA**
- **Settings**

### 3. Functions Sekmesi
1. **"Functions"** sekmesine tıklayın
2. Endpoint listesi görünecek:
   - `/api/checkout`
   - `/api/webhooks/stripe` ← **BURAYA TIKLAYIN**
   - `/api/esimgo/webhook`
   - `/api/order-status`
3. Endpoint'e tıklayın → Loglar görünecek

### 4. Runtime Logs Sekmesi (Alternatif)
1. **"Runtime Logs"** sekmesine tıklayın
2. Tüm runtime loglarını göreceksiniz
3. Ctrl+F ile arama yapın:
   - `STRIPE WEBHOOK`
   - `ESIMGO`
   - `Purchasing eSim`

---

## 🔍 NE ARAMALIYIM?

### `/api/webhooks/stripe` Loglarında:
- `=== STRIPE WEBHOOK CALLED ===` → Webhook tetiklendi mi?
- `✅ Payment successful` → Ödeme başarılı mı?
- `📦 Purchasing eSim from eSimGo...` → eSimGo API'ye istek gitti mi?
- `❌ eSimGo purchase failed` → Hata var mı?

### `/api/esimgo/webhook` Loglarında:
- `=== ESIMGO V3 CALLBACK CALLED ===` → Callback geldi mi?
- `QR Code: Base64 provided` → QR kod geldi mi?

---

## ⚠️ LOGLAR GÖRÜNMÜYORSA

### Sorun 1: Functions Sekmesi Yok
**Çözüm:**
- **Runtime Logs** sekmesine gidin
- Tüm logları göreceksiniz
- Ctrl+F ile arama yapın

### Sorun 2: Endpoint Görünmüyor
**Neden:**
- Endpoint henüz çağrılmamış olabilir
- Test siparişi yapılmamış olabilir

**Çözüm:**
1. Test siparişi yapın
2. Sonra tekrar kontrol edin

### Sorun 3: Loglar Boş
**Neden:**
- Henüz test siparişi yapılmadı
- Webhook tetiklenmedi

**Çözüm:**
1. Test siparişi yapın
2. Sonra logları kontrol edin

---

## 🚀 HIZLI KONTROL

**Şimdi yapın:**

1. ✅ **"2SVUERG13"** deployment'ına tıklayın (en üstteki)
2. ✅ **"Functions"** veya **"Runtime Logs"** sekmesine tıklayın
3. ✅ `/api/webhooks/stripe` endpoint'ini bulun
4. ✅ Logları kontrol edin

**Veya:**

1. ✅ **"Logs"** sekmesine gidin (üst menüden)
2. ✅ Tüm logları göreceksiniz
3. ✅ Ctrl+F ile `STRIPE WEBHOOK` arayın

---

## 📋 CHECKLIST

- [ ] En son deployment'a tıklandı
- [ ] Functions veya Runtime Logs sekmesine gidildi
- [ ] `/api/webhooks/stripe` endpoint'i bulundu
- [ ] Loglar kontrol edildi
- [ ] `STRIPE WEBHOOK` logları görüldü mü?

---

**En son deployment'a tıklayıp Functions veya Runtime Logs sekmesine gittiniz mi? Logları görüyor musunuz? 🔍**














# Runtime Logs Bulma

## 🔍 RUNTIME LOGS'A NASIL GİDİLİR?

Deployment Details sayfasındasınız. Logları görmek için:

---

## YÖNTEM 1: Alt Menüden (EN KOLAY)

### Adım 1: Alt Menüde "Runtime Logs" Linkine Tıklayın
Sayfanın alt kısmında bir menü var:
- **Runtime Logs** ← **BURAYA TIKLAYIN**
- Observability
- Speed Insights
- Web Analytics

**"Runtime Logs"** linkine tıklayın → Loglar görünecek!

---

## YÖNTEM 2: Build Logs Sekmesi (Alternatif)

### Adım 1: "Build Logs" Sekmesine Tıklayın
Sayfada "Build Logs" sekmesi görünüyor (sağ ok işareti ile).

**Not:** Build Logs sadece build sırasındaki logları gösterir, runtime loglarını değil. Ama yine de kontrol edebilirsiniz.

---

## YÖNTEM 3: Functions Sekmesi (Eğer Varsa)

Eğer sayfada "Functions" sekmesi varsa:
1. **"Functions"** sekmesine tıklayın
2. Endpoint listesi görünecek
3. `/api/webhooks/stripe` endpoint'ine tıklayın
4. Loglar görünecek

---

## 🔍 NE ARAMALIYIM?

Runtime Logs'ta şunları arayın:

### Stripe Webhook:
- `=== STRIPE WEBHOOK CALLED ===` → Webhook tetiklendi mi?
- `✅ Payment successful` → Ödeme başarılı mı?
- `📦 Purchasing eSim from eSimGo...` → eSimGo API'ye istek gitti mi?
- `❌ eSimGo purchase failed` → Hata var mı?

### eSimGo Callback:
- `=== ESIMGO V3 CALLBACK CALLED ===` → Callback geldi mi?
- `QR Code: Base64 provided` → QR kod geldi mi?

---

## 📋 ADIM ADIM

1. ✅ Sayfanın **alt kısmındaki menüye** bakın
2. ✅ **"Runtime Logs"** linkine tıklayın
3. ✅ Loglar görünecek
4. ✅ Ctrl+F ile `STRIPE WEBHOOK` arayın

---

## ⚠️ LOGLAR GÖRÜNMÜYORSA

### Sorun 1: Henüz Test Siparişi Yapılmadı
**Belirtiler:**
- Runtime Logs boş
- Sadece build logları var

**Çözüm:**
1. Test siparişi yapın
2. Sonra tekrar kontrol edin

### Sorun 2: Loglar Çok Eski
**Belirtiler:**
- Eski loglar görünüyor
- Yeni loglar yok

**Çözüm:**
1. Test siparişi yapın
2. Logları yenileyin (F5)
3. En son logları kontrol edin

---

## 🚀 HIZLI KONTROL

**Şimdi yapın:**

1. ✅ Sayfanın **alt kısmındaki menüye** bakın
2. ✅ **"Runtime Logs"** linkine tıklayın
3. ✅ Logları görüyor musunuz?

**Veya:**

1. ✅ Ctrl+F ile sayfada **"Runtime Logs"** arayın
2. ✅ Linke tıklayın
3. ✅ Loglar görünecek

---

**Alt menüdeki "Runtime Logs" linkine tıkladınız mı? Logları görüyor musunuz? 🔍**















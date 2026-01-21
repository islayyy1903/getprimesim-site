# eSimGo Sipariş Detayları Kontrolü

## ✅ SİPARİŞ LİSTESİ GÖRÜLÜYOR

**Görünen:**
- ✅ Siparişler listeleniyor
- ✅ "QRs" butonu var (QR code'ları görmek için)
- ✅ "Open Inventory" butonu var (sipariş detayları için)
- ✅ "Actions" kolonunda farklı butonlar var

---

## 🔍 YAPILMASI GEREKENLER

### 1. "Open Inventory" Butonuna Tıklayın

**Row 2 veya Row 3'teki "Open Inventory" butonuna tıklayın:**
- Sipariş detayları açılacak
- Belki API endpoint URL'i burada olabilir
- Veya API kullanım örnekleri burada olabilir

### 2. "QRs" Butonuna Tıklayın

**Row 1'deki "QRs" butonuna tıklayın:**
- QR code'ları göreceksiniz
- Belki API endpoint URL'i burada olabilir
- Veya QR code'ların nasıl alındığını görebilirsiniz

### 3. Sipariş Detaylarında API Bilgileri Arayın

**Açılan sayfada şunları arayın:**
- API endpoint URL
- Base URL
- API URL
- `https://api.esimgo`
- API dokümantasyon linki

---

## 🎯 OLASI BULGULAR

### Senaryo 1: Sipariş Detaylarında API URL Var
- "Open Inventory" → Sipariş detayları → API bilgileri
- API endpoint URL'i burada olabilir

### Senaryo 2: QR Code Sayfasında API URL Var
- "QRs" → QR code sayfası → API bilgileri
- API endpoint URL'i burada olabilir

### Senaryo 3: Sipariş Detaylarında API Dokümantasyon Linki Var
- "Open Inventory" → API dokümantasyon linki
- Link'e tıklayın → API endpoint URL'i bulun

---

## 📋 ADIMLAR

1. ✅ **"Open Inventory" butonuna tıklayın** (Row 2 veya 3)
2. ✅ **Sipariş detaylarında API bilgileri arayın**
3. ✅ **"QRs" butonuna tıklayın** (Row 1)
4. ✅ **QR code sayfasında API bilgileri arayın**
5. ✅ **Bulduğunuz API endpoint URL'ini paylaşın**

---

## 🔧 BULUNCA NE YAPACAKSINIZ?

1. **Vercel Dashboard → Settings → Environment Variables**
2. **`ESIMGO_API_URL` → Edit**
3. **Value:** Bulduğunuz API endpoint URL'i
4. **Save → Redeploy**
5. **Test siparişi yapın**

---

**"Open Inventory" veya "QRs" butonuna tıklayın ve API bilgilerini arayın! 🔍**
















# Terminal'den Log Görüntüleme

## 🚀 TERMINAL'DEN LOGLAR

Vercel Dashboard'da logları bulamıyorsanız, terminal'den görüntüleyebilirsiniz.

---

## YÖNTEM 1: Canlı Logları İzle

### Terminal'de (PowerShell):
```powershell
cd C:\Users\Admin\getprimesim-site
vercel logs --follow
```

Bu komut canlı logları gösterecek. Yeni loglar geldiğinde otomatik görünecek.

**Durdurmak için:** `Ctrl+C`

---

## YÖNTEM 2: Son N Log Satırı

### Son 100 satır:
```powershell
vercel logs | Select-Object -Last 100
```

### Son 50 satır:
```powershell
vercel logs | Select-Object -Last 50
```

---

## YÖNTEM 3: Belirli Kelimeyi Ara

### "STRIPE WEBHOOK" içeren loglar:
```powershell
vercel logs | Select-String "STRIPE WEBHOOK"
```

### "ESIMGO" içeren loglar:
```powershell
vercel logs | Select-String "ESIMGO"
```

### "Purchasing eSim" içeren loglar:
```powershell
vercel logs | Select-String "Purchasing eSim"
```

---

## 🔍 NE ARAMALIYIM?

Loglarda şunları arayın:

1. **`=== STRIPE WEBHOOK CALLED ===`**
   - Stripe webhook tetiklendi mi?

2. **`✅ Payment successful`**
   - Ödeme başarılı mı?

3. **`📦 Purchasing eSim from eSimGo...`**
   - eSimGo API'ye istek gitti mi?

4. **`❌ eSimGo purchase failed`**
   - Hata var mı?

5. **`=== ESIMGO V3 CALLBACK CALLED ===`**
   - eSimGo callback geldi mi?

---

## ⚠️ LOGLAR BOŞSA

### Sorun: Henüz Test Siparişi Yapılmadı
**Çözüm:**
1. Test siparişi yapın
2. Sonra logları tekrar kontrol edin

### Test Siparişi:
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı: `4242 4242 4242 4242`
4. Ödeme yapın

---

## 🚀 HIZLI KOMUTLAR

### Tüm logları görüntüle:
```powershell
vercel logs
```

### Canlı logları izle:
```powershell
vercel logs --follow
```

### Hata loglarını filtrele:
```powershell
vercel logs | Select-String "error|failed|❌"
```

### Başarı loglarını filtrele:
```powershell
vercel logs | Select-String "success|✅"
```

---

## 📋 ADIM ADIM

1. ✅ Terminal'i açın (PowerShell)
2. ✅ Proje dizinine gidin: `cd C:\Users\Admin\getprimesim-site`
3. ✅ Logları görüntüleyin: `vercel logs`
4. ✅ Veya canlı izleyin: `vercel logs --follow`

---

**Terminal'de logları görüntüleyebildiniz mi? Ne görüyorsunuz? 🔍**















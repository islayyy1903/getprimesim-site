# Test Siparişi ve Kontrol

## 🚀 EN BASIT ÇÖZÜM: TEST SİPARİŞİ YAP

Vercel Dashboard'da logları bulamıyorsanız, test siparişi yapıp ne olduğunu görelim.

---

## 📋 TEST SİPARİŞİ ADIMLARI

### 1. Website'ye Gidin
```
https://getprimesim.com/esim
```

### 2. Paket Seçin
- Herhangi bir paket seçin (örn: USA eSIM – 1GB)
- **"Buy Now"** butonuna tıklayın

### 3. Test Kartı ile Ödeme
Stripe test kartı bilgileri:
- **Kart:** `4242 4242 4242 4242`
- **Tarih:** `12/25` (gelecek bir tarih)
- **CVC:** `123`
- **ZIP:** `12345`

### 4. Ödemeyi Tamamlayın
- **"Pay"** butonuna tıklayın
- Success sayfasına yönlendirileceksiniz

---

## 🔍 SONUÇLARI KONTROL ET

### Senaryo 1: QR Kod Geldi ✅
- Success sayfasında QR kod görünüyor
- Veya email'de QR kod var
- **Sonuç:** Sistem çalışıyor! ✅

### Senaryo 2: QR Kod Gelmedi ❌
- Success sayfasında QR kod yok
- Email'de QR kod yok
- **Sonuç:** Sorun var, logları kontrol etmeliyiz

---

## ⚠️ QR KOD GELMEDİYSE

### Olası Sorunlar:

1. **Stripe Webhook Tetiklenmedi**
   - Stripe webhook endpoint eklenmemiş olabilir
   - Webhook secret eksik olabilir

2. **eSimGo API'ye İstek Gitmedi**
   - eSimGo API URL/key yanlış olabilir
   - Paket ID'leri yanlış olabilir

3. **eSimGo Callback Gelmedi**
   - eSimGo'da callback URL ayarlanmamış olabilir
   - Callback gönderilmiyor olabilir

---

## 🔧 HIZLI DÜZELTME

### Eğer QR Kod Gelmediyse:

1. **Bana şunları söyleyin:**
   - Test siparişi yaptınız mı? ✅/❌
   - Success sayfasına yönlendirildiniz mi? ✅/❌
   - QR kod görünüyor mu? ✅/❌
   - Hata mesajı var mı? Varsa ne?

2. **Vercel Dashboard'da ne görüyorsunuz?**
   - Hangi sekmeler var?
   - Ekran görüntüsü paylaşabilir misiniz?

---

## 🚀 ŞİMDİ YAPIN

1. ✅ Test siparişi yapın
2. ✅ Success sayfasına yönlendirildiniz mi kontrol edin
3. ✅ QR kod görünüyor mu kontrol edin
4. ✅ Sonucu bana söyleyin

---

## 📞 DESTEK

Eğer hala sorun varsa:
1. Test siparişi sonucunu paylaşın
2. Vercel Dashboard'da ne gördüğünüzü söyleyin
3. Hata mesajı varsa paylaşın

---

**Test siparişi yaptınız mı? QR kod geldi mi? Ne oldu? 🔍**










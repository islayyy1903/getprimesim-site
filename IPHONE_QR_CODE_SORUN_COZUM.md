# iPhone QR Code "No usable data found" Sorunu

## 🚨 Sorun

iPhone ile QR code tarandığında **"No usable data found"** hatası alınıyor.
Samsung telefonunda QR code çalışıyor.

---

## 🔍 Muhtemel Nedenler

### 1. QR Code Formatı
eSIM QR code'ları **LPA (Local Profile Assistant)** formatında olmalı:
```
LPA:1$smdp.operator.com$activation_code$matching_id
```

iPhone bu formatı daha sıkı kontrol eder, Samsung daha toleranslı olabilir.

### 2. QR Code İçeriği Eksik/Hatalı
- QR code'un içinde LPA formatında veri yoksa iPhone tanımaz
- QR code çok küçükse (1024 karakter base64 = ~768 bytes) içerik eksik olabilir

### 3. QR Code Kalitesi
- Düşük çözünürlük
- Blur/hasarlı görüntü
- Encoding sorunu

---

## 🔧 Yapılan Değişiklikler

JSON response'a **eSIM LPA format field'ları** eklendi:
- ICCID
- SM-DP+ (smdp, sm_dp, SM_DP, sm_dp_address)
- Matching ID (matching_id, matchingId, MatchingID)
- Activation Code (activation_code, activationCode, ActivationCode)

Bu field'lar loglanıyor, eğer varsa bunlardan LPA formatında QR code oluşturabiliriz.

---

## 📋 Sonraki Adımlar

### 1. Vercel Runtime Logs Kontrol

Yeni bir sipariş ver ve Vercel Runtime Logs'da şu logları ara:

```
✅ JSON response received:
  - Full response: {...}
🔍 eSIM LPA Format Fields:
  - ICCID: ...
  - SM-DP+: ...
  - Matching ID: ...
  - Activation Code: ...
```

### 2. Eğer LPA Field'ları Varsa

Bu field'lardan LPA formatında QR code oluşturabiliriz:
```
LPA:1$SM-DP-ADDRESS$ACTIVATION-CODE$MATCHING-ID
```

Bu format iPhone tarafından tanınacaktır.

### 3. Eğer LPA Field'ları Yoksa

eSimGo API'den gelen PNG QR code kullanılıyor, ama bu QR code'un içeriği eksik/hatalı olabilir.

**Çözüm seçenekleri:**
1. eSimGo API dokümantasyonunda LPA field'larını nasıl alacağımızı kontrol et
2. eSimGo support'a sor: "iPhone'da QR code çalışmıyor, LPA format verilerini nasıl alabilirim?"
3. Alternatif: Apple Install URL kullan (eğer eSimGo destekliyorsa)

---

## 📝 Test

1. Yeni bir test siparişi ver
2. Vercel Runtime Logs'da JSON response'u kontrol et
3. LPA field'larını kontrol et
4. Eğer varsa, bunlardan QR code oluştur
5. iPhone'da test et

---

## 🔗 İlgili Dokümantasyon

- eSIM LPA Format: https://www.gsma.com/newsroom/wp-content/uploads/SGP.22-v2.2.pdf
- Apple eSIM: https://support.apple.com/en-us/102556

---

**Son Güncelleme:** LPA format field'ları loglanıyor.













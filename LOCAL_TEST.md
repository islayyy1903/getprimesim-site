# Local Test

## ✅ LOCAL SERVER ÇALIŞIYOR

Local development server başlatıldı.

---

## 🔍 TEST ADIMLARI

### Adım 1: Tarayıcıda Açın
1. `http://localhost:3000` adresine gidin
2. eSim sayfasına gidin: `http://localhost:3000/esim`

### Adım 2: Test Siparişi Yapın
1. Herhangi bir paket seçin → "Buy Now"
2. Stripe test kartı ile ödeme yapın:
   - **Kart:** `4242 4242 4242 4242`
   - **Son Kullanma:** `12/25`
   - **CVC:** `123`
   - **ZIP:** `12345`

### Adım 3: Terminal Loglarını Kontrol Edin
Terminal'de şu logları arayın:
```
=== CHECKOUT API CALLED ===
Secret key exists: true
Secret key starts with: sk_live_...
Publishable key exists: true
Publishable key starts with: pk_live_...
Stripe session created: cs_test_...
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Local Environment Variables:**
   - Local'de `.env.local` dosyasında key'ler olmalı
   - Production'da Vercel Environment Variables'da olmalı

2. **Test vs Production:**
   - Local'de test key'leri kullanabilirsiniz
   - Production'da live key'leri kullanmalısınız

3. **Webhook:**
   - Local'de webhook çalışmaz (Stripe localhost'a webhook gönderemez)
   - Production'da webhook çalışır

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Local server çalışıyor**
2. ✅ **Test siparişi yapın**
3. ✅ **Terminal loglarını kontrol edin**
4. ✅ **Production'da key'leri güncelleyin**
5. ✅ **Production'da test edin**

---

**Local server çalışıyor! `http://localhost:3000` adresine gidin ve test edin! 🚀**










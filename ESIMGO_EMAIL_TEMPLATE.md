# eSimGo'ya Gönderilecek Email Template

## 📧 Email Konusu
```
API v3 Entegrasyonu - Request Format ve Bundle İsimleri
```

## 📝 Email İçeriği

```
Merhaba eSimGo Support,

API v3 entegrasyonu yapıyorum ancak sipariş oluşturma konusunda sorun yaşıyorum.

1. API Key Kontrolü:
   - API Key'imiz: lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT
   - Bu key aktif mi? Doğru mu?

2. API Endpoint:
   - Şu anki endpoint: POST https://api.esimgo.io/v3/orders
   - Bu doğru mu? Farklı bir endpoint mi kullanmalıyız?

3. Request Format:
   Şu anki request formatımız:
   {
     "type": "purchase",
     "assign": false,
     "order": [
       {
         "type": "bundle",
         "quantity": 1,
         "item": "esim_1GB_7D_US_V2",
         "iccids": [],
         "allowReassign": false
       }
     ],
     "profileID": "uuid-format",
     "email": "customer@email.com",
     "callback_url": "https://getprimesim.com/api/esimgo/webhook",
     "version": "v3"
   }
   
   Bu format doğru mu? Farklı field'lar mı gerekiyor?

4. Bundle İsimleri:
   Tüm bundle isimlerini paylaşabilir misiniz?
   Özellikle:
   - USA 1GB 7 gün ✅ (esim_1GB_7D_US_V2 - CSV'den görüldü)
   - USA 3GB 30 gün
   - UK 1GB 7 gün
   - UK 3GB 30 gün
   - Germany 1GB 7 gün
   - Germany 3GB 30 gün
   - Global 1GB 7 gün
   - Global 3GB 30 gün

5. API Dokümantasyonu:
   API v3 dokümantasyonunu paylaşabilir misiniz?
   Request/Response örnekleri var mı?

6. Sorun:
   - Ödeme başarılı oluyor (Stripe)
   - Email gönderiliyor
   - Ancak eSimGo API'ye istek atıldığında sipariş oluşmuyor
   - Inventory'den stok düşmüyor
   - QR code gelmiyor

Teşekkürler!
```

---

## 🔍 VERCEL LOGLARINDAN EKLEYİN

**Vercel Dashboard → Logs** sekmesinden:

1. **eSimGo API Request Body** logunu kopyalayın
2. **eSimGo API Response** veya **Error** logunu kopyalayın
3. **Email'e ekleyin**

**Örnek:**
```
6. Vercel Logları:
   Request Body: {...}
   Response: {...}
   Error: {...}
```

---

## 📋 KONTROL LİSTESİ

### Vercel'de Kontrol: ✅
- [x] `ESIMGO_API_KEY` var
- [x] `ESIMGO_API_URL` = `https://api.esimgo.io/v3`

### eSimGo'ya Sorulacak:
- [ ] API Key doğru mu?
- [ ] API endpoint doğru mu?
- [ ] Request format doğru mu?
- [ ] Bundle isimleri neler?
- [ ] API dokümantasyonu var mı?

---

**Email'i eSimGo support'a gönderin! 📧**





# eSimGo API Bilgileri

## ✅ API Key Alındı

**API Key:** `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`

---

## ❓ EKSİK BİLGİLER

### 1. API Endpoint URL
eSimGo API endpoint URL'i nedir?

**Örnekler:**
- `https://api.esimgo.com/v1/`
- `https://api.esimgo.com/api/v1/`
- `https://esimgo.com/api/v1/`

**Bu bilgiyi eSimGo'dan almanız gerekiyor.**

---

### 2. API Dokümantasyonu
eSimGo API dokümantasyonunda şunları öğrenmemiz gerekiyor:

- **eSim satın alma endpoint'i nedir?**
  - Örn: `POST /purchases` veya `POST /orders`

- **Request format nedir?**
  - Örn: 
    ```json
    {
      "package_id": "usa-1gb-7days",
      "email": "customer@example.com",
      "quantity": 1
    }
    ```

- **Response format nedir?**
  - QR code nasıl dönüyor?
  - Örn:
    ```json
    {
      "order_id": "12345",
      "qr_code": "data:image/png;base64,...",
      "qr_code_url": "https://..."
    }
    ```

- **Authentication nasıl yapılıyor?**
  - Header'da mı? (örn: `Authorization: Bearer TOKEN`)
  - API Key header'da mı? (örn: `X-API-Key: KEY`)

---

### 3. Paket ID'leri
Website'deki paketlerin eSimGo'daki karşılıkları nedir?

**Website Paketleri:**
- USA eSIM – 1GB
- USA eSIM – 3GB
- UK eSIM – 1GB
- UK eSIM – 3GB
- Germany eSIM – 1GB
- Germany eSIM – 3GB
- Global eSIM – 1GB
- Global eSIM – 3GB

**eSimGo Paket ID'leri:** (eSimGo'dan alınacak)

---

## 🚀 ŞİMDİ NE YAPMALI?

### 1. eSimGo'dan API Endpoint URL'i Alın
- API dokümantasyonunda endpoint URL'i arayın
- Veya eSimGo support'a sorun

### 2. API Dokümantasyonunu İnceleyin
- eSim satın alma endpoint'ini bulun
- Request ve response format'ını öğrenin

### 3. Paket ID'lerini Öğrenin
- Her paket için eSimGo'daki ID'yi öğrenin

---

## 📧 eSimGo'ya Sorulacak Sorular

1. **API Endpoint URL nedir?**
2. **eSim satın alma endpoint'i nedir?** (örn: POST /purchases)
3. **Request format nedir?** (JSON body örneği)
4. **Response format nedir?** (QR code nasıl dönüyor?)
5. **Authentication nasıl yapılıyor?** (Header'da mı?)
6. **Paket ID'leri nelerdir?** (Her paket için)

---

## ✅ YAPILANLAR

- [x] API Key alındı: `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
- [x] `.env.local` dosyasına eklendi
- [ ] API Endpoint URL eklenecek
- [ ] Vercel Environment Variables eklenecek
- [ ] API entegrasyonu tamamlanacak

---

**API Endpoint URL'ini ve dokümantasyonu aldıktan sonra, entegrasyonu tamamlayacağım! 🚀**















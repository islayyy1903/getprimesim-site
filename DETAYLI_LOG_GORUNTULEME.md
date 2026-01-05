# Detaylı Log Görüntüleme

## 🚨 SORUN: Detaylı Hata Logları Görünmüyor

**Görünen:** "Notification email sent to customer about eSimGo issue"
**Eksik:** eSimGo API hatasının detayları

---

## 🔍 DETAYLI LOGLARI GÖRME

### Yöntem 1: Log Satırına Tıklayın

1. **Vercel Dashboard → Logs** sekmesinde
2. **`/api/webhooks/stripe`** satırına tıklayın
3. **Detaylı log paneli açılacak**
4. Şu logları arayın:
   - `📤 Sending request to eSimGo API...`
   - `📥 eSimGo API Response:` veya `❌ eSimGo API error:`
   - `❌ eSimGo purchase failed:`

### Yöntem 2: Farklı Arama Terimleri

**Arama kutusuna şunları yazın:**

1. **`📤 Sending request to eSimGo`**
   - eSimGo API'ye istek gidiyor mu?

2. **`📥 eSimGo API Response`**
   - eSimGo API'den ne döndü?

3. **`❌ eSimGo API error`**
   - eSimGo API hatası var mı?

4. **`❌ eSimGo purchase failed`**
   - eSimGo purchase neden başarısız?

5. **`Full response`**
   - Tam API response'u görmek için

### Yöntem 3: Request ID ile Arama

1. **`/api/webhooks/stripe`** satırındaki **Request ID'yi** bulun
2. **Request ID ile arama yapın**
3. **Tüm ilgili logları görün**

---

## 📋 ARANACAK LOGLAR

### 1. eSimGo API Request
```
📤 Sending request to eSimGo API...
  - API URL: https://api.esimgo.io/v3
  - Package ID: usa-1gb-7days
  - Email: ...
```

### 2. eSimGo API Response (Başarılı)
```
📥 eSimGo API Response:
  - Full response: {...}
  - Order ID: ...
  - QR Code: Base64 provided / Not provided
```

### 3. eSimGo API Error (Başarısız)
```
❌ eSimGo API error:
  - Status: 404 / 400 / 401
  - Status text: ...
  - Error response: {...}
  - Full error text: ...
```

### 4. eSimGo Purchase Failed
```
❌ eSimGo purchase failed:
  - Error: ...
  - Is Stock Error: true/false
  - Package: USA eSIM – 1GB
  - eSimGo Package ID: usa-1gb-7days
  - Email: ...
  - Session ID: ...
```

---

## 🎯 HIZLI ÇÖZÜM

### Adım 1: Log Satırına Tıklayın
1. **`/api/webhooks/stripe`** satırına tıklayın
2. **Detaylı log paneli açılacak**
3. **Scroll edin, tüm logları görün**

### Adım 2: Arama Yapın
**Arama kutusuna yazın:**
- `eSimGo API error`
- `eSimGo purchase failed`
- `Full response`

### Adım 3: Paylaşın
**Bulduğunuz logları paylaşın:**
- Hata mesajı ne?
- Status code ne? (404, 400, 401?)
- Error response ne?

---

## ⚠️ ÖNEMLİ

**Eğer loglar görünmüyorsa:**
1. **Zaman aralığını genişletin**
2. **Farklı arama terimleri deneyin**
3. **Request ID ile arama yapın**

---

**Log satırına tıklayın ve detaylı logları paylaşın! 🔍**





# Log Görüntüleme - Adım Adım

## 🚀 EN KOLAY YÖNTEM: DEPLOYMENTS ÜZERİNDEN

### Adım 1: Vercel Dashboard
1. Tarayıcıda açın: **https://vercel.com/dashboard**
2. Giriş yapın

### Adım 2: Projenizi Bulun
1. Dashboard'da **"getprimesim-site"** projenizi bulun
2. **Projeye tıklayın**

### Adım 3: Deployments Sekmesi
1. Proje sayfasında üst menüden **"Deployments"** sekmesine tıklayın
2. Veya URL'de: `https://vercel.com/[kullanici-adi]/getprimesim-site/deployments`

### Adım 4: En Son Deployment
1. Deployments listesinde **en üstteki** (en son) deployment'a tıklayın
2. Yeşil "Production" veya "Ready" yazısı olan deployment

### Adım 5: Functions Sekmesi
1. Deployment sayfasında **"Functions"** sekmesine tıklayın
2. Veya sayfanın üst kısmında **"Functions"** linkine tıklayın

### Adım 6: Endpoint Seçin
1. Functions listesinde şunları göreceksiniz:
   - `/api/checkout`
   - `/api/webhooks/stripe` ← **BURAYA TIKLAYIN**
   - `/api/esimgo/webhook` ← **VEYA BURAYA**
2. Endpoint'e tıklayın

### Adım 7: Logları Görün
1. Endpoint sayfasında **"Logs"** sekmesine tıklayın
2. Veya direkt loglar görünecek
3. En son logları göreceksiniz

---

## 📸 EKRAN GÖRÜNTÜSÜ YOLU

```
Vercel Dashboard
  ↓
getprimesim-site (Proje)
  ↓
Deployments (Sekme)
  ↓
[En Son Deployment] (Tıklayın)
  ↓
Functions (Sekme)
  ↓
/api/webhooks/stripe (Endpoint - Tıklayın)
  ↓
Logs (Sekme veya Direkt Görünür)
```

---

## 🔍 ALTERNATIF: RUNTIME LOGS

Eğer Functions sekmesi yoksa:

1. Deployment sayfasında **"Runtime Logs"** sekmesine tıklayın
2. Tüm runtime loglarını göreceksiniz
3. `/api/webhooks/stripe` ile ilgili logları arayın

---

## ⚠️ ENDPOINT GÖRÜNMÜYORSA

### Neden?
- Endpoint henüz çağrılmamış olabilir
- Test siparişi yapılmamış olabilir

### Çözüm:
1. **Test siparişi yapın:**
   - `https://getprimesim.com/esim`
   - Paket seçin → "Buy Now"
   - Test kartı ile ödeme yapın

2. **Sonra tekrar kontrol edin:**
   - Deployments → En son deployment → Functions
   - Endpoint'ler görünecek

---

## ✅ HIZLI KONTROL

**Şu adımları takip edin:**

1. ✅ Vercel Dashboard'a gidin
2. ✅ Projenize tıklayın
3. ✅ **Deployments** sekmesine tıklayın
4. ✅ En son deployment'a tıklayın
5. ✅ **Functions** sekmesine tıklayın
6. ✅ Endpoint'leri görüyor musunuz?

**Eğer hala göremiyorsanız:**
- Test siparişi yapın
- Sonra tekrar kontrol edin

---

**Deployments → En son deployment → Functions sekmesine gittiniz mi? Endpoint'leri görüyor musunuz? 🔍**




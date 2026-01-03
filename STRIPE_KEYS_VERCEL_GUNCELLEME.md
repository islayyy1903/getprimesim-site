# Stripe Keys Vercel Güncelleme

## ✅ STRIPE DASHBOARD'DA KEY'LER VAR

Stripe Dashboard'da görünen key'ler:
- **Publishable key:** `pk_live_51SjMRqI1AmDBUxzCifNyurzMW1MVsCbr8pvtescJ3QB9ZcegD3isOqeEMgjzAIwp3c1EYyTMJihy6bsjhKvBlWlU00FCAY1Rtd`
- **Secret key:** `sk_live...R36m` (kısmen gizli)
- **getprimesim=production:** `sk_live...MxLa` (kısmen gizli)

Şimdi bu key'leri Vercel'e ekleyelim/güncelleyelim.

---

## 🔧 VERCEL'E KEY'LERİ EKLEME/GÜNCELLEME

### Adım 1: Stripe Dashboard'dan Key'leri Kopyalayın

**Publishable Key:**
1. Stripe Dashboard → **Developers** → **API keys**
2. **"Publishable key"** satırındaki token'ı kopyalayın
3. Tam değer: `pk_live_51SjMRqI1AmDBUxzCifNyurzMW1MVsCbr8pvtescJ3QB9ZcegD3isOqeEMgjzAIwp3c1EYyTMJihy6bsjhKvBlWlU00FCAY1Rtd`

**Secret Key:**
1. Stripe Dashboard → **Developers** → **API keys**
2. **"Secret key"** satırındaki **"Reveal"** butonuna tıklayın
3. Secret key'i kopyalayın (tam değer görünecek)
4. Veya **"getprimesim=production"** key'ini kullanabilirsiniz (eğer bu production için oluşturulduysa)

### Adım 2: Vercel'e Ekleyin/Güncelleyin

**NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:**
1. Vercel Dashboard → Settings → **Environment Variables**
2. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` değişkenini bulun veya ekleyin
3. **Edit** → Değeri güncelleyin:
   - Value: `pk_live_51SjMRqI1AmDBUxzCifNyurzMW1MVsCbr8pvtescJ3QB9ZcegD3isOqeEMgjzAIwp3c1EYyTMJihy6bsjhKvBlWlU00FCAY1Rtd`
4. Environment: Production, Preview, Development (hepsini seçin)
5. **Save**

**STRIPE_SECRET_KEY:**
1. Vercel Dashboard → Settings → **Environment Variables**
2. `STRIPE_SECRET_KEY` değişkenini bulun veya ekleyin
3. **Edit** → Değeri güncelleyin:
   - Value: Stripe Dashboard'dan kopyaladığınız secret key (tam değer)
4. Environment: Production, Preview, Development (hepsini seçin)
5. **Save**

### Adım 3: Kontrol Edin
1. Environment Variables listesinde her iki key de var mı?
2. Değerler doğru mu? (tırnak işareti veya boşluk yok)
3. Environment'lar seçili mi? (Production, Preview, Development)

### Adım 4: Redeploy Yapın
1. Vercel Dashboard → **Deployments**
2. En son deployment → **"..."** → **"Redeploy"**

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Key Formatı:**
   - Publishable key: `pk_live_...` ile başlamalı
   - Secret key: `sk_live_...` ile başlamalı
   - Tırnak işareti EKLEMEYİN
   - Boşluk EKLEMEYİN

2. **Environment Seçimi:**
   - Production, Preview, Development **hepsini seçin**
   - Aksi halde sadece production'da çalışır

3. **Redeploy:**
   - Key'ler güncellendikten sonra **mutlaka redeploy yapın**
   - Aksi halde yeni key'ler yüklenmez

---

## ✅ KONTROL LİSTESİ

- [ ] Stripe Dashboard'dan publishable key kopyalandı
- [ ] Stripe Dashboard'dan secret key kopyalandı (Reveal ile)
- [ ] Vercel'de `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` güncellendi
- [ ] Vercel'de `STRIPE_SECRET_KEY` güncellendi
- [ ] Environment: Production, Preview, Development (hepsini seçin)
- [ ] Save butonuna tıklandı
- [ ] Redeploy yapıldı

---

## 🧪 TEST ETME

### Adım 1: Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### Adım 2: Hata Kontrolü
- "Invalid API Key" hatası görünüyor mu?
- Checkout başarılı mı? (Stripe checkout sayfasına yönlendiriliyor mu?)

### Adım 3: Vercel Loglarını Kontrol Edin
1. Vercel Dashboard → Deployments → Runtime Logs
2. Şu logları arayın:
   ```
   === CHECKOUT API CALLED ===
   Secret key exists: true
   Secret key starts with: sk_live_...
   Publishable key exists: true
   Publishable key starts with: pk_live_...
   Stripe session created: cs_live_...
   ```

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Stripe Dashboard'dan key'leri kopyalayın**
2. ✅ **Vercel'de key'leri güncelleyin**
3. ✅ **Redeploy yapın**
4. ✅ **Test siparişi yapın**

---

**Key'leri Vercel'e güncelleyin ve redeploy yapın! Sonra test edin! 🚀**




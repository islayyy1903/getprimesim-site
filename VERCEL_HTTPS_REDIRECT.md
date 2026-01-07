# Vercel'de HTTPS Yönlendirmesi Aktif Etme

## Adım Adım Talimatlar

### 1. Vercel Dashboard'a Giriş
1. [Vercel Dashboard](https://vercel.com/dashboard) → Giriş yapın
2. `getprimesim-site` projenizi seçin

### 2. Domain Ayarlarına Git
1. Proje sayfasında üst menüden **"Settings"** sekmesine tıklayın
2. Sol menüden **"Domains"** seçeneğine tıklayın

### 3. Domain'i Kontrol Et
1. `getprimesim.com` domain'inin listede olduğunu kontrol edin
2. Eğer yoksa:
   - **"Add Domain"** butonuna tıklayın
   - `getprimesim.com` yazın
   - **"Add"** butonuna tıklayın
   - DNS ayarlarını yapın (Namecheap'te)

### 4. HTTPS Yönlendirmesini Aktif Et
1. `getprimesim.com` domain'inin yanındaki **"..."** (üç nokta) menüsüne tıklayın
2. **"View Configuration"** veya **"Configure"** seçeneğine tıklayın
3. **"Redirect to HTTPS"** seçeneğini bulun
4. Bu seçeneği **aktif** edin (toggle switch'i açın)
5. **"Save"** veya **"Update"** butonuna tıklayın

### 5. Alternatif: Otomatik Aktif
Vercel'de bazı durumlarda HTTPS yönlendirmesi otomatik olarak aktif olur. Kontrol etmek için:

1. Domain sayfasında `getprimesim.com` domain'ine tıklayın
2. **"Configuration"** bölümüne bakın
3. Eğer **"Force HTTPS"** veya **"Redirect to HTTPS"** görünüyorsa, zaten aktif demektir

### 6. Test Et
1. Tarayıcıda `http://getprimesim.com` yazın
2. Otomatik olarak `https://getprimesim.com`'a yönlendirilmelisiniz
3. Adres çubuğunda kilit ikonu görünmeli (HTTPS aktif)

## Ekran Görüntüleri İçin Kontrol Noktaları

### Domain Listesi:
- ✅ `getprimesim.com` listede görünmeli
- ✅ Status: "Valid" veya "Active" olmalı
- ✅ SSL: "Valid" olmalı

### Domain Detayları:
- ✅ **"Force HTTPS"** veya **"Redirect to HTTPS"** seçeneği görünmeli
- ✅ Bu seçenek **aktif** (enabled) olmalı

## Sorun Giderme

### "Redirect to HTTPS" seçeneği görünmüyorsa:
1. Domain'in doğru yapılandırıldığından emin olun
2. SSL sertifikasının aktif olduğunu kontrol edin
3. Vercel'in en son sürümünü kullandığınızdan emin olun

### Yönlendirme çalışmıyorsa:
1. Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
2. Farklı bir tarayıcıda test edin
3. DNS değişikliklerinin yayılmasını bekleyin (birkaç saat)

### SSL Sertifikası Sorunu:
- Vercel otomatik olarak SSL sertifikası sağlar
- Eğer SSL sorunu varsa, Vercel support ile iletişime geçin

## Önemli Notlar

⚠️ **Production'da HTTPS zorunlu:**
- Stripe ödemeleri için HTTPS gerekli
- Google SEO için HTTPS önemli
- Kullanıcı güvenliği için HTTPS şart

✅ **Vercel Varsayılan Davranış:**
- Vercel varsayılan olarak HTTP'den HTTPS'e yönlendirme yapar
- Bu ayar genellikle otomatik olarak aktif olur
- Manuel olarak kontrol etmek iyi bir pratiktir















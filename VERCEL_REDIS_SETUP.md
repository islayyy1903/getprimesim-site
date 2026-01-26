# Vercel'de Upstash Redis Kurulumu

## Sorun
Admin panelde kullanıcılar görünmüyor çünkü Redis environment variable'ları Vercel'de ayarlanmamış. Bu yüzden veriler memory'ye kaydediliyor ve serverless function restart olduğunda kayboluyor.

## Çözüm: Vercel'de Environment Variables Ekleme

### Adım 1: Upstash Redis Hesabı Oluşturma (Eğer yoksa)

1. [Upstash Console](https://console.upstash.com/) adresine gidin
2. Hesap oluşturun veya giriş yapın
3. "Create Database" butonuna tıklayın
4. Database adı verin (örn: `getprimesim-redis`)
5. Region seçin (EU veya US)
6. "Create" butonuna tıklayın

### Adım 2: Redis Credentials'ları Alma

1. Oluşturduğunuz database'e tıklayın
2. "REST API" sekmesine gidin
3. Şu bilgileri kopyalayın:
   - **UPSTASH_REDIS_REST_URL**: `https://xxxxx.upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN**: `AXxxxxx...` (uzun bir token)

### Adım 3: Vercel'de Environment Variables Ekleme

#### Yöntem 1: Vercel Dashboard (Önerilen)

1. [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin
2. Projenizi seçin (`getprimesim-site`)
3. **Settings** sekmesine tıklayın
4. Sol menüden **Environment Variables** seçeneğine tıklayın
5. Şu variable'ları ekleyin:

   **Variable 1:**
   - **Name**: `UPSTASH_REDIS_REST_URL`
   - **Value**: Upstash'ten kopyaladığınız URL (örn: `https://xxxxx.upstash.io`)
   - **Environment**: Production, Preview, Development (hepsini seçin)
   - **Save** butonuna tıklayın

   **Variable 2:**
   - **Name**: `UPSTASH_REDIS_REST_TOKEN`
   - **Value**: Upstash'ten kopyaladığınız token (örn: `AXxxxxx...`)
   - **Environment**: Production, Preview, Development (hepsini seçin)
   - **Save** butonuna tıklayın

6. **Redeploy** butonuna tıklayın veya yeni bir commit push edin

#### Yöntem 2: Vercel CLI

```bash
# Vercel CLI ile environment variable ekleme
vercel env add UPSTASH_REDIS_REST_URL
# Value'yu yapıştırın ve Enter'a basın
# Environment seçin: production, preview, development

vercel env add UPSTASH_REDIS_REST_TOKEN
# Value'yu yapıştırın ve Enter'a basın
# Environment seçin: production, preview, development

# Deploy etmek için
vercel --prod
```

### Adım 4: Redis Bağlantısını Test Etme

1. Environment variable'ları ekledikten sonra projeyi redeploy edin
2. Admin panele giriş yapın
3. Browser console'da şu komutu çalıştırın:

```javascript
fetch('/api/admin/test-redis', {
  credentials: 'include'
})
.then(r => r.json())
.then(console.log)
```

4. Veya tarayıcıda direkt şu URL'yi açın:
   ```
   https://getprimesim.com/api/admin/test-redis
   ```

5. Şu response'u görmelisiniz:
   ```json
   {
     "status": "Redis connected successfully",
     "details": {
       "redisUrl": "https://xxxxx.upstash.io...",
       "redisToken": "AXxxxxx...",
       "redisConfigured": true
     },
     "test": {
       "write": "success",
       "read": "success"
     }
   }
   ```

### Adım 5: Mevcut Verileri Kontrol Etme

Redis bağlantısı başarılı olduktan sonra:

1. Yeni bir kullanıcı kaydı yapın
2. Admin panelde "Users" sekmesine bakın
3. Kullanıcı görünmelidir

**Not:** Eğer önceden memory'ye kaydedilmiş veriler varsa, bunlar Redis'e taşınmayacak. Yeni kayıtlar Redis'e kaydedilecek.

## Sorun Giderme

### Redis bağlantısı başarısız oluyorsa:

1. **Environment variable'ları kontrol edin:**
   - Vercel dashboard'da Settings > Environment Variables
   - `UPSTASH_REDIS_REST_URL` ve `UPSTASH_REDIS_REST_TOKEN` var mı?
   - Değerler doğru mu? (URL `https://` ile başlamalı, token `AX` ile başlamalı)

2. **Redeploy yaptınız mı?**
   - Environment variable ekledikten sonra mutlaka redeploy yapın
   - Veya yeni bir commit push edin

3. **Upstash console'da database aktif mi?**
   - [Upstash Console](https://console.upstash.com/) adresine gidin
   - Database'iniz listede görünüyor mu?
   - Status "Active" mi?

4. **Logları kontrol edin:**
   - Vercel dashboard > Deployments > Son deployment > Functions
   - Logları inceleyin, Redis ile ilgili hata var mı?

### Hala çalışmıyorsa:

1. Test endpoint'ini kullanın: `/api/admin/test-redis`
2. Response'u paylaşın, birlikte çözelim

## Önemli Notlar

- ✅ Environment variable'ları ekledikten sonra **mutlaka redeploy** yapın
- ✅ Production, Preview ve Development için aynı variable'ları ekleyin
- ✅ Redis credentials'ları güvenli tutun, asla commit etmeyin
- ✅ Rate limiting için de aynı Redis kullanılıyor (zaten çalışıyorsa Redis kurulu demektir)

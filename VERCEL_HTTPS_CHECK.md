# Vercel HTTPS Kontrolü

## Durum
Vercel'de "Redirect to HTTPS" seçeneği görünmüyor. Bu normal olabilir çünkü Vercel varsayılan olarak HTTPS yönlendirmesi yapar.

## Kontrol Yöntemleri

### 1. Otomatik HTTPS (Varsayılan)
Vercel **otomatik olarak** HTTP'den HTTPS'e yönlendirme yapar. Ayrı bir ayar gerekmez.

### 2. Test Et
1. Tarayıcıda `http://getprimesim.com` yazın
2. Otomatik olarak `https://getprimesim.com`'a yönlendirilmelisiniz
3. Adres çubuğunda **kilit ikonu** görünmeli

### 3. Domain Ayarlarını Kontrol
1. Vercel Dashboard → Projeniz → **Settings** → **Domains**
2. `getprimesim.com` domain'ine tıklayın
3. **"Configuration"** veya **"Details"** bölümüne bakın
4. SSL durumunu kontrol edin:
   - ✅ **SSL: Valid** görünmeli
   - ✅ **Status: Active** görünmeli

### 4. Vercel CLI ile Kontrol (Opsiyonel)
Eğer Vercel CLI kuruluysa:
```bash
vercel domains ls
vercel domains inspect getprimesim.com
```

## Vercel'in Varsayılan Davranışı

✅ **Otomatik HTTPS:**
- Vercel tüm domain'ler için otomatik SSL sertifikası sağlar
- HTTP'den HTTPS'e otomatik yönlendirme yapar
- Ayrı bir ayar gerektirmez

✅ **SSL Sertifikası:**
- Let's Encrypt ile otomatik sağlanır
- Otomatik yenilenir
- Ücretsizdir

## Sorun Giderme

### HTTP'den HTTPS'e yönlendirme çalışmıyorsa:

1. **DNS Kontrolü:**
   - Domain'in Vercel'e doğru bağlı olduğundan emin olun
   - Namecheap'te DNS kayıtlarını kontrol edin

2. **Domain Durumu:**
   - Vercel'de domain'in "Valid" durumunda olduğundan emin olun
   - SSL sertifikasının aktif olduğunu kontrol edin

3. **Cache Temizleme:**
   - Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
   - Farklı bir tarayıcıda test edin
   - Incognito/Private modda test edin

4. **Bekleme Süresi:**
   - DNS değişiklikleri 24-48 saat sürebilir
   - SSL sertifikası birkaç saat içinde aktif olur

## Manuel Yönlendirme (Gerekirse)

Eğer otomatik yönlendirme çalışmıyorsa, Next.js'te manuel yönlendirme ekleyebiliriz:

### `next.config.js` veya `next.config.mjs` dosyasına ekleyin:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://getprimesim.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

**Not:** Bu genellikle gerekmez çünkü Vercel otomatik yapar.

## Sonuç

✅ **Vercel otomatik olarak HTTPS yönlendirmesi yapar**
✅ **Ayrı bir ayar gerektirmez**
✅ **SSL sertifikası otomatik sağlanır**

Eğer `http://getprimesim.com` yazdığınızda `https://getprimesim.com`'a yönlendiriliyorsa, her şey çalışıyor demektir!





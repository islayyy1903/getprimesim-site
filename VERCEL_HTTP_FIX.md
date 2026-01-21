# HTTP/HTTPS Sorunu Çözümü

## Sorun
`http://getprimesim.com` çalışmıyor veya yönlendirme sorunu var.

## Çözüm

### 1. Vercel Otomatik HTTPS Yönlendirmesi
Vercel varsayılan olarak HTTP'den HTTPS'e otomatik yönlendirme yapar. Bu normal ve güvenli bir davranıştır.

**Önemli:** Production'da HTTPS kullanılmalıdır. HTTP güvenli değildir.

### 2. Domain Ayarlarını Kontrol
1. Vercel Dashboard → Projeniz → **Settings** → **Domains**
2. `getprimesim.com` domain'inin ekli olduğundan emin olun
3. **"Redirect to HTTPS"** seçeneğinin aktif olduğundan emin olun

### 3. DNS Ayarlarını Kontrol
Domain'inizde DNS kayıtları doğru olmalı:

**A Record:**
- Type: A
- Name: @ (veya boş)
- Value: Vercel'in verdiği IP adresi (genellikle 76.76.21.21)

**CNAME Record:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

### 4. Vercel'de Domain Yapılandırması
1. Vercel Dashboard → Projeniz → **Settings** → **Domains**
2. `getprimesim.com` domain'ini ekleyin (yoksa)
3. **"Redirect to HTTPS"** seçeneğini aktif edin
4. **"Save"** butonuna tıklayın

### 5. Bekleme Süresi
- DNS değişiklikleri 24-48 saat sürebilir
- Genellikle birkaç saat içinde aktif olur

## Önerilen Kullanım

**Production için:**
- ✅ `https://getprimesim.com` kullanın (güvenli)
- ✅ `https://www.getprimesim.com` kullanın (güvenli)
- ❌ `http://getprimesim.com` kullanmayın (güvensiz, otomatik HTTPS'e yönlendirilir)

**Neden HTTPS?**
- Güvenlik: Veri şifreleme
- SEO: Google HTTPS'yi tercih eder
- Güven: Kullanıcılar için güven verir
- Stripe: HTTPS zorunlu (ödeme için)

## Test

1. `https://getprimesim.com` adresini açın
2. Çalışıyorsa sorun yok
3. HTTP'den HTTPS'e otomatik yönlendirme olmalı

## Sorun Giderme

### HTTP çalışmıyorsa:
- Bu normal! Vercel HTTP'yi HTTPS'e yönlendirir
- `https://getprimesim.com` kullanın

### HTTPS çalışmıyorsa:
1. SSL sertifikası kontrol edin (Vercel otomatik sağlar)
2. Domain ayarlarını kontrol edin
3. DNS kayıtlarını kontrol edin
















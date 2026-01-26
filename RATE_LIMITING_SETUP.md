# Rate Limiting Kurulum Rehberi

## 📋 Genel Bakış

Checkout endpoint'ine **rate limiting** eklendi. Bu, DDoS saldırılarını ve aşırı istek gönderilmesini önler.

**Limit:** 5 checkout denemesi / 10 dakika / IP adresi

---

## 🔧 Kurulum

### Development (Geliştirme)

Development modunda, Upstash Redis yapılandırılmamışsa **in-memory rate limiting** otomatik olarak kullanılır. Ekstra kurulum gerekmez.

### Production (Canlı)

Production'da **Upstash Redis** kullanılır. Aşağıdaki adımları takip edin:

#### 1. Upstash Redis Oluşturma

1. [Upstash Console](https://console.upstash.com/)'a gidin
2. **Create Database** butonuna tıklayın
3. **Redis** seçeneğini seçin
4. Database adını girin (örn: `getprimesim-ratelimit`)
5. Region seçin (Vercel'inizin bölgesine yakın)
6. **Create** butonuna tıklayın

#### 2. Environment Variables Ekleme

Upstash Redis oluşturduktan sonra, aşağıdaki environment variables'ları Vercel'e ekleyin:

**Vercel Dashboard → Project → Settings → Environment Variables**

```
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

**Not:** Bu değerleri Upstash Console'dan alabilirsiniz:
- Database sayfasında **REST API** bölümüne gidin
- **UPSTASH_REDIS_REST_URL** ve **UPSTASH_REDIS_REST_TOKEN** değerlerini kopyalayın

#### 3. Vercel Integration (Alternatif)

Vercel Marketplace'ten Upstash Redis integration'ını da kullanabilirsiniz:

1. Vercel Dashboard → Project → **Integrations**
2. **Upstash** arayın
3. **Add Integration** butonuna tıklayın
4. Environment variables otomatik olarak eklenir

---

## 📊 Rate Limit Detayları

### Limit Ayarları

- **İstek Sayısı:** 5 checkout denemesi
- **Zaman Penceresi:** 10 dakika (sliding window)
- **Identifier:** IP adresi

### Rate Limit Headers

Rate limit aşıldığında, response'da şu headers döner:

```
HTTP/1.1 429 Too Many Requests
Retry-After: 600
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1234567890
```

### Rate Limit Response

```json
{
  "error": "Rate limit exceeded. Please try again in 600 seconds."
}
```

---

## 🔍 Nasıl Çalışır?

1. **Request gelir** → IP adresi çıkarılır
2. **Rate limit kontrol edilir** → Upstash Redis'te (veya in-memory'de) sayım yapılır
3. **Limit aşılmışsa** → 429 hatası döner
4. **Limit aşılmamışsa** → İstek işlenir, sayaç artırılır

### IP Adresi Tespiti

Rate limiting, şu sırayla IP adresini tespit eder:

1. `x-forwarded-for` header'ı (ilk IP)
2. `x-real-ip` header'ı
3. `cf-connecting-ip` header'ı (Cloudflare)
4. Fallback: `"unknown"`

---

## 🧪 Test

### Rate Limit Testi

```bash
# 5 istek gönder (başarılı olmalı)
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/checkout \
    -H "Content-Type: application/json" \
    -d '{"packageId":"esim_3GB_30D_US_V2"}'
done

# 6. istek (rate limit aşılmalı)
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"packageId":"esim_3GB_30D_US_V2"}'
# Beklenen: 429 Too Many Requests
```

---

## ⚙️ Limit Ayarlarını Değiştirme

Limit ayarlarını değiştirmek için `app/lib/rateLimit.ts` dosyasındaki `CHECKOUT_RATE_LIMIT` objesini düzenleyin:

```typescript
const CHECKOUT_RATE_LIMIT = {
  requests: 5,      // İstek sayısı
  window: "10 m",   // Zaman penceresi (10 dakika)
};
```

**Not:** Değişiklik yaptıktan sonra uygulamayı yeniden deploy edin.

---

## 🐛 Sorun Giderme

### Rate Limiting Çalışmıyor

1. **Environment variables kontrol edin:**
   ```bash
   # Vercel'de kontrol edin
   vercel env ls
   ```

2. **Upstash Redis bağlantısını test edin:**
   - Upstash Console'da database'in **Status**'unu kontrol edin
   - **REST API** endpoint'ini test edin

3. **Logları kontrol edin:**
   - Vercel Dashboard → **Logs** bölümüne gidin
   - Rate limiting ile ilgili hata mesajlarını arayın

### Development'ta Rate Limiting Çalışmıyor

Development modunda in-memory rate limiting kullanılır. Eğer çalışmıyorsa:

1. Console loglarını kontrol edin: `⚠️ Upstash Redis not configured...` mesajı görünmeli
2. Server'ı yeniden başlatın
3. Tarayıcı cache'ini temizleyin

---

## 📝 Notlar

- Rate limiting **sadece checkout endpoint'i** için aktif
- Her IP adresi için ayrı limit uygulanır
- Limit aşıldığında kullanıcıya açıklayıcı bir hata mesajı gösterilir
- Production'da Upstash Redis kullanılması önerilir (in-memory serverless'te çalışmayabilir)

---

## ✅ Kurulum Kontrol Listesi

- [ ] Upstash Redis database oluşturuldu
- [ ] `UPSTASH_REDIS_REST_URL` environment variable eklendi
- [ ] `UPSTASH_REDIS_REST_TOKEN` environment variable eklendi
- [ ] Vercel'de environment variables deploy edildi
- [ ] Rate limiting test edildi (5+ istek gönderildi)
- [ ] 429 hatası doğru şekilde dönüyor

---

**Son Güncelleme:** 26 Ocak 2026

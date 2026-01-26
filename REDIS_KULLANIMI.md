# Redis Kullanımı - Neden ve Nerede?

## Redis Sistemimizde 2 Ana Amaçla Kullanılıyor:

### 1. 🔒 Rate Limiting (Spam/Abuse Önleme)
**Dosya:** `app/lib/rateLimit.ts`

**Amaç:** Checkout endpoint'inde spam ve abuse önlemek için IP bazlı rate limiting yapıyor.

**Nasıl Çalışıyor:**
- Her IP adresi için 10 dakikada maksimum 5 checkout isteği
- Redis'te IP adresi ve istek sayısı saklanıyor
- Limit aşılırsa istek reddediliyor

**Fallback:** Redis yoksa in-memory rate limiting kullanılıyor (ama production'da serverless function restart olduğunda sıfırlanır)

**Önem:** Spam ve DDoS saldırılarını önlemek için kritik

---

### 2. 💾 Admin Database (Kullanıcı/Sipariş Verileri)
**Dosya:** `app/lib/adminDb.ts`

**Amaç:** Admin panelde gösterilen verileri saklamak:
- Kullanıcılar (email, isim, kayıt tarihi, toplam sipariş sayısı, toplam harcama)
- Siparişler (Stripe session ID, müşteri bilgileri, paket detayları, durum)
- Ödeme logları (tüm ödeme işlemleri)

**Fallback:** Redis yoksa in-memory database kullanılıyor (ama production'da serverless function restart olduğunda veriler kaybolur)

**Önem:** Admin panelde verilerin görünmesi için gerekli

---

## ⚠️ Sorun: Redis Ücretli

Redis ücretli bir servis olduğu için kullanmak istemiyorsunuz. Anlıyorum.

## ✅ Çözüm Seçenekleri:

### Seçenek 1: Sadece In-Memory Kullan (Ücretsiz ama Sınırlı)
- ✅ Ücretsiz
- ❌ Production'da serverless function restart olduğunda veriler kaybolur
- ❌ Rate limiting production'da düzgün çalışmayabilir
- ❌ Admin paneldeki veriler kalıcı olmaz

### Seçenek 2: Vercel Postgres (Ücretsiz Tier Var)
- ✅ Ücretsiz tier mevcut
- ✅ Veriler kalıcı
- ✅ Admin database için ideal
- ⚠️ Rate limiting için kullanmak biraz karmaşık olabilir

### Seçenek 3: Hibrit Çözüm
- **Rate Limiting:** In-memory kullan (basit, ücretsiz)
- **Admin Database:** Vercel Postgres kullan (ücretsiz tier)

### Seçenek 4: Redis'i Tamamen Kaldır
- Rate limiting'i basitleştir (sadece in-memory)
- Admin database'i kaldır veya sadece Stripe webhook'larından veri çek

---

## 🎯 Öneri

Eğer Redis kullanmak istemiyorsanız:

1. **Rate Limiting:** In-memory kullanmaya devam edin (zaten fallback var)
2. **Admin Database:** 
   - Ya Vercel Postgres'e geçin (ücretsiz tier)
   - Ya da admin database'i tamamen kaldırın ve sadece Stripe Dashboard'dan verileri görün

Hangi seçeneği tercih edersiniz?

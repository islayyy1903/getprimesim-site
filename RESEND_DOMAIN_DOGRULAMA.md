# Resend Domain Doğrulama

## ⚠️ ÖNEMLİ: Resend Domain Doğrulaması Gerekli

Email göndermek için Resend'de domain doğrulaması yapmanız gerekiyor.

---

## 🔧 RESEND DOMAIN DOĞRULAMA ADIMLARI

### Adım 1: Resend Dashboard'a Giriş
1. [Resend Dashboard](https://resend.com/dashboard) → Giriş yapın
2. **Domains** sekmesine gidin

### Adım 2: Domain Ekleme
1. **"Add Domain"** butonuna tıklayın
2. Domain adını girin: `getprimesim.com`
3. **"Add"** butonuna tıklayın

### Adım 3: DNS Kayıtları Ekleme
Resend size DNS kayıtları verecek. Bunları Namecheap'te eklemeniz gerekiyor:

**Örnek DNS Kayıtları:**
```
Type: TXT
Name: @
Value: resend-domain-verification=xxxxxxxxxxxxx
TTL: 3600

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
TTL: 3600
```

### Adım 4: Namecheap'te DNS Kayıtları Ekleme
1. Namecheap → Domain List → `getprimesim.com` → **Advanced DNS**
2. Resend'den aldığınız DNS kayıtlarını ekleyin
3. **Save** butonuna tıklayın

### Adım 5: Domain Doğrulama
1. DNS kayıtları eklendikten sonra 5-10 dakika bekleyin
2. Resend Dashboard → **Domains** → Domain'in yanında **"Verify"** butonuna tıklayın
3. Doğrulama başarılı olursa ✅ işareti görünür

---

## 📧 EMAIL ADRESİ GÜNCELLEMESİ

Domain doğrulandıktan sonra `app/lib/email.ts` dosyasındaki email adresini güncelleyin:

**Şu anki (Test):**
```typescript
const fromEmail = "PrimeSim <onboarding@resend.dev>"; // Test için
```

**Güncellenmiş (Production):**
```typescript
const fromEmail = "PrimeSim <noreply@getprimesim.com>"; // Domain doğrulandıktan sonra
```

---

## 🚀 HIZLI TEST (Domain Doğrulaması Olmadan)

Eğer domain doğrulaması yapmak istemiyorsanız, Resend'in test domain'ini kullanabilirsiniz:

**Test Email Adresi:**
```
PrimeSim <onboarding@resend.dev>
```

**Not:** Bu email adresi sadece test için kullanılabilir. Production'da domain doğrulaması yapmanız önerilir.

---

## ✅ KONTROL LİSTESİ

- [ ] Resend Dashboard'a giriş yapıldı
- [ ] Domain eklendi (`getprimesim.com`)
- [ ] DNS kayıtları Namecheap'te eklendi
- [ ] Domain doğrulandı
- [ ] Email adresi güncellendi (`app/lib/email.ts`)
- [ ] Redeploy yapıldı
- [ ] Test email gönderildi

---

## 🔍 SORUN GİDERME

### Sorun 1: "Domain verification failed"
- DNS kayıtlarının doğru eklendiğinden emin olun
- 5-10 dakika bekleyin (DNS propagation)
- Namecheap'te DNS kayıtlarını kontrol edin

### Sorun 2: "Email not sent"
- Resend API key'in doğru olduğundan emin olun
- Vercel'de `RESEND_API_KEY` environment variable'ı var mı kontrol edin
- Logları kontrol edin

### Sorun 3: "Invalid from address"
- Domain doğrulaması yapıldı mı kontrol edin
- Email adresinin doğru formatta olduğundan emin olun
- Test için `onboarding@resend.dev` kullanın

---

**Domain doğrulaması yaptınız mı? 🔍**














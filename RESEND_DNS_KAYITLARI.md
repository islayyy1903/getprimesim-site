# Resend DNS Kayıtları - Namecheap Kurulumu

## ✅ RESEND DNS KAYITLARI

Resend domain doğrulaması için aşağıdaki DNS kayıtlarını Namecheap'te eklemeniz gerekiyor.

---

## 🔧 NAMECHEAP'TE DNS KAYITLARI EKLEME

### Adım 1: Namecheap'e Giriş
1. [Namecheap](https://www.namecheap.com/) → Giriş yapın
2. **Domain List** → `getprimesim.com` → **Manage**

### Adım 2: Advanced DNS Sekmesine Gidin
1. **Advanced DNS** sekmesine tıklayın
2. **Host Records** bölümüne gidin

### Adım 3: DNS Kayıtlarını Ekleyin

#### Kayıt 1: Domain Verification (TXT)
**Eğer Resend Dashboard'da domain verification için bir TXT kaydı varsa:**

1. **"Add New Record"** butonuna tıklayın
2. Formu doldurun:
   - **Type:** `TXT Record`
   - **Host:** `@`
   - **Value:** `resend-domain-verification=xxxxxxxxxxxxx` (Resend Dashboard'dan alınacak)
   - **TTL:** `Automatic` veya `3600`
3. **Save** butonuna tıklayın

#### Kayıt 2: DKIM (TXT veya CNAME)
**Resend Dashboard'da `resend._domainkey` için iki seçenek olabilir:**

**Seçenek A: TXT Kaydı (Verdiğiniz değer)**
1. **"Add New Record"** butonuna tıklayın
2. Formu doldurun:
   - **Type:** `TXT Record`
   - **Host:** `resend._domainkey`
   - **Value:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDrU3/ncExnaJFPUPIsV3tLGlL3No8dpQkqbT2ny8tscSn/kjciiyKA47RclRqP6XQK/IB71WUuS+skWyLVdTjsd5dyYbzpqrG+4/C69EaeEfZTC+Z+17R4AASKWniSjE1nK4voAFshWzc3M/1Og59NOqcBNS1QONzstFNEd9GIQIDAQAB`
   - **TTL:** `Automatic` veya `3600`
3. **Save** butonuna tıklayın

**Seçenek B: CNAME Kaydı (Eğer Resend CNAME istiyorsa)**
1. **"Add New Record"** butonuna tıklayın
2. Formu doldurun:
   - **Type:** `CNAME Record`
   - **Host:** `resend._domainkey`
   - **Value:** `resend._domainkey.resend.com`
   - **TTL:** `Automatic` veya `3600`
3. **Save** butonuna tıklayın

---

## 📋 RESEND DASHBOARD'DAN KONTROL

### Adım 1: Resend Dashboard'a Giriş
1. [Resend Dashboard](https://resend.com/dashboard) → Giriş yapın
2. **Domains** sekmesine gidin
3. `getprimesim.com` domain'ini seçin

### Adım 2: DNS Kayıtlarını Kontrol Edin
Resend Dashboard'da şu kayıtlar görünecek:
- Domain verification TXT kaydı
- DKIM kaydı (`resend._domainkey`)

**Not:** Resend Dashboard'da tam DNS kayıtlarını görebilirsiniz.

---

## ✅ KONTROL LİSTESİ

### Namecheap'te:
- [ ] `resend._domainkey` TXT kaydı eklendi
- [ ] Domain verification TXT kaydı eklendi (varsa)
- [ ] TTL değerleri ayarlandı
- [ ] Kayıtlar kaydedildi

### Resend Dashboard'da:
- [ ] Domain eklendi (`getprimesim.com`)
- [ ] DNS kayıtları kontrol edildi
- [ ] Domain doğrulandı (✅ işareti)

---

## ⏱️ DNS PROPAGATION

DNS kayıtları eklendikten sonra:
- **5-10 dakika** içinde yayılır
- Bazen **24 saat** kadar sürebilir
- Resend Dashboard'da **"Verify"** butonuna tıklayın
- Doğrulama başarılı olursa ✅ işareti görünür

---

## 🔍 SORUN GİDERME

### Sorun 1: "Domain verification failed"
**Çözüm:**
- DNS kayıtlarının doğru eklendiğinden emin olun
- 5-10 dakika bekleyin (DNS propagation)
- Namecheap'te DNS kayıtlarını kontrol edin
- Resend Dashboard'da tekrar "Verify" yapın

### Sorun 2: "DKIM verification failed"
**Çözüm:**
- `resend._domainkey` kaydının doğru eklendiğinden emin olun
- TXT kaydı mı CNAME kaydı mı gerektiğini Resend Dashboard'dan kontrol edin
- Value değerinin tam olarak kopyalandığından emin olun

### Sorun 3: "DNS records not found"
**Çözüm:**
- DNS propagation için daha fazla bekleyin
- Namecheap'te kayıtların kaydedildiğinden emin olun
- Online DNS checker kullanarak kontrol edin (örn: https://dnschecker.org/)

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Namecheap'te DNS kayıtlarını ekleyin**
2. ✅ **5-10 dakika bekleyin (DNS propagation)**
3. ✅ **Resend Dashboard'da "Verify" yapın**
4. ✅ **Domain doğrulandıktan sonra email adresini güncelleyin**
5. ✅ **Redeploy yapın**

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

**DNS kayıtlarını eklediniz mi? Resend Dashboard'da doğruladınız mı? 🔍**














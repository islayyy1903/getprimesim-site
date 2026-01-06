# DNS Kayıtları vs Vercel Environment Variables

## 🔍 AÇIKLAMA

### DNS Kayıtları (Namecheap'te)
Bu kayıtlar **domain'in kendisi** için gereklidir ve **Namecheap'te** eklenir:
- `resend._domainkey` TXT kaydı
- Domain verification TXT kaydı

**Neden Namecheap'te?**
- DNS kayıtları domain'in DNS sunucularında tutulur
- Namecheap domain'inizi yönettiği için DNS kayıtlarını orada eklemeniz gerekir
- Vercel sadece hosting sağlar, DNS yönetimi yapmaz

### Vercel Environment Variables
Bu değişkenler **uygulama çalışma zamanı** için gereklidir ve **Vercel'de** eklenir:
- `RESEND_API_KEY` - Resend API key
- `ESIMGO_API_KEY` - eSimGo API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- vb.

**Neden Vercel'de?**
- Bu değişkenler uygulamanın çalışması için gereklidir
- Kod içinde `process.env.RESEND_API_KEY` şeklinde kullanılır
- Vercel deployment sırasında bu değişkenleri uygulamaya enjekte eder

---

## ✅ DOĞRU YERLER

### Namecheap'te (DNS Kayıtları):
- ✅ `resend._domainkey` TXT kaydı (zaten eklendi)
- ✅ Domain verification TXT kaydı (varsa)

### Vercel'de (Environment Variables):
- ✅ `RESEND_API_KEY` = `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`
- ✅ `ESIMGO_API_KEY` = `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
- ✅ `ESIMGO_API_URL` = `https://api.esimgo.io/v3`
- ✅ `STRIPE_SECRET_KEY` = (Stripe'dan alınan)
- ✅ `STRIPE_WEBHOOK_SECRET` = (Stripe'dan alınan)

---

## 🔍 KONTROL

### Namecheap'te DNS Kayıtları:
1. Namecheap → Domain List → `getprimesim.com` → **Advanced DNS**
2. `resend._domainkey` TXT kaydı var mı?
3. Value: `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDrU3/ncExnaJFPUPIsV3tLGlL3No8dpQkqbT2ny8tscSn/kjciiyKA47RclRqP6XQK/IB71WUuS+skWyLVdTjsd5dyYbzpqrG+4/C69EaeEfZTC+Z+17R4AASKWniSjE1nK4voAFshWzc3M/1Og59NOqcBNS1QONzstFNEd9GIQIDAQAB`

### Vercel'de Environment Variables:
1. Vercel Dashboard → Settings → **Environment Variables**
2. `RESEND_API_KEY` var mı?
3. Value: `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`

---

## ❓ SORU-CEVAP

### S: DNS kaydını Vercel'e eklememiz gerekir mi?
**C:** Hayır! DNS kayıtları Namecheap'te eklenir. Vercel'e eklenmez.

### S: Neden Vercel'e eklenmiyor?
**C:** Çünkü DNS kayıtları domain'in DNS sunucularında tutulur. Vercel sadece hosting sağlar, DNS yönetimi yapmaz.

### S: DNS kaydı nerede eklenir?
**C:** Namecheap'te (domain'inizi yönettiğiniz yerde).

### S: Vercel'de ne eklenir?
**C:** Environment Variables (API key'ler, secret'lar vb.).

---

## ✅ ÖZET

- **DNS Kayıtları** → Namecheap'te ✅ (zaten eklendi)
- **Environment Variables** → Vercel'de ✅ (eklenmesi gerekiyor)

**DNS kaydı zaten Namecheap'te eklendi. Vercel'e eklenmesi gerekmez! ✅**












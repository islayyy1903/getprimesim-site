# Basit Açıklama

## 🎯 NE YAPMAMIZ GEREKİYOR?

**Sadece 2 şey yapmanız gerekiyor:**

1. **Vercel'de Stripe key'lerini güncelleyin** (Production için)
2. **Redeploy yapın**

---

## 📝 ADIM ADIM

### Adım 1: Stripe Dashboard'dan Key'leri Kopyalayın

1. Stripe Dashboard → **Developers** → **API keys**
2. **Publishable key** → Kopyalayın: `pk_live_51SjMRqI1AmDBUxzCifNyurzMW1MVsCbr8pvtescJ3QB9ZcegD3isOqeEMgjzAIwp3c1EYyTMJihy6bsjhKvBlWlU00FCAY1Rtd`
3. **Secret key** → **"Reveal"** → Kopyalayın (tam değer)

### Adım 2: Vercel'e Ekleyin

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz → **Settings** → **Environment Variables**

2. **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** → **Edit**:
   - Value: `pk_live_51SjMRqI1AmDBUxzCifNyurzMW1MVsCbr8pvtescJ3QB9ZcegD3isOqeEMgjzAIwp3c1EYyTMJihy6bsjhKvBlWlU00FCAY1Rtd`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - **Save**

3. **STRIPE_SECRET_KEY** → **Edit**:
   - Value: Stripe'dan kopyaladığınız secret key
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - **Save**

### Adım 3: Redeploy

1. Vercel Dashboard → **Deployments**
2. En son deployment → **"..."** → **"Redeploy"**

---

## ✅ TAMAM! İŞTE BU KADAR

Bu kadar! Başka bir şey yapmanıza gerek yok.

---

## 🧪 TEST ETME

1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Ödeme yapın
4. Email gelmeli ✅

---

**Sadece Vercel'de key'leri güncelleyin ve redeploy yapın! 🚀**















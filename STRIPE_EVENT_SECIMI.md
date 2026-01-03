# Stripe Event Seçimi

## ✅ DOĞRU EVENT SEÇİMİ

Stripe'da event seçme ekranındasınız. Şu event'i seçmeniz gerekiyor:

---

## 🔍 HANGİ EVENT'İ SEÇMELİYİM?

### Event: `checkout.session.completed`

**Neden bu event?**
- Müşteri ödeme yaptığında tetiklenir
- eSimGo API'ye eSim satın alma isteği gönderilir
- QR kod alınır ve müşteriye gönderilir

---

## 📋 ADIM ADIM

### 1. "Checkout" Kategorisini Bulun
Listede **"Checkout: 4 events"** kategorisini bulun
- Sağ ok işareti (>) ile genişletilebilir

### 2. "Checkout" Kategorisini Genişletin
- **"Checkout"** kategorisine tıklayın
- 4 event görünecek

### 3. `checkout.session.completed` Event'ini Seçin
- **`checkout.session.completed`** event'ini bulun
- Checkbox'ı işaretleyin ✅

### 4. "Continue" Butonuna Tıklayın
- Sağ alttaki **"Continue ->"** (mor) butonuna tıklayın
- Webhook oluşturulacak

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Sadece `checkout.session.completed` seçin:**
   - Diğer event'leri seçmenize gerek yok
   - Sadece bu event yeterli

2. **"Select all" kullanmayın:**
   - Tüm event'leri seçmeyin
   - Sadece `checkout.session.completed` seçin

3. **Webhook Secret'ı Kopyalayın:**
   - Webhook oluşturulduktan sonra
   - **Signing secret** değerini kopyalayın
   - Vercel'e ekleyeceğiz

---

## 🔍 CHECKOUT EVENT'LERİ

Checkout kategorisinde 4 event var:
1. `checkout.session.async_payment_failed`
2. `checkout.session.async_payment_succeeded`
3. `checkout.session.completed` ← **BUNU SEÇİN**
4. `checkout.session.expired`

**Sadece `checkout.session.completed` seçin!**

---

## ✅ SONRAKI ADIMLAR

1. ✅ **"Checkout"** kategorisini genişletin
2. ✅ **`checkout.session.completed`** event'ini seçin
3. ✅ **"Continue ->"** butonuna tıklayın
4. ✅ Webhook oluşturulacak
5. ✅ **Signing secret** değerini kopyalayın
6. ✅ Vercel'e `STRIPE_WEBHOOK_SECRET` olarak ekleyin

---

**"Checkout" kategorisini genişletip `checkout.session.completed` event'ini seçtiniz mi? 🔍**




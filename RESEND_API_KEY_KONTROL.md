# Resend API Key Kontrol ve Yenileme

## 🔍 MEVCUT API KEY

**Şu anki API Key:** `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`

Bu key daha önce sizden alındı. Şimdi kontrol edelim ve gerekirse yenileyelim.

---

## ✅ RESEND DASHBOARD'DAN KONTROL

### Adım 1: Resend Dashboard'a Giriş
1. [Resend Dashboard](https://resend.com/dashboard) → Giriş yapın
2. Sol menüden **"API Keys"** veya **"Settings"** → **"API Keys"** seçin

### Adım 2: API Key'leri Kontrol Edin
1. Mevcut API key'lerin listesini görün
2. `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv` var mı?
3. Key aktif mi? (Status: Active)
4. Son kullanım tarihi nedir?

### Adım 3: Yeni API Key Oluşturma (Gerekirse)
1. **"Create API Key"** veya **"Add API Key"** butonuna tıklayın
2. Key adı verin (örn: "PrimeSim Production")
3. **"Create"** butonuna tıklayın
4. **Yeni key'i kopyalayın** (sadece bir kez gösterilir!)

---

## 🔧 API KEY FORMATI

Resend API key'leri genellikle şu formatta olur:
- `re_` ile başlar
- 32 karakter uzunluğunda
- Örnek: `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`

---

## ⚠️ ÖNEMLİ NOTLAR

### 1. API Key Güvenliği
- API key'ler **gizli** tutulmalıdır
- GitHub'a commit edilmemelidir
- Sadece Vercel Environment Variables'da saklanmalıdır

### 2. API Key Yenileme
- Eğer key sızdırıldıysa, hemen yenileyin
- Eski key'i silin
- Yeni key'i Vercel'e ekleyin
- Redeploy yapın

### 3. Test vs Production
- Test için ayrı bir key kullanabilirsiniz
- Production için ayrı bir key kullanabilirsiniz
- Her ikisini de Vercel'e ekleyin (farklı environment'larda)

---

## 🔍 API KEY KONTROL LİSTESİ

- [ ] Resend Dashboard'a giriş yapıldı
- [ ] API Keys sekmesine gidildi
- [ ] Mevcut key kontrol edildi
- [ ] Key aktif mi?
- [ ] Yeni key oluşturuldu mu? (gerekirse)
- [ ] Yeni key Vercel'e eklendi mi?
- [ ] Redeploy yapıldı mı?

---

## 🚀 YENİ API KEY EKLEME (Gerekirse)

### Adım 1: Resend Dashboard'dan Yeni Key Alın
1. Resend Dashboard → **API Keys**
2. **"Create API Key"** → Key adı verin → **"Create"**
3. **Yeni key'i kopyalayın**

### Adım 2: Vercel'e Ekleyin
1. Vercel Dashboard → Settings → **Environment Variables**
2. `RESEND_API_KEY` değişkenini bulun
3. **Edit** → Yeni key'i yapıştırın
4. **Save**

### Adım 3: Redeploy
1. Vercel Dashboard → Deployments
2. En son deployment → **"..."** → **"Redeploy"**

---

## ❓ SORU-CEVAP

### S: Mevcut key doğru mu?
**C:** Resend Dashboard'dan kontrol edin. Key aktifse ve çalışıyorsa doğrudur.

### S: Yeni key almalı mıyım?
**C:** Sadece şu durumlarda:
- Key sızdırıldıysa
- Key çalışmıyorsa
- Key'i unuttuysanız

### S: Key'i nerede görebilirim?
**C:** Resend Dashboard → API Keys sekmesinde tüm key'lerinizi görebilirsiniz.

---

**Resend Dashboard'dan API key'inizi kontrol edin ve paylaşın! 🔍**




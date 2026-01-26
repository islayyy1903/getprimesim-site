# Admin Panel Kurulum Rehberi

## Özellikler

Admin paneli şu özellikleri içerir:

1. **Kullanıcı Yönetimi**: Tüm kayıtlı kullanıcıları görüntüleme
2. **Sipariş Yönetimi**: Tüm siparişleri görüntüleme (başarılı, başarısız, iade edilmiş)
3. **Ödeme Logları**: Tüm ödeme işlemlerini görüntüleme
4. **İstatistikler**: Toplam kullanıcı, sipariş, gelir istatistikleri

## Kurulum

### 1. Environment Variables

`.env.local` dosyanıza veya Vercel Environment Variables'a şunları ekleyin:

```env
ADMIN_EMAIL=admin@getprimesim.com
ADMIN_PASSWORD=your_secure_password_here
```

**ÖNEMLİ**: Production'da mutlaka güçlü bir şifre kullanın!

### 2. Veritabanı

Admin paneli verileri `data/admin.json` dosyasında saklar. Bu dosya otomatik olarak oluşturulacaktır.

### 3. Admin Paneline Erişim

1. Tarayıcınızda `/admin` adresine gidin
2. Admin email ve şifre ile giriş yapın
3. Panel açılacaktır

## Kullanım

### İstatistikler Sekmesi
- Toplam kullanıcı sayısı
- Toplam sipariş sayısı
- Toplam gelir
- Başarılı/İade/Başarısız sipariş sayıları

### Kullanıcılar Sekmesi
- Tüm kayıtlı kullanıcıların listesi
- Her kullanıcının toplam sipariş sayısı
- Her kullanıcının toplam harcaması
- Kayıt tarihi

### Siparişler Sekmesi
- Tüm siparişlerin listesi
- Müşteri bilgileri
- Paket bilgileri
- Ödeme durumu
- Sipariş tarihi

### Ödeme Logları Sekmesi
- Tüm ödeme işlemlerinin detaylı logları
- Ödeme durumları
- Ödeme tarihleri

## Güvenlik

- Admin paneli sadece belirlenen admin email ve şifre ile erişilebilir
- Session 24 saat geçerlidir
- Tüm API route'ları authentication kontrolü yapar
- Production'da mutlaka güçlü bir şifre kullanın

## Notlar

- Veritabanı JSON dosyası olarak saklanır, production'da daha güvenli bir veritabanı (PostgreSQL, MongoDB vb.) kullanmanız önerilir
- Kullanıcılar register/login olduğunda otomatik olarak veritabanına kaydedilir
- Siparişler Stripe webhook'larından otomatik olarak kaydedilir
- Ödeme logları tüm ödeme işlemlerini içerir

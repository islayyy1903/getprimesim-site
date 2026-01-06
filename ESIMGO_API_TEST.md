# eSimGo API URL Test Komutları

## 🚨 SONUÇ: DNS SORUNU VAR!

**Test sonucu:**
```
FAILED: DNS Resolution
Error: api.esimgo.io : DNS name does not exist
```

**Anlamı:** `api.esimgo.io` domain'i bulunamıyor!

---

## 🔧 TEST KOMUTLARI

### PowerShell Script (Detaylı Test)

```powershell
powershell -ExecutionPolicy Bypass -File test-esimgo-api.ps1
```

**Veya manuel:**

```powershell
# DNS Test
Resolve-DnsName -Name "api.esimgo.io"

# HTTP Test
Invoke-WebRequest -Uri "https://api.esimgo.io/v3/orders" -Method GET -Headers @{"Authorization"="Bearer lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT"} -TimeoutSec 10
```

### Basit CMD Komutları

```cmd
REM DNS Test
nslookup api.esimgo.io

REM HTTP Test (curl varsa)
curl -I "https://api.esimgo.io/v3/orders" -H "Authorization: Bearer lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT"
```

### PowerShell Tek Satır

```powershell
# DNS Test
nslookup api.esimgo.io

# HTTP Test
curl.exe -I "https://api.esimgo.io/v3/orders" -H "Authorization: Bearer lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT"
```

---

## 📋 TEST SONUÇLARI

### ✅ Başarılı Olursa:
- DNS çözümlenir
- HTTP bağlantısı kurulur
- Status code: 200, 401, veya 404 (endpoint'e ulaşıldı demektir)

### ❌ Başarısız Olursa:
- DNS bulunamaz → **eSimGo'ya sorun: API URL doğru mu?**
- HTTP bağlantısı kurulamaz → **Firewall veya network sorunu olabilir**

---

## 🎯 YAPILMASI GEREKENLER

1. ✅ **Test yapıldı** - DNS sorunu tespit edildi
2. ⏳ **eSimGo'ya sorun:**
   - API URL doğru mu? (`https://api.esimgo.io/v3`)
   - Domain aktif mi?
   - DNS kayıtları doğru mu?
   - Alternatif domain var mı?

---

## 🔍 ALTERNATİF TEST

**Eğer farklı bir domain varsa:**
```powershell
# Örnek alternatif domain'ler
Resolve-DnsName -Name "api.esimgo.com"
Resolve-DnsName -Name "esimgo.io"
Resolve-DnsName -Name "partner.esimgo.io"
```

---

**DNS sorunu var! eSimGo'ya sorun! 🔍**














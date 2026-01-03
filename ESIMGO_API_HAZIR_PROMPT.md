# eSIM Go API - Hazır Prompt

> Bu prompt'u başka bir AI'ye birebir kopyala-yapıştır yaparak kullanabilirsin.

---

## 🔹 HAZIR PROMPT (eSIM Go API)

> You are an API integration assistant.
> I am integrating **eSIM Go API v2.3** and need help generating correct HTTP requests (PowerShell / curl / backend logic).
>
> **Context & Rules:**
>
> * Base URL discovery is done via `https://api.esim-go.com/v2.4/`, but **all real operations use `/v2.3/`**
> * Authentication is done via header:
>
>   ```
>   X-API-Key: <API_KEY>
>   ```
> * All requests must include:
>
>   ```
>   Accept: application/json
>   ```
> * Some endpoints return **CSV or ZIP** depending on the `Accept` header
>
> ---
>
> ## API FLOW (IMPORTANT)
>
> ### 1️⃣ List available bundles
>
> **GET**
>
> ```
> /v2.3/catalogue
> ```
>
> ---
>
> ### 2️⃣ Create an order (buy eSIM bundle)
>
> **POST**
>
> ```
> /v2.3/orders
> ```
>
> **JSON body example:**
>
> ```json
> {
>   "type": "transaction",
>   "assign": true,
>   "order": [
>     {
>       "type": "bundle",
>       "quantity": 1,
>       "item": "BUNDLE_NAME",
>       "allowReassign": false
>     }
>   ]
> }
> ```
>
> **Response returns:**
>
> * `orderReference`  ← THIS IS CRITICAL
>
> ---
>
> ### 3️⃣ Get purchased eSIM data + QR code
>
> QR codes are **NOT** returned from `/orders`.
> They are retrieved using:
>
> **GET**
>
> ```
> /v2.3/esims/assignments?reference=ORDER_REFERENCE
> ```
>
> #### Output formats:
>
> * `Accept: application/json` → ICCID, SM-DP+, Matching ID
> * `Accept: application/zip` → ZIP file containing **QR code PNG**
> * `Accept: text/csv` → CSV list
>
> Optional:
>
> ```
> additionalFields=appleInstallUrl
> ```
>
> ---
>
> ### 4️⃣ Get all orders (if orderReference is lost)
>
> **GET**
>
> ```
> /v2.3/orders
> ```
>
> ---
>
> ### 5️⃣ Get account balance
>
> **GET**
>
> ```
> /v2.3/organisation/balance
> ```
>
> ---
>
> ## CRITICAL NOTES
>
> * QR code can ONLY be retrieved from `/esims/assignments`
> * `orderReference` is mandatory to fetch QR codes
> * Root endpoints like `/v2.3/` do NOT perform purchases
> * Webhooks are configured in the **eSIM Go Portal**, not via API
>
> ---
>
> Generate correct request examples and integration logic based on this flow.
> Assume production environment.

---

## 📝 NOTLAR

### Kullanım:
- Bu prompt'u başka bir AI'ye (ChatGPT, Claude, vb.) kopyala-yapıştır yaparak kullanabilirsin
- AI, bu prompt'a göre doğru HTTP request'leri ve entegrasyon mantığını oluşturabilir

### Alternatif Versiyonlar (İhtiyaç Halinde):

1. **Short Prompt** (Çok daha kısa versiyon)
2. **QR Alma Odaklı** (Sadece QR code alma işlemine odaklı)
3. **Backend Uyarlamalı** (Node.js / PHP / Python için özelleştirilmiş)

---

**Hazır: Başka bir AI'ye direkt verebilirsin! 👍**



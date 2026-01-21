# Stripe Integration Setup

## Step 1: Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up or log in to your account
3. Navigate to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
5. Copy your **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

## Step 2: Create Environment Variables

Create a `.env.local` file in the root directory of your project:

```env
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE

# Base URL (for production, use your domain)
NEXT_PUBLIC_BASE_URL=https://getprimesim.com
```

## Step 3: Test Mode vs Live Mode

- **Test Mode**: Use `pk_test_...` and `sk_test_...` keys for development and testing
- **Live Mode**: Use `pk_live_...` and `sk_live_...` keys for production

⚠️ **Important**: Never commit your `.env.local` file to Git. It's already in `.gitignore`.

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/esim` page
3. Click "Buy Now" on any package
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)

## Step 5: Webhook Setup (Optional - for production)

For handling payment confirmations and other events:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your webhook URL: `https://getprimesim.com/api/webhooks/stripe`
4. Select events to listen to (e.g., `checkout.session.completed`)
5. Copy the webhook signing secret and add it to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Troubleshooting

- **"Stripe checkout error"**: Check that your API keys are correct in `.env.local`
- **"Failed to create checkout session"**: Make sure `STRIPE_SECRET_KEY` is set correctly
- **Redirect not working**: Verify `NEXT_PUBLIC_BASE_URL` is set correctly

## Production Deployment

Before going live:

1. Switch to **Live mode** in Stripe Dashboard
2. Update `.env.local` with live API keys
3. Set `NEXT_PUBLIC_BASE_URL` to your production domain
4. Configure webhooks for production
5. Test with real payment methods (small amounts first!)


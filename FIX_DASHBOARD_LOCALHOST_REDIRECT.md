# 🔧 Fix Dashboard Redirecting to Localhost

## ❌ Problem
Dashboard URL redirects to `http://localhost:3000/login` and shows "This site can't be reached"

## ✅ Cause
The `REACT_APP_FRONTEND_URL` environment variable is not set in Vercel dashboard project, so it defaults to `http://localhost:3000`

## ✅ Solution: Add Environment Variable

### Step 1: Go to Dashboard Project in Vercel
1. Open [Vercel Dashboard](https://vercel.com)
2. Click on your **dashboard project**
3. Go to **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar

### Step 2: Add REACT_APP_FRONTEND_URL
1. Click **"Add Environment Variable"**
2. **Key:** `REACT_APP_FRONTEND_URL`
3. **Value:** Your frontend production URL
   ```
   https://trade-x-ten.vercel.app
   ```
   (Replace with your actual frontend URL)
4. Click **"Save"**

### Step 3: Verify Other Environment Variables
Make sure you also have:
- `REACT_APP_API_URL` = `https://tradex-f8bn.onrender.com`

### Step 4: Redeploy Dashboard
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click **"..."** (three dots) → **"Redeploy"**
4. Wait for deployment to complete

### Step 5: Test
1. Visit your dashboard URL
2. Should redirect to: `https://trade-x-ten.vercel.app/login` ✅
3. **NOT** `http://localhost:3000/login` ❌

---

## 📋 Required Environment Variables for Dashboard

| Variable | Value | Example |
|----------|-------|---------|
| `REACT_APP_API_URL` | Backend URL | `https://tradex-f8bn.onrender.com` |
| `REACT_APP_FRONTEND_URL` | Frontend URL | `https://trade-x-ten.vercel.app` |

---

## ✅ After Fix

- ✅ Dashboard redirects to production frontend login
- ✅ No more localhost redirects
- ✅ Login flow works correctly

---

## 🔍 Why This Happened

The dashboard code has this fallback:
```javascript
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';
```

If `REACT_APP_FRONTEND_URL` is not set, it uses `localhost:3000` as default.

**Solution:** Set `REACT_APP_FRONTEND_URL` in Vercel dashboard project environment variables.

---

**This is a simple fix - just add the environment variable!** ✅


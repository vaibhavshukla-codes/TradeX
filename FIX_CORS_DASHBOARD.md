# 🔧 Fix CORS Error - Dashboard Not Loading

## ❌ Current Error

```
Access to XMLHttpRequest at 'https://tradex-f8bn.onrender.com/checkAuth' 
from origin 'https://trade-x-ten.vercel.app' 
has been blocked by CORS policy
```

**Problem:** Your frontend URL changed to `https://trade-x-ten.vercel.app` but the backend doesn't allow this origin.

---

## ✅ Quick Fix (2 minutes)

### Step 1: Update Render Backend Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service: **tradex-f8bn**
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` environment variable
5. Click **"Edit"** (or delete and recreate)
6. Update value to: `https://trade-x-ten.vercel.app`
7. Click **"Save Changes"**

### Step 2: Check Dashboard URL (if you have dashboard deployed)

If you have a dashboard deployed on Vercel, also update:
- **Key:** `DASHBOARD_URL`
- **Value:** `https://your-dashboard-url.vercel.app`
  - *(Replace with your actual dashboard URL)*

### Step 3: Wait for Redeploy

- Render will **automatically redeploy** when you add/update environment variables
- Watch the **"Events"** tab to see deployment progress
- Wait for status to show **"Live"** (green) - takes 1-2 minutes

### Step 4: Test Again

1. Go to your frontend: `https://trade-x-ten.vercel.app`
2. Sign up or login
3. You should be redirected to dashboard
4. Dashboard should load without CORS errors ✅

---

## 🎯 What's Happening

1. User signs up/logs in → Token saved → Redirected to dashboard
2. Dashboard loads → Calls `/checkAuth` to verify authentication
3. **CORS blocks the request** because frontend URL isn't in allowed origins
4. Dashboard can't verify auth → User can't access dashboard

**The fix:** Add the new frontend URL to backend's `FRONTEND_URL` environment variable.

---

## 📝 Environment Variables to Update

**In Render Backend:**
```
FRONTEND_URL=https://trade-x-ten.vercel.app
DASHBOARD_URL=https://your-dashboard-url.vercel.app
```

---

## ✅ After Fix

- ✅ Signup works
- ✅ Login works  
- ✅ Dashboard loads correctly
- ✅ No CORS errors
- ✅ User can access dashboard after signup/login

---

## 🔍 Verify It's Fixed

1. Open browser console (F12)
2. Sign up or login
3. Check console - **no CORS errors** = Success! ✅
4. Dashboard should load and show user data

---

**Note:** If your frontend URL changes again (Vercel creates new preview URLs), you'll need to update `FRONTEND_URL` in Render again. For production, use a custom domain to avoid this issue.


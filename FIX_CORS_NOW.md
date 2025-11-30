# 🔧 Fix CORS Error - URGENT

## ❌ Current Error
```
Access to XMLHttpRequest at 'https://tradex-f8bn.onrender.com/signup' 
from origin 'https://trade-45vfk2uy4-vaibhav-shuklas-projects-456cf0b1.vercel.app' 
has been blocked by CORS policy
```

## ✅ Solution: Update Backend CORS (2 minutes)

Your frontend URL changed to: `https://trade-45vfk2uy4-vaibhav-shuklas-projects-456cf0b1.vercel.app`

### Step 1: Update Render Backend

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click your backend service: **tradex-f8bn**
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` environment variable
5. Click **"Edit"**

### Step 2: Update FRONTEND_URL

**Current value:** (probably `https://trade-x-ten.vercel.app`)

**New value:**
```
https://trade-45vfk2uy4-vaibhav-shuklas-projects-456cf0b1.vercel.app
```

6. Click **"Save Changes"**

### Step 3: Wait for Redeploy

- Render will automatically redeploy
- Wait 1-2 minutes for status to show **"Live"**

### Step 4: Test

1. Go to your frontend
2. Try to sign up
3. **CORS error should be gone!** ✅

---

## 🔄 Alternative: Use ALLOWED_ORIGINS (For Multiple URLs)

If your frontend URL keeps changing (preview deployments), you can use `ALLOWED_ORIGINS`:

1. In Render backend → Environment tab
2. Add new variable:
   - **Key:** `ALLOWED_ORIGINS`
   - **Value:** `https://trade-45vfk2uy4-vaibhav-shuklas-projects-456cf0b1.vercel.app,https://trade-x-ten.vercel.app`
   - (Comma-separated list of all your frontend URLs)
3. Save → Wait for redeploy

This allows multiple frontend URLs.

---

## 📝 Quick Copy-Paste

**Update in Render Backend:**
```
FRONTEND_URL=https://trade-45vfk2uy4-vaibhav-shuklas-projects-456cf0b1.vercel.app
```

**OR use ALLOWED_ORIGINS for multiple:**
```
ALLOWED_ORIGINS=https://trade-45vfk2uy4-vaibhav-shuklas-projects-456cf0b1.vercel.app,https://trade-x-ten.vercel.app
```

---

## ✅ After Fix

- ✅ Signup works
- ✅ Login works
- ✅ No CORS errors
- ✅ Dashboard loads correctly

---

**This is the main issue blocking your signup! Fix this first!**


# Step-by-Step Deployment Guide: Render + Vercel

## 🎯 Overview

- **Backend:** Render.com (Node.js API)
- **Frontend:** Vercel.com (React App)
- **Dashboard:** Vercel.com (React App)
- **Database:** MongoDB Atlas (already configured)

---

## 📋 PART 1: Deploy Backend on Render

### Step 1.1: Create Render Account
1. Go to [https://render.com](https://render.com)
2. Click **"Get Started for Free"** or **"Sign In"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your GitHub account

### Step 1.2: Create New Web Service
1. In Render dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Find and select your **TradeX** repository
5. Click **"Connect"**

### Step 1.3: Configure Backend Settings

**Basic Information:**
- **Name:** `zerodha-backend` (or any name you prefer)
- **Region:** Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch:** `main` (or your main branch name)
- **Root Directory:** `backend` ⚠️ **IMPORTANT: Change this!**
  - Click **"Advanced"** or look for Root Directory field
  - Enter: `backend`

**Build & Deploy:**
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 1.4: Add Environment Variables

Click **"Add Environment Variable"** and add these **one by one**:

**Variable 1:**
- **Key:** `MONGO_URL`
- **Value:** `mongodb+srv://rishankshukla46_db_user:aTWAyzU6QEWZ23RX@tradexcluster.vazztjp.mongodb.net/tradeX?appName=TradeXCluster`
- Click **"Add"**

**Variable 2:**
- **Key:** `JWT_SECRET`
- **Value:** `YbnaD7pM5/ipAdzVazM/gmyVPNZ5LBcHAsBzJqMIMOw=`
- Click **"Add"**

**Variable 3:**
- **Key:** `PORT`
- **Value:** `3002`
- Click **"Add"**

**Variable 4:**
- **Key:** `NODE_ENV`
- **Value:** `production`
- Click **"Add"**

**Note:** We'll add `FRONTEND_URL` and `DASHBOARD_URL` later after deploying frontend/dashboard.

### Step 1.5: Deploy Backend
1. Scroll down and click **"Create Web Service"**
2. Render will start building your backend
3. Watch the build logs (this takes 2-5 minutes)
4. Wait for status to show **"Live"** (green)

### Step 1.6: Get Your Backend URL
1. Once deployed, you'll see your service is **"Live"**
2. Your backend URL will be displayed at the top
3. It looks like: `https://zerodha-backend.onrender.com`
4. **Copy this URL** - you'll need it for frontend and dashboard

### Step 1.7: Test Backend
1. Open your backend URL in a new tab
2. You should see an error (no route for `/`), but this confirms it's running
3. Or test: `https://your-backend-url.onrender.com/checkAuth`
4. Should return an error about missing token (this is normal)

---

## 📋 PART 2: Deploy Frontend on Vercel

### Step 2.1: Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Sign up with **GitHub** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2.2: Import Project
1. In Vercel dashboard, click **"Add New..."** button
2. Select **"Project"**
3. Find your **TradeX** repository
4. Click **"Import"**

### Step 2.3: Configure Frontend Project

**Framework Preset:**
- Vercel should auto-detect: **"Create React App"**
- If not, select it manually

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Change from `/` to `frontend`
- Click **"Continue"**

**Build Settings:**
- **Build Command:** `npm run build` (should auto-fill)
- **Output Directory:** `build` (should auto-fill)
- **Install Command:** `npm install` (should auto-fill)

### Step 2.4: Add Environment Variables

Before deploying, click **"Environment Variables"** and add:

**Variable 1:**
- **Key:** `REACT_APP_API_URL`
- **Value:** `https://your-backend-url.onrender.com`
  - ⚠️ **Replace with your actual Render backend URL from Step 1.6**
- Click **"Add"**

**Variable 2:**
- **Key:** `REACT_APP_DASHBOARD_URL`
- **Value:** `https://placeholder.vercel.app` (we'll update this later)
- Click **"Add"**

### Step 2.5: Deploy Frontend
1. Click **"Deploy"** button
2. Vercel will start building (watch the logs)
3. Wait for deployment to complete (2-3 minutes)
4. Status will show **"Ready"**

### Step 2.6: Get Your Frontend URL
1. Once deployed, you'll see your project URL
2. It looks like: `https://tradex-frontend.vercel.app`
3. **Copy this URL** - you'll need it for dashboard and backend CORS

### Step 2.7: Test Frontend
1. Visit your frontend URL
2. You should see the Zerodha homepage
3. Try navigating to different pages

---

## 📋 PART 3: Deploy Dashboard on Vercel

### Step 3.1: Create New Project
1. In Vercel dashboard, click **"Add New..."** again
2. Select **"Project"**
3. Import the **same TradeX repository** again
4. Click **"Import"**

### Step 3.2: Configure Dashboard Project

**Framework Preset:**
- Select **"Create React App"**

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Change from `/` to `dashboard` ⚠️ **IMPORTANT!**
- Click **"Continue"**

**Build Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### Step 3.3: Add Environment Variables

Click **"Environment Variables"** and add:

**Variable 1:**
- **Key:** `REACT_APP_API_URL`
- **Value:** `https://your-backend-url.onrender.com`
  - ⚠️ **Use your actual Render backend URL from Step 1.6**
- Click **"Add"**

**Variable 2:**
- **Key:** `REACT_APP_FRONTEND_URL`
- **Value:** `https://your-frontend-url.vercel.app`
  - ⚠️ **Use your actual Vercel frontend URL from Step 2.6**
- Click **"Add"**

### Step 3.4: Deploy Dashboard
1. Click **"Deploy"** button
2. Wait for deployment (2-3 minutes)
3. Status will show **"Ready"**

### Step 3.5: Get Your Dashboard URL
1. Copy your dashboard URL
2. It looks like: `https://tradex-dashboard.vercel.app`
3. **Save this URL**

---

## 📋 PART 4: Update Backend CORS (Critical!)

### Step 4.1: Go Back to Render
1. Go to [render.com](https://render.com)
2. Click on your backend service

### Step 4.2: Add CORS Environment Variables
1. Go to **"Environment"** tab
2. Click **"Add Environment Variable"**

**Add Variable 1:**
- **Key:** `FRONTEND_URL`
- **Value:** `https://your-frontend-url.vercel.app`
  - ⚠️ **Use your actual Vercel frontend URL**
- Click **"Save Changes"**

**Add Variable 2:**
- **Key:** `DASHBOARD_URL`
- **Value:** `https://your-dashboard-url.vercel.app`
  - ⚠️ **Use your actual Vercel dashboard URL**
- Click **"Save Changes"**

### Step 4.3: Redeploy Backend
1. Render will automatically redeploy when you add environment variables
2. Or manually: Go to **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for redeployment to complete

---

## 📋 PART 5: Update Frontend Environment Variable

### Step 5.1: Go to Vercel Frontend Project
1. Go to [vercel.com](https://vercel.com)
2. Click on your **frontend** project

### Step 5.2: Update Dashboard URL
1. Go to **"Settings"** tab
2. Click **"Environment Variables"** in left sidebar
3. Find `REACT_APP_DASHBOARD_URL`
4. Click **"Edit"** (or delete and recreate)
5. Update value to: `https://your-dashboard-url.vercel.app`
   - ⚠️ **Use your actual dashboard URL**
6. Click **"Save"**

### Step 5.3: Redeploy Frontend
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click **"..."** (three dots) → **"Redeploy"**
4. Confirm redeployment
5. Wait for build to complete

---

## 📋 PART 6: Configure MongoDB Atlas

### Step 6.1: Add IP Whitelist
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Log in to your account
3. Select your cluster: **TradeXCluster**
4. Click **"Network Access"** in left sidebar
5. Click **"Add IP Address"** button

### Step 6.2: Allow All IPs (Easiest)
1. Click **"Allow Access from Anywhere"**
2. This sets IP to: `0.0.0.0/0`
3. Click **"Confirm"**
4. Wait a few minutes for changes to apply

**Note:** For production, you can restrict to specific IPs later, but `0.0.0.0/0` works for now.

---

## 🧪 PART 7: Test Your Deployment

### Step 7.1: Test Backend
1. Visit: `https://your-backend-url.onrender.com/checkAuth`
2. Should return: `{"message":"Access token required"}` (this is correct!)

### Step 7.2: Test Frontend
1. Visit your frontend URL
2. Try to **sign up** a new user
3. Check browser console (F12) for errors
4. Verify you can login

### Step 7.3: Test Dashboard
1. Login from frontend
2. Navigate to dashboard (or visit dashboard URL directly)
3. Verify data loads correctly

### Step 7.4: Test CORS
1. Open browser console on frontend
2. Try to signup/login
3. **No CORS errors** = Success! ✅
4. If you see CORS errors, check backend environment variables

---

## 📝 Environment Variables Summary

### Render (Backend) - All Required:
```
MONGO_URL=mongodb+srv://rishankshukla46_db_user:aTWAyzU6QEWZ23RX@tradexcluster.vazztjp.mongodb.net/tradeX?appName=TradeXCluster
JWT_SECRET=YbnaD7pM5/ipAdzVazM/gmyVPNZ5LBcHAsBzJqMIMOw=
PORT=3002
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
DASHBOARD_URL=https://your-dashboard-url.vercel.app
```

### Vercel (Frontend):
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_DASHBOARD_URL=https://your-dashboard-url.vercel.app
```

### Vercel (Dashboard):
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## ✅ Deployment Checklist

- [ ] Render backend deployed and URL saved
- [ ] Vercel frontend deployed and URL saved
- [ ] Vercel dashboard deployed and URL saved
- [ ] Backend CORS updated with frontend/dashboard URLs
- [ ] Frontend environment variable updated with dashboard URL
- [ ] MongoDB Atlas IP whitelist configured (0.0.0.0/0)
- [ ] All services tested and working
- [ ] No CORS errors in browser console

---

## 🔧 Troubleshooting

### Backend Not Starting
- **Check Render Logs:** Service → "Logs" tab
- **Verify:** All environment variables are set
- **Check:** MongoDB connection string is correct
- **Verify:** Root directory is set to `backend`

### Frontend Build Fails
- **Check Vercel Logs:** Project → "Deployments" → Click on failed deployment
- **Verify:** Root directory is set to `frontend`
- **Check:** All dependencies in package.json
- **Verify:** Environment variables are set

### CORS Errors
- **Verify:** `FRONTEND_URL` and `DASHBOARD_URL` are set in Render backend
- **Check:** URLs match exactly (including `https://`)
- **Ensure:** Backend was redeployed after adding CORS URLs
- **Verify:** No typos in URLs

### MongoDB Connection Failed
- **Check:** IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- **Verify:** Connection string is correct
- **Check:** Database user has proper permissions
- **Wait:** IP whitelist changes can take a few minutes

### Users Not Saving
- **Check:** Backend logs for `[Signup Success]` or `[Signup Error]`
- **Verify:** MongoDB connection is established
- **Check:** Database name is `tradeX` (capital X)
- **Verify:** Collection name is `users` (plural)

---

## 🎯 Quick Reference URLs

Fill these in as you deploy:

- **Backend URL:** `_________________________________`
- **Frontend URL:** `_________________________________`
- **Dashboard URL:** `_________________________________`

---

## 🚀 Post-Deployment

### Auto-Deployments
- **Render:** Auto-deploys on git push to main branch
- **Vercel:** Auto-deploys on git push to main branch
- **Environment Variables:** Persist across deployments

### Updates
1. Make code changes
2. Push to GitHub
3. Services auto-deploy
4. No manual steps needed!

### Monitoring
- **Render:** Check "Metrics" tab for server stats
- **Vercel:** Check "Analytics" for frontend stats
- **Logs:** Available in both platforms

---

## ✅ You're Done!

Follow these steps in order, and your application will be live!

**Estimated Time:** 15-20 minutes

**Need Help?** Check the troubleshooting section or verify all environment variables are set correctly.


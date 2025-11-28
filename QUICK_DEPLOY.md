# Quick Deployment Guide

## Fastest Way to Deploy (Free Tier)

### Step 1: Deploy Backend (Railway - Free)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Set environment variables in Railway dashboard
# - PORT=3002
# - MONGO_URL=your_mongodb_atlas_connection_string
# - JWT_SECRET=generate_with_openssl_rand_base64_32
# - NODE_ENV=production
```

**Get your backend URL:** `https://your-app.railway.app`

### Step 2: Deploy Frontend (Vercel - Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel

# Set environment variables in Vercel dashboard:
# - REACT_APP_API_URL=https://your-app.railway.app
# - REACT_APP_DASHBOARD_URL=https://your-dashboard.vercel.app
```

### Step 3: Deploy Dashboard (Vercel - Free)

```bash
cd dashboard
vercel

# Set environment variables in Vercel dashboard:
# - REACT_APP_API_URL=https://your-app.railway.app
# - REACT_APP_FRONTEND_URL=https://your-frontend.vercel.app
```

### Step 4: Update Backend CORS

Update `backend/index.js` CORS configuration with your production URLs:

```javascript
const allowedOrigins = [
  'https://your-frontend.vercel.app',
  'https://your-dashboard.vercel.app',
];
```

Redeploy backend after CORS update.

---

## MongoDB Atlas Setup (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create cluster (choose free M0)
4. Create database user (Database Access)
5. Whitelist IP: `0.0.0.0/0` (Network Access)
6. Get connection string (Connect → Connect your application)
7. Replace `<password>` with your user password

---

## Generate JWT Secret

```bash
# macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Complete Deployment in 10 Minutes

1. **MongoDB Atlas** (2 min)
   - Create account → Create cluster → Get connection string

2. **Backend** (3 min)
   ```bash
   cd backend
   railway init && railway up
   # Add env vars in Railway dashboard
   ```

3. **Frontend** (2 min)
   ```bash
   cd frontend
   vercel
   # Add env vars in Vercel dashboard
   ```

4. **Dashboard** (2 min)
   ```bash
   cd dashboard
   vercel
   # Add env vars in Vercel dashboard
   ```

5. **Update CORS** (1 min)
   - Update backend CORS with production URLs
   - Redeploy backend

**Done!** Your app is live! 🎉

---

## Alternative: All-in-One with Railway

Deploy everything on Railway:

```bash
# Backend
cd backend && railway init && railway up

# Frontend  
cd ../frontend && railway init && railway up

# Dashboard
cd ../dashboard && railway init && railway up
```

Set environment variables for each service in Railway dashboard.

---

## Testing After Deployment

1. Visit frontend URL → Sign up
2. Login → Should redirect to dashboard
3. Check browser console for errors
4. Test API endpoints with Postman/curl

---

## Custom Domains

### Vercel
- Project Settings → Domains → Add domain
- Follow DNS configuration instructions

### Railway
- Service Settings → Domains → Add custom domain
- Configure DNS records

---

## Need Help?

Check the full `DEPLOYMENT_GUIDE.md` for:
- Detailed instructions
- Troubleshooting
- Security best practices
- Production optimizations


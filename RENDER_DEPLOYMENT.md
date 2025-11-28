# Deploy Backend to Render

Step-by-step guide to deploy the TradeX backend to Render.

## Prerequisites

1. GitHub account (Render requires GitHub for deployment)
2. MongoDB Atlas account (or MongoDB connection string)
3. Render account (sign up at https://render.com)

---

## Step 1: Prepare Your Repository

### 1.1 Push Code to GitHub

If not already done:

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/tradex.git
git branch -M main
git push -u origin main
```

### 1.2 Verify Backend Structure

Ensure your `backend/` folder contains:
- `index.js` (main server file)
- `package.json` (with proper start script)
- `model/` folder
- `schemas/` folder

---

## Step 2: Create MongoDB Database

### Option A: MongoDB Atlas (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create a new cluster (Free M0 tier)
4. Wait for cluster creation (5-10 minutes)
5. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `tradex_user` (or your choice)
   - Password: Generate a strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

6. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

7. **Get Connection String:**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://tradex_user:YourPassword123@cluster0.xxxxx.mongodb.net/tradex?retryWrites=true&w=majority`

### Option B: Render MongoDB (Paid)

1. In Render dashboard, create "MongoDB" service
2. Render will provide connection string automatically

---

## Step 3: Deploy to Render

### 3.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub account (if not connected)
4. Select your repository: `yourusername/tradex`
5. Click "Connect"

### 3.2 Configure Service

**Basic Settings:**
- **Name:** `tradex-backend` (or your choice)
- **Region:** Choose closest to your users
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend` ⚠️ **IMPORTANT**
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node index.js`

**Advanced Settings (Optional):**
- **Auto-Deploy:** `Yes` (deploys on every push to main branch)

### 3.3 Set Environment Variables

Click "Environment" tab and add:

```
PORT=3002
MONGO_URL=mongodb+srv://tradex_user:YourPassword@cluster0.xxxxx.mongodb.net/tradex?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
NODE_ENV=production
```

**Generate JWT_SECRET:**
```bash
# On macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Important:**
- Replace `MONGO_URL` with your actual MongoDB connection string
- Use a strong, random `JWT_SECRET` (at least 32 characters)
- Never commit these values to Git

### 3.4 Deploy

1. Click "Create Web Service"
2. Render will start building and deploying
3. Wait for deployment to complete (2-5 minutes)
4. You'll see logs in real-time

### 3.5 Get Your Backend URL

After deployment:
- Your backend URL will be: `https://tradex-backend.onrender.com`
- Or custom domain if configured
- **Note:** Free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds

---

## Step 4: Update CORS Configuration

Update `backend/index.js` to allow your frontend/dashboard URLs:

```javascript
const allowedOrigins = [
  'http://localhost:3000',  // Keep for local development
  'http://localhost:3001',
  'http://localhost:3003',
  'https://your-frontend-domain.vercel.app',  // Add your production URLs
  'https://your-dashboard-domain.vercel.app',
  // Add more production URLs as needed
];
```

**Commit and push:**
```bash
git add backend/index.js
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the changes.

---

## Step 5: Test Your Deployment

### 5.1 Test API Endpoint

```bash
# Health check (if you add one)
curl https://your-backend.onrender.com

# Test signup endpoint
curl -X POST https://your-backend.onrender.com/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123456"}'
```

### 5.2 Update Frontend/Dashboard

Update environment variables in your frontend and dashboard:

**Frontend (.env or Vercel/Netlify):**
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

**Dashboard (.env or Vercel/Netlify):**
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## Step 6: Configure Custom Domain (Optional)

1. In Render dashboard → Your service → Settings
2. Scroll to "Custom Domains"
3. Add your domain (e.g., `api.yourdomain.com`)
4. Follow DNS configuration instructions
5. Render provides SSL automatically

---

## Render-Specific Considerations

### Free Tier Limitations

- **Spins down after 15 minutes** of inactivity
- First request after spin-down takes 30-60 seconds
- **Solution:** Upgrade to paid plan or use a service like UptimeRobot to ping your service every 10 minutes

### Keep Service Alive (Free Tier Workaround)

Create a simple ping service or use:
- UptimeRobot (https://uptimerobot.com) - Free
- Cron-job.org - Free
- Set to ping your backend every 10 minutes

### Environment Variables

- All environment variables are encrypted
- Can be updated without redeploying
- Changes take effect immediately

### Logs

- View logs in Render dashboard
- Real-time log streaming available
- Logs are retained for a limited time (free tier)

### Auto-Deploy

- Enabled by default
- Deploys on every push to main branch
- Can disable in service settings

---

## Troubleshooting

### Issue: Build Fails

**Check:**
1. Root directory is set to `backend`
2. Build command: `npm install`
3. Start command: `node index.js`
4. Check build logs for errors

### Issue: Service Crashes

**Check:**
1. Environment variables are set correctly
2. MongoDB connection string is valid
3. Port is set correctly (Render uses PORT env var automatically)
4. Check logs for error messages

### Issue: CORS Errors

**Solution:**
1. Update CORS in `backend/index.js` with production URLs
2. Commit and push changes
3. Wait for auto-deploy

### Issue: Database Connection Failed

**Check:**
1. MongoDB Atlas network access allows all IPs (0.0.0.0/0)
2. Database user password is correct
3. Connection string format is correct
4. Database user has read/write permissions

### Issue: Slow First Request

**Cause:** Free tier service spun down
**Solution:** 
- Upgrade to paid plan, or
- Use UptimeRobot to keep service alive

---

## Production Checklist

- [ ] MongoDB Atlas database created
- [ ] Database user created with proper permissions
- [ ] Network access configured (0.0.0.0/0)
- [ ] Render service created
- [ ] Root directory set to `backend`
- [ ] Environment variables configured
- [ ] CORS updated with production URLs
- [ ] Service deployed successfully
- [ ] API endpoints tested
- [ ] Frontend/Dashboard updated with backend URL
- [ ] Custom domain configured (optional)
- [ ] UptimeRobot ping configured (free tier)

---

## Quick Reference

**Render Dashboard:** https://dashboard.render.com

**Service URL Format:** `https://your-service-name.onrender.com`

**Environment Variables Needed:**
```
PORT=3002
MONGO_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=production
```

**Root Directory:** `backend`

**Build Command:** `npm install`

**Start Command:** `node index.js`

---

## Next Steps

After backend is deployed:

1. **Deploy Frontend** (Vercel recommended)
2. **Deploy Dashboard** (Vercel recommended)
3. **Update CORS** with production URLs
4. **Test complete flow** (signup → login → dashboard)
5. **Set up monitoring** (UptimeRobot, Sentry, etc.)

---

## Support

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com
- Render Community: https://community.render.com


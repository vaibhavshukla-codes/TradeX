# Complete Deployment Guide

## 🔐 Generated JWT Secret

**Secure JWT Secret (Generated):**
```
YbnaD7pM5/ipAdzVazM/gmyVPNZ5LBcHAsBzJqMIMOw=
```

This has been added to the `.env.example` file. **Use this exact secret in production** or generate a new one using:
```bash
openssl rand -base64 32
```

## 📋 Pre-Deployment Checklist

### ✅ Completed
- [x] JWT Secret generated
- [x] CORS configuration updated (uses environment variables)
- [x] API configuration files ready (use environment variables)
- [x] .env.example files created for all services
- [x] MongoDB connection string configured

### ⚠️ You Need To Provide
- [ ] Production domain URLs (frontend, backend, dashboard)
- [ ] Deployment platform choice
- [ ] Update .env files with production URLs

## 🚀 Platform-Specific Deployment Instructions

### Option 1: Railway (Recommended - Easiest)

#### Backend Deployment
1. Go to [Railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Add environment variables:
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=YbnaD7pM5/ipAdzVazM/gmyVPNZ5LBcHAsBzJqMIMOw=
   PORT=3002
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.com
   DASHBOARD_URL=https://your-dashboard-domain.com
   ```
5. Set root directory to `backend`
6. Railway will auto-detect Node.js and deploy

#### Frontend Deployment
1. Create new service in Railway
2. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-railway-url.up.railway.app
   REACT_APP_DASHBOARD_URL=https://your-dashboard-domain.com
   ```
3. Set root directory to `frontend`
4. Add build command: `npm run build`
5. Add start command: `npx serve -s build -l 3000`
6. Install serve: Add to package.json devDependencies or use npx

#### Dashboard Deployment
1. Create new service in Railway
2. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-railway-url.up.railway.app
   REACT_APP_FRONTEND_URL=https://your-frontend-domain.com
   ```
3. Set root directory to `dashboard`
4. Add build command: `npm run build`
5. Add start command: `npx serve -s build -l 3001`

---

### Option 2: Render

#### Backend Deployment
1. Go to [Render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Settings:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment:** Node
5. Add environment variables (same as Railway)
6. Deploy

#### Frontend/Dashboard Deployment
1. New → Static Site
2. Connect GitHub repository
3. Settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/build`
4. Add environment variables
5. Deploy

---

### Option 3: Vercel (Frontend/Dashboard) + Railway/Render (Backend)

#### Backend (Railway or Render)
Follow Option 1 or 2 backend instructions

#### Frontend (Vercel)
1. Go to [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Root directory: `frontend`
4. Build command: `npm run build`
5. Output directory: `build`
6. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   REACT_APP_DASHBOARD_URL=https://your-dashboard-url.com
   ```
7. Deploy

#### Dashboard (Vercel)
Same as frontend, but:
- Root directory: `dashboard`
- Environment variables:
  ```
  REACT_APP_API_URL=https://your-backend-url.com
  REACT_APP_FRONTEND_URL=https://your-frontend-url.com
  ```

---

### Option 4: DigitalOcean / AWS / VPS

#### Backend Setup
```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Clone repository
git clone your-repo-url
cd TradeX/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add all environment variables

# Start with PM2
pm2 start index.js --name zerodha-backend
pm2 save
pm2 startup
```

#### Frontend/Dashboard Setup
```bash
# Build the apps
cd frontend
npm install
npm run build

cd ../dashboard
npm install
npm run build

# Install nginx
sudo apt-get install nginx

# Configure nginx (see nginx config below)
sudo nano /etc/nginx/sites-available/zerodha

# Enable site
sudo ln -s /etc/nginx/sites-available/zerodha /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Nginx Configuration
Create `/etc/nginx/sites-available/zerodha`:
```nginx
# Frontend
server {
    listen 80;
    server_name your-frontend-domain.com;
    
    root /path/to/TradeX/frontend/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Dashboard
server {
    listen 80;
    server_name your-dashboard-domain.com;
    
    root /path/to/TradeX/dashboard/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API (proxy)
server {
    listen 80;
    server_name your-api-domain.com;
    
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📝 Environment Variables Setup

### Backend (.env)
```env
MONGO_URL=mongodb+srv://rishankshukla46_db_user:hMAX5NNFacfBP8QG@tradexcluster.vazztjp.mongodb.net/tradeX?retryWrites=true&w=majority&appName=TradeXCluster
JWT_SECRET=YbnaD7pM5/ipAdzVazM/gmyVPNZ5LBcHAsBzJqMIMOw=
PORT=3002
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
DASHBOARD_URL=https://your-dashboard-domain.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_DASHBOARD_URL=https://your-dashboard-domain.com
```

### Dashboard (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_FRONTEND_URL=https://your-frontend-domain.com
```

## 🔒 Security Checklist

- [x] JWT Secret generated (strong random string)
- [ ] Update MongoDB Atlas IP whitelist with production server IPs
- [ ] Use HTTPS (SSL certificates)
- [ ] Update CORS with production domains
- [ ] Remove localhost from CORS in production
- [ ] Set NODE_ENV=production
- [ ] Review and test all environment variables

## 🧪 Post-Deployment Testing

1. **Test Backend:**
   ```bash
   curl https://your-backend-url.com/checkAuth
   ```

2. **Test Frontend:**
   - Visit your frontend URL
   - Test signup/login
   - Verify API calls work

3. **Test Dashboard:**
   - Visit your dashboard URL
   - Login and verify data loads

4. **Test CORS:**
   - Open browser console on frontend
   - Check for CORS errors
   - Verify API calls succeed

## 📊 Monitoring

### Recommended Tools:
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Error Tracking:** Sentry, LogRocket
- **Analytics:** Google Analytics
- **Logs:** PM2 logs (if using VPS) or platform logs

### PM2 Monitoring (VPS):
```bash
pm2 monit
pm2 logs
pm2 status
```

## 🆘 Troubleshooting

### CORS Errors
- Check FRONTEND_URL and DASHBOARD_URL in backend .env
- Verify URLs match exactly (including https://)
- Check browser console for blocked origins

### API Connection Errors
- Verify REACT_APP_API_URL in frontend/dashboard .env
- Check backend is running and accessible
- Verify MongoDB connection

### Build Errors
- Ensure Node.js version >= 16
- Run `npm install` before build
- Check for missing dependencies

## 📞 Next Steps

1. **Choose your deployment platform**
2. **Update environment variables with your production URLs**
3. **Deploy backend first** (get the URL)
4. **Update frontend/dashboard .env with backend URL**
5. **Deploy frontend and dashboard**
6. **Update backend CORS with frontend/dashboard URLs**
7. **Test everything**

## ⚠️ Important Notes

- **Never commit .env files** to Git
- **Use different JWT secrets** for different environments
- **MongoDB Atlas:** Add production server IPs to network access whitelist
- **SSL/HTTPS:** Required for production (most platforms provide this)
- **Environment Variables:** Must be set before building frontend/dashboard

---

**Ready to deploy!** Follow the steps above for your chosen platform. If you need help with a specific platform, let me know!


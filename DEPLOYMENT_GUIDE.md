# Deployment Guide for TradeX MERN Stack Application

This guide covers deploying the TradeX application to production, including frontend, backend, and database setup.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Dashboard Deployment](#dashboard-deployment)
7. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or MongoDB server)
- Git repository
- Deployment platform accounts (Vercel, Netlify, Heroku, Railway, etc.)

---

## Environment Variables

### Backend Environment Variables (`.env`)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=3002

# MongoDB Connection
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/tradex?retryWrites=true&w=majority

# JWT Secret (Generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters_long

# Node Environment
NODE_ENV=production
```

**Important:** 
- Never commit `.env` files to Git
- Use a strong, random JWT_SECRET (at least 32 characters)
- Generate JWT_SECRET: `openssl rand -base64 32`

### Frontend Environment Variables

Create `.env` files in `frontend/` and `dashboard/` directories:

**frontend/.env:**
```env
REACT_APP_API_URL=https://your-backend-api.com
REACT_APP_DASHBOARD_URL=https://your-dashboard-url.com
```

**dashboard/.env:**
```env
REACT_APP_API_URL=https://your-backend-api.com
REACT_APP_FRONTEND_URL=https://your-frontend-url.com
```

---

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Choose a free tier (M0)
   - Select a cloud provider and region
   - Wait for cluster creation (5-10 minutes)

3. **Configure Database Access**
   - Go to "Database Access"
   - Create a new database user
   - Set username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For production: Add `0.0.0.0/0` (allows all IPs)
   - For development: Add your current IP

5. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Use this in `MONGO_URL` environment variable

### Option 2: Self-Hosted MongoDB

If you have a VPS or server:

```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Connection string
MONGO_URL=mongodb://localhost:27017/tradex
```

---

## Backend Deployment

### Option 1: Railway (Recommended - Easy)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Set Environment Variables**
   - Go to Railway dashboard
   - Select your project
   - Go to "Variables" tab
   - Add all environment variables from `.env`

4. **Get Deployment URL**
   - Railway provides a URL like: `https://your-app.railway.app`
   - Use this as your backend API URL

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set PORT=3002
   heroku config:set MONGO_URL=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Update package.json**
   Add to `backend/package.json`:
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```

### Option 3: Render

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` folder
   - Build command: `npm install`
   - Start command: `node index.js`

3. **Set Environment Variables**
   - Add all environment variables in Render dashboard

### Option 4: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean dashboard
   - Create new app from GitHub

2. **Configure**
   - Select `backend` directory
   - Build command: `npm install`
   - Run command: `node index.js`
   - Add environment variables

### Option 5: AWS EC2 / VPS

1. **SSH into Server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/tradex.git
   cd tradex/backend
   npm install --production
   ```

4. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start index.js --name tradex-backend
   pm2 save
   pm2 startup
   ```

5. **Set Up Nginx (Reverse Proxy)**
   ```bash
   sudo apt-get install nginx
   ```

   Create `/etc/nginx/sites-available/tradex-backend`:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

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

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/tradex-backend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Set Up SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended - Best for React)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `REACT_APP_API_URL` and `REACT_APP_DASHBOARD_URL`

4. **Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Deploy**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=build
   ```

3. **Set Environment Variables**
   - Netlify dashboard → Site settings → Environment variables
   - Add all `REACT_APP_*` variables

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/tradex",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Option 4: AWS S3 + CloudFront

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload to S3**
   - Create S3 bucket
   - Enable static website hosting
   - Upload `build/` folder contents

3. **Set Up CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain

---

## Dashboard Deployment

Deploy the dashboard the same way as the frontend:

### Vercel (Recommended)
```bash
cd dashboard
vercel
```

Set environment variables:
- `REACT_APP_API_URL`
- `REACT_APP_FRONTEND_URL`

### Netlify
```bash
cd dashboard
npm run build
netlify deploy --prod --dir=build
```

---

## Production Checklist

### Security

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS for all services
- [ ] Update CORS to only allow your production domains
- [ ] Remove console.log statements or use proper logging
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting on backend
- [ ] Add Helmet.js for security headers

### Backend Updates Needed

Update `backend/index.js` CORS configuration:

```javascript
const allowedOrigins = [
  'https://your-frontend-domain.com',
  'https://your-dashboard-domain.com',
  // Remove localhost URLs for production
];
```

### Performance

- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable database indexes (already added)

### Monitoring

- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure logging (Winston, Morgan)
- [ ] Set up database backups

### Database

- [ ] Enable MongoDB Atlas backups
- [ ] Set up database indexes (already done)
- [ ] Monitor database performance
- [ ] Set connection pool limits

---

## Quick Deployment Commands

### Railway (All-in-One)

```bash
# Backend
cd backend
railway init
railway up

# Frontend
cd ../frontend
railway init
railway up

# Dashboard
cd ../dashboard
railway init
railway up
```

### Vercel (Frontend + Dashboard)

```bash
# Frontend
cd frontend
vercel --prod

# Dashboard
cd ../dashboard
vercel --prod
```

### Heroku (Backend)

```bash
cd backend
heroku create your-app-name
git push heroku main
```

---

## Environment Variables Summary

### Backend (.env)
```
PORT=3002
MONGO_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_DASHBOARD_URL=https://dashboard.yourdomain.com
```

### Dashboard (.env)
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_FRONTEND_URL=https://yourdomain.com
```

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS origins in backend
   - Check environment variables

2. **Database Connection Failed**
   - Verify MongoDB connection string
   - Check network access in MongoDB Atlas
   - Ensure IP is whitelisted

3. **Build Failures**
   - Check Node.js version (should be 14+)
   - Verify all dependencies are installed
   - Check for syntax errors

4. **Environment Variables Not Working**
   - Restart deployment after adding variables
   - Verify variable names (case-sensitive)
   - Check for typos

---

## Recommended Deployment Stack

**Free Tier:**
- Backend: Railway / Render
- Frontend: Vercel
- Dashboard: Vercel
- Database: MongoDB Atlas (Free)

**Production:**
- Backend: AWS EC2 / DigitalOcean
- Frontend: Vercel / CloudFront
- Dashboard: Vercel / CloudFront
- Database: MongoDB Atlas (Paid) / Self-hosted

---

## Support

For issues during deployment:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check database connectivity
5. Review browser console for frontend errors

---

## Next Steps After Deployment

1. Test all functionality
2. Set up custom domains
3. Configure SSL certificates
4. Set up monitoring
5. Create backup strategy
6. Document API endpoints
7. Set up CI/CD pipeline


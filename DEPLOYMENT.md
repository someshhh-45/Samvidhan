# 🚀 Free Deployment Guide for Samvidhan

## Overview
This guide deploys Samvidhan for **free** across two platforms:
- **Frontend**: Vercel (React/Vite) - FREE
- **Backend**: Render.com (Flask + Tesseract OCR) - FREE tier

---

## ✅ Prerequisites

### Required Accounts (all free)
1. **GitHub** - for version control
2. **Vercel** - for frontend hosting
3. **Render.com** - for backend hosting
4. **Groq API** - for LLM (free tier available)

---

## 📋 STEP 1: GitHub Setup

### 1.1 Create Repository
```bash
cd samvidhan
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/samvidhan.git
git branch -M main
git push -u origin main
```

### 1.3 Get Groq API Key (Free)
- Visit: https://console.groq.com/keys
- Create a free account
- Generate API key
- Keep it safe (you'll need it for Render)

---

## 🎨 STEP 2: Frontend Deployment (Vercel)

### 2.1 Connect Vercel to GitHub
1. Go to https://vercel.com
2. Click "Sign Up" → Choose "GitHub"
3. Authorize Vercel to access your GitHub account
4. Click "New Project"
5. Select your `samvidhan` repository
6. Vercel will auto-detect Vite

### 2.2 Configure Environment Variables
1. In Vercel project settings → Environment Variables
2. Add: `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com`
   (You'll get the backend URL after deploying on Render)

### 2.3 Deploy
- Click "Deploy"
- Wait ~2-3 minutes
- Your frontend is live at: `https://your-project-name.vercel.app`

---

## 🔧 STEP 3: Backend Deployment (Render)

### 3.1 Prepare Backend Code
Ensure your `ai_service/app.py` has CORS enabled:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Enable cross-origin requests from Vercel frontend
```

### 3.2 Create Render Web Service
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Fill in the form:
   - **Name**: `samvidhan-backend`
   - **Runtime**: Python 3.11
   - **Build Command**: `pip install -r ai_service/requirements.txt`
   - **Start Command**: `cd ai_service && python app.py`
   - **Instance Type**: Free
   - **Region**: Auto (or closest to you)

### 3.3 Add Environment Variables in Render
1. Go to "Environment" tab
2. Add these variables:
   ```
   GROQ_API_KEY = [your Groq API key from Step 1.3]
   GROQ_MODEL = llama-3.3-70b-versatile
   LLM_PROVIDER = groq
   FLASK_ENV = production
   ```

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Copy your backend URL (e.g., `https://samvidhan-backend.onrender.com`)

### 3.5 Update Vercel Environment
1. Go back to Vercel project settings
2. Update `VITE_API_BASE_URL` with your Render URL
3. Redeploy Vercel

---

## 🌐 STEP 4: Update Frontend API Calls

In your React code, update the API base URL:

```jsx
// src/services/api.js (or wherever you define API calls)
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8083';

export const uploadFile = async (file) => {
  const res = await fetch(`${API_BASE_URL}/extract`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};
```

---

## ✅ STEP 5: Test Deployment

### Test Backend
```bash
curl https://your-backend-url.onrender.com/
# Should return: "AI Service Running 🚀"
```

### Test Frontend
1. Open https://your-frontend-url.vercel.app
2. Try uploading a PDF
3. Verify extraction works

---

## 📊 Monitoring & Logs

### Render Logs
- Dashboard → Your service → "Logs" tab
- Real-time error tracking

### Vercel Logs
- Vercel dashboard → Your project → "Deployments" → View logs

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Render**: 
  - 750 free hours/month
  - 512MB RAM
  - Sleeps after 15 min inactivity (may take 30s to wake up)
  - No Tesseract support on free tier (⚠️ *limitation*)
  
- **Vercel**: 
  - 100 deployments/month
  - Fast rebuild (~1 min)

### Workarounds for Tesseract
If Tesseract OCR fails on Render free tier:
1. **Option A**: Use Render paid tier ($7/month) - includes system deps
2. **Option B**: Use Railway.app instead (better free tier support)
3. **Option C**: Use Cloud Vision API as fallback for OCR

---

## 🚀 Alternative: Railway.app (Better for OCR)

Railway has better free tier support for system dependencies:

1. Go to https://railway.app
2. Connect GitHub
3. Create project → Select your repo
4. Add environment variables
5. Deploy both frontend and backend

**Cost**: $5 free credit/month + pay-as-you-go

---

## 💰 Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| GitHub | Unlimited public repos | $0 |
| Vercel | 100 deployments/month | $0 |
| Render | 750 hrs/month | $0 (limited OCR) |
| Groq API | Generous free tier | $0 (up to limit) |
| **Total** | | **$0/month** |

---

## 🐛 Troubleshooting

### "Module not found" error on Render
- Ensure `requirements.txt` has all dependencies
- Run: `pip freeze > ai_service/requirements.txt`

### CORS errors
- Ensure `CORS(app)` is enabled in Flask
- Check Vercel env vars match backend URL

### Service won't deploy
- Check build logs in Render dashboard
- Verify Python 3.11+ is available
- Ensure no hardcoded paths to system files

### OCR not working
- Tesseract may not be available on free tier
- Consider switching to Railway or upgrading

---

## 📚 Quick Reference

| Action | Command |
|--------|---------|
| Deploy frontend | Push to GitHub (auto-deploys on Vercel) |
| Deploy backend | Push to GitHub (auto-deploys on Render) |
| View logs (Render) | Dashboard → Logs tab |
| View logs (Vercel) | Dashboard → Deployments → View logs |
| Redeploy Vercel | Vercel Dashboard → Deployments → Redeploy |
| Update env vars | Render: Environment tab / Vercel: Settings → Env vars |

---

## 🎉 You're Done!

Your Samvidhan platform is now live for free:
- **Frontend**: `https://your-project-name.vercel.app`
- **Backend**: `https://samvidhan-backend.onrender.com`

**Next Steps**:
1. Share your links
2. Monitor logs regularly
3. Consider paid plans if you exceed free tier limits
4. Set up CI/CD for auto-deployments on code push

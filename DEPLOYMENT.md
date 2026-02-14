# Deployment Guide - Share Your Valentine's Day Website

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is made by the Next.js team and is the easiest way to deploy your app.

### Steps:

1. **Install Vercel CLI** (if you don't have it):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your app**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Choose your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default or choose a name)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

4. **Your app will be deployed!** You'll get a URL like: `https://your-project-name.vercel.app`

5. **For production deployment**:
   ```bash
   vercel --prod
   ```

---

## Option 2: Deploy via Vercel Website (No CLI needed)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
   - If you don't have it on Git, initialize it first:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     ```
   - Then push to GitHub/GitLab/Bitbucket
4. Vercel will auto-detect Next.js and deploy automatically
5. You'll get a shareable URL!

---

## Option 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your project folder, OR
3. Connect your Git repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy!

---

## Quick Git Setup (if needed)

If you want to use Git for deployment:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Valentine's Day website"

# Create a repository on GitHub/GitLab, then:
git remote add origin <your-repo-url>
git push -u origin main
```

---

## After Deployment

Once deployed, you'll get a URL like:
- `https://your-project.vercel.app` (Vercel)
- `https://your-project.netlify.app` (Netlify)

**Share this URL with your friend!** 🎉

---

## Note

Make sure your `.gitignore` file includes:
- `node_modules/`
- `.next/`
- `.env*` files (if you have any)

Your `.gitignore` should already be set up correctly.

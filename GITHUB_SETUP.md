# How to Push to GitHub - Step by Step

## Step 1: Initialize Git (if not already done)

```bash
cd /Users/jasoncho/VDay_Web
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Make Your First Commit

```bash
git commit -m "Initial commit: Valentine's Day website"
```

## Step 4: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `vday-web` (or any name you like)
4. Description: "Valentine's Day interactive website"
5. Choose **Public** or **Private** (your choice)
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

## Step 5: Connect and Push to GitHub

After creating the repo, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vday-web.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

You'll be asked for your GitHub username and password (or personal access token).

---

## Alternative: Using SSH (if you have SSH keys set up)

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/vday-web.git
git branch -M main
git push -u origin main
```

---

## Troubleshooting

### If you get authentication errors:
- Use a **Personal Access Token** instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Give it `repo` permissions
- Use the token as your password when pushing

### If you need to update later:
```bash
git add .
git commit -m "Your update message"
git push
```

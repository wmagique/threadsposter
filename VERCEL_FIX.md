# 🔧 Fix Vercel - Erreur Functions/Builds

## ❌ Problème
L'erreur `functions` et `builds` ne peuvent pas être utilisés ensemble dans `vercel.json`.

## ✅ Solution
**Supprimer complètement le fichier `vercel.json`** !

Pour Next.js, Vercel détecte automatiquement tout ce qu'il faut. Le fichier `vercel.json` n'est pas nécessaire.

## 🚀 Déploiement Correct

### 1. Supprimer vercel.json
\`\`\`bash
rm vercel.json
\`\`\`

### 2. Garder seulement next.config.mjs
Le fichier `next.config.mjs` suffit pour la configuration.

### 3. Variables d'Environnement
Configurez directement dans l'interface Vercel :
- Settings → Environment Variables
- Ajoutez vos clés Supabase

### 4. Redéployer
\`\`\`bash
git add .
git commit -m "Fix: Remove vercel.json"
git push
\`\`\`

## 📋 Configuration Automatique Vercel

Vercel détecte automatiquement :
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`
- ✅ API Routes: `app/api/**`

Aucune configuration manuelle nécessaire ! 🎉

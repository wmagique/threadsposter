# 🚀 Déploiement sur Vercel - Guide Complet

## 🎯 Pourquoi Vercel ?

- ✅ **Optimisé pour Next.js** (créé par la même équipe)
- ✅ **Déploiement automatique** depuis GitHub
- ✅ **HTTPS gratuit** et CDN mondial
- ✅ **Variables d'environnement** faciles à configurer
- ✅ **Domaine gratuit** .vercel.app

## 📋 Étapes de Déploiement

### 1. Préparer le Code

**Option A : Via GitHub (Recommandé)**
1. Créez un repo GitHub
2. Pushez votre code
3. Connectez Vercel à GitHub

**Option B : Upload Direct**
1. Installez Vercel CLI
2. Déployez directement

### 2. Déploiement via GitHub

1. **Allez sur** [vercel.com](https://vercel.com)
2. **Connectez-vous** avec GitHub
3. **Cliquez** "New Project"
4. **Sélectionnez** votre repo ThreadsAuto
5. **Configurez** :
   - Framework Preset: **Next.js** (détecté automatiquement)
   - Root Directory: **/** (racine)
   - Build Command: `npm run build` (automatique)
   - Output Directory: `.next` (automatique)

### 3. Variables d'Environnement

Dans les paramètres Vercel, ajoutez :

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://ihlupfpvfnwjjnlwfbjo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobHVwZnB2Zm53ampubHdmYmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjAxNDAsImV4cCI6MjA2NTgzNjE0MH0.LfoH57iPdm2guPD7GGaKNb_GEo2oaNS9cLtzglxYQfA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobHVwZnB2Zm53ampubHdmYmpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDI2MDE0MCwiZXhwIjoyMDY1ODM2MTQwfQ.iLoJFqzCoEZnuO1dS4hLdTi887ikMOLBl0GmLg-e1rg
\`\`\`

### 4. Déploiement Automatique

Une fois configuré :
- ✅ **Push sur GitHub** = Déploiement automatique
- ✅ **Preview deployments** pour les branches
- ✅ **Production deployment** pour main/master

## 🌐 Domaine Personnalisé

### Domaine Gratuit
Votre site sera accessible sur : `votre-projet.vercel.app`

### Domaine Personnalisé
1. **Achetez un domaine** (ex: threadsauto.com)
2. Dans Vercel → **Domains**
3. **Ajoutez votre domaine**
4. **Configurez les DNS** selon les instructions

## 🔧 Configuration Avancée

### Analytics
- Activez **Vercel Analytics** pour les statistiques
- Gratuit jusqu'à 100k vues/mois

### Monitoring
- **Vercel Speed Insights** pour les performances
- Alertes automatiques en cas de problème

## 📱 Déploiement via CLI

Si vous préférez la ligne de commande :

\`\`\`bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
\`\`\`

## 🐛 Dépannage

### Build Errors
- Vérifiez `next.config.mjs`
- Assurez-vous que toutes les dépendances sont dans `package.json`

### API Routes ne fonctionnent pas
- Vérifiez que les fichiers sont dans `app/api/`
- Contrôlez les variables d'environnement

### Base de données inaccessible
- Vérifiez les clés Supabase dans les variables d'environnement
- Testez la connexion depuis les logs Vercel

## ✅ Checklist de Déploiement

- [ ] Code pushé sur GitHub
- [ ] Projet connecté à Vercel
- [ ] Variables d'environnement configurées
- [ ] Premier déploiement réussi
- [ ] Site accessible via l'URL Vercel
- [ ] Dashboard partenaire fonctionnel
- [ ] API routes opérationnelles
- [ ] Base de données Supabase connectée

## 🎉 Après le Déploiement

1. **Testez toutes les fonctionnalités**
2. **Configurez un domaine personnalisé** (optionnel)
3. **Activez les analytics** Vercel
4. **Partagez votre site** !

Votre site sera en ligne en quelques minutes ! 🚀

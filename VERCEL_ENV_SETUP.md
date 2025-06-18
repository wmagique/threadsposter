# 🔑 Configuration Variables d'Environnement Vercel

## ❌ Problème
L'erreur `supabaseUrl is required` indique que Vercel ne trouve pas les variables d'environnement.

## ✅ Solution - Étapes Détaillées

### 1. Aller dans les Paramètres Vercel
1. Ouvrez votre projet sur [vercel.com](https://vercel.com)
2. Cliquez sur **Settings**
3. Dans le menu de gauche, cliquez sur **Environment Variables**

### 2. Ajouter les Variables (EXACTEMENT comme ça)

**Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://ihlupfpvfnwjjnlwfbjo.supabase.co`
- **Environments:** ✅ Production ✅ Preview ✅ Development

**Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobHVwZnB2Zm53ampubHdmYmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjAxNDAsImV4cCI6MjA2NTgzNjE0MH0.LfoH57iPdm2guPD7GGaKNb_GEo2oaNS9cLtzglxYQfA`
- **Environments:** ✅ Production ✅ Preview ✅ Development

**Variable 3:**
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobHVwZnB2Zm53ampubHdmYmpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDI2MDE0MCwiZXhwIjoyMDY1ODM2MTQwfQ.iLoJFqzCoEZnuO1dS4hLdTi887ikMOLBl0GmLg-e1rg`
- **Environments:** ✅ Production ✅ Preview ✅ Development

### 3. Redéployer
Après avoir ajouté les variables :
1. Allez dans l'onglet **Deployments**
2. Cliquez sur **Redeploy** sur le dernier déploiement
3. Ou faites un nouveau commit/push

### 4. Vérification
Une fois redéployé, votre site devrait fonctionner !

## 🔍 Points Importants

- ✅ **Noms exacts** : Respectez exactement les noms des variables
- ✅ **Tous les environnements** : Cochez Production, Preview ET Development
- ✅ **Pas d'espaces** : Pas d'espaces avant/après les valeurs
- ✅ **Redéploiement** : Obligatoire après ajout des variables

## 🐛 Si ça ne marche toujours pas

1. **Vérifiez les logs** dans Vercel → Functions
2. **Supprimez et recréez** les variables
3. **Contactez le support** Vercel si nécessaire

## 📋 Checklist Variables

- [ ] NEXT_PUBLIC_SUPABASE_URL ajoutée
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY ajoutée  
- [ ] SUPABASE_SERVICE_ROLE_KEY ajoutée
- [ ] Tous les environnements cochés
- [ ] Redéploiement effectué
- [ ] Site accessible et fonctionnel

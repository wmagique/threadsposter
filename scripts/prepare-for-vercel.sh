#!/bin/bash

echo "🚀 Préparation pour Vercel..."

# Vérifier que nous sommes dans un projet Next.js
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    exit 1
fi

# Nettoyer les fichiers de build précédents
echo "🧹 Nettoyage..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Supprimer les fichiers Hostinger s'ils existent encore
rm -f server.js
rm -f .htaccess
rm -f .env.production
rm -rf deploy

# Vérifier les dépendances
echo "📦 Vérification des dépendances..."
npm install

# Test de build local
echo "🔨 Test de build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
    echo ""
    echo "📋 Prochaines étapes pour Vercel :"
    echo "1. Créer un repo GitHub (si pas déjà fait)"
    echo "2. Pusher le code : git add . && git commit -m 'Ready for Vercel' && git push"
    echo "3. Aller sur vercel.com"
    echo "4. Connecter le repo GitHub"
    echo "5. Configurer les variables d'environnement"
    echo ""
    echo "🔑 Variables d'environnement à ajouter dans Vercel :"
    echo "NEXT_PUBLIC_SUPABASE_URL=https://ihlupfpvfnwjjnlwfbjo.supabase.co"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    echo "SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    echo ""
    echo "🎉 Vercel détectera automatiquement Next.js !"
else
    echo "❌ Erreur de build. Vérifiez les erreurs ci-dessus."
    exit 1
fi

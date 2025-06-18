#!/bin/bash

echo "🔍 Vérification des variables d'environnement..."

# Vérifier les variables locales
echo ""
echo "📋 Variables locales (.env.local) :"
if [ -f ".env.local" ]; then
    echo "✅ .env.local existe"
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_URL trouvée"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL manquante"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY trouvée"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY manquante"
    fi
    
    if grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        echo "✅ SUPABASE_SERVICE_ROLE_KEY trouvée"
    else
        echo "❌ SUPABASE_SERVICE_ROLE_KEY manquante"
    fi
else
    echo "❌ .env.local n'existe pas"
fi

echo ""
echo "🔑 Variables à ajouter dans Vercel :"
echo "NEXT_PUBLIC_SUPABASE_URL=https://ihlupfpvfnwjjnlwfbjo.supabase.co"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
echo "SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

echo ""
echo "📋 Instructions :"
echo "1. Aller sur vercel.com → votre projet"
echo "2. Settings → Environment Variables"
echo "3. Ajouter les 3 variables ci-dessus"
echo "4. Cocher Production, Preview ET Development"
echo "5. Redéployer"

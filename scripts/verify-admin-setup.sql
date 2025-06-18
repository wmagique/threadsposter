-- Vérifier la configuration du compte admin

-- 1. Vérifier le compte admin
SELECT 'Compte Admin:' as info;
SELECT code, name, email, commission_rate, status 
FROM affiliates 
WHERE code = '$0';

-- 2. Vérifier les ventes admin (doivent avoir commission = montant total)
SELECT 'Ventes Admin:' as info;
SELECT 
    plan_type,
    amount,
    commission_amount,
    CASE 
        WHEN commission_amount = amount THEN '✅ Correct (100%)'
        ELSE '❌ Incorrect (pas 100%)'
    END as verification
FROM sales 
WHERE affiliate_code = '$0'
ORDER BY sale_date DESC;

-- 3. Vérifier les ventes partenaires (doivent avoir commission = 10%)
SELECT 'Ventes Partenaires:' as info;
SELECT 
    affiliate_code,
    plan_type,
    amount,
    commission_amount,
    ROUND((commission_amount / amount) * 100, 1) as pourcentage_commission
FROM sales 
WHERE affiliate_code != '$0'
ORDER BY sale_date DESC;

-- Mettre à jour les commissions du code admin pour qu'elles soient égales au montant total

UPDATE sales 
SET commission_amount = amount 
WHERE affiliate_code = '$0';

-- Vérification
SELECT 
    affiliate_code,
    plan_type,
    amount,
    commission_amount,
    CASE 
        WHEN affiliate_code = '$0' THEN 'Admin (100%)'
        ELSE 'Partenaire (10%)'
    END as type_compte
FROM sales 
ORDER BY affiliate_code, sale_date DESC;

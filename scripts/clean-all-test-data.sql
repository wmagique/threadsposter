-- Script pour supprimer toutes les données de test et repartir à zéro

-- Supprimer toutes les ventes de test
DELETE FROM sales WHERE customer_email LIKE '%@example.com' OR customer_email LIKE 'test%@%' OR customer_email LIKE 'client%@%';

-- Supprimer tous les clics de test
DELETE FROM clicks WHERE ip_address LIKE '192.168.%' OR referrer LIKE '%twitter.com' OR referrer LIKE '%instagram.com';

-- Supprimer les paiements de commission de test (s'il y en a)
DELETE FROM commission_payments WHERE affiliate_code = '$0';

-- Optionnel : Supprimer aussi les candidatures de test
DELETE FROM affiliate_applications WHERE email LIKE '%@example.com';

-- Vérifier que seul le compte admin reste
SELECT 'Affiliés restants:' as info;
SELECT code, name, email FROM affiliates;

SELECT 'Ventes restantes:' as info;
SELECT COUNT(*) as total_sales FROM sales;

SELECT 'Clics restants:' as info;
SELECT COUNT(*) as total_clicks FROM clicks;

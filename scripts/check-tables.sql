-- Vérifier que les tables existent
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('affiliates', 'sales', 'clicks', 'commission_payments');

-- Vérifier le contenu de la table affiliates
SELECT * FROM public.affiliates LIMIT 5;

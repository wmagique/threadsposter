-- Alternative : Remettre complètement à zéro avec juste le compte admin

-- Supprimer toutes les données
DELETE FROM commission_payments;
DELETE FROM clicks;
DELETE FROM sales;
DELETE FROM affiliate_applications;

-- Garder seulement le compte admin mais supprimer les autres
DELETE FROM affiliates WHERE code != '$0';

-- S'assurer que le compte admin existe
INSERT INTO affiliates (code, name, email, commission_rate, status) VALUES
('$0', 'Admin Principal', 'admin@threadsauto.com', 10.00, 'active')
ON CONFLICT (code) DO NOTHING;

-- Vérification finale
SELECT 'État final de la base:' as info;
SELECT 'Affiliés:' as type, COUNT(*) as count FROM affiliates
UNION ALL
SELECT 'Ventes:' as type, COUNT(*) as count FROM sales
UNION ALL
SELECT 'Clics:' as type, COUNT(*) as count FROM clicks
UNION ALL
SELECT 'Candidatures:' as type, COUNT(*) as count FROM affiliate_applications;

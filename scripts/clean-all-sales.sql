-- Supprimer toutes les ventes de test pour avoir un dashboard propre
DELETE FROM commission_payments;
DELETE FROM clicks;
DELETE FROM sales;

-- Garder seulement le compte admin sans données de test
-- Le compte admin reste mais sans ventes/clics
SELECT 'Base de données nettoyée - Dashboard vide' as status;

-- Vérification
SELECT 'Ventes restantes:' as info, COUNT(*) as count FROM sales
UNION ALL
SELECT 'Clics restants:' as info, COUNT(*) as count FROM clicks
UNION ALL
SELECT 'Affiliés:' as info, COUNT(*) as count FROM affiliates;

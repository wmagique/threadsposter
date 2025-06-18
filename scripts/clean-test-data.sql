-- Supprimer toutes les données de test
DELETE FROM commission_payments;
DELETE FROM clicks;
DELETE FROM sales;

-- Garder seulement le compte ADMIN0 et supprimer les autres comptes de test
DELETE FROM affiliates WHERE code != 'ADMIN0';

-- Ou si vous voulez tout supprimer et recommencer :
-- DELETE FROM affiliates;

-- Ajouter la colonne customer_telegram à la table sales
ALTER TABLE sales ADD COLUMN IF NOT EXISTS customer_telegram VARCHAR(255);

-- Supprimer toutes les données de test pour avoir un dashboard propre
DELETE FROM commission_payments;
DELETE FROM clicks;
DELETE FROM sales;

-- Vérification
SELECT 'Colonne customer_telegram ajoutée et données nettoyées' as status;

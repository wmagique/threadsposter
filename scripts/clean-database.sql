-- Script pour nettoyer complètement la base et ne garder que le compte admin $0

-- Supprimer toutes les données existantes
DELETE FROM commission_payments;
DELETE FROM clicks;
DELETE FROM sales;
DELETE FROM affiliates;

-- Créer uniquement le compte admin
INSERT INTO affiliates (code, name, email, commission_rate, status) VALUES
('$0', 'Admin Principal', 'admin@threadsauto.com', 10.00, 'active');

-- Optionnel : ajouter quelques données de test
INSERT INTO sales (affiliate_code, plan_type, amount, commission_amount, customer_email, status) VALUES
('$0', '1 Mois', 99.00, 9.90, 'test@example.com', 'confirmed'),
('$0', '3 Mois', 267.00, 26.70, 'test2@example.com', 'confirmed');

INSERT INTO clicks (affiliate_code, ip_address, referrer) VALUES
('$0', '192.168.1.1', 'https://twitter.com');

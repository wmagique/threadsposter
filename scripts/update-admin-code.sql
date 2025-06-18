-- Script pour mettre à jour le code admin et supprimer les autres
BEGIN;

-- Supprimer les anciens partenaires de test
DELETE FROM clicks WHERE affiliate_code IN ('ADMIN0', 'PARTNER1', 'INFLUENCER2');
DELETE FROM sales WHERE affiliate_code IN ('ADMIN0', 'PARTNER1', 'INFLUENCER2');
DELETE FROM affiliates WHERE code IN ('ADMIN0', 'PARTNER1', 'INFLUENCER2');

-- Créer le nouveau compte admin avec le code $0
INSERT INTO affiliates (code, name, email, commission_rate, status) VALUES
('$0', 'Admin Principal', 'admin@threadsauto.com', 10.00, 'active');

-- Ajouter quelques ventes de test pour l'admin
INSERT INTO sales (affiliate_code, plan_type, amount, commission_amount, customer_email, status) VALUES
('$0', '1 Mois', 99.00, 9.90, 'client1@example.com', 'confirmed'),
('$0', '3 Mois', 267.00, 26.70, 'client2@example.com', 'confirmed'),
('$0', 'Lifetime', 750.00, 75.00, 'client3@example.com', 'confirmed');

-- Ajouter quelques clics de test
INSERT INTO clicks (affiliate_code, ip_address, referrer) VALUES
('$0', '192.168.1.1', 'https://twitter.com'),
('$0', '192.168.1.2', 'https://instagram.com');

COMMIT;

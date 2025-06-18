-- Insertion de données de test

-- Affiliés de test
INSERT INTO affiliates (code, name, email, website, audience_size, motivation, commission_rate, status) VALUES
('ADMIN0', 'Admin Test', 'admin@test.com', 'https://admin-site.com', '10k followers', 'Test account for admin', 40.00, 'active'),
('PARTNER1', 'Jean Dupont', 'jean@example.com', 'https://jeandupont.com', '5k followers Instagram', 'Je veux promouvoir des outils utiles', 35.00, 'active'),
('INFLUENCER2', 'Marie Martin', 'marie@example.com', 'https://youtube.com/mariemartin', '50k abonnés YouTube', 'Parfait pour ma chaîne tech', 40.00, 'active');

-- Mise à jour des affiliés de test avec un taux de commission de 10%
UPDATE affiliates SET commission_rate = 10.00;

-- Mise à jour des ventes de test avec les commissions à 10%
DELETE FROM sales;

INSERT INTO sales (affiliate_code, plan_type, amount, commission_amount, customer_email, status, sale_date) VALUES
('ADMIN0', '1Month', 99.00, 9.90, 'client1@example.com', 'confirmed', '2024-01-15 10:30:00'),
('ADMIN0', '3Month', 267.00, 26.70, 'client2@example.com', 'confirmed', '2024-01-14 14:20:00'),
('ADMIN0', 'Lifetime', 750.00, 75.00, 'client3@example.com', 'pending', '2024-01-13 09:15:00'),
('PARTNER1', '1Month', 99.00, 9.90, 'client4@example.com', 'confirmed', '2024-01-12 16:45:00'),
('PARTNER1', '3Month', 267.00, 26.70, 'client5@example.com', 'confirmed', '2024-01-11 11:30:00'),
('INFLUENCER2', 'Lifetime', 750.00, 75.00, 'client6@example.com', 'confirmed', '2024-01-10 13:20:00');

-- Clics de test
INSERT INTO clicks (affiliate_code, ip_address, user_agent, referrer, click_date) VALUES
('ADMIN0', '192.168.1.1', 'Mozilla/5.0...', 'https://twitter.com', '2024-01-15 10:00:00'),
('ADMIN0', '192.168.1.2', 'Mozilla/5.0...', 'https://instagram.com', '2024-01-14 14:00:00'),
('PARTNER1', '192.168.1.3', 'Mozilla/5.0...', 'https://youtube.com', '2024-01-12 16:00:00'),
('INFLUENCER2', '192.168.1.4', 'Mozilla/5.0...', 'https://tiktok.com', '2024-01-10 13:00:00');

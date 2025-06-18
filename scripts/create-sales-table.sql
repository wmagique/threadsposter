CREATE TABLE sales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    plan_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    customer_email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'confirmed',
    sale_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Désactiver RLS
ALTER TABLE sales DISABLE ROW LEVEL SECURITY;

-- Remplacer la section d'insertion par :

-- Insérer les données de test seulement pour l'admin
INSERT INTO sales (affiliate_code, plan_type, amount, commission_amount, customer_email, status) VALUES
('$0', '1 Mois', 99.00, 9.90, 'client1@example.com', 'confirmed'),
('$0', '3 Mois', 267.00, 26.70, 'client2@example.com', 'confirmed');

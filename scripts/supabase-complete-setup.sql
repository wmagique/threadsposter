-- Supprimer les tables si elles existent déjà
DROP TABLE IF EXISTS commission_payments CASCADE;
DROP TABLE IF EXISTS clicks CASCADE;
DROP TABLE IF EXISTS sales CASCADE;
DROP TABLE IF EXISTS affiliates CASCADE;

-- Créer la table affiliates
CREATE TABLE affiliates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    website VARCHAR(255),
    audience_size VARCHAR(100),
    motivation TEXT,
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table sales
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

-- Créer la table clicks
CREATE TABLE clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    click_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer la table commission_payments
CREATE TABLE commission_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- Désactiver RLS (Row Level Security) pour toutes les tables
ALTER TABLE affiliates DISABLE ROW LEVEL SECURITY;
ALTER TABLE sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE commission_payments DISABLE ROW LEVEL SECURITY;

-- Donner les permissions
GRANT ALL ON affiliates TO anon, authenticated;
GRANT ALL ON sales TO anon, authenticated;
GRANT ALL ON clicks TO anon, authenticated;
GRANT ALL ON commission_payments TO anon, authenticated;

-- Remplacer la section d'insertion des données de test par :

-- Insérer seulement le compte admin
INSERT INTO affiliates (code, name, email, commission_rate, status) VALUES
('$0', 'Admin Principal', 'admin@threadsauto.com', 10.00, 'active');

-- Insérer les ventes de test seulement pour l'admin
INSERT INTO sales (affiliate_code, plan_type, amount, commission_amount, customer_email, status) VALUES
('$0', '1 Mois', 99.00, 9.90, 'client1@example.com', 'confirmed'),
('$0', '3 Mois', 267.00, 26.70, 'client2@example.com', 'confirmed'),
('$0', 'Lifetime', 750.00, 75.00, 'client3@example.com', 'confirmed');

-- Insérer les clics de test seulement pour l'admin
INSERT INTO clicks (affiliate_code, ip_address, referrer) VALUES
('$0', '192.168.1.1', 'https://twitter.com'),
('$0', '192.168.1.2', 'https://instagram.com');

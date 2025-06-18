CREATE TABLE clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    click_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Désactiver RLS
ALTER TABLE clicks DISABLE ROW LEVEL SECURITY;

-- Insérer quelques données de test seulement pour l'admin
INSERT INTO clicks (affiliate_code, ip_address, referrer) VALUES
('$0', '192.168.1.1', 'https://twitter.com'),
('$0', '192.168.1.2', 'https://instagram.com');

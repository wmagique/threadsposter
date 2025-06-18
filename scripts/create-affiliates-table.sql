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

-- Désactiver RLS
ALTER TABLE affiliates DISABLE ROW LEVEL SECURITY;

-- Insérer seulement les données admin
INSERT INTO affiliates (code, name, email, commission_rate, status) VALUES
('$0', 'Admin Principal', 'admin@threadsauto.com', 10.00, 'active');

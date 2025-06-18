-- Créer la table des candidatures
CREATE TABLE affiliate_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    audience_size VARCHAR(100) NOT NULL,
    motivation TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by VARCHAR(100),
    notes TEXT
);

-- Désactiver RLS
ALTER TABLE affiliate_applications DISABLE ROW LEVEL SECURITY;

-- Permissions
GRANT ALL ON affiliate_applications TO anon, authenticated;

-- Index pour optimiser les performances
CREATE INDEX idx_applications_status ON affiliate_applications(status);
CREATE INDEX idx_applications_created_at ON affiliate_applications(created_at);

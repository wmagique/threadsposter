-- Supprimer toutes les tables si elles existent
DROP TABLE IF EXISTS public.commission_payments CASCADE;
DROP TABLE IF EXISTS public.clicks CASCADE;
DROP TABLE IF EXISTS public.sales CASCADE;
DROP TABLE IF EXISTS public.affiliates CASCADE;

-- Supprimer la fonction si elle existe
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Maintenant recréer tout
CREATE TABLE public.affiliates (
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

CREATE TABLE public.sales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    plan_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    customer_email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'confirmed',
    sale_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (affiliate_code) REFERENCES public.affiliates(code) ON DELETE CASCADE
);

CREATE TABLE public.clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    click_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (affiliate_code) REFERENCES public.affiliates(code) ON DELETE CASCADE
);

CREATE TABLE public.commission_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (affiliate_code) REFERENCES public.affiliates(code) ON DELETE CASCADE
);

-- Désactiver RLS immédiatement
ALTER TABLE public.affiliates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_payments DISABLE ROW LEVEL SECURITY;

-- Donner toutes les permissions
GRANT ALL ON public.affiliates TO anon, authenticated;
GRANT ALL ON public.sales TO anon, authenticated;
GRANT ALL ON public.clicks TO anon, authenticated;
GRANT ALL ON public.commission_payments TO anon, authenticated;

-- Insérer les données de test
INSERT INTO public.affiliates (code, name, email, website, audience_size, motivation, commission_rate, status) VALUES
('ADMIN0', 'Admin Principal', 'admin@threadsauto.com', 'https://threadsauto.com', 'Admin', 'Compte administrateur', 10.00, 'active'),
('PARTNER1', 'Jean Dupont', 'jean@example.com', 'https://jeandupont.com', '5k followers Instagram', 'Je veux promouvoir des outils utiles', 10.00, 'active'),
('INFLUENCER2', 'Marie Martin', 'marie@example.com', 'https://youtube.com/mariemartin', '50k abonnés YouTube', 'Parfait pour ma chaîne tech', 10.00, 'active');

INSERT INTO public.sales (affiliate_code, plan_type, amount, commission_amount, customer_email, status, sale_date) VALUES
('ADMIN0', '1 Mois', 99.00, 9.90, 'client1@example.com', 'confirmed', NOW() - INTERVAL '1 day'),
('ADMIN0', '3 Mois', 267.00, 26.70, 'client2@example.com', 'confirmed', NOW() - INTERVAL '2 days'),
('ADMIN0', 'Lifetime', 750.00, 75.00, 'client3@example.com', 'pending', NOW() - INTERVAL '3 days'),
('PARTNER1', '1 Mois', 99.00, 9.90, 'client4@example.com', 'confirmed', NOW() - INTERVAL '4 days'),
('PARTNER1', '3 Mois', 267.00, 26.70, 'client5@example.com', 'confirmed', NOW() - INTERVAL '5 days'),
('INFLUENCER2', 'Lifetime', 750.00, 75.00, 'client6@example.com', 'confirmed', NOW() - INTERVAL '6 days');

INSERT INTO public.clicks (affiliate_code, ip_address, user_agent, referrer, click_date) VALUES
('ADMIN0', '192.168.1.1', 'Mozilla/5.0...', 'https://twitter.com', NOW() - INTERVAL '1 hour'),
('ADMIN0', '192.168.1.2', 'Mozilla/5.0...', 'https://instagram.com', NOW() - INTERVAL '2 hours'),
('PARTNER1', '192.168.1.3', 'Mozilla/5.0...', 'https://youtube.com', NOW() - INTERVAL '3 hours'),
('INFLUENCER2', '192.168.1.4', 'Mozilla/5.0...', 'https://tiktok.com', NOW() - INTERVAL '4 hours');

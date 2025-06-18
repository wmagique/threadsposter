-- Création de la base de données pour le système d'affiliation

-- Table des affiliés
CREATE TABLE affiliates (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    website VARCHAR(255),
    audience_size VARCHAR(100),
    motivation TEXT,
    commission_rate DECIMAL(5,2) DEFAULT 25.00,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des ventes
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    plan_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    customer_email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending',
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_code) REFERENCES affiliates(code)
);

-- Table des clics/visites
CREATE TABLE clicks (
    id SERIAL PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    click_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_code) REFERENCES affiliates(code)
);

-- Table des paiements de commissions
CREATE TABLE commission_payments (
    id SERIAL PRIMARY KEY,
    affiliate_code VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (affiliate_code) REFERENCES affiliates(code)
);

-- Index pour optimiser les performances
CREATE INDEX idx_sales_affiliate_code ON sales(affiliate_code);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_clicks_affiliate_code ON clicks(affiliate_code);
CREATE INDEX idx_clicks_date ON clicks(click_date);

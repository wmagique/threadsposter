-- Désactiver RLS pour les tests (à activer plus tard en production)
ALTER TABLE affiliates DISABLE ROW LEVEL SECURITY;
ALTER TABLE sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE commission_payments DISABLE ROW LEVEL SECURITY;

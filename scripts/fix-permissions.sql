-- Version alternative pour désactiver RLS
BEGIN;

-- Désactiver RLS sur toutes les tables
ALTER TABLE public.affiliates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_payments DISABLE ROW LEVEL SECURITY;

-- Donner les permissions complètes au rôle anon
GRANT ALL ON public.affiliates TO anon;
GRANT ALL ON public.sales TO anon;
GRANT ALL ON public.clicks TO anon;
GRANT ALL ON public.commission_payments TO anon;

-- Donner les permissions complètes au rôle authenticated
GRANT ALL ON public.affiliates TO authenticated;
GRANT ALL ON public.sales TO authenticated;
GRANT ALL ON public.clicks TO authenticated;
GRANT ALL ON public.commission_payments TO authenticated;

COMMIT;

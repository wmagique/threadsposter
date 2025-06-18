-- Voir les clics récents
SELECT 
    affiliate_code,
    ip_address,
    referrer,
    click_date,
    'Il y a ' || EXTRACT(EPOCH FROM (NOW() - click_date))/60 || ' minutes' as temps_ecoule
FROM clicks 
ORDER BY click_date DESC 
LIMIT 10;

-- Statistiques par partenaire
SELECT 
    affiliate_code,
    COUNT(*) as total_clics,
    COUNT(DISTINCT ip_address) as visiteurs_uniques,
    MAX(click_date) as dernier_clic
FROM clicks 
GROUP BY affiliate_code
ORDER BY total_clics DESC;

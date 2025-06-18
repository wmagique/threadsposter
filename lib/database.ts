import { supabase } from "./supabase"
import type { Affiliate, Sale, Click } from "./supabase"

// Fonctions pour les affiliés
export async function getAffiliate(code: string): Promise<Affiliate | null> {
  try {
    const { data, error } = await supabase.from("affiliates").select("*").eq("code", code).single()

    if (error) {
      console.error("Erreur lors de la récupération de l'affilié:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Erreur dans getAffiliate:", error)
    return null
  }
}

export async function getAllAffiliates(): Promise<Affiliate[]> {
  try {
    const { data, error } = await supabase.from("affiliates").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des affiliés:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erreur dans getAllAffiliates:", error)
    return []
  }
}

export async function createAffiliate(
  affiliate: Omit<Affiliate, "id" | "created_at" | "updated_at">,
): Promise<Affiliate | null> {
  try {
    const { data, error } = await supabase.from("affiliates").insert([affiliate]).select().single()

    if (error) {
      console.error("Erreur lors de la création de l'affilié:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Erreur dans createAffiliate:", error)
    return null
  }
}

// Fonctions pour les ventes
export async function getSalesByAffiliate(affiliateCode: string): Promise<Sale[]> {
  try {
    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .eq("affiliate_code", affiliateCode)
      .order("sale_date", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des ventes:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erreur dans getSalesByAffiliate:", error)
    return []
  }
}

export async function getAllSales(): Promise<Sale[]> {
  try {
    const { data, error } = await supabase.from("sales").select("*").order("sale_date", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des ventes:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erreur dans getAllSales:", error)
    return []
  }
}

export async function createSale(sale: Omit<Sale, "id" | "sale_date">): Promise<Sale | null> {
  try {
    const { data, error } = await supabase.from("sales").insert([sale]).select().single()

    if (error) {
      console.error("Erreur lors de la création de la vente:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Erreur dans createSale:", error)
    return null
  }
}

// Fonctions pour les statistiques
export async function getAffiliateStats(affiliateCode: string) {
  try {
    // Récupérer les ventes
    const sales = await getSalesByAffiliate(affiliateCode)

    // Calculer les statistiques
    const totalSales = sales.length
    const totalCommission = sales.reduce((sum, sale) => sum + sale.commission_amount, 0)
    const confirmedSales = sales.filter((sale) => sale.status === "confirmed")
    const thisMonthSales = sales.filter((sale) => {
      const saleDate = new Date(sale.sale_date)
      const now = new Date()
      return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear()
    })

    // Récupérer les clics pour ce partenaire
    const { data: clicks } = await supabase.from("clicks").select("*").eq("affiliate_code", affiliateCode)
    const totalClicks = clicks?.length || 0

    return {
      totalSales,
      totalCommission,
      confirmedSales: confirmedSales.length,
      thisMonthSales: thisMonthSales.length,
      monthlyCommission: thisMonthSales.reduce((sum, sale) => sum + sale.commission_amount, 0),
      totalClicks,
      conversionRate: totalClicks > 0 ? ((totalSales / totalClicks) * 100).toFixed(1) : "0",
    }
  } catch (error) {
    console.error("Erreur dans getAffiliateStats:", error)
    return {
      totalSales: 0,
      totalCommission: 0,
      confirmedSales: 0,
      thisMonthSales: 0,
      monthlyCommission: 0,
      totalClicks: 0,
      conversionRate: "0",
    }
  }
}

// Fonction pour enregistrer un clic
export async function recordClick(
  affiliateCode: string,
  ipAddress?: string,
  userAgent?: string,
  referrer?: string,
): Promise<Click | null> {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .insert([
        {
          affiliate_code: affiliateCode,
          ip_address: ipAddress,
          user_agent: userAgent,
          referrer: referrer,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de l'enregistrement du clic:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Erreur dans recordClick:", error)
    return null
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { getAllSales, createSale } from "@/lib/database"

export async function GET() {
  try {
    const sales = await getAllSales()
    return NextResponse.json(sales)
  } catch (error) {
    console.error("Erreur dans GET sales:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { affiliate_code, plan_type, customer_email, customer_telegram } = body

    // Validation basique
    if (!affiliate_code || !plan_type) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // Calculer le prix et la commission selon le plan
    let amount = 0
    const commission_rate = 10 // Par défaut 10%

    switch (plan_type) {
      case "1 Mois":
        amount = 99
        break
      case "3 Mois":
        amount = 267
        break
      case "Lifetime":
        amount = 750
        break
      default:
        return NextResponse.json({ error: "Type de plan invalide" }, { status: 400 })
    }

    // Si c'est l'admin ($0), il prend 100% du prix
    const commission_amount = affiliate_code === "$0" ? amount : (amount * commission_rate) / 100

    const newSale = await createSale({
      affiliate_code,
      plan_type,
      customer_email: customer_email || null,
      customer_telegram: customer_telegram || null,
      amount, // Utiliser 'amount' au lieu de 'price'
      commission_amount,
      status: "confirmed", // Vente manuelle = confirmée directement
    })

    if (!newSale) {
      return NextResponse.json({ error: "Erreur lors de la création de la vente" }, { status: 500 })
    }

    return NextResponse.json(newSale, { status: 201 })
  } catch (error) {
    console.error("Erreur dans POST sales:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

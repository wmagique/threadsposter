import { type NextRequest, NextResponse } from "next/server"
import { recordClick, getAffiliate } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { affiliate_code, referrer } = body

    // Vérifier que l'affilié existe
    const affiliate = await getAffiliate(affiliate_code)
    if (!affiliate) {
      return NextResponse.json({ error: "Code d'affiliation invalide" }, { status: 404 })
    }

    // Récupérer les informations de la requête
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Enregistrer le clic
    const click = await recordClick(affiliate_code, ip, userAgent, referrer)

    if (click) {
      return NextResponse.json({ success: true, message: "Clic enregistré" })
    } else {
      return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du clic:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { getAllAffiliates, createAffiliate } from "@/lib/database"

export async function GET() {
  try {
    const affiliates = await getAllAffiliates()
    return NextResponse.json(affiliates)
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, name, email, website, audience_size, motivation, commission_rate } = body

    // Validation basique
    if (!code || !name || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    const newAffiliate = await createAffiliate({
      code: code.toUpperCase(),
      name,
      email,
      website,
      audience_size,
      motivation,
      commission_rate: Number.parseFloat(commission_rate) || 10,
      status: "active",
    })

    if (!newAffiliate) {
      return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 })
    }

    return NextResponse.json(newAffiliate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

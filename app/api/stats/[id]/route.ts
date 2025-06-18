import { type NextRequest, NextResponse } from "next/server"
import { getAffiliateStats } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const stats = await getAffiliateStats(params.id)
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Erreur dans GET stats:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

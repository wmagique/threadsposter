import { type NextRequest, NextResponse } from "next/server"
import { getSalesByAffiliate } from "@/lib/database"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sales = await getSalesByAffiliate(params.id)
    return NextResponse.json(sales)
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Ici 'id' est l'ID de la vente à supprimer
    const { error } = await supabase.from("sales").delete().eq("id", id)

    if (error) {
      console.error("Erreur lors de la suppression de la vente:", error)
      return NextResponse.json({ error: "Erreur lors de la suppression de la vente" }, { status: 500 })
    }

    return NextResponse.json({ message: "Vente supprimée avec succès" })
  } catch (error) {
    console.error("Erreur dans DELETE sale:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { action, notes } = body // action: 'approve' ou 'reject'

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Action invalide" }, { status: 400 })
    }

    // Récupérer la candidature
    const { data: application, error: fetchError } = await supabase
      .from("affiliate_applications")
      .select("*")
      .eq("id", params.id)
      .single()

    if (fetchError || !application) {
      return NextResponse.json({ error: "Candidature non trouvée" }, { status: 404 })
    }

    if (application.status !== "pending") {
      return NextResponse.json({ error: "Cette candidature a déjà été traitée" }, { status: 400 })
    }

    if (action === "approve") {
      // Générer un code partenaire unique
      const baseCode = application.name
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .substring(0, 6)

      let partnerCode = baseCode
      let counter = 1

      // Vérifier l'unicité du code
      while (true) {
        const { data: existingCode } = await supabase.from("affiliates").select("id").eq("code", partnerCode).single()

        if (!existingCode) break
        partnerCode = `${baseCode}${counter}`
        counter++
      }

      // Créer le partenaire
      const { data: newAffiliate, error: affiliateError } = await supabase
        .from("affiliates")
        .insert([
          {
            code: partnerCode,
            name: application.name,
            email: application.email,
            website: application.website,
            audience_size: application.audience_size,
            motivation: application.motivation,
            commission_rate: 10.0,
            status: "active",
          },
        ])
        .select()
        .single()

      if (affiliateError) {
        console.error("Erreur lors de la création du partenaire:", affiliateError)
        return NextResponse.json({ error: "Erreur lors de la création du compte partenaire" }, { status: 500 })
      }

      // Mettre à jour la candidature
      const { error: updateError } = await supabase
        .from("affiliate_applications")
        .update({
          status: "approved",
          reviewed_at: new Date().toISOString(),
          reviewed_by: "$0",
          notes: notes || `Approuvé - Code partenaire: ${partnerCode}`,
        })
        .eq("id", params.id)

      if (updateError) {
        console.error("Erreur lors de la mise à jour de la candidature:", updateError)
      }

      return NextResponse.json({
        message: "Candidature approuvée avec succès",
        partnerCode,
        affiliate: newAffiliate,
      })
    } else {
      // Rejeter la candidature
      const { error: updateError } = await supabase
        .from("affiliate_applications")
        .update({
          status: "rejected",
          reviewed_at: new Date().toISOString(),
          reviewed_by: "$0",
          notes: notes || "Candidature refusée",
        })
        .eq("id", params.id)

      if (updateError) {
        console.error("Erreur lors de la mise à jour de la candidature:", updateError)
        return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 })
      }

      return NextResponse.json({ message: "Candidature refusée" })
    }
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

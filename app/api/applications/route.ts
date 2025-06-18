import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, website, audience_size, motivation } = body

    // Validation basique
    if (!name || !email || !audience_size || !motivation) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // Vérifier si l'email existe déjà
    const { data: existing } = await supabase.from("affiliate_applications").select("id").eq("email", email).single()

    if (existing) {
      return NextResponse.json({ error: "Une candidature existe déjà avec cet email" }, { status: 400 })
    }

    // Vérifier si l'email existe déjà dans les affiliés
    const { data: existingAffiliate } = await supabase.from("affiliates").select("id").eq("email", email).single()

    if (existingAffiliate) {
      return NextResponse.json({ error: "Cet email est déjà associé à un compte partenaire" }, { status: 400 })
    }

    // Créer la candidature
    const { data, error } = await supabase
      .from("affiliate_applications")
      .insert([
        {
          name,
          email,
          website,
          audience_size,
          motivation,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la création de la candidature:", error)
      return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 })
    }

    return NextResponse.json({ message: "Candidature envoyée avec succès", id: data.id }, { status: 201 })
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("affiliate_applications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des candidatures:", error)
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

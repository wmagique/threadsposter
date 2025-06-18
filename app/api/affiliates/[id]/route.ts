import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const { id } = params

    const { data: affiliate, error } = await supabase.from("affiliates").select("*").eq("code", id).single()

    if (error) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 })
    }

    return NextResponse.json(affiliate)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const { id } = params
    const body = await request.json()

    const { data, error } = await supabase.from("affiliates").update(body).eq("code", id).select().single()

    if (error) {
      return NextResponse.json({ error: "Failed to update affiliate" }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const { id } = params

    const { error } = await supabase.from("affiliates").delete().eq("code", id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete affiliate" }, { status: 400 })
    }

    return NextResponse.json({ message: "Affiliate deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

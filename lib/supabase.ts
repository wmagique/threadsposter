import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour les données
export interface Affiliate {
  id: string
  code: string
  name: string
  email: string
  commission_rate: number
  status: string
  created_at: string
  updated_at: string
}

export interface Sale {
  id: string
  affiliate_code: string
  plan_type: string
  amount: number // Utiliser 'amount' au lieu de 'price'
  commission_amount: number
  customer_email?: string
  customer_telegram?: string
  status: string
  sale_date: string
}

export interface Click {
  id: string
  affiliate_code: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  click_date: string
}

export interface Application {
  id: string
  name: string
  email: string
  website?: string
  audience_size: string
  motivation: string
  status: string
  created_at: string
  reviewed_at?: string
  reviewed_by?: string
  notes?: string
}

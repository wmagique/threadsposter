"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Copy, DollarSign, MousePointer, TrendingUp, Users } from "lucide-react"

interface Affiliate {
  id: number
  code: string
  name: string
  email: string
  telegram?: string
  commission_rate: number
  status: "active" | "inactive" | "pending"
  total_sales: number
  total_commission: number
  created_at: string
}

interface Sale {
  id: number
  affiliate_code: string
  amount: number
  commission: number
  status: "pending" | "completed" | "cancelled"
  created_at: string
  customer_email?: string
  product_name?: string
}

interface Click {
  id: number
  affiliate_code: string
  ip_address: string
  user_agent: string
  referrer?: string
  created_at: string
}

export default function AffiliateDashboard({ params }: { params: { id: string } }) {
  const { id } = params
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null)
  const [sales, setSales] = useState<Sale[]>([])
  const [clicks, setClicks] = useState<Click[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingSale, setIsAddingSale] = useState(false)

  // Rest of the component logic remains the same, just update API calls to use id instead of code
  useEffect(() => {
    fetchAffiliateData()
  }, [id])

  const fetchAffiliateData = async () => {
    try {
      const [affiliateRes, salesRes, clicksRes] = await Promise.all([
        fetch(`/api/affiliates/${id}`),
        fetch(`/api/sales?affiliate_code=${id}`),
        fetch(`/api/clicks?affiliate_code=${id}`),
      ])

      if (affiliateRes.ok) {
        const affiliateData = await affiliateRes.json()
        setAffiliate(affiliateData)
      }

      if (salesRes.ok) {
        const salesData = await salesRes.json()
        setSales(salesData)
      }

      if (clicksRes.ok) {
        const clicksData = await clicksRes.json()
        setClicks(clicksData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Rest of the component remains the same...
  // (keeping the same structure but updating API calls to use the correct affiliate code)

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Chargement...</div>
      </div>
    )
  }

  if (!affiliate) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Partenaire non trouvé</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Rest of the JSX remains the same */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Partenaire</h1>
          <p className="text-muted-foreground">Bienvenue {affiliate.name}</p>
        </div>
        <Badge variant={affiliate.status === "active" ? "default" : "secondary"}>{affiliate.status}</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliate.total_sales}€</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Totale</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliate.total_commission}€</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clics</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clicks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux Commission</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliate.commission_rate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Link */}
      <Card>
        <CardHeader>
          <CardTitle>Votre Lien d'Affiliation</CardTitle>
          <CardDescription>Partagez ce lien pour gagner des commissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={`${window.location.origin}?ref=${affiliate.code}`} readOnly className="flex-1" />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}?ref=${affiliate.code}`)
                toast({
                  title: "Copié !",
                  description: "Le lien a été copié dans le presse-papiers",
                })
              }}
              size="icon"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Sales and Clicks */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Ventes ({sales.length})</TabsTrigger>
          <TabsTrigger value="clicks">Clics ({clicks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Client</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{new Date(sale.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{sale.amount}€</TableCell>
                      <TableCell>{sale.commission}€</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sale.status === "completed"
                              ? "default"
                              : sale.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.customer_email || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clicks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Clics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Navigateur</TableHead>
                    <TableHead>Référent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clicks.map((click) => (
                    <TableRow key={click.id}>
                      <TableCell>{new Date(click.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{click.ip_address}</TableCell>
                      <TableCell className="max-w-xs truncate">{click.user_agent}</TableCell>
                      <TableCell>{click.referrer || "Direct"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

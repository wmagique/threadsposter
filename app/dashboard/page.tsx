"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Users,
  TrendingUp,
  Copy,
  Eye,
  BarChart3,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  MessageCircle,
  Chrome,
  Zap,
  Shield,
  Target,
  Award,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import type { Affiliate, Sale } from "@/lib/supabase"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { useToast } from "@/hooks/use-toast"

interface Application {
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

// Déplacer ce composant AVANT le composant principal DashboardPage
const CreatePartnerForm = ({
  newPartner,
  setNewPartner,
  loading,
  setLoading,
  setError,
  setAllAffiliates,
}: {
  newPartner: { code: string; name: string; email: string; commission: string }
  setNewPartner: (partner: { code: string; name: string; email: string; commission: string }) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  setError: (error: string) => void
  setAllAffiliates: (affiliates: Affiliate[]) => void
}) => {
  const { toast } = useToast()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/affiliates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: newPartner.code,
          name: newPartner.name,
          email: newPartner.email,
          commission_rate: newPartner.commission,
        }),
      })

      if (response.ok) {
        toast({
          title: "Partenaire créé avec succès !",
          description: `${newPartner.name} créé avec le code ${newPartner.code}`,
          variant: "success",
        })
        setNewPartner({ code: "", name: "", email: "", commission: "10" })
        // Recharger la liste des affiliés
        const affiliatesRes = await fetch("/api/affiliates")
        if (affiliatesRes.ok) {
          const affiliatesData = await affiliatesRes.json()
          setAllAffiliates(affiliatesData)
        }
      } else {
        const error = await response.json()
        setError(`Erreur: ${error.error}`)
        toast({
          title: "Erreur lors de la création du partenaire",
          description: `Erreur: ${error.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      setError("Erreur lors de la création du partenaire")
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du partenaire",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="partner-code-create" className="text-white">
            Code Partenaire
          </Label>
          <Input
            id="partner-code-create"
            placeholder="Ex: PARTNER3"
            value={newPartner.code}
            onChange={(e) => setNewPartner({ ...newPartner, code: e.target.value.toUpperCase() })}
            required
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partner-name-create" className="text-white">
            Nom
          </Label>
          <Input
            id="partner-name-create"
            placeholder="Nom du partenaire"
            value={newPartner.name}
            onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
            required
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="partner-email-create" className="text-white">
            Email
          </Label>
          <Input
            id="partner-email-create"
            type="email"
            placeholder="email@example.com"
            value={newPartner.email}
            onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
            required
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partner-commission-create" className="text-white">
            Commission (%)
          </Label>
          <Input
            id="partner-commission-create"
            type="number"
            min="1"
            max="50"
            value={newPartner.commission}
            onChange={(e) => setNewPartner({ ...newPartner, commission: e.target.value })}
            required
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0"
        disabled={loading}
      >
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        Créer le Partenaire
      </Button>
    </form>
  )
}

export default function DashboardPage() {
  const [affiliateCode, setAffiliateCode] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginCode, setLoginCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { toast } = useToast()

  // États pour les données réelles
  const [currentAffiliate, setCurrentAffiliate] = useState<Affiliate | null>(null)
  const [sales, setSales] = useState<Sale[]>([])
  const [allAffiliates, setAllAffiliates] = useState<Affiliate[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [stats, setStats] = useState({
    totalSales: 0,
    totalCommission: 0,
    thisMonthSales: 0,
    monthlyCommission: 0,
    conversionRate: "0",
    totalClicks: 0,
  })

  // État pour l'ajout de vente
  const [newSale, setNewSale] = useState({
    partnerCode: "",
    product: "",
    customerEmail: "",
    customerTelegram: "",
  })

  // État pour la création de partenaire
  const [newPartner, setNewPartner] = useState({
    code: "",
    name: "",
    email: "",
    commission: "10",
  })

  // États pour les dialogues de confirmation
  const [deletePartnerDialog, setDeletePartnerDialog] = useState<{
    open: boolean
    partnerCode: string
    partnerName: string
  }>({ open: false, partnerCode: "", partnerName: "" })

  const [deleteSaleDialog, setDeleteSaleDialog] = useState<{
    open: boolean
    saleId: string
    saleInfo: string
  }>({ open: false, saleId: "", saleInfo: "" })

  // Effet pour suivre la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Charger les données de l'affilié avec gestion d'erreur améliorée
  const loadAffiliateData = async (code: string) => {
    setLoading(true)
    setError("")
    try {
      // Charger les infos de l'affilié
      try {
        const affiliateRes = await fetch(`/api/affiliates/${code}`)
        if (affiliateRes.ok) {
          const affiliate = await affiliateRes.json()
          setCurrentAffiliate(affiliate)
        } else if (affiliateRes.status === 404) {
          setError("Code d'affiliation non trouvé")
          toast({
            title: "Erreur",
            description: "Code d'affiliation non trouvé",
            variant: "destructive",
          })
          return
        } else {
          const errorText = await affiliateRes.text()
          console.error("Erreur affilié:", errorText)
          setError("Erreur lors du chargement de l'affilié")
          toast({
            title: "Erreur",
            description: "Erreur lors du chargement de l'affilié",
            variant: "destructive",
          })
        }
      } catch (err) {
        console.error("Erreur fetch affilié:", err)
        setError("Erreur de connexion - vérifiez que la base de données est configurée")
        toast({
          title: "Erreur",
          description: "Erreur de connexion - vérifiez que la base de données est configurée",
          variant: "destructive",
        })
        return
      }

      // Charger les ventes
      try {
        const salesRes = await fetch(`/api/sales/${code}`)
        if (salesRes.ok) {
          const salesData = await salesRes.json()
          setSales(salesData)
        } else {
          console.warn("Impossible de charger les ventes")
          setSales([])
        }
      } catch (err) {
        console.warn("Erreur chargement ventes:", err)
        setSales([])
      }

      // Charger les statistiques
      try {
        const statsRes = await fetch(`/api/stats/${code}`)
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        } else {
          console.warn("Impossible de charger les statistiques")
        }
      } catch (err) {
        console.warn("Erreur chargement stats:", err)
      }

      // Si c'est l'admin, charger tous les affiliés et candidatures
      if (code === "$0") {
        try {
          const affiliatesRes = await fetch("/api/affiliates")
          if (affiliatesRes.ok) {
            const affiliatesData = await affiliatesRes.json()
            setAllAffiliates(affiliatesData)
          }
        } catch (err) {
          console.warn("Erreur chargement affiliés:", err)
        }

        try {
          // Charger toutes les ventes pour l'admin
          const allSalesRes = await fetch("/api/sales")
          if (allSalesRes.ok) {
            const allSalesData = await allSalesRes.json()
            setSales(allSalesData)
          }
        } catch (err) {
          console.warn("Erreur chargement toutes les ventes:", err)
        }

        // Charger les candidatures
        await loadApplications()
      }
    } catch (error) {
      console.error("Erreur générale lors du chargement des données:", error)
      setError("Erreur de connexion à la base de données")
      toast({
        title: "Erreur",
        description: "Erreur de connexion à la base de données",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Charger les candidatures
  const loadApplications = async () => {
    try {
      const response = await fetch("/api/applications")
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des candidatures:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des candidatures",
        variant: "destructive",
      })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginCode.trim()) {
      setError("Veuillez entrer un code d'affiliation")
      toast({
        title: "Erreur",
        description: "Veuillez entrer un code d'affiliation",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/affiliates/${loginCode}`)

      if (response.ok) {
        const affiliate = await response.json()
        setIsLoggedIn(true)
        setAffiliateCode(loginCode)
        setCurrentAffiliate(affiliate)
        await loadAffiliateData(loginCode)
      } else if (response.status === 404) {
        setError("Code d'affiliation invalide")
        toast({
          title: "Erreur",
          description: "Code d'affiliation invalide",
          variant: "destructive",
        })
      } else {
        const errorText = await response.text()
        console.error("Erreur login:", errorText)
        setError("Erreur de connexion")
        toast({
          title: "Erreur",
          description: "Erreur de connexion",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      setError("Erreur de connexion. Vérifiez que la base de données est configurée.")
      toast({
        title: "Erreur",
        description: "Erreur de connexion. Vérifiez que la base de données est configurée.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour ajouter une vente manuellement
  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          affiliate_code: newSale.partnerCode,
          plan_type: newSale.product,
          customer_email: newSale.customerEmail,
          customer_telegram: newSale.customerTelegram,
        }),
      })

      if (response.ok) {
        toast({
          title: "Vente ajoutée avec succès !",
          description: `Vente ajoutée pour le partenaire ${newSale.partnerCode}`,
          variant: "success",
        })
        setNewSale({ partnerCode: "", product: "", customerEmail: "", customerTelegram: "" })
        // Recharger les données
        await loadAffiliateData(affiliateCode)
      } else {
        const error = await response.json()
        setError(`Erreur: ${error.error}`)
        toast({
          title: "Erreur",
          description: `Erreur: ${error.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      setError("Erreur lors de l'ajout de la vente")
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout de la vente",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour approuver/refuser une candidature
  const handleApplicationAction = async (applicationId: string, action: "approve" | "reject", notes?: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, notes, reviewed_by: "$0" }),
      })

      if (response.ok) {
        const result = await response.json()
        if (action === "approve") {
          toast({
            title: "Candidature approuvée !",
            description: `Code partenaire: ${result.partnerCode}`,
            variant: "success",
          })
        } else {
          toast({
            title: "Candidature refusée",
            description: "La candidature a été refusée avec succès",
            variant: "warning",
          })
        }
        await loadApplications()
        await loadAffiliateData(affiliateCode) // Recharger pour mettre à jour la liste des partenaires
      } else {
        const error = await response.json()
        toast({
          title: "Erreur",
          description: `Erreur: ${error.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors du traitement de la candidature",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour supprimer un partenaire
  const handleDeletePartner = async () => {
    const { partnerCode, partnerName } = deletePartnerDialog

    setLoading(true)
    try {
      const response = await fetch(`/api/affiliates/${partnerCode}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Partenaire supprimé",
          description: `${partnerName} a été supprimé avec succès`,
          variant: "success",
        })
        // Recharger la liste des affiliés
        const affiliatesRes = await fetch("/api/affiliates")
        if (affiliatesRes.ok) {
          const affiliatesData = await affiliatesRes.json()
          setAllAffiliates(affiliatesData)
        }
        // Recharger les données pour mettre à jour les stats
        await loadAffiliateData(affiliateCode)
      } else {
        const error = await response.json()
        toast({
          title: "Erreur",
          description: `Erreur: ${error.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du partenaire",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setDeletePartnerDialog({ open: false, partnerCode: "", partnerName: "" })
    }
  }

  const PartnersList = () => {
    return (
      <div className="space-y-4">
        {allAffiliates.map((partner) => (
          <div
            key={partner.code}
            className="flex items-center justify-between p-4 border border-slate-600/50 rounded-lg bg-slate-800/30 backdrop-blur-sm hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">{partner.name}</p>
                <p className="text-sm text-slate-400">{partner.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-slate-400">Code</p>
                <p className="font-mono font-medium text-white">{partner.code}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Commission</p>
                <p className="font-medium text-white">{partner.commission_rate}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Statut</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{partner.status}</Badge>
              </div>
              {partner.code !== "$0" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setDeletePartnerDialog({
                      open: true,
                      partnerCode: partner.code,
                      partnerName: partner.name,
                    })
                  }
                  className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-400 hover:text-red-300 transition-all duration-300"
                  disabled={loading}
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const ApplicationsList = () => {
    const getStatusIcon = (status: string) => {
      switch (status) {
        case "pending":
          return <Clock className="w-4 h-4 text-yellow-400" />
        case "approved":
          return <CheckCircle className="w-4 h-4 text-green-400" />
        case "rejected":
          return <XCircle className="w-4 h-4 text-red-400" />
        default:
          return <Clock className="w-4 h-4 text-slate-400" />
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case "pending":
          return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        case "approved":
          return "bg-green-500/20 text-green-400 border-green-500/30"
        case "rejected":
          return "bg-red-500/20 text-red-400 border-red-500/30"
        default:
          return "bg-slate-500/20 text-slate-400 border-slate-500/30"
      }
    }

    const pendingApplications = applications.filter((app) => app.status === "pending")
    const processedApplications = applications.filter((app) => app.status !== "pending")

    return (
      <div className="space-y-6">
        {/* Candidatures en attente */}
        {pendingApplications.length > 0 && (
          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                Candidatures en attente ({pendingApplications.length})
              </CardTitle>
              <CardDescription className="text-slate-400">Nouvelles demandes d'affiliation à traiter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApplications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-slate-600/50 rounded-lg p-4 bg-yellow-500/10 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg text-white">{app.name}</h3>
                        <p className="text-sm text-slate-400">{app.email}</p>
                        <p className="text-xs text-slate-500">
                          Candidature envoyée le {new Date(app.created_at).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(app.status)}
                          En attente
                        </div>
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="font-medium text-slate-300">Audience:</p>
                        <p className="text-slate-400">{app.audience_size}</p>
                      </div>
                      {app.website && (
                        <div>
                          <p className="font-medium text-slate-300">Site web:</p>
                          <a
                            href={app.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 transition-colors"
                          >
                            {app.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="font-medium text-slate-300 mb-1">Motivation:</p>
                      <p className="text-slate-400 text-sm bg-slate-800/50 p-3 rounded border border-slate-600/30">
                        {app.motivation}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApplicationAction(app.id, "approve")}
                        className="bg-green-600/80 hover:bg-green-500 border-0 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                        disabled={loading}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approuver
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApplicationAction(app.id, "reject")}
                        className="bg-red-600/80 hover:bg-red-500 border-0 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                        disabled={loading}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Refuser
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Candidatures traitées */}
        {processedApplications.length > 0 && (
          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-white">Historique des candidatures ({processedApplications.length})</CardTitle>
              <CardDescription className="text-slate-400">Candidatures déjà traitées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {processedApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 border border-slate-600/50 rounded-lg bg-slate-800/20 backdrop-blur-sm hover:bg-slate-700/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-white">{app.name}</p>
                        <p className="text-sm text-slate-400">{app.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Traité le</p>
                        <p className="text-sm text-white">
                          {app.reviewed_at ? new Date(app.reviewed_at).toLocaleDateString("fr-FR") : "-"}
                        </p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(app.status)}
                          {app.status === "approved" ? "Approuvé" : "Refusé"}
                        </div>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {applications.length === 0 && (
          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
            <CardContent className="text-center py-8">
              <p className="text-slate-400">Aucune candidature pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copié !",
      description: "Le contenu a été copié dans le presse-papier",
      variant: "info",
    })
  }

  // Fonction pour supprimer une vente
  const handleDeleteSale = async () => {
    const { saleId } = deleteSaleDialog

    setLoading(true)
    try {
      const response = await fetch(`/api/sales/${saleId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Vente supprimée",
          description: "La vente a été supprimée avec succès",
          variant: "success",
        })
        // Recharger les données
        await loadAffiliateData(affiliateCode)
      } else {
        const error = await response.json()
        toast({
          title: "Erreur",
          description: `Erreur: ${error.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de la vente",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setDeleteSaleDialog({ open: false, saleId: "", saleInfo: "" })
    }
  }

  // Filtrer les ventes pour le partenaire connecté
  const filteredSales = affiliateCode === "$0" ? sales : sales.filter((sale) => sale.affiliate_code === affiliateCode)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        {/* Curseur lumineux */}
        <div
          className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
              <Chrome className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              ThreadsAuto
            </h2>
            <p className="text-slate-400 text-lg mb-6">Programme Partenaire</p>

            <div className="text-center mb-8">
              <p className="text-slate-300 text-xl mb-2">Bienvenue</p>
              <p className="text-slate-400">
                Connectez-vous pour accéder à votre dashboard partenaire et suivre vos performances.
              </p>
            </div>

            {/* Login Form */}
            <div className="w-full max-w-lg mx-auto">
              <Card className="bg-slate-800/40 backdrop-blur-lg border-slate-600/60 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-500">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-white mb-2">Accès Partenaire</CardTitle>
                  <CardDescription className="text-slate-300 text-base leading-relaxed">
                    Entrez votre code d'affiliation pour accéder à votre dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center gap-3 backdrop-blur-sm">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-red-200 text-sm font-medium">{error}</span>
                    </div>
                  )}
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="code" className="text-white font-medium text-base">
                        Code d'affiliation
                      </Label>
                      <Input
                        id="code"
                        placeholder="Entrer votre code d'affiliation"
                        value={loginCode}
                        onChange={(e) => {
                          setLoginCode(e.target.value.toUpperCase())
                          setError("") // Clear error when typing
                        }}
                        required
                        className="h-12 text-lg bg-slate-800/60 border-slate-600/80 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 active:scale-[0.98]"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                      Accéder au Dashboard
                    </Button>
                  </form>
                  <div className="mt-8 text-center">
                    <Link
                      href="/"
                      className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300 font-medium"
                    >
                      ← Retour au site
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Avantages Partenaire - Section horizontale */}
            <div className="w-full max-w-7xl mt-16">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Avantages Partenaire</h2>
                <p className="text-slate-400 text-lg">Tout ce que vous obtenez</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Tracking Automatique</h4>
                    <p className="text-sm text-slate-400">Suivi des clics et conversions en temps réel</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Analytics Détaillées</h4>
                    <p className="text-sm text-slate-400">Dashboard complet avec toutes vos métriques</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Paiements Sécurisés</h4>
                    <p className="text-sm text-slate-400">Commissions versées chaque mois</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Outils Marketing</h4>
                    <p className="text-sm text-slate-400">Liens, bannières et ressources prêtes</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-orange-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Support Prioritaire</h4>
                    <p className="text-sm text-slate-400">Assistance dédiée pour nos partenaires</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading && !currentAffiliate) {
    return (
      <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
        {/* Curseur lumineux */}
        <div
          className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
          <p className="text-white">Chargement de votre dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Curseur lumineux */}
      <div
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <Chrome className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ThreadsAuto
              </span>
            </Link>
            <div className="h-6 w-px bg-slate-600"></div>
            <div>
              <h1 className="text-xl font-semibold text-white">Dashboard Partenaire</h1>
              <p className="text-sm text-slate-400">
                {currentAffiliate ? `${currentAffiliate.name} (${affiliateCode})` : `Code: ${affiliateCode}`}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsLoggedIn(false)
              setAffiliateCode("")
              setCurrentAffiliate(null)
              setSales([])
              setAllAffiliates([])
              setApplications([])
              setError("")
            }}
            className="transition-all duration-300 hover:scale-105 bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-md flex items-center gap-2 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Ventes Totales</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalSales}</div>
              <p className="text-xs text-slate-400">+{stats.thisMonthSales} ce mois</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {affiliateCode === "$0" ? "Revenus Totaux" : "Commission Totale"}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCommission.toFixed(2)}€</div>
              <p className="text-xs text-slate-400">+{stats.monthlyCommission.toFixed(2)}€ ce mois</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Taux de Conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.conversionRate}%</div>
              <p className="text-xs text-slate-400">
                {stats.totalSales} ventes / {stats.totalClicks} clics
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Clics Totaux</CardTitle>
              <Eye className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalClicks}</div>
              <p className="text-xs text-slate-400">Depuis le début</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-600/50 backdrop-blur-md">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
            >
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
            >
              Ventes
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
            >
              Outils
            </TabsTrigger>
            {affiliateCode === "$0" && (
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
              >
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Sales */}
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-white">Ventes Récentes</CardTitle>
                <CardDescription className="text-slate-400">
                  {affiliateCode === "$0"
                    ? "Toutes les ventes récentes"
                    : `Vos dernières ventes avec le code ${affiliateCode}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSales.slice(0, 5).map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between p-4 border border-slate-600/50 rounded-lg bg-slate-800/20 backdrop-blur-sm hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-white">{sale.plan_type}</p>
                          <p className="text-sm text-slate-400">{new Date(sale.sale_date).toLocaleDateString()}</p>
                          {affiliateCode === "$0" && (
                            <p className="text-xs text-blue-400">Code: {sale.affiliate_code}</p>
                          )}
                          {sale.customer_telegram && (
                            <p className="text-xs text-green-400 flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {sale.customer_telegram}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            sale.status === "confirmed"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {sale.status === "confirmed" ? "Confirmée" : "En attente"}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium text-white">+{sale.commission_amount.toFixed(2)}€</p>
                        </div>
                        {affiliateCode === "$0" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setDeleteSaleDialog({
                                open: true,
                                saleId: sale.id,
                                saleInfo: `${sale.plan_type} - ${sale.affiliate_code} - ${sale.commission_amount.toFixed(2)}€`,
                              })
                            }
                            className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-400 hover:text-red-300 transition-all duration-300"
                            disabled={loading}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredSales.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-400 text-lg font-medium">Aucune vente pour le moment</p>
                      <p className="text-slate-500 text-sm">
                        {affiliateCode === "$0"
                          ? "Les ventes apparaîtront ici une fois ajoutées"
                          : "Vos ventes avec votre code d'affiliation apparaîtront ici"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-white">Historique des Ventes</CardTitle>
                <CardDescription className="text-slate-400">
                  Toutes vos ventes et commissions détaillées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between p-4 border border-slate-600/50 rounded-lg bg-slate-800/20 backdrop-blur-sm hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                          <BarChart3 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Plan {sale.plan_type}</p>
                          <p className="text-sm text-slate-400">{new Date(sale.sale_date).toLocaleDateString()}</p>
                          {affiliateCode === "$0" && (
                            <p className="text-xs text-blue-400">Code: {sale.affiliate_code}</p>
                          )}
                          {sale.customer_email && <p className="text-xs text-slate-500">{sale.customer_email}</p>}
                          {sale.customer_telegram && (
                            <p className="text-xs text-green-400 flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {sale.customer_telegram}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            sale.status === "confirmed"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {sale.status === "confirmed" ? "Confirmée" : "En attente"}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium text-green-400">+{sale.commission_amount.toFixed(2)}€</p>
                          <p className="text-sm text-slate-400">{affiliateCode === "$0" ? "Revenus" : "Commission"}</p>
                        </div>
                        {affiliateCode === "$0" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setDeleteSaleDialog({
                                open: true,
                                saleId: sale.id,
                                saleInfo: `${sale.plan_type} - ${sale.affiliate_code} - ${sale.commission_amount.toFixed(2)}€`,
                              })
                            }
                            className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-400 hover:text-red-300 transition-all duration-300"
                            disabled={loading}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredSales.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-400 text-lg font-medium">Aucune vente pour le moment</p>
                      <p className="text-slate-500 text-sm">L'historique de vos ventes apparaîtra ici</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            {/* Affiliate Tools */}
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-white">Outils de Promotion</CardTitle>
                <CardDescription className="text-slate-400">
                  Ressources pour promouvoir ThreadsAuto avec votre code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-white">Votre Code d'Affiliation</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      value={affiliateCode}
                      readOnly
                      className="font-mono bg-slate-800/50 border-slate-600 text-white"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(affiliateCode)}
                      className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">Vos clients doivent mentionner ce code lors de l'achat</p>
                </div>

                <div>
                  <Label className="text-base font-medium text-white">Lien d'Affiliation Principal</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      value={`https://threadsposter.vercel.app/?ref=${affiliateCode}`}
                      readOnly
                      className="font-mono text-sm bg-slate-800/50 border-slate-600 text-white"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`https://threadsposter.vercel.app/?ref=${affiliateCode}`)}
                      className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">Lien principal avec tracking automatique</p>
                </div>

                <div className="border-t border-slate-600/50 pt-6">
                  <Label className="text-base font-medium text-white">Instructions pour vos Clients</Label>
                  <div className="mt-2 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 backdrop-blur-sm">
                    <p className="text-sm text-blue-300">
                      <strong>Comment utiliser votre code :</strong>
                      <br />
                      1. Cliquez sur votre lien d'affiliation
                      <br />
                      2. Le code {affiliateCode} sera automatiquement détecté
                      <br />
                      3. Lors de l'achat sur Telegram, mentionnez le code {affiliateCode}
                      <br />
                      4. Vous recevrez votre commission une fois la vente confirmée !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            {/* Admin Section */}
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-white">Administration</CardTitle>
                <CardDescription className="text-slate-400">
                  Gestion des partenaires et des candidatures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="partners" className="space-y-4">
                  <TabsList className="bg-slate-800/50 border-slate-600/50 backdrop-blur-md">
                    <TabsTrigger
                      value="partners"
                      className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
                    >
                      Partenaires
                    </TabsTrigger>
                    <TabsTrigger
                      value="applications"
                      className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
                    >
                      Candidatures
                    </TabsTrigger>
                    <TabsTrigger
                      value="add-sale"
                      className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
                    >
                      Ajouter Vente
                    </TabsTrigger>
                    <TabsTrigger
                      value="create-partner"
                      className="data-[state=active]:bg-slate-700/70 data-[state=active]:text-white text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/30"
                    >
                      Créer Partenaire
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="partners" className="space-y-4">
                    <PartnersList />
                  </TabsContent>

                  <TabsContent value="applications" className="space-y-4">
                    <ApplicationsList />
                  </TabsContent>

                  <TabsContent value="add-sale" className="space-y-4">
                    <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
                      <CardHeader>
                        <CardTitle className="text-white">Ajouter une Vente Manuellement</CardTitle>
                        <CardDescription className="text-slate-400">
                          Pour les ventes hors système de tracking
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleAddSale} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="partner-code" className="text-white">
                                Code Partenaire
                              </Label>
                              <Select
                                value={newSale.partnerCode}
                                onValueChange={(value) => setNewSale({ ...newSale, partnerCode: value })}
                              >
                                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                                  <SelectValue placeholder="Sélectionner un partenaire" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                  <SelectItem value="$0" className="text-white hover:bg-slate-700">
                                    $0 - Admin Principal
                                  </SelectItem>
                                  {allAffiliates
                                    .filter((a) => a.code !== "$0")
                                    .map((affiliate) => (
                                      <SelectItem
                                        key={affiliate.code}
                                        value={affiliate.code}
                                        className="text-white hover:bg-slate-700"
                                      >
                                        {affiliate.code} - {affiliate.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="product" className="text-white">
                                Type de Plan
                              </Label>
                              <Select
                                value={newSale.product}
                                onValueChange={(value) => setNewSale({ ...newSale, product: value })}
                              >
                                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                                  <SelectValue placeholder="Sélectionner un plan" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                  <SelectItem value="1 Mois" className="text-white hover:bg-slate-700">
                                    1 Mois (99€)
                                  </SelectItem>
                                  <SelectItem value="3 Mois" className="text-white hover:bg-slate-700">
                                    3 Mois (267€)
                                  </SelectItem>
                                  <SelectItem value="Lifetime" className="text-white hover:bg-slate-700">
                                    Lifetime (750€)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="customer-email" className="text-white">
                              Email du Client
                            </Label>
                            <Input
                              id="customer-email"
                              type="email"
                              placeholder="email@example.com"
                              value={newSale.customerEmail}
                              onChange={(e) => setNewSale({ ...newSale, customerEmail: e.target.value })}
                              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="customer-telegram" className="text-white">
                              Telegram du Client
                            </Label>
                            <Input
                              id="customer-telegram"
                              placeholder="@telegram"
                              value={newSale.customerTelegram}
                              onChange={(e) => setNewSale({ ...newSale, customerTelegram: e.target.value })}
                              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0"
                            disabled={loading}
                          >
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Ajouter la Vente
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="create-partner" className="space-y-4">
                    <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50">
                      <CardHeader>
                        <CardTitle className="text-white">Créer un Nouveau Partenaire</CardTitle>
                        <CardDescription className="text-slate-400">
                          Ajouter un nouveau partenaire manuellement
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <CreatePartnerForm
                          newPartner={newPartner}
                          setNewPartner={setNewPartner}
                          loading={loading}
                          setLoading={setLoading}
                          setError={setError}
                          setAllAffiliates={setAllAffiliates}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogues de confirmation */}
        <ConfirmationDialog
          open={deletePartnerDialog.open}
          onOpenChange={(open) => setDeletePartnerDialog({ ...deletePartnerDialog, open })}
          title="Supprimer le partenaire"
          description={`Êtes-vous sûr de vouloir supprimer définitivement le partenaire "${deletePartnerDialog.partnerName}" (${deletePartnerDialog.partnerCode}) ?

Cette action est irréversible et supprimera aussi toutes ses ventes associées.`}
          confirmText="Supprimer définitivement"
          cancelText="Annuler"
          variant="destructive"
          onConfirm={handleDeletePartner}
        />

        <ConfirmationDialog
          open={deleteSaleDialog.open}
          onOpenChange={(open) => setDeleteSaleDialog({ ...deleteSaleDialog, open })}
          title="Supprimer la vente"
          description={`Êtes-vous sûr de vouloir supprimer définitivement cette vente ?

${deleteSaleDialog.saleInfo}

Cette action est irréversible.`}
          confirmText="Supprimer définitivement"
          cancelText="Annuler"
          variant="destructive"
          onConfirm={handleDeleteSale}
        />
      </div>
    </div>
  )
}

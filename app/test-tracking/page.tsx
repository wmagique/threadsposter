"use client"

import { Suspense, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAffiliateTracking } from "@/hooks/use-affiliate-tracking"

function TestTrackingContent() {
  const { affiliateCode } = useAffiliateTracking()
  const [recentClicks, setRecentClicks] = useState([])
  const [loading, setLoading] = useState(false)

  const loadRecentClicks = async () => {
    setLoading(true)
    try {
      // Simuler un appel pour récupérer les clics récents
      // En production, vous pourriez créer une API pour ça
      const response = await fetch("/api/recent-clicks")
      if (response.ok) {
        const data = await response.json()
        setRecentClicks(data)
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const testClick = async () => {
    try {
      await fetch("/api/track-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          affiliate_code: "TEST123",
          referrer: "test-manual",
        }),
      })
      alert("Clic de test enregistré !")
      loadRecentClicks()
    } catch (error) {
      alert("Erreur lors du test")
    }
  }

  useEffect(() => {
    loadRecentClicks()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🧪 Test de Tracking d'Affiliation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Code détecté :</p>
              {affiliateCode ? (
                <Badge className="bg-green-100 text-green-800">{affiliateCode} ✅</Badge>
              ) : (
                <Badge variant="secondary">Aucun code détecté</Badge>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Liens de test :</p>
              <div className="space-y-1 text-sm">
                <a href="?ref=TEST123" className="block text-blue-600 hover:underline">
                  🔗 https://threadsposter.vercel.app/test-tracking?ref=TEST123
                </a>
                <a href="?ref=PARTNER1" className="block text-blue-600 hover:underline">
                  🔗 https://threadsposter.vercel.app/test-tracking?ref=PARTNER1
                </a>
              </div>
            </div>

            <Button onClick={testClick} className="w-full">
              🧪 Tester un Clic Manuel
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 Instructions de Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">1. Test avec lien d'affiliation :</p>
                <p className="text-gray-600">Cliquez sur un des liens ci-dessus et vérifiez que le code est détecté</p>
              </div>

              <div>
                <p className="font-medium">2. Vérification en base :</p>
                <p className="text-gray-600">Allez dans Supabase → Table "clicks" pour voir les nouveaux clics</p>
              </div>

              <div>
                <p className="font-medium">3. Dashboard partenaire :</p>
                <p className="text-gray-600">Connectez-vous avec le code TEST123 pour voir les statistiques</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">✅ Comportement attendu :</p>
                <ul className="text-blue-700 text-xs space-y-1 mt-1">
                  <li>• Clic sur lien → Code stocké dans localStorage</li>
                  <li>• Appel automatique à /api/track-click</li>
                  <li>• Insertion dans table "clicks"</li>
                  <li>• Mise à jour des stats dans le dashboard</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function TestTrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <TestTrackingContent />
    </Suspense>
  )
}

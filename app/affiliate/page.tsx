"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Gift, ArrowLeft, Loader2, CheckCircle, AlertCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-slate-700 bg-slate-800/80 backdrop-blur-sm shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:bg-slate-750/80 hover:border-blue-500/50 group cursor-pointer">
      <CardHeader onClick={() => setIsOpen(!isOpen)} className="cursor-pointer select-none">
        <CardTitle className="text-lg text-slate-100 group-hover:text-blue-300 transition-colors duration-300 flex items-center justify-between">
          {question}
          <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>▼</span>
        </CardTitle>
      </CardHeader>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <CardContent className="pt-0">
          <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">{answer}</p>
        </CardContent>
      </div>
    </Card>
  )
}

// Composant pour les icônes Discord (Lucide n'a pas d'icône Discord native)
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export default function AffiliatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    audience: "",
    motivation: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [displayedText, setDisplayedText] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fullText = "Gagnez de l'argent avec ThreadsAuto"

  // Animation de machine à écrire
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Effet de lueur de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website,
          audience_size: formData.audience,
          motivation: formData.motivation,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          website: "",
          audience: "",
          motivation: "",
        })
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erreur lors de l'envoi de la candidature")
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden">
        {/* Effet de lueur de la souris */}
        <div
          className="pointer-events-none fixed inset-0 z-30 transition duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />

        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md text-center bg-slate-800 border-slate-700 text-slate-100 relative z-40">
            <CardHeader>
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl text-green-400">Candidature envoyée !</CardTitle>
              <CardDescription className="text-slate-300">
                Merci pour votre candidature. Nous examinerons votre demande et vous contacterons sous 48h.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-sm text-slate-200">
                    <strong>Prochaines étapes :</strong>
                    <br />
                    1. Notre équipe examine votre candidature
                    <br />
                    2. Vous recevrez une réponse par email
                    <br />
                    3. Si approuvé, vous recevrez votre code partenaire
                  </p>
                </div>
                <p className="text-sm text-slate-300">
                  En attendant, vous pouvez nous contacter directement sur Telegram pour toute question.
                </p>
                <Button
                  onClick={() => window.open("https://t.me/zmagique", "_blank")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Contacter sur Telegram
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-700">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer avec logos sociaux */}
        <footer className="relative z-40 border-t border-slate-700 bg-slate-800/80 backdrop-blur-sm py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center space-x-8">
              <button
                onClick={() => window.open("https://t.me/ofmssolution", "_blank")}
                className="group flex items-center space-x-3 px-6 py-3 bg-slate-700/50 hover:bg-blue-600/20 border border-slate-600 hover:border-blue-500/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <MessageCircle className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <span className="text-slate-200 group-hover:text-blue-300 font-medium transition-colors duration-300">
                  Telegram
                </span>
              </button>

              <button
                onClick={() => window.open("https://discord.gg/ofmsolution", "_blank")}
                className="group flex items-center space-x-3 px-6 py-3 bg-slate-700/50 hover:bg-indigo-600/20 border border-slate-600 hover:border-indigo-500/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <DiscordIcon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                <span className="text-slate-200 group-hover:text-indigo-300 font-medium transition-colors duration-300">
                  Discord
                </span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden flex flex-col">
      {/* Effet de lueur de la souris */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm relative z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-slate-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-700">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 relative z-40">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-900/30 text-green-400 hover:bg-green-900/50">💰 Programme Partenaire</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 min-h-[4rem] flex items-center justify-center">
              <span
                className="bg-gradient-to-r from-green-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent font-extrabold"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
                }}
              >
                {displayedText}
                <span className="animate-pulse text-blue-400 ml-1">|</span>
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Rejoignez notre programme d'affiliation et gagnez 10% de commission sur chaque vente que vous générez
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-slate-700 bg-slate-800/80 backdrop-blur-sm shadow-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-slate-750/80 hover:border-green-500/50 group cursor-pointer">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-green-300" />
                <CardTitle className="text-slate-100 group-hover:text-green-300 transition-colors duration-300">
                  10% de Commission
                </CardTitle>
                <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                  Gagnez 10% sur chaque vente générée avec votre code unique
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-slate-700 bg-slate-800/80 backdrop-blur-sm shadow-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-slate-750/80 hover:border-blue-500/50 group cursor-pointer">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-300" />
                <CardTitle className="text-slate-100 group-hover:text-blue-300 transition-colors duration-300">
                  Suivi en Temps Réel
                </CardTitle>
                <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                  Dashboard complet pour suivre vos ventes, commissions et performances
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-slate-700 bg-slate-800/80 backdrop-blur-sm shadow-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-slate-750/80 hover:border-purple-500/50 group cursor-pointer">
              <CardHeader>
                <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-300" />
                <CardTitle className="text-slate-100 group-hover:text-purple-300 transition-colors duration-300">
                  Bonus & Récompenses
                </CardTitle>
                <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                  Débloquez des bonus exclusifs en atteignant certains objectifs de vente
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Commission Structure */}
          <Card className="mb-16 border-slate-700 bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-slate-750/80 hover:border-blue-500/50 group cursor-pointer">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100 group-hover:text-blue-300 transition-colors duration-300">
                Structure des Commissions
              </CardTitle>
              <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                Commission fixe de 10% sur toutes les ventes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-700/30 rounded-lg border-2 border-slate-600 col-span-3 transition-all duration-300 group-hover:bg-slate-600/40 group-hover:border-blue-400/50">
                  <div className="text-2xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    Commission Standard
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors duration-300 group-hover:scale-110 transform">
                    10%
                  </div>
                  <div className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                    Sur toutes vos ventes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card className="max-w-2xl mx-auto border-slate-700 bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:bg-slate-750/80 hover:border-green-500/50">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100">Devenir Partenaire</CardTitle>
              <CardDescription className="text-slate-300">
                Remplissez ce formulaire pour rejoindre notre programme d'affiliation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-md flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-200">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-slate-700/80 backdrop-blur-sm border-slate-600 text-slate-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:bg-slate-600/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-slate-700/80 backdrop-blur-sm border-slate-600 text-slate-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:bg-slate-600/80"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-slate-200">
                    Site web / Réseaux sociaux
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="bg-slate-700/80 backdrop-blur-sm border-slate-600 text-slate-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:bg-slate-600/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-slate-200">
                    Taille de votre audience *
                  </Label>
                  <Input
                    id="audience"
                    placeholder="Ex: 10k followers Instagram, 5k abonnés YouTube..."
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    required
                    className="bg-slate-700/80 backdrop-blur-sm border-slate-600 text-slate-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:bg-slate-600/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation" className="text-slate-200">
                    Pourquoi voulez-vous promouvoir ThreadsAuto ? *
                  </Label>
                  <Textarea
                    id="motivation"
                    placeholder="Parlez-nous de votre motivation et de votre stratégie de promotion..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    required
                    className="bg-slate-700/80 backdrop-blur-sm border-slate-600 text-slate-100 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:bg-slate-600/80"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer ma candidature"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-100">Questions Fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  question: "Comment fonctionne le processus de candidature ?",
                  answer:
                    "Après avoir soumis votre candidature, notre équipe l'examine sous 48h. Si elle est approuvée, vous recevrez un email avec votre code partenaire unique et l'accès à votre dashboard.",
                },
                {
                  question: "Comment fonctionne le système de codes ?",
                  answer:
                    "Une fois accepté, vous recevrez un code unique que vos clients devront saisir lors de l'achat. Toutes les ventes avec votre code vous rapporteront une commission de 10%.",
                },
                {
                  question: "Quand suis-je payé ?",
                  answer:
                    "Les commissions sont versées le 15 de chaque mois pour les ventes du mois précédent, avec un minimum de 50€ de commissions accumulées.",
                },
                {
                  question: "Puis-je suivre mes performances ?",
                  answer:
                    "Oui ! Vous aurez accès à un dashboard complet où vous pourrez voir en temps réel vos ventes, commissions, et statistiques détaillées.",
                },
              ].map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer avec logos sociaux */}
      <footer className="relative z-40 border-t border-slate-700 bg-slate-800/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8">
            <button
              onClick={() => window.open("https://t.me/ofmssolution", "_blank")}
              className="group flex items-center space-x-3 px-6 py-3 bg-slate-700/50 hover:bg-blue-600/20 border border-slate-600 hover:border-blue-500/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <MessageCircle className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              <span className="text-slate-200 group-hover:text-blue-300 font-medium transition-colors duration-300">
                Telegram
              </span>
            </button>

            <button
              onClick={() => window.open("https://discord.gg/ofmsolution", "_blank")}
              className="group flex items-center space-x-3 px-6 py-3 bg-slate-700/50 hover:bg-indigo-600/20 border border-slate-600 hover:border-indigo-500/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <DiscordIcon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
              <span className="text-slate-200 group-hover:text-indigo-300 font-medium transition-colors duration-300">
                Discord
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

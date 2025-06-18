"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Users, BarChart3, Chrome, ArrowRight } from "lucide-react"
import { useAffiliateTracking } from "@/hooks/use-affiliate-tracking"

// Composant pour l'animation de texte qui s'écrit
function TypewriterText({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}

// Composant pour l'icône Discord
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

// Composant pour l'icône Telegram
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function HomePageContent() {
  const { affiliateCode, isClient } = useAffiliateTracking()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Effet pour suivre la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Curseur lumineux */}
      <div
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-15 blur-3xl transition-all duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

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
      <header className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Chrome className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ThreadsAuto
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-slate-400 hover:text-white transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">
              Prix
            </Link>
            <Link href="/affiliate" className="text-slate-400 hover:text-white transition-colors">
              Partenaires
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Notification d'affiliation */}
      {isClient && affiliateCode && (
        <div className="bg-blue-500/20 border-b border-blue-500/30 py-2 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-blue-300 text-sm">
              🎉 Vous bénéficiez d'une offre partenaire avec le code{" "}
              <strong className="text-blue-200">{affiliateCode}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/20">
            🚀 Extension Chrome #1 pour Threads
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <TypewriterText text="Automatisez vos posts Threads" speed={80} />
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Gagnez du temps et boostez votre présence sur Threads avec notre extension qui automatise vos publications
            et optimise votre engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border-0"
              onClick={() =>
                window.open(
                  "https://chromewebstore.google.com/detail/threads-poster/ifiegjcgjifipahaeociekpddlhbeaec?hl=fr",
                  "_blank",
                )
              }
            >
              <Chrome className="w-5 h-5 mr-2" />
              Installer l'extension
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://youtu.be/fvvqwHx2uM8", "_blank")}
            >
              Voir la démo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Fonctionnalités puissantes</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Découvrez comment ThreadsAuto révolutionne votre stratégie de contenu sur Threads
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-2 group hover:shadow-lg hover:shadow-blue-500/10">
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="group-hover:text-blue-400 transition-colors duration-300 text-white">
                  Automatisation intelligente
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Programmez vos posts à l'avance et laissez l'IA optimiser vos horaires de publication
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-2 group hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="group-hover:text-purple-400 transition-colors duration-300 text-white">
                  Gestion multi-comptes
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Gérez plusieurs comptes Threads simultanément depuis une seule interface
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:bg-slate-700/30 hover:border-green-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-2 group hover:shadow-lg hover:shadow-green-500/10">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="group-hover:text-green-400 transition-colors duration-300 text-white">
                  Analytics avancées
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Suivez vos performances et optimisez votre stratégie avec des données précises
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Tarifs simples et transparents</h2>
            <p className="text-slate-400">Choisissez le plan qui correspond à vos besoins</p>
            {isClient && affiliateCode && (
              <div className="mt-4 p-3 bg-green-500/20 rounded-lg inline-block border border-green-500/30 backdrop-blur-sm">
                <p className="text-green-300 font-medium">
                  🎉 Code partenaire actif : <span className="font-mono text-green-200">{affiliateCode}</span>
                </p>
                <p className="text-green-400 text-sm">Mentionnez ce code lors de votre achat !</p>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-600/50 hover:border-blue-500/70 transition-all duration-500 hover:scale-110 hover:z-20 relative hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-4 group">
              <CardHeader>
                <CardTitle className="text-white group-hover:text-blue-300 transition-colors duration-300">
                  1 Mois
                </CardTitle>
                <div className="text-3xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                  99€<span className="text-lg font-normal text-slate-400 group-hover:text-blue-400">/mois</span>
                </div>
                <CardDescription className="text-slate-400 group-hover:text-blue-300 transition-colors duration-300">
                  Parfait pour tester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Accès complet à l'extension
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Posts automatisés illimités
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Support client
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 group-hover:shadow-xl group-hover:shadow-blue-500/40"
                  onClick={() => {
                    const message = affiliateCode
                      ? `Bonjour ! Je souhaite acheter le plan 1 Mois avec le code partenaire ${affiliateCode}`
                      : "Bonjour ! Je souhaite acheter le plan 1 Mois"
                    window.open(`https://t.me/zmagique?text=${encodeURIComponent(message)}`, "_blank")
                  }}
                >
                  Choisir 1 Mois
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/50 relative hover:border-blue-400/90 transition-all duration-500 hover:scale-110 hover:z-20 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-4 group">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500/80 text-white border-0 group-hover:bg-blue-400 group-hover:scale-110 transition-all duration-300">
                Populaire
              </Badge>
              <CardHeader>
                <CardTitle className="text-white group-hover:text-blue-200 transition-colors duration-300">
                  3 Mois
                </CardTitle>
                <div className="text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                  267€<span className="text-lg font-normal text-slate-400 group-hover:text-blue-300">/3 mois</span>
                </div>
                <CardDescription className="text-slate-400 group-hover:text-blue-300 transition-colors duration-300">
                  Économisez 31€
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Accès complet à l'extension
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Posts automatisés illimités
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Support prioritaire
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Mises à jour gratuites
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border-0 group-hover:shadow-xl group-hover:shadow-blue-500/50"
                  onClick={() => {
                    const message = affiliateCode
                      ? `Bonjour ! Je souhaite acheter le plan 3 Mois avec le code partenaire ${affiliateCode}`
                      : "Bonjour ! Je souhaite acheter le plan 3 Mois"
                    window.open(`https://t.me/zmagique?text=${encodeURIComponent(message)}`, "_blank")
                  }}
                >
                  Choisir 3 Mois
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-md border-purple-500/50 relative hover:border-purple-400/90 transition-all duration-500 hover:scale-110 hover:z-20 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-4 group">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500/80 text-white border-0 group-hover:bg-purple-400 group-hover:scale-110 transition-all duration-300">
                Meilleur Prix
              </Badge>
              <CardHeader>
                <CardTitle className="text-white group-hover:text-purple-200 transition-colors duration-300">
                  Lifetime
                </CardTitle>
                <div className="text-3xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                  750€<span className="text-lg font-normal text-slate-400 group-hover:text-purple-300">/à vie</span>
                </div>
                <CardDescription className="text-slate-400 group-hover:text-purple-300 transition-colors duration-300">
                  Accès à vie - Plus jamais de paiement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Accès à vie à l'extension
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Toutes les futures mises à jour
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Support VIP à vie
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300" />
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      Fonctionnalités exclusives
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 border-0 group-hover:shadow-xl group-hover:shadow-purple-500/50"
                  onClick={() => {
                    const message = affiliateCode
                      ? `Bonjour ! Je souhaite acheter le plan Lifetime avec le code partenaire ${affiliateCode}`
                      : "Bonjour ! Je souhaite acheter le plan Lifetime"
                    window.open(`https://t.me/zmagique?text=${encodeURIComponent(message)}`, "_blank")
                  }}
                >
                  Choisir Lifetime
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Prêt à automatiser votre présence sur Threads ?
          </h2>
          <p className="text-xl mb-8 text-slate-300">
            Rejoignez des milliers de créateurs qui font confiance à ThreadsAuto
          </p>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25 border-0"
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/threads-poster/ifiegjcgjifipahaeociekpddlhbeaec?hl=fr",
                "_blank",
              )
            }
          >
            <Chrome className="w-5 h-5 mr-2" />
            Installer maintenant - Gratuit
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/50 backdrop-blur-md text-white py-12 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Chrome className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ThreadsAuto
                </span>
              </div>
              <p className="text-slate-400">L'extension Chrome qui révolutionne votre stratégie Threads</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Produit</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Prix
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ofmautomatisation.gitbook.io/ofmautomatisation-docs/"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate" className="hover:text-white transition-colors">
                    Programme partenaire
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Légal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            {/* NOUVELLE SECTION RÉSEAUX SOCIAUX */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Communauté</h3>
              <div className="space-y-3">
                <a
                  href="https://discord.gg/ofmsolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-400 hover:text-indigo-400 transition-colors duration-300 group"
                >
                  <DiscordIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Discord</span>
                </a>
                <a
                  href="https://t.me/ofmssolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-400 hover:text-blue-400 transition-colors duration-300 group"
                >
                  <TelegramIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ThreadsAuto. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-white">Chargement...</div>
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  )
}

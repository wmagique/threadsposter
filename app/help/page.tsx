"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Book, Video } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Centre d'Aide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur ThreadsAuto
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Book className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Guide complet d'utilisation</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open("https://ofmautomatisation.gitbook.io/ofmautomatisation-docs/", "_blank")}
              >
                Consulter
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Video className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Tutoriels Vidéo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Apprenez en regardant</p>
              <Button variant="outline" className="w-full">
                Voir les vidéos
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Chat Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Assistance en temps réel</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open("https://t.me/zmagique", "_blank")}
              >
                Ouvrir le chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comment installer l'extension ThreadsAuto ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  1. Rendez-vous sur le Chrome Web Store
                  <br />
                  2. Recherchez "ThreadsAuto" ou utilisez notre lien direct
                  <br />
                  3. Cliquez sur "Ajouter à Chrome"
                  <br />
                  4. Confirmez l'installation
                  <br />
                  5. L'extension apparaîtra dans votre barre d'outils Chrome
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comment programmer mes posts ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Une fois l'extension installée, cliquez sur l'icône ThreadsAuto dans votre navigateur. Vous pourrez
                  alors créer vos posts, définir les horaires de publication et laisser l'extension s'occuper du reste
                  automatiquement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>L'extension fonctionne-t-elle sur mobile ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  ThreadsAuto est une extension Chrome conçue pour les navigateurs desktop. Elle ne fonctionne pas sur
                  les navigateurs mobiles. Cependant, vos posts programmés continueront à être publiés même si vous
                  fermez votre ordinateur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Puis-je utiliser ThreadsAuto sur plusieurs comptes ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Oui ! ThreadsAuto supporte la gestion de plusieurs comptes Threads. Vous pouvez facilement basculer
                  entre vos différents comptes et programmer des posts pour chacun d'eux depuis la même interface.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mes données sont-elles sécurisées ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolument. ThreadsAuto ne stocke aucune de vos données personnelles sur nos serveurs. Toutes vos
                  informations restent localement sur votre navigateur. Nous respectons strictement votre vie privée et
                  la sécurité de vos données.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h3>
          <p className="text-gray-600 mb-6">Notre équipe support est là pour vous aider</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.open("https://t.me/zmagique", "_blank")}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Contacter le Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

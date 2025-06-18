import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Politique de Confidentialité</h1>
          <p className="text-xl text-gray-600">Dernière mise à jour : 15 janvier 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">1. Collecte des Informations</h2>
            <p className="mb-6">
              ThreadsAuto collecte uniquement les informations nécessaires au fonctionnement du service :
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Informations de compte (nom, email) pour la gestion des abonnements</li>
              <li>Données d'utilisation anonymisées pour améliorer le service</li>
              <li>Informations de paiement (traitées par des tiers sécurisés)</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">2. Utilisation des Données</h2>
            <p className="mb-6">Nous utilisons vos informations pour :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Fournir et maintenir notre service</li>
              <li>Traiter les paiements et gérer les abonnements</li>
              <li>Communiquer avec vous concernant le service</li>
              <li>Améliorer nos fonctionnalités</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">3. Stockage des Données</h2>
            <p className="mb-6">
              ThreadsAuto ne stocke PAS vos données de contenu Threads sur nos serveurs. Toutes vos publications et
              informations personnelles restent localement dans votre navigateur.
            </p>

            <h2 className="text-2xl font-bold mb-4">4. Partage des Informations</h2>
            <p className="mb-6">
              Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons
              partager des informations uniquement :
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Avec votre consentement explicite</li>
              <li>Pour se conformer aux obligations légales</li>
              <li>Avec nos prestataires de services (paiement, hébergement)</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">5. Sécurité</h2>
            <p className="mb-6">
              Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations contre l'accès
              non autorisé, la modification, la divulgation ou la destruction.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
            <p className="mb-6">
              ThreadsAuto utilise des cookies essentiels pour le fonctionnement du service. Aucun cookie de suivi
              publicitaire n'est utilisé.
            </p>

            <h2 className="text-2xl font-bold mb-4">7. Vos Droits</h2>
            <p className="mb-6">Vous avez le droit de :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Accéder à vos données personnelles</li>
              <li>Corriger des informations inexactes</li>
              <li>Demander la suppression de vos données</li>
              <li>Retirer votre consentement à tout moment</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
            <p className="mb-6">
              Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits,
              contactez-nous via Telegram : @zmagique
            </p>

            <h2 className="text-2xl font-bold mb-4">9. Modifications</h2>
            <p className="mb-6">
              Cette politique peut être mise à jour périodiquement. Nous vous informerons de tout changement
              significatif.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

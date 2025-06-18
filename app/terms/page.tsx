import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conditions Générales d'Utilisation</h1>
          <p className="text-xl text-gray-600">OFM SOLUTION - Dernière mise à jour : 15 janvier 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="mb-6 text-lg font-medium">
              Bienvenue sur ThreadsAuto par OFM SOLUTION. En accédant à ce service, vous acceptez automatiquement ces
              conditions. Merci de les lire attentivement.
            </p>

            <h2 className="text-2xl font-bold mb-4">Politique de Confidentialité</h2>
            <p className="mb-4">
              Les présentes CGU définissent les droits et obligations respectifs du Prestataire et du Client, les
              modalités de souscription et d'utilisation des Services, ainsi que les responsabilités de chacune des
              parties.
            </p>
            <p className="mb-4">
              Le Prestataire peut modifier à tout moment les CGU, notamment pour se conformer à la réglementation en
              vigueur ou adapter les Services. Toute modification entre en vigueur dès sa mise en ligne. Le Client est
              invité à consulter régulièrement les CGU.
            </p>
            <p className="mb-4">
              Le Client est seul responsable de vérifier si l'usage des Services est compatible avec les conditions
              d'utilisation des logiciels tiers utilisés. Le Prestataire décline toute responsabilité en cas de sanction
              liée à une utilisation non autorisée.
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Aucune donnée personnelle n'est collectée hors Discord.</li>
              <li>Vos logs de commandes peuvent être conservés pour des raisons de suivi ou de support.</li>
              <li>
                Ces données restent strictement confidentielles et accessibles uniquement par l'équipe OFM SOLUTION.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Achats & Remboursement</h2>
            <p className="mb-4">
              Les présentes CGU sont régies par la loi française. En cas de litige relatif à l'interprétation ou à
              l'exécution des présentes CGU, les parties s'engagent à rechercher une solution amiable avant toute action
              judiciaire.
            </p>
            <p className="mb-4">
              À défaut d'accord amiable, le litige sera porté devant les tribunaux compétents du ressort du Prestataire,
              sauf dispositions légales contraires.
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Les tarifs sont indiqués en euros TTC avant chaque achat.</li>
              <li>
                Le Prestataire se réserve le droit de modifier ses prix ou d'appliquer des promotions, sans effet
                rétroactif.
              </li>
              <li>
                <strong>Aucune rétractation n'est possible après achat d'un ou des services.</strong>
              </li>
              <li>En cas de problème technique, le support est là pour vous aider.</li>
              <li>
                En cas de non-respect des CGU, vos droits d'accès à OFM SOLUTION peuvent être suspendus sans
                compensation.
              </li>
            </ul>

            <p className="mb-4">
              Le Prestataire se réserve le droit de suspendre ou de résilier l'accès du Client aux Services, de manière
              temporaire ou définitive, sans préavis, en cas de :
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>violation manifeste des présentes CGU,</li>
              <li>comportement frauduleux ou malveillant,</li>
              <li>tentative de contournement des protections techniques,</li>
              <li>non-paiement des sommes dues.</li>
            </ul>

            <p className="mb-6">
              <strong>
                En cas de résiliation par le Client, aucun remboursement ne sera effectué, sauf accord exceptionnel du
                Prestataire.
              </strong>
            </p>
            <p className="mb-6">
              <strong>Si vous quittez le serveur sans preuve d'achat, aucun remboursement ne sera possible.</strong>
            </p>

            <h2 className="text-2xl font-bold mb-4">Support & Contact</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Évitez de contacter les membres du staff en message privé sans autorisation.</li>
              <li>Les réponses peuvent prendre un peu de temps selon la disponibilité de l'équipe.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Non-respect du TOS</h2>
            <p className="mb-4">Tout manquement peut entraîner :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>La suspension ou suppression de vos accès aux produits.</li>
              <li>Un bannissement temporaire ou permanent du serveur.</li>
              <li>
                <strong>Aucune compensation ni remboursement ne sera accordé.</strong>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Obligation du client</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Il est interdit de tenter d'analyser, de désassembler, de décompiler ou de reproduire les Services.
              </li>
              <li>Toute tentative de revente, de partage ou d'achat via des tiers non autorisés est interdite.</li>
              <li>
                Le Client s'engage à conserver ses identifiants de connexion confidentiels. Toute utilisation
                frauduleuse sera de sa responsabilité.
              </li>
              <li>
                En cas de comportement ou d'utilisation frauduleuse compromettant la sécurité du service, le Prestataire
                pourra suspendre le compte concerné. Le Client ne pourra contester cette suspension que par voie de
                réclamation motivée.
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="font-medium">
                En utilisant ThreadsAuto, vous acceptez automatiquement ces conditions. Elles peuvent être modifiées à
                tout moment. Merci de rester attentif aux mises à jour.
              </p>
            </div>

            <p className="text-center text-gray-600 font-medium">©2025 OFM SOLUTION – Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

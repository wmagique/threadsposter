"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export function useAffiliateTracking() {
  const searchParams = useSearchParams()
  const [affiliateCode, setAffiliateCode] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const refCode = searchParams.get("ref")

    if (refCode) {
      // Stocker le code d'affiliation dans localStorage
      localStorage.setItem("affiliate_code", refCode.toUpperCase())
      setAffiliateCode(refCode.toUpperCase())

      // Enregistrer le clic
      trackClick(refCode.toUpperCase())

      // Nettoyer l'URL (optionnel)
      const url = new URL(window.location.href)
      url.searchParams.delete("ref")
      window.history.replaceState({}, "", url.toString())
    } else {
      // Vérifier s'il y a un code stocké
      const storedCode = localStorage.getItem("affiliate_code")
      if (storedCode) {
        setAffiliateCode(storedCode)
      }
    }
  }, [searchParams, isClient])

  const trackClick = async (code: string) => {
    try {
      await fetch("/api/track-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          affiliate_code: code,
          referrer: document.referrer || "direct",
        }),
      })
    } catch (error) {
      console.error("Erreur lors du tracking:", error)
    }
  }

  const clearAffiliateCode = () => {
    if (isClient) {
      localStorage.removeItem("affiliate_code")
      setAffiliateCode(null)
    }
  }

  // Fonction utilitaire pour générer les liens d'affiliation
  const generateAffiliateLink = (path = "", code?: string) => {
    const baseUrl = "https://threadsposter.vercel.app"
    const affiliateCodeToUse = code || affiliateCode

    if (affiliateCodeToUse) {
      return `${baseUrl}${path}?ref=${affiliateCodeToUse}`
    }
    return `${baseUrl}${path}`
  }

  return {
    affiliateCode,
    clearAffiliateCode,
    generateAffiliateLink,
    isClient,
  }
}

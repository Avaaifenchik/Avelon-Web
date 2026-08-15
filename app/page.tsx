"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { LocationsStatus } from "@/components/locations-status"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { HeroContainer } from "@/components/hero-container"
import { FoldersAnimation } from "@/components/folders-animation"
import { Testimonials } from "@/components/testimonials"

function HomeContent() {
  const searchParams = useSearchParams()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get('auth') === 'open') {
      setAuthModalOpen(true)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [searchParams])

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#pricing') {
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else if (hash === '#faq') {
      setTimeout(() => {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="landing-page relative min-h-screen overflow-hidden bg-background">
      {/* Background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <line x1="0%" y1="15%" x2="100%" y2="85%" className="stroke-foreground" strokeWidth="1" />
          <line x1="0%" y1="35%" x2="100%" y2="100%" className="stroke-foreground" strokeWidth="1" />
          <line x1="15%" y1="0%" x2="85%" y2="100%" className="stroke-foreground" strokeWidth="1" />
          <line x1="100%" y1="25%" x2="0%" y2="95%" className="stroke-foreground" strokeWidth="1" />
          <line x1="50%" y1="0%" x2="100%" y2="50%" className="stroke-foreground" strokeWidth="1" />
          <line x1="0%" y1="55%" x2="45%" y2="100%" className="stroke-foreground" strokeWidth="1" />
          <line x1="70%" y1="0%" x2="30%" y2="100%" className="stroke-foreground" strokeWidth="1" />
          <line x1="100%" y1="60%" x2="60%" y2="100%" className="stroke-foreground" strokeWidth="1" />
        </svg>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] sm:min-h-screen flex-col items-center justify-center px-3 sm:px-4 pb-4 sm:pb-8 pt-20 sm:pt-24">
        <HeroContainer 
          onPricingClick={scrollToPricing}
          onFeaturesClick={scrollToFeatures}
        />
      </section>

      {/* Features Section вырезано*/}

      <Pricing />

      <section className="py-12 sm:py-20">
        <LocationsStatus />
      </section>

      <section className="py-12 sm:py-20">
        <FAQ />
      </section>

      <Footer />

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onSuccess={() => {
          setAuthModalOpen(false)
          window.location.href = '/client'
        }}
      />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}

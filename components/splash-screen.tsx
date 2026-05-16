"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Vérifier si le splash a déjà été affiché dans cette session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    
    if (!hasSeenSplash) {
      setVisible(true)
      // Démarrer le fondu après 1.2 secondes
      const fadeTimer = setTimeout(() => setFadeOut(true), 1200)
      // Cacher complètement après 1.6 secondes
      const hideTimer = setTimeout(() => {
        setVisible(false)
        sessionStorage.setItem('hasSeenSplash', 'true')
      }, 1600)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [])

  if (!mounted || !visible) return null

  const handleDismiss = () => {
    setFadeOut(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('hasSeenSplash', 'true')
    }, 400)
  }

  return (
    <div
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white cursor-pointer"
      style={{
        transition: "opacity 0.6s ease-out",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* Logo animé */}
      <div
        style={{
          animation: "splashPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo Apple Icon */}
        <div className="w-24 h-24 flex items-center justify-center">
          <Image 
            src="/apple-icon.png" 
            alt="Logo" 
            width={96} 
            height={96} 
            className="object-contain"
            priority
          />
        </div>

        {/* Nom de la marque */}
        <div className="text-center">
          <p className="text-3xl font-black tracking-tight">
            <span className="text-primary">Revo</span><span className="text-accent">tex</span>
          </p>
          <p className="text-black/30 text-sm mt-1 tracking-widest uppercase">
            Premium Store
          </p>
        </div>
      </div>

      {/* Barre de chargement */}
      <div className="absolute bottom-16 w-32 h-0.5 bg-black/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{
            animation: "splashProgress 1.2s ease-out forwards",
          }}
        />
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes splashPop {
          0% { opacity: 0; transform: scale(0.7); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes splashProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

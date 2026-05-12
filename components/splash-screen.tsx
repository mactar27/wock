"use client"

import { useEffect, useState } from "react"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Démarrer le fondu après 1.8 secondes
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800)
    // Cacher complètement après 2.4 secondes
    const hideTimer = setTimeout(() => setVisible(false), 2400)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
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
        {/* Icône W */}
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
          <span
            className="text-black font-black text-5xl"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "-2px" }}
          >
            W
          </span>
        </div>

        {/* Nom de la marque */}
        <div className="text-center">
          <p className="text-white text-3xl font-bold tracking-tight">
            Wocky<span className="text-white/60">Tech</span>
          </p>
          <p className="text-white/40 text-sm mt-1 tracking-widest uppercase">
            Premium Store
          </p>
        </div>
      </div>

      {/* Barre de chargement */}
      <div className="absolute bottom-16 w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full"
          style={{
            animation: "splashProgress 1.8s ease-out forwards",
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

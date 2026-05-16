"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if splash has already been shown in this session
    const splashShown = sessionStorage.getItem("revotex_splash_shown")
    if (splashShown) {
      setIsVisible(false)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem("revotex_splash_shown", "true")
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "circIn" }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          {/* Logo container with pulse animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              opacity: 1,
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              times: [0, 0.6, 1]
            }}
            className="relative"
          >
            <div className="w-40 h-40 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-primary/5">
              <img 
                src="/apple-icon.png" 
                alt="Revotex Logo" 
                className="w-28 h-28 object-contain"
              />
            </div>
            
            {/* Subtle glow effect around the logo */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10"
            />
          </motion.div>

          {/* Minimal loading indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-20 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-1 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full bg-primary"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
              Premium Tech Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

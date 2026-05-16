import Link from "next/link"
import { MapPin, Phone, MessageCircle } from "lucide-react"

const footerLinks = {
  "Boutique": [
    { name: "Laptops", href: "/laptops" },
    { name: "Smartphones", href: "/smartphones" },
    { name: "Accessoires", href: "/accessories" },
  ],
  "Réseaux Sociaux": [
    { name: "Instagram", href: "https://www.instagram.com/revotextech?utm_source=qr&igsh=MTlvemx1d3IxbmowdA==" },
    { name: "TikTok", href: "https://www.tiktok.com/@revotex7?_r=1&_t=ZS-96PhVoZ68Si" },
    { name: "Compte X", href: "https://x.com/NdiayeEl1208" },
    { name: "Facebook", href: "https://www.facebook.com/share/1B88cKBdm5/" },
  ],
  "Support": [
    { name: "WhatsApp", href: "https://wa.me/221785872408" },
    { name: "Mon Compte", href: "#" },
    { name: "Suivi de Commande", href: "#" },
  ],
  "Revotex": [
    { name: "Notre Boutique", href: "#" },
    { name: "Acheter en Ligne", href: "/" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <img src="/apple-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-xl font-black tracking-tight">
                <span className="text-white">Revo</span><span className="text-accent">tex</span>
              </span>
            </Link>
            <p className="mt-6 text-sm text-primary-foreground/60 max-w-xs leading-relaxed">
              Decouvrez les derniers produits Apple avec notre selection premium de Mac, iPhone et accessoires.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Thies, Senegal</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+221 78 587 24 08</span>
              </div>
              <a 
                href="https://wa.me/221785872408" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-accent font-bold hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span>Contactez-nous sur WhatsApp</span>
              </a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{category}</h3>
              <ul className="mt-6 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/60 transition-colors hover:text-accent"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-primary-foreground/40 font-medium">
            © 2026 Revotex Store. Tous droits reserves.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/40">
            <span>Realise par</span>
            <a 
              href="https://wockytech.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline font-bold"
            >
              wockytech.xyz
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

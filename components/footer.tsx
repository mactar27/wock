import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

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
                className="flex items-center gap-3 text-sm text-emerald-400 font-bold hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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

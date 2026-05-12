import Link from "next/link"
import { MapPin } from "lucide-react"

const footerLinks = {
  "Boutique": [
    { name: "Laptops", href: "/laptops" },
    { name: "Smartphones", href: "/smartphones" },
    { name: "Accessoires", href: "/accessories" },
  ],
  "Compte": [
    { name: "Mon Compte", href: "#" },
    { name: "Suivi de Commande", href: "#" },
  ],
  "TechStore": [
    { name: "Notre Boutique", href: "#" },
    { name: "Acheter en Ligne", href: "/" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-semibold tracking-tight text-foreground">TechStore</span>
            </Link>
            <p className="mt-4 text-xs text-muted-foreground max-w-xs">
              Decouvrez les derniers produits Apple avec notre selection premium de Mac, iPhone et accessoires.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Dakar, Senegal</span>
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 TechStore. Tous droits reserves.
          </p>
          <p className="text-xs text-muted-foreground">
            Realise par{" "}
            <a 
              href="https://wockytech.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-medium"
            >
              wockytech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

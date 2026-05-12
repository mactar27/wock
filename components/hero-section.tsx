import Link from "next/link"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  image: string
  primaryLink?: { text: string; href: string }
  secondaryLink?: { text: string; href: string }
  dark?: boolean
}

export function HeroSection({
  title,
  subtitle,
  description,
  image,
  primaryLink,
  secondaryLink,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-12 overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wider uppercase">
            {subtitle}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-primary" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          {description && (
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            {primaryLink && (
              <Link
                href={primaryLink.href}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)]"
              >
                {primaryLink.text}
              </Link>
            )}
            {secondaryLink && (
              <Link
                href={secondaryLink.href}
                className="px-8 py-4 bg-white/5 text-foreground border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                {secondaryLink.text}
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-4"
            priority
          />
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-slate-50 dark:bg-[#02030a] pt-12 pb-8 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo/logo.png" alt="RGI" className="size-10 rounded" />
              <h3 className="text-slate-900 dark:text-white text-xl font-bold">VIHAN 2K26</h3>
            </div>
            <p className="text-slate-500 max-w-sm mb-2">
              The annual cultural and technical festival organised by{' '}
              <a
                href="https://www.rgibhopal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Radharaman Group of Institutes
              </a>
              , Bhopal — bringing together the brightest minds and wildest spirits.
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Radharaman Engineering College • Radharaman Institute of Technology & Science • Radharaman Institute of Research & Technology
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.rgibhopal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#1a1c3a] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-primary transition-colors"
                title="RGI Website"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a
                href="https://www.instagram.com/rgi_bhopal"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#1a1c3a] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-primary transition-colors"
                title="Instagram"
              >
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </a>
              <a
                href="mailto:info@rgibhopal.com"
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#1a1c3a] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-primary transition-colors"
                title="Email Us"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-slate-500">
              <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/events">Events</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/gallery">Gallery</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/register">Register</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/upload">Upload Photos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-slate-500 text-sm">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base mt-0.5 text-primary">location_on</span>
                <span>Radharaman Group of Institutes, Ratibad, Bhopal, MP 462044</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">call</span>
                <a href="tel:+917554005800" className="hover:text-primary transition-colors">+91 755 400 5800</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">mail</span>
                <a href="mailto:info@rgibhopal.com" className="hover:text-primary transition-colors">info@rgibhopal.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">public</span>
                <a href="https://www.rgibhopal.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">www.rgibhopal.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-[#2d1b24] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Vihaan Festival — Radharaman Group of Institutes, Bhopal. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.rgibhopal.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">RGI Bhopal</a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/admin" className="flex items-center gap-1 text-pink-500 font-bold dark:text-amber-300">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

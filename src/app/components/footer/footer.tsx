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
              <Link href="https://www.rgibhopal.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                Radharaman Group of Institutes
              </Link>
              , Bhopal — bringing together the brightest minds and wildest spirits.
            </p>
            <div className="text-xs text-slate-400 mb-6 flex flex-col gap-2">
              <Link href="https://www.rgibhopal.com" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2">
             <p className="hover:text-purple-500 transition-all duration-200">• Radharaman Engineering College</p>                          
             <p className="hover:text-purple-500 transition-all duration-200">• Radharaman Institute of Technology & Science</p>             
             <p className="hover:text-purple-500 transition-all duration-200">• Radharaman Institute of Pharmaceutical Sciences</p> 

              </Link>
              <Link href="https://www.rgibhopal.com" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-2">
             <p className="hover:text-purple-500 transition-all duration-200">• Radharaman College of Pharmacy</p>
             <p className="hover:text-purple-500 transition-all duration-200">• Radharaman Ayurveda Medical College Research Hospital</p>
             <p className="hover:text-purple-500 transition-all duration-200">• Radharaman Institute of Nursing</p>
              </Link>
              </div>
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
          <p>© {new Date().getFullYear()} VIHAN Festival — Radharaman Group of Institutes, Bhopal. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="text-slate-400 dark:text-slate-500">
                Developed by <span className="text-primary font-bold">Ankit Kumar</span>
              </p>
              <div className="flex items-center gap-2.5 ml-1">
                <a 
                  href="https://github.com/Ankit-Kumar-108" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <svg className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/ankit-kumar-98102b24a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#0077b5] transition-colors"
                  title="LinkedIn Profile"
                >
                  <svg className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-4">
            <a href="https://www.rgibhopal.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">RGI Bhopal</a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/admin" className="flex items-center gap-1 text-pink-500 font-bold dark:text-amber-300">Admin Panel</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

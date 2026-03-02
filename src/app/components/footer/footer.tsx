import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-slate-50 dark:bg-[#02030a] pt-12 pb-8 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold">Vihaan 2k26</h3>
                </div>
                <p className="text-slate-500 max-w-sm mb-6">
                  The annual cultural and technical festival that brings together the brightest minds and the wildest spirits.
                </p>
                <div className="flex gap-4">
                  <a className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#1a1c3a] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-primary transition-colors" href="#">
                    <span className="material-symbols-outlined">public</span>
                  </a>
                  <a className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#1a1c3a] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-primary transition-colors" href="#">
                    <span className="material-symbols-outlined">photo_camera</span>
                  </a>
                  <a className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#1a1c3a] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-primary transition-colors" href="#">
                    <span className="material-symbols-outlined">mail</span>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold mb-4">Explore</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a className="hover:text-primary transition-colors" href="#">Events Schedule</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Sponsors</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Campus Ambassadors</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-slate-500">
                  <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Code of Conduct</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-[#2d1b24] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
              <p>© 2026 Vihaan Festival. All rights reserved.</p>
              <Link href={"/admin"} className="flex items-center gap-1 text-pink-500 font-bold dark:text-amber-300">Admin Panel</Link>
            </div>
          </div>
        </footer>
  )
}

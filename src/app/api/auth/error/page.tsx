"use client";
import Link from "next/link";
import Nav from "@/app/components/nav/nav";

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-display">
      <Nav />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
            {/* animeated warninig */}
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse"></div>
            <span className="material-symbols-outlined text-[80px] sm:text-[150px] text-red-500 relative z-10">
              shield_lock
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            RESTRICTED <span className="text-primary">AREA</span>
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
            Sorry, but only authorized organizers can access the Vihan Admin Dashboard. 
            Please contact the technical team if you believe this is a mistake.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-12 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Radharaman Group of Institutes
          </p>
        </div>
      </main>
    </div>
  );
}
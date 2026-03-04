"use client";
import { signIn } from "next-auth/react";
import Nav from "@/app/components/nav/nav";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex flex-col">
      <Nav />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          
          <div className="h-32 bg-linear-to-br from-primary to-secondary-blue flex items-center justify-center">
             <h1 className="text-white text-3xl font-black tracking-tighter">VIHAAN <span className="opacity-70">2025</span></h1>
          </div>

          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Portal</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
              Please sign in with your authorized Google account to manage the gallery.
            </p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/admin" })}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95"
            >
              <img 
                src="https://authjs.dev/img/providers/google.svg" 
                alt="Google" 
                className="w-5 h-5" 
              />
              Continue with Google
            </button>

            <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Radharaman Group Of Institutes
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
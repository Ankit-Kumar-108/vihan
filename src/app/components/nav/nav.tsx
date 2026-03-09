"use client"
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';
import { useState } from 'react';

function MenuLink({ href, icon, label, color = "text-inherit", onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
    >
      <span className={`material-symbols-outlined ${color} text-xl`}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
export default function Nav() {

  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 w-full dark:bg-black/40 bg-primary/10 backdrop-blur-xl border-b-0 border-b-[#482336]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <img src="/logo/logo.JPG" alt="RGI" className="size-8 rounded-lg" />
              <div className="flex gap-1.5 ">
                <h2 className="text-slate-900 dark:text-white sm:text-2xl text-lg font-extrabold tracking-tight">Vihan 26</h2>
                <span className='lg:hidden'>
                  <h2 className="text-[10px] -mt-1.5 text-transparent bg-clip-text font-bold bg-linear-to-r from-primary to-secondary-accent">Organised By RGI</h2>
                </span>
                <span className='hidden lg:flex'>
                  <h2 className="text-[15px] -mt-2 text-transparent bg-clip-text font-bold bg-linear-to-r from-primary to-secondary-accent">Organised By Radharaman Group of Institutes</h2>
                </span>
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <Link className="text-slate-800 dark:text-slate-200 hover:text-primary transition-colors text-sm font-bold" href="/">Home</Link>
            <Link className="text-slate-800 dark:text-slate-200 hover:text-primary transition-colors text-sm font-bold" href="/events">Events</Link>
            <Link className="text-slate-800 dark:text-slate-200 hover:text-primary transition-colors text-sm font-bold" href="/gallery">Gallery</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/register" className="hidden sm:flex items-center justify-center rounded-full h-10 px-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(238,43,140,0.4)] hover:shadow-[0_0_25px_rgba(238,43,140,0.6)]">
              Register Now
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative md:hidden text-slate-800 dark:text-white p-2 focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">
                {menuOpen ? 'close' : 'menu'}
              </span>

              <div className={`${menuOpen ? "flex" : "hidden"} absolute right-0 top-14 w-56 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-200/20 dark:bg-linear-to-br from-background-dark via-background-dark to-primary-dark z-50`}>

                <div className="flex flex-col border-b border-slate-200 pb-2 dark:border-slate-200/20">
                  <MenuLink href="/" icon="home" label="Home" />
                  <MenuLink href="/gallery" icon="grid_view" label="Gallery" />
                  <MenuLink href="/events" icon="event" label="Events" />
                  <MenuLink href="/upload" icon="cloud_upload" label="Upload Image" color="text-blue-500" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Management Only
                  </span>
                  <MenuLink href="/admin" icon="shield_person" label="Admin Panel" color="text-violet-500" />
                </div>
              </div>
              <div className={`${menuOpen ? "flex" : "hidden"} w-dvw h-dvh z-40 absolute -right-4 top-14`}
                onClick={() => setMenuOpen(!menuOpen)}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

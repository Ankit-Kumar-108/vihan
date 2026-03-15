'use client';
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer";
import Link from "next/link";
import About from "./components/About";
import EventsShowcase from "./components/EventsShowcase";
import Timeline from "./components/Timeline";
import QRUploadSection from "./components/QRUploadSection";
import { useRef, useEffect } from "react";
import { getWinners } from "@/lib/getWinners";
import { useState } from "react";

interface winnerData {
  category: string;
  winnerName: string;
  imageUrl: string;
}

export default function VIHANFestival(data: winnerData) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHover = useRef<boolean>(false);
  const [winners, setWinners] = useState<any[]>([]);
  const [winnersLoading, setWinnersLoading] = useState(false);

  useEffect(() => {
    async function GetWinners() {
      setWinnersLoading(true)
      const data = await getWinners()
      setWinners(data)
      setWinnersLoading(false)
    }
    GetWinners()
  }, [])

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      if (!isHover.current) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(scrollInterval);
  }, []);
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col transition-colors duration-300">
        {/* Navigation */}
        <Nav />
        <main className="grow relative">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
            <div className="absolute top-20 right-[20%] w-125 h-125 bg-secondary-accent/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-0 left-[-10%] w-150 h-150 bg-primary/10 rounded-full blur-[120px] mix-blend-screen"></div>
          </div>

          {/* Hero Section */}
          <section className="relative z-10 pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 tracking-wide uppercase">Official Fest Landing</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-slate-900 via-slate-700 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-500 leading-[1.1] tracking-tight drop-shadow-lg">
                  CULTURE <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-accent to-primary">ON THE MOVE</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  Proudly presented by <span className="font-bold text-purple-500 dark:text-purple-400">RADHARAMAN GROUP OF INSTITUTES</span>, VIHAN is a spectacular celebration where creativity, innovation, and passion collide on one electrifying stage. With 20+ events spanning singing, dance, fashion, sports, and technology — experience fierce competition, unforgettable performances, and campus energy at its peak. This is where champions are made.
                </p>
              </div>

              {/* Hero Video */}
              <div className="flex-1 w-full max-w-[320px] sm:max-w-90 md:max-w-100 lg:max-w-105 xl:max-w-115 mx-auto lg:mx-0 relative group perspective-1000">
                <div className="absolute inset-0 bg-linear-to-r from-secondary-accent via-primary to-secondary-accent rounded-2xl opacity-50 blur-2xl group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a0c13] aspect-3/4 rotate-y-6 hover:rotate-0 transition-all duration-500 ease-out">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                  <video
                    className="absolute inset-0 w-full h-full object-fill"
                    loop
                    muted
                    autoPlay
                    playsInline
                    src="/videos/vihanComingSoon.mp4"
                  ></video>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20">
                    <div className="glass-panel p-3 sm:p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-primary text-xs font-bold uppercase mb-1">VIHAn</p>
                        <h3 className="text-white font-bold text-base sm:text-lg">Coming Soon</h3>
                      </div>
                      <button className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0">
                        <span className="material-symbols-outlined text-lg sm:text-xl">arrow_outward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Registration */}
          <section className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                  Ready to compete?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                  Register now to secure your spot in 50+ events. Solo or team — everyone&apos;s welcome!
                </p>
              </div>
              <Link
                href="/register"
                className="shrink-0 px-10 py-4 rounded-full bg-linear-to-r from-primary to-secondary-accent text-white font-bold text-lg shadow-[0_0_30px_rgba(157,54,247,0.4)] hover:shadow-[0_0_40px_rgba(238,43,140,0.5)] transition-all hover:-translate-y-0.5"
              >
                Register Now →
              </Link>
            </div>
          </section>
          {/* Category Section */}
          <section className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
            <div className="p-3 mb-7">
              <h1 className="font-bold text-2xl md:text-5xl mb-3">Winners of Vihan 2026</h1>
              <p className="text-slate-500 dark:text-slate-400">Top of the Line</p>
            </div>
            <div
              ref={scrollRef}
              onMouseEnter={() => isHover.current = true}
              onMouseLeave={() => isHover.current = false}
              className="flex gap-7 overflow-x-scroll no-scrollbar">

              {[
                "Gully Cricket", "Tug Of War", "Badminton", "Carrom", "Chess", "Arm Wrestling", "Kho Kho", "Kabbadi", "Treasure Hunt", "Slow Bike Race", "Shot Put", "Sports Parade", "Lemon Spoon Race", "Volleyball", "Race (100M)", "Race(200M)", "Technical Presentation", "Painting", "Reels", "Extempore", "Debate", "Model Presentation", "Photography", "LAN Gaming", "Poster Making", "Quiz (General)", "Quiz (Technical)", "Nail Painting", "Face Painting", "Mehndi", "Rangoli", "Singing(Solo)", "Singing(Duet)", "Dance(Solo)", "Dance(Duet)", "Mimicry", "Skit", "Fashion Show", "Poetry (Self Composed)"
              ].map((catName) => {
                const cat = {
                  href: `events/${catName.replace(/[^a-zA-Z0-9]/g, '-')}-Winner`,
                  icon: 'workspace_premium', //baad mei
                  category: catName,
                  name: 'To be announced'
                };
                const winnerInfo = winners.find((w: any) => w.category === cat.category);
                return (
                  <Link key={cat.category} href={cat.href}>
                    <div className={`z-20 group relative rounded-2xl h-67 w-52 cursor-pointer transition-all shrink-0 duration-300 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden`}>
                      <div className={`absolute z-10 bg-linear-to-br h-57 w-47 left-2 top-4 bg-white dark:bg-black`}></div>
                      <img src="/images/Frame.png" alt="Frame Image" className="absolute w-full h-full z-50 object-cover" />
                      {winnerInfo && !winnersLoading ? (
                        <img src={winnerInfo.imageUrl} alt={`${cat.category} Winner`} className="absolute z-10 bg-linear-to-br h-57 w-47 left-2 top-4 object-cover rounded-2xl" />
                      ) : (
                        <>
                        {!winnersLoading && (
                          <div className="absolute z-10 text-7xl top-[30%] left-[38%] font-bold">
                            ?
                          </div>
                        )}
                        {winnersLoading && (
                          <div className="absolute z-10 text-xl top-[30%] left-[38%] font-bold">
                          <div className="size-10 rounded-full border-5 border-blue-500 border-t-transparent animate-spin"></div>
                          </div>
                        )}
                        </>
                      )}


                      <div className="absolute bottom-7 left-10 bg-black/30 w-full -mt-2 pb-4 z-40 -ml-4">
                        <div className="font-bold text-white pl-4 text-md">
                          {winnerInfo && !winnersLoading ? winnerInfo.winnerName : cat.name}
                        </div>
                        <div className="font-bold text-purple-500 pl-4 text-sm">
                          {cat.category}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}

              {/* Block 2 (The Copy for infinite scroll) */}
              {[
                "Gully Cricket", "Tug Of War", "Badminton", "Carrom", "Chess", "Arm Wrestling", "Kho Kho", "Kabbadi", "Treasure Hunt", "Slow Bike Race", "Shot Put", "Sports Parade", "Lemon Spoon Race", "Volleyball", "Race (100M)", "Race(200M)", "Technical Presentation", "Painting", "Reels", "Extempore", "Debate", "Model Presentation", "Photography", "LAN Gaming", "Poster Making", "Quiz (General)", "Quiz (Technical)", "Nail Painting", "Face Painting", "Mehndi", "Rangoli", "Singing(Solo)", "Singing(Duet)", "Dance(Solo)", "Dance(Duet)", "Mimicry", "Skit", "Fashion Show", "Poetry (Self Composed)"
              ].map((catName) => {
                const cat = {
                  href: `events/${catName.replace(/[^a-zA-Z0-9]/g, '-')}-Winner`,
                  icon: 'workspace_premium',
                  category: catName,
                  name: 'To be announced',
                };
                const winnerInfo = winners.find((w: any) => w.category === cat.category);
                return (
                  <Link key={`${cat.category}-copy`} href={cat.href} aria-hidden="true">
                    <div className={`z-20 group relative rounded-2xl h-67 w-52 cursor-pointer transition-all shrink-0 duration-300 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden`}>
                      <div className={`absolute z-10 bg-linear-to-br h-57 w-47 left-2 top-4 bg-white dark:bg-black`}></div>
                      <img src="/images/Frame.png" alt="Frame Image" className="absolute w-full h-full z-50 object-cover" />
                      {winnerInfo && !winnersLoading ? (
                        <img src={winnerInfo.imageUrl} alt={`${cat.category} Winner`} className="absolute z-10 bg-linear-to-br h-57 w-47 left-2 top-4 object-cover rounded-2xl" />
                      ) : (
                        <>
                        {!winnersLoading && (
                          <div className="absolute z-10 text-7xl top-[30%] left-[38%] font-bold">
                            ?
                          </div>
                        )}
                        {winnersLoading && (
                          <div className="absolute z-10 text-xl top-[30%] left-[38%] font-bold">
                           <div className="size-10 rounded-full border-5 border-blue-500 border-t-transparent animate-spin"></div>
                          </div>
                        )}
                        </>
                      )}



                      <div className="absolute bottom-7 left-10 bg-black/30 w-full -mt-2 z-40 -ml-4 pb-4">
                        <div className="font-bold text-white pl-4 text-md">
                          {winnerInfo && !winnersLoading ? winnerInfo.winnerName : cat.name}
                        </div>
                        <div className="font-bold text-purple-500 pl-4 text-sm">
                          {cat.category}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Highlights Section */}
          <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">VIHAN Highlights</h2>
                <p className="text-slate-500 dark:text-slate-400">Captured, best moments from VIHAN</p>
              </div>
              <Link href={"/gallery"} className="hidden md:flex text-primary font-bold items-center gap-1 hover:gap-2 transition-all">
                View Full Gallery <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>

            {/* Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">

              <Link
                href="gallery/#dance"
                className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="Close up of a singer performing on stage with white lighting"
                  style={{ backgroundImage: "url('/images/dance.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">Dance</span>
                  <h3 className="text-white text-2xl font-bold">Let your heart lead feet</h3>
                </div>
              </Link>

              <Link
                href="gallery/#fashion"
                className="md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-105 bg-top"
                  data-alt="Silhouette of a hip hop dancer performing a jump in the air"
                  style={{ backgroundImage: "url('images/fashion.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">Fashion</span>
                  <h3 className="text-white text-xl font-bold">Elegance in every single thread</h3>
                </div>
              </Link>

              <Link
                href="gallery/#tech"
                className="relative group rounded-2xl overflow-hidden cursor-pointer block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="People sitting around tables with laptops at a hackathon event"
                  style={{ backgroundImage: "url('images/cricket.png')" }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">Sports</span>
                  <h3 className="text-white text-lg font-bold">Master the field of uncertainty</h3>
                </div>
              </Link>

              <Link
                href="/gallery/#singing"
                className="relative group rounded-2xl overflow-hidden cursor-pointer block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="Colorful abstract fashion show runway with models"
                  style={{ backgroundImage: "url('images/singing.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">Singing</span>
                  <h3 className="text-white text-lg font-bold">Masterful techniques for remarkable</h3>
                </div>
              </Link>

              <Link
                href="events/Fashion-Winner"
                className="relative group rounded-2xl overflow-hidden cursor-pointer block w-full h-full"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="Colorful abstract fashion show runway with models"
                  style={{ backgroundImage: "url('images/tech.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">Tech</span>
                  <h3 className="text-white text-lg font-bold">Where innovation meets human inspiration</h3>
                </div>
              </Link>

            </div>
            <Link href={"/gallery"}>
              <button className="md:hidden w-full bg-primary font-bold mt-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer">
                View Full Gallery
              </button>
            </Link>
          </section>
          {/* About Section */}
          <About />

          {/* All Events Showcase */}
          <EventsShowcase />

          {/* Event Schedule / Timeline */}
          <Timeline />

          {/* QR Photo Upload */}
          <QRUploadSection />

        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
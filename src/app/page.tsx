'use client';
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer";
import Link from "next/link";
import About from "./components/About";
import EventsShowcase from "./components/EventsShowcase";
import Timeline from "./components/Timeline";
import QRUploadSection from "./components/QRUploadSection";
import Image from "next/image";

export default function VihaanFestival() {
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col transition-colors duration-300">
        {/* Navigation */}
        <Nav />
        <main className="grow relative">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
            <div className="absolute top-20 right-[-10%] w-125 h-125 bg-secondary-accent/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
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
                  UNLEASH <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-accent to-primary">THE ENERGY</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  The ultimate fusion of art, tech, and adrenaline. Join us for the biggest college festival of the year.
                </p>
              </div>

              {/* Hero Image */}
              <div className="flex-1 w-full max-w-150 lg:max-w-none relative group perspective-1000">
                <div className="absolute -inset-4 bg-linear-to-r from-secondary-accent via-primary to-secondary-accent rounded-[2.5rem] opacity-50 blur-2xl group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#1a0c13] aspect-4/3 rotate-y-6 hover:rotate-0 transition-all duration-500 ease-out">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                    data-alt="Excited crowd at a night concert with colorful stage lights and confetti"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFqiaiuC90Vm6Uy0to4KaJbTIunUAo0KGe93DZ0DoVm9u2HDu2r491UlJe-peaqVlXBrtlACU-SKktCAZucutpd7beeAAEF7Bos6Ehu8-sjzZisAeR5hg1FGWFY21_Y81NdzdoDJTN6kS31pFcBJvuMrzEaCMF-YvYC3MrpvRcTE02220CziD8AoV7sZXA50gd4ZKAlrPSjI77OOicfMU9dTOB9lPvMTCQquusswlyANDhM9oMeIA2ioZgRb50ltlAG66cyTqZtTbh')" }}
                  ></div>
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-primary text-xs font-bold uppercase mb-1">Featured Event</p>
                        <h3 className="text-white font-bold text-lg">Neon Nights Concert</h3>
                      </div>
                      <button className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Registration CTA */}
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
          <section className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="p-3 mb-7">
              <h1 className="font-bold text-2xl md:text-5xl mb-3">Winners of Vihaan 2026</h1>
              <p className="text-slate-500 dark:text-slate-400">Top of the Line</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: 'events/Singing-Winner', icon: 'music_note', name: 'Singing', count: '8 Events', gradient: 'from-pink-600 via-rose-500 to-orange-400' },
                { href: 'events/Dance-Winner', icon: 'settings_accessibility', name: 'Dance', count: '6 Events', gradient: 'from-blue-600 via-indigo-500 to-violet-400' },
                { href: 'events/Sports-Winner', icon: 'sports_basketball', name: 'Sports', count: '12 Events', gradient: 'from-emerald-600 via-green-500 to-teal-400' },
                { href: 'events/Fashion-Winner', icon: 'campaign', name: 'Fashion', count: '4 Events', gradient: 'from-amber-600 via-yellow-500 to-orange-400' },
                { href: 'events/Technical-Winner', icon: 'campaign', name: 'Technical', count: '4 Events', gradient: 'from-purple-600 via-purple-400 to-purple-200' }
              ].map((cat) => (
                <Link key={cat.name} href={cat.href}>
                  <div className={`group relative overflow-hidden rounded-2xl h-44 bg-linear-to-br ${cat.gradient} cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]`}>
                    {/* Decorative circles */}
                    <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />

                    <div className="relative h-full flex flex-col justify-between p-5">
                      <div className="flex items-start justify-between">
                        <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <span className="material-symbols-outlined text-white text-2xl">{cat.icon}</span>
                        </div>
                        <span className="material-symbols-outlined text-white/40 text-xl group-hover:text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">arrow_outward</span>
                      </div>
                      <div>
                        <h3 className="text-white font-black text-xl mb-0.5">{cat.name}</h3>
                        <p className="text-white/60 text-xs font-semibold">{cat.count}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Highlights Section */}
          <section className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">Vihaan Highlights</h2>
                <p className="text-slate-500 dark:text-slate-400">Captured, best moments from Vihaan</p>
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
                  <span className="bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">Fashion</span>
                  <h3 className="text-white text-lg font-bold">Where innovation meets human inspiration</h3>
                </div>
              </Link>

            </div>
            <Link href={"/gallery"}>
              <button className="md:hidden w-full bg-primary font-bold mt-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
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
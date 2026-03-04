import Nav from '../components/nav/nav'
import Footer from '../components/footer/footer'
import { FetchGalleryImg } from './fetchGalleryImg'
import GallerySection from './GallerySection'

export default async function Gallery() {
  // Fetch initial data for each category on the server — no useEffect, no loading state
  const [danceResult, musicResult, sportResult] = await Promise.all([
    FetchGalleryImg('Dance'),
    FetchGalleryImg('Music'),
    FetchGalleryImg('Sports')
  ])

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Nav />
      <main className="flex-1 w-full max-w-360 mx-auto flex flex-col pb-20">
        {/* Hero Section */}
        <section className="w-full px-3 sm:px-4 md:px-10 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-5 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">Vihaan <span className="text-primary">2025</span> Highlights</h1>
            <div className="flex gap-2">
              <button className="size-9 sm:size-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors hover:cursor-pointer">
                <span className="material-symbols-outlined text-[18px] sm:text-[24px]">arrow_back</span>
              </button>
              <button className="size-9 sm:size-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors hover:cursor-pointer">
                <span className="material-symbols-outlined text-[18px] sm:text-[24px]">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl sm:rounded-2xl overflow-hidden group shadow-2xl shadow-primary/10">
            {/* <!-- Main Featured Image --> */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Crowd cheering at a concert with colorful lights" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQZbhxfDJNyeYVNN6hIASQMVF73O1yL6Lrqri_05cgexgElpo-udugdpNg2Y1Ci54nrLZSCFgLbOmvG1WFvqupCjSUeLMwDLtyzsmUJMuN59kYFQTdvQhDSx8zVBijWjEhGWrHyYmvIzH-kvLVRpFAkOiJvN6V7JzjK6wzy4NtkAQNwvdKP3vRWqJUDJ_3ecpJw6GoykQIYnMrprV3b7FVXUB8c0iUCPjwEB0wQY8v6BaXEDChZk8MQKpSwSgv63yOHYsmqq_WNXgc')" }}>
            </div>
            {/* <!-- Overlay Gradient --> */}
            <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
            {/* <!-- Content Overlay --> */}
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:cursor-pointer hover:translate-y-0.5 ease-in-out duration-200 delay-200 hover:scale-95 hover:brightness-115">Featured</span>
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/10 hover:cursor-pointer hover:translate-y-0.5 ease-in-out duration-200 delay-200 hover:scale-95 hover:bg-slate-300/40">Grand Finale</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 leading-tight">The Grand Finale Night</h2>
                <p className="text-slate-200 text-sm sm:text-base md:text-lg line-clamp-2">Witness the electrifying energy of the final performance that brought the entire campus to its feet.</p>
              </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Vihaan <span className="text-primary">2025</span> Highlights
            </h1>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden group shadow-2xl shadow-primary/10">
            <div
              className="w-full aspect-4/3 sm:aspect-video md:aspect-21/9 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQZbhxfDJNyeYVNN6hIASQMVF73O1yL6Lrqri_05cgexgElpo-udugdpNg2Y1Ci54nrLZSCFgLbOmvG1WFvqupCjSUeLMwDLtyzsmUJMuN59kYFQTdvQhDSx8zVBijWjEhGWrHyYmvIzH-kvLVRpFAkOiJvN6V7JzjK6wzy4NtkAQNwvdKP3vRWqJUDJ_3ecpJw6GoykQIYnMrprV3b7FVXUB8c0iUCPjwEB0wQY8v6BaXEDChZk8MQKpSwSgv63yOHYsmqq_WNXgc')",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-background-dark/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Featured
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/10">
                  Grand Finale
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                The Grand Finale Night
              </h2>
              <p className="text-slate-200 text-sm sm:text-base md:text-lg line-clamp-2">
                Witness the electrifying energy of the final performance that brought the entire campus to its feet.
              </p>
            </div>
          </div>
        </section>

        {/* Dance Section — client component for load-more interactivity */}
        <GallerySection
          title="Dance Off Highlights"
          accentColor="bg-secondary-blue"
          category="Dance" 
          cardbg="transparent"
          initialPhotos={danceResult.photos}
          initialLastId={danceResult.lastId}
        />

        {/* Sports Section — static cards */}
        <GallerySection
          title="Sports"
          cardbg="bg-white dark:bg-slate-700"
          accentColor="bg-slate-800 dark:bg-slate-200"
          category="Music"
          initialPhotos={musicResult.photos}
          initialLastId={musicResult.lastId}
        />
        {/* <section className="w-full p-4 sm:p-6 bg-white dark:bg-slate-700">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-4 sm:pr-10">
            <div className="h-6 sm:h-8 w-1.5 rounded-full bg-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">The Sports Arena</h2>
            <a className="ml-auto text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1" href="#">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[250px] sm:auto-rows-[300px] md:auto-rows-[350px]">
            {[
              { label: 'Finals', title: 'Last Minute Dunk', icon: 'sports_basketball', color: 'text-primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD3pw5KXdaCF6-DOCQXsQP4T-Es-HCWK8XrwGqqvwH_BlbPBOyvn63N2VYRyRhcWMyQln5OoympAPpUwL-qwfuKweymOFTzxRN8plwWZCOhYNbxwuXGAD65-T_ZW53CanBci0D4gkMet3CHfySzkjV5lpT_7DS62vrDXjjmAkem4fDPgTCOLTPWQvhH_e7pu6dYnKAuVXzKeysl-ioeGYRi_q2dmfXMj7sTXiCWBW-xM4ufou67ABtvUJMTNakMk8oMZl7IyIxB71o' },
              { label: 'Match 04', title: 'Golden Goal Moment', icon: 'sports_soccer', color: 'text-secondary-blue', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxq05p2k85vGAwUyJRuUCE4AuX2azcpz_zIVN3VoWAicRveFwRVF1tj9nrwhE_Y1GVmGFwYFPhTWbDSHhOPUj9CUvPDwH4R0N_F8Kc4LXzOKFDfxzDwYnLmcG1UNTDPAUde7K4ej_3f-CmQ4mk6cHvxngZFjNSF5R4kWwIezWqIYd61Vnf1w4m0zMiGaus3kjwqNs6oUZfGphxIhFlgQIHJs8howBXwHfOSIO5knbpLCuH4jWtas3u87piFVB3T-t4cQ0MZYBy5BCk' },
              { label: 'Doubles', title: 'Smash Hit Rally', icon: 'sports_tennis', color: 'text-primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbUzfav7VgXWPFDltZGQH8URhy9Y3r8h7Inw99P6Z8P0TjXQfI38vYcwaS2OwLMUYDCp6YamEKk6KYpWmcixlV7jg7mqz0BKzhAV3cn2ZQEgbGybRjDXWdtO7JewkKuLvQ5Hx8yyrRGjJtHdjkwFb35f_GXgDlmRwwFEQjF1SdkAqGGNaKcpyHrEn_8h7x4pZ93FMhCQQFGZlQ3HbX8T4CqdoZ5_w09L8idXeuA8_zJNTOEMqjnUVdBno3IP8YtOxGmE1_sj1lOM53' },
              { label: 'Track', title: '100m Sprint Finish', icon: 'sprint', color: 'text-secondary-blue', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsNmLwoGjtg-We92G7XsXIMxTH74RJgPxftxd5CWBbcJPhY1IObLW82aJqtvKOSGNB8k962-g7tt7NYjQE6Sq7JybimACabT3LrjNgZyd55TaD0YU64WUQVIoccf-LX2NdXpTn6osqUxGapjhstM-Pq8uKtnedymdSen8oAwhqznVx_7_5Lv-FffpyBk5jiS6pC_Lqa2DSrLuqXOhm7ZGR8vLaIv52H0qBiB7kQ16k4nI01kp32D572ENTHA89cqhB2ffT3NH_PSIM' },
            ].map((card) => (
              <div key={card.title} className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${card.img}')` }} />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white text-[20px] sm:text-[24px]">{card.icon}</span>
                </div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                  <span className={`${card.color} text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 block`}>{card.label}</span>
                  <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Music & Debate Section — client component for load-more interactivity */}
        <GallerySection
         cardbg="transparent"
          title="Music & Debate Corner"
          accentColor="bg-slate-800 dark:bg-slate-200"
          category="Music"
          initialPhotos={musicResult.photos}
          initialLastId={musicResult.lastId}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

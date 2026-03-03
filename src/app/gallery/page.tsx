"use client"
import React from 'react'
import Nav from '../components/nav/nav'
import Footer from '../components/footer/footer'
import GetPhoto from '../admin/getPhoto'
import { useState, useEffect } from 'react'

interface Photo {
  id: string;
  dataUrl: string;
  eventName?: string;
  category?: string;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  // Use useEffect to call the server action on page load
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await GetPhoto()
      setPhotos(data)
      setLoading(false)
    }
    loadInitialData()
  }, [])

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* <!-- Top Navigation --> */}
      <Nav />
      <main className="flex-1 w-full max-w-360 mx-auto flex flex-col pb-20">
        {/* <!-- Hero Section: Cinematic Featured Slider --> */}
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
            </div>
          </div>
        </section>
        {/* <!-- Category: Film Strip Horizontal Scroll - Dance --> */}
        <section className="w-full p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-4 sm:pr-10">
            <div className="h-6 sm:h-8 w-1.5 rounded-full bg-secondary-blue"></div>
            <h2 className="text-[15px] sm:text-xl font-bold text-slate-900 dark:text-white">Dance Off Highlights</h2>
            <a className="ml-auto text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1" href="#">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[250px] sm:auto-rows-[300px] md:auto-rows-[350px]">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
              </div>
            ) : (
              photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${photo.dataUrl}')` }}
                  ></div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                  <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-white text-md sm:text-xl font-bold">
                      {photo.eventName || "Vihaan Event"}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                      {photo.category || "Highlight moment"}
                    </p>
                  </div>
                </div>
              ))
            )}
            
          </div>
        </section>
        {/* <!-- Category: Film Strip Horizontal Scroll - Sports --> */}
        <section className="w-full p-4 sm:p-6 bg-white dark:bg-slate-700">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-4 sm:pr-10">
            <div className="h-6 sm:h-8 w-1.5 rounded-full bg-primary"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">The Sports Arena</h2>
            <a className="ml-auto text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1" href="#">View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[250px] sm:auto-rows-[300px] md:auto-rows-[350px]">
            {/* <!-- Card 1 --> */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Basketball player dunking the ball" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAD3pw5KXdaCF6-DOCQXsQP4T-Es-HCWK8XrwGqqvwH_BlbPBOyvn63N2VYRyRhcWMyQln5OoympAPpUwL-qwfuKweymOFTzxRN8plwWZCOhYNbxwuXGAD65-T_ZW53CanBci0D4gkMet3CHfySzkjV5lpT_7DS62vrDXjjmAkem4fDPgTCOLTPWQvhH_e7pu6dYnKAuVXzKeysl-ioeGYRi_q2dmfXMj7sTXiCWBW-xM4ufou67ABtvUJMTNakMk8oMZl7IyIxB71o')" }}></div>
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90"></div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-lg">
                <span className="material-symbols-outlined text-white text-[20px] sm:text-[24px]">sports_basketball</span>
              </div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                <span className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 block">Finals</span>
                <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">Last Minute Dunk</h3>
              </div>
            </div>
            {/* <!-- Card 2 --> */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Football players on field during sunset" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxq05p2k85vGAwUyJRuUCE4AuX2azcpz_zIVN3VoWAicRveFwRVF1tj9nrwhE_Y1GVmGFwYFPhTWbDSHhOPUj9CUvPDwH4R0N_F8Kc4LXzOKFDfxzDwYnLmcG1UNTDPAUde7K4ej_3f-CmQ4mk6cHvxngZFjNSF5R4kWwIezWqIYd61Vnf1w4m0zMiGaus3kjwqNs6oUZfGphxIhFlgQIHJs8howBXwHfOSIO5knbpLCuH4jWtas3u87piFVB3T-t4cQ0MZYBy5BCk')" }}></div>
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90"></div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-lg">
                <span className="material-symbols-outlined text-white text-[20px] sm:text-[24px]">sports_soccer</span>
              </div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                <span className="text-secondary-blue text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 block">Match 04</span>
                <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">Golden Goal Moment</h3>
              </div>
            </div>
            {/* <!-- Card 3 --> */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Two people playing badminton" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbUzfav7VgXWPFDltZGQH8URhy9Y3r8h7Inw99P6Z8P0TjXQfI38vYcwaS2OwLMUYDCp6YamEKk6KYpWmcixlV7jg7mqz0BKzhAV3cn2ZQEgbGybRjDXWdtO7JewkKuLvQ5Hx8yyrRGjJtHdjkwFb35f_GXgDlmRwwFEQjF1SdkAqGGNaKcpyHrEn_8h7x4pZ93FMhCQQFGZlQ3HbX8T4CqdoZ5_w09L8idXeuA8_zJNTOEMqjnUVdBno3IP8YtOxGmE1_sj1lOM53')" }}></div>
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90"></div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-lg">
                <span className="material-symbols-outlined text-white text-[20px] sm:text-[24px]">sports_tennis</span>
              </div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                <span className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 block">Doubles</span>
                <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">Smash Hit Rally</h3>
              </div>
            </div>
            {/* <!-- Card 4 --> */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" data-alt="Sprinters running on a track" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsNmLwoGjtg-We92G7XsXIMxTH74RJgPxftxd5CWBbcJPhY1IObLW82aJqtvKOSGNB8k962-g7tt7NYjQE6Sq7JybimACabT3LrjNgZyd55TaD0YU64WUQVIoccf-LX2NdXpTn6osqUxGapjhstM-Pq8uKtnedymdSen8oAwhqznVx_7_5Lv-FffpyBk5jiS6pC_Lqa2DSrLuqXOhm7ZGR8vLaIv52H0qBiB7kQ16k4nI01kp32D572ENTHA89cqhB2ffT3NH_PSIM')" }}></div>
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90"></div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-lg">
                <span className="material-symbols-outlined text-white text-[20px] sm:text-[24px]">sprint</span>
              </div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                <span className="text-secondary-blue text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 block">Track</span>
                <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">100m Sprint Finish</h3>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Category: Compact Grid - Debate & Arts --> */}
        <section className="w-full px-3 sm:px-4 md:px-10 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="h-6 sm:h-8 w-1.5 rounded-full bg-slate-800 dark:bg-slate-200"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Music &amp; Debate Corner</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative group rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Microphone on stage with musical instruments in background" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3GFHbIDbTo34800Xvylcqz6lqnIXMJ8PaRGU733A3ytUFfTGfDBhmh1HfeQSvhqCi80ELrZjtZergcxbM0CJRudw2Io35jPY2J4jxCTVzzczwS3zuwQB1AAaMS-oxcroJm_vz1o3DCfjM2CDd-HY5EEKWwiXRpQ-JZV8ykqziZNQmlQrZg-IgoQZaCldvFueCZIEj4iR4YuNCgo8nwVaoYzTHtZDH4xMGNhVDBI06T_CskU_ivHirkU9ae77bkBWof5uYwgFthTc6')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-primary text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  View Gallery <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full bg-linear-to-t from-black/80 to-transparent">
                <p className="text-white text-sm sm:text-base font-semibold">Battle of Bands</p>
              </div>
            </div>
            <div className="relative group rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Person speaking at a podium with audience" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKRT11zrArhEt1Q2FTN66f8ETvuX_Uq8QsLPomGwr-jCkAZadubCClk0B9u8-_JpQB6jXN47Foq8DgVB8foU4OtIaTML-e4UydLI_vqfmUgWTIe_2R8vN5KdJpP-ZFBsSZJPcf_oFiMCKFx6E3_qGFrz-xoRCCHZaE2KuBpL-q0PxI9gI3tw_sGygLMW5IATK3ZxN8UO_8CiAbvIVx_6aAGwNx59OR9qK9eiKsfb34_5sJS86B0cxikRsKipJMy3OcbiPGsLmYObUn')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-primary text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  View Gallery <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full bg-linear-to-t from-black/80 to-transparent">
                <p className="text-white text-sm sm:text-base font-semibold">Inter-college Debate</p>
              </div>
            </div>
            <div className="relative group rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Person playing electric guitar on stage" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7Z_g7sfjPSXkcVE9pOjUE9AZAHJQaruSx_3ew4JjSlK2E_Q7tzY57Y6_z0SXX5C4k_WDsLCiCjncA7SASNNvO8-jBWNWX7V-xU16OZkHE68-wRqXIqdmwVIoGLIUEJSowURihsOhkmYoCz2stTOuE1xqigJMkz_AZCERM0-b6Ke_PGgU67hc5DPXdgkkNr6rsMm9lMW6JfPBmlLpdTmmAVI6W4q_3S2R-xAQKawtFGf87sl0YhpdPMWglgQJSlQo5h0Jarnpu_Cnm')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-primary text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  View Gallery <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full bg-linear-to-t from-black/80 to-transparent">
                <p className="text-white text-sm sm:text-base font-semibold">Solo Instrumentals</p>
              </div>
            </div>
            <div className="relative group rounded-2xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Art gallery exhibition with paintings on wall" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD80Gx9uZUlTlwOpueW4nZ76yU7LLdKKij6WwNt8i8oB9wD9wef78RJTL8eV3Bbe624HzaJm5y5VtdAlMIMROT-upmQZGqZN7zXGckKm16Wk5jn5BfhmJbniV2i4aZVOWVjdlVaD3mME3ozk2v1kkwXxE3JTLzFF1hWNR5-KGobZDPNOVEeufvd7lPqHWLsEueaD25H9qAOHFPm19nN6VkxRUSl-NjV4CC2AI23q-FzjAVOB3rbxJSp2iSc_-djzdRSRWTJe7ul-kqg')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-primary text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  View Gallery <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full bg-linear-to-t from-black/80 to-transparent">
                <p className="text-white text-sm sm:text-base font-semibold">Fine Arts Exhibition</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- Footer --> */}
      <Footer />
    </div>
  )
}

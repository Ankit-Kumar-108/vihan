import Nav from '../components/nav/nav'
import Footer from '../components/footer/footer'
import { FetchGalleryImg } from './fetchGalleryImg'
import GallerySection from './GallerySection'

export default async function Gallery() {
  // Fetch initial data for each category on the server — no useEffect, no loading state
  const [culturalResult, sportResult, technicalResult, artsVillaResult] = await Promise.all([
    // FetchGalleryImg('Dance'),
    // FetchGalleryImg('Singing'),
    FetchGalleryImg('Cultural'),
    FetchGalleryImg('Sports'),
    FetchGalleryImg('Technical'),
    // FetchGalleryImg('Fashion'),
    FetchGalleryImg('Arts Villa'),
  ])

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Nav />
      <main className="flex-1 w-full max-w-360 mx-auto flex flex-col pb-20">
        {/* Hero Section */}
        <section className="w-full px-3 sm:px-4 md:px-10 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-5 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              VIHAN <span className="text-primary">2026</span> Highlights
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
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:cursor-pointer hover:brightness-125">
                  Featured
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer hover:bg-slate-300/65">
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
          title="Cultural Highlights"
          accentColor="bg-secondary-blue"
          category="Cultural"
          cardbg="transparent"
          initialPhotos={culturalResult.photos}
          initialLastId={culturalResult.lastId}
        />

        {/* Sports Section — static cards */}
        <GallerySection
          title="Sports"
          cardbg="bg-white dark:bg-slate-700"
          accentColor="bg-slate-800 dark:bg-slate-200"
          category="Sports"
          initialPhotos={sportResult.photos}
          initialLastId={sportResult.lastId}
        />

        {/* Music & Debate Section — client component for load-more interactivity */}
        <GallerySection
          cardbg="transparent"
          title="Technical"
          accentColor="bg-slate-800 dark:bg-slate-200"
          category="Technical"
          initialPhotos={technicalResult.photos}
          initialLastId={technicalResult.lastId}
        />
        {/* Fashion Widset */}
        {/* <GallerySection
          cardbg="transparent"
          title="Fashion"
          accentColor="bg-slate-800 dark:bg-slate-200"
          category="Fashion"
          initialPhotos={fashionResult.photos}
          initialLastId={fashionResult.lastId}
        /> */}
        {/* Technical widset */}
        <GallerySection
          cardbg="transparent"
          title="Arts Villa"
          accentColor="bg-slate-800 dark:bg-slate-200"
          category="Arts Villa"
          initialPhotos={artsVillaResult.photos}
          initialLastId={artsVillaResult.lastId}
        />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

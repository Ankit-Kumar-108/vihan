export default function GalleryLoading() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-white/5 animate-shimmer mb-3" />
        <div className="h-5 w-96 max-w-full rounded-lg bg-slate-200 dark:bg-white/5 animate-shimmer" />
      </div>

      {/* Skeleton grid — 4 category sections */}
      <div className="max-w-7xl mx-auto px-4 space-y-10 pb-20">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            {/* Section title bar */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 rounded-full bg-primary/30" />
              <div className="h-6 w-40 rounded-lg bg-slate-200 dark:bg-white/5 animate-shimmer" />
            </div>

            {/* Photo grid skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="rounded-2xl bg-slate-200 dark:bg-white/5 animate-shimmer aspect-[3/4]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

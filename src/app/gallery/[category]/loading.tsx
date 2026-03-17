export default function CategoryGalleryLoading() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-6">
        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-white/5 animate-shimmer mb-4" />
        <div className="h-10 w-72 rounded-xl bg-slate-200 dark:bg-white/5 animate-shimmer mb-2" />
        <div className="h-5 w-48 rounded-lg bg-slate-200 dark:bg-white/5 animate-shimmer" />
      </div>

      {/* Masonry skeleton */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {[280, 350, 220, 300, 250, 320, 280, 350, 200, 300, 260, 340].map((h, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-2xl bg-slate-200 dark:bg-white/5 animate-shimmer"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

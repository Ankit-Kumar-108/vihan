export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="size-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}

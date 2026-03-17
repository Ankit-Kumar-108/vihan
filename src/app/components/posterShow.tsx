'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPostersFromCloudinary } from '@/lib/getPoster';

export default function EventsShowcase() {
    // 1. We keep track of the loaded remote posters
    const [remotePosters, setRemotePosters] = useState<{url: string, publicId: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
    const [posterLoaded, setPosterLoaded] = useState(false);

    // 2. Fetch the posters when the component loads
    useEffect(() => {
        async function fetchPosters() {
            const urls = await getPostersFromCloudinary();
            setRemotePosters(urls);
            setLoading(false);
        }
        fetchPosters();
    }, []);

    // 3. Fallback gradient just in case a poster doesn't load
    const fallbackGradient = 'from-violet-600 via-purple-500 to-fuchsia-400';

    return (
        <section id="all-events" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header ... (Keep your existing Header HTML here) */}
             <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-accent/10 border border-secondary-accent/20 mb-4">
                    <span className="material-symbols-outlined text-secondary-accent text-sm">star</span>
                    <span className="text-xs font-bold text-secondary-accent tracking-wide uppercase">All Events Posters</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
                    Explore Every{' '}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-accent to-primary">
                        Competition
                    </span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    From the stage to the field, from code to canvas — find your event and register now.
                </p>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center text-slate-500 py-10">
                   <p className="animate-pulse">Loading amazing posters...</p>
                </div>
            )}

            {/* Poster Grid */}
            {!loading && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {remotePosters.length === 0 ? (
                    <p className="col-span-full text-center text-slate-500">No posters uploaded yet!</p>
                ) : (
                    remotePosters.map((poster, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedPoster(poster.url)}
                            className="cursor-pointer group aspect-3/4.5 relative overflow-hidden rounded-2xl p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] bg-cover bg-top bg-no-repeat"
                            style={{ backgroundImage: `url(${poster.url})` }}
                        >
                            {/* Register Button */}
                            <Link 
                                href={"/register"} 
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-1 top-1 bg-purple-500/50 hover:bg-purple-600/50 backdrop-blur-[3px] font-bold py-2 px-3 rounded-full transition-all active:scale-95 tracking-wide text-center"
                            >
                                <span className='material-symbols-outlined' style={{ fontVariationSettings: "'wght' 500", fontSize: "22px" }}>call_made</span>
                            </Link>
                        </div>
                    ))
                )}
            </div>
            )}
            
            {/* Lightbox Modal ... (Keep your existing Modal HTML here) */}
            {selectedPoster && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => { setSelectedPoster(null); setPosterLoaded(false); }}
                >
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center animate-fade-in"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => { setSelectedPoster(null); setPosterLoaded(false); }}
                            className="absolute -top-2 -right-2 z-10 h-10 w-10 cursor-pointer rounded-full bg-white/10 backdrop-blur-[5px] border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>

                        {/* Loading spinner */}
                        {!posterLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="size-10 rounded-full border-4 border-white/20 border-t-primary animate-spin" />
                            </div>
                        )}

                        {/* Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={selectedPoster}
                            alt="Event Poster"
                            className={`max-h-[85vh] md:max-h-[75vh] lg:max-h-[70vh] w-auto max-w-[95vw] md:max-w-[60vw] lg:max-w-[45vw] xl:max-w-[35vw] object-contain rounded-2xl shadow-2xl transition-opacity duration-300 ${posterLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setPosterLoaded(true)}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

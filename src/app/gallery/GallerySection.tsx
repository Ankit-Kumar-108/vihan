"use client"
import { useState } from 'react'
import Link from 'next/link'
import { FetchGalleryImg } from './fetchGalleryImg'

interface Photo {
    id: string;
    thumbnailUrl: string;
    url?: string;
    eventName?: string;
    category?: string;
    uploaderName?: string;
    [key: string]: unknown;
}

interface GallerySectionProps {
    title: string;
    accentColor: string;
    category: string;
    initialPhotos: Photo[];
    initialLastId: string | null;
    cardbg: string | null;
}

export default function GallerySection({ title, accentColor, category, initialPhotos, initialLastId, cardbg }: GallerySectionProps) {
    const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
    const [lastId, setLastId] = useState<string | null>(initialLastId)
    const [loading, setLoading] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
    const [downloading, setDownloading] = useState(false)
    const [lightboxLoaded, setLightboxLoaded] = useState(false)

    const handleLoadMore = async () => {
        if (!lastId || loading) return
        setLoading(true)
        const result = await FetchGalleryImg(category, lastId)
        setPhotos((prev) => [...prev, ...result.photos])
        setLastId(result.lastId)
        setLoading(false)
    }

    const handleDownload = async (photo: Photo) => {
        setDownloading(true)
        try {
            const url = (photo.url || photo.thumbnailUrl) as string;
            const res = await fetch(url);
            const blob = await res.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `VIHAN_${category}_${photo.id}.jpg`;
            a.click();
            URL.revokeObjectURL(a.href);
        } catch {
            // Fallback: open in new tab
            window.open(photo.url || photo.thumbnailUrl, '_blank');
        } finally {
            setDownloading(false)
        }
    }

    return (
        <section className={`w-full p-4 sm:p-6 ${cardbg}`}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-4 sm:pr-10">
                <div className={`h-6 sm:h-8 w-1.5 rounded-full ${accentColor}`} />
                <h2 className="text-[15px] sm:text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                <Link
                    href={`/gallery/${encodeURIComponent(category)}`}
                    className="ml-auto text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1"
                >
                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            </div>

            {photos.length === 0 ? (
                <p className="text-slate-400 text-sm py-10 text-center">No photos yet in this category.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[250px] sm:auto-rows-[300px] md:auto-rows-[350px]">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            onClick={() => setSelectedPhoto(photo)}
                            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Shimmer skeleton behind image */}
                            <div className="absolute inset-0 bg-slate-200 dark:bg-white/5 animate-shimmer" />
                            <div
                                className="absolute inset-0 bg-cover bg-top transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('${photo.thumbnailUrl}')` }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                                <h3 className="text-white text-md sm:text-xl font-bold">
                                    {photo.eventName ?? 'VIHAN'}
                                </h3>
                                <p className="text-slate-300 text-xs sm:text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                    {photo.category ?? 'Highlight moment'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Load More button at bottom */}
            {lastId && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
                    >
                        {loading ? (
                            <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Loading...</>
                        ) : (
                            <><span className="material-symbols-outlined text-sm">expand_more</span> Load More</>
                        )}
                    </button>
                </div>
            )}

            {/* ───── Lightbox Modal ───── */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => { setSelectedPhoto(null); setLightboxLoaded(false); }}
                >
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center animate-fade-in"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => { setSelectedPhoto(null); setLightboxLoaded(false); }}
                            className="absolute -top-2 -right-2 z-10 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Loading spinner */}
                        {!lightboxLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="size-10 rounded-full border-4 border-white/20 border-t-primary animate-spin" />
                            </div>
                        )}

                        {/* Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={selectedPhoto.url || selectedPhoto.thumbnailUrl}
                            alt={selectedPhoto.eventName ?? 'VIHAN Event'}
                            className={`max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl transition-opacity duration-300 ${lightboxLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setLightboxLoaded(true)}
                        />

                        {/* Info + Download bar */}
                        <div className="mt-4 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
                            <div className="text-white text-sm font-medium">
                                <span className="font-bold">{selectedPhoto.category}</span>
                                {selectedPhoto.uploaderName && (
                                    <span className="text-white/60 ml-2">by {selectedPhoto.uploaderName}</span>
                                )}
                            </div>
                            <button
                                onClick={() => handleDownload(selectedPhoto)}
                                disabled={downloading}
                                className="ml-auto flex items-center gap-1.5 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors disabled:opacity-60"
                            >
                                {downloading ? (
                                    <><span className="material-symbols-outlined text-lg animate-spin">sync</span> Downloading...</>
                                ) : (
                                    <><span className="material-symbols-outlined text-lg">download</span> Download</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

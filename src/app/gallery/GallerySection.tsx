"use client"
import { useState } from 'react'
import { FetchGalleryImg } from './fetchGalleryImg'

interface Photo {
    id: string;
    thumbnailUrl: string;
    eventName?: string;
    category?: string;
    [key: string]: unknown;
}

interface GallerySectionProps {
    title: string;
    accentColor: string;
    category: string;
    initialPhotos: Photo[];
    initialLastId: string | null;
    cardbg: string | null
}

export default function GallerySection({ title, accentColor, category, initialPhotos, initialLastId, cardbg}: GallerySectionProps) {
    const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
    const [lastId, setLastId] = useState<string | null>(initialLastId)
    const [loading, setLoading] = useState(false)

    const handleLoadMore = async () => {
        if (!lastId || loading) return
        setLoading(true)
        const result = await FetchGalleryImg(category, lastId)
        setPhotos((prev) => [...prev, ...result.photos])
        setLastId(result.lastId)
        setLoading(false)
    }

    return (
        <section className={`w-full p-4 sm:p-6 ${cardbg}`}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-4 sm:pr-10">
                <div className={`h-6 sm:h-8 w-1.5 rounded-full ${accentColor}`} />
                <h2 className="text-[15px] sm:text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                {lastId && (
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="ml-auto text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1 disabled:opacity-50"
                    >
                        {loading ? 'Loading…' : 'View All'}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                )}
            </div>

            {photos.length === 0 ? (
                <p className="text-slate-400 text-sm py-10 text-center">No photos yet in this category.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[250px] sm:auto-rows-[300px] md:auto-rows-[350px]">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('${photo.thumbnailUrl}')` }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                                <h3 className="text-white text-md sm:text-xl font-bold">
                                    {photo.eventName ?? 'Vihaan Event'}
                                </h3>
                                <p className="text-slate-300 text-xs sm:text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                                    {photo.category ?? 'Highlight moment'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

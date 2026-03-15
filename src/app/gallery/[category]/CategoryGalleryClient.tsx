"use client"
import { useState } from 'react'
import { FetchGalleryImgFullRes } from '../fetchGalleryImg'

interface Photo {
    id: string;
    fullUrl?: string;
    thumbnailUrl: string;
    url?: string;
    category?: string;
    uploaderName?: string;
    eventName?: string;
    [key: string]: unknown;
}

interface Props {
    category: string;
    initialPhotos: Photo[];
    initialLastId: string | null;
}

export default function CategoryGalleryClient({ category, initialPhotos, initialLastId }: Props) {
    const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
    const [lastId, setLastId] = useState<string | null>(initialLastId)
    const [loading, setLoading] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

    const handleLoadMore = async () => {
        if (!lastId || loading) return
        setLoading(true)
        const result = await FetchGalleryImgFullRes(category, lastId)
        setPhotos(prev => [...prev, ...result.photos])
        setLastId(result.lastId)
        setLoading(false)
    }

    const handleDownload = async (photo: Photo) => {
        try {
            const url = photo.fullUrl || photo.url || photo.thumbnailUrl;
            const res = await fetch(url);
            const blob = await res.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `VIHAN_${category}_${photo.id}.jpg`;
            a.click();
            URL.revokeObjectURL(a.href);
        } catch {
            window.open(photo.fullUrl || photo.url || photo.thumbnailUrl, '_blank');
        }
    }

    return (
        <>
            {photos.length === 0 ? (
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700 mb-4 block">photo_library</span>
                    <p className="text-slate-500 font-bold">No photos yet in this category.</p>
                    <p className="text-sm text-slate-400 mt-1">Check back later!</p>
                </div>
            ) : (
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            onClick={() => setSelectedPhoto(photo)}
                            className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 relative"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo.thumbnailUrl}
                                alt={photo.eventName ?? 'VIHAN Event'}
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-sm font-bold truncate">{photo.uploaderName ?? 'Photographer'}</p>
                                <p className="text-white/60 text-xs">{photo.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Load More */}
            {lastId && (
                <div className="text-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="px-8 py-3.5 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                    >
                        {loading ? (
                            <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Loading...</>
                        ) : (
                            <><span className="material-symbols-outlined text-sm">expand_more</span> Load More Photos</>
                        )}
                    </button>
                </div>
            )}

            {/* ───── Lightbox Modal ───── */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    <div
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center animate-fade-in"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute -top-2 -right-2 z-10 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Full-res image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={selectedPhoto.fullUrl || selectedPhoto.url || selectedPhoto.thumbnailUrl}
                            alt={selectedPhoto.eventName ?? 'VIHAN Event'}
                            className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                        />

                        {/* Info + Download bar */}
                        <div className="mt-4 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
                            <div className="text-white text-sm font-medium">
                                <span className="font-bold">{selectedPhoto.category}</span>
                                {selectedPhoto.uploaderName && (
                                    <span className="text-white/60 ml-2">by {selectedPhoto.uploaderName as string}</span>
                                )}
                            </div>
                            <button
                                onClick={() => handleDownload(selectedPhoto)}
                                className="ml-auto flex items-center gap-1.5 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">download</span>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

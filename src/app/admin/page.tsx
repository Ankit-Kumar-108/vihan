'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ApprovePhoto, BulkApprovePhotos } from './approvePhoto';
import GetPhoto from './getPhoto';
import DeletePhoto from './deletePhoto';
import { signOut } from 'next-auth/react';

interface PendingPhoto {
    id: string;
    timestamp: string
    cloudyId: string;
    fileName: string
    category: string;
    uploaderName: string;
    dataUrl: string;
    fullResImg: string
    status: 'pending' | 'published';
}

export default function AdminPage() {
    const [photos, setPhotos] = useState<PendingPhoto[]>([]);
    const [filter, setFilter] = useState<'pending' | 'published' | 'all'>('pending');
    const [selectedPhoto, setSelectedPhoto] = useState<PendingPhoto | null>(null);
    const [loading, setLoading] = useState(false)
    const [lastId, setLastId] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [bulkApproving, setBulkApproving] = useState(false);

    const loadPhotos = useCallback(async (reset = true) => {
        setLoading(true)
        const result = await GetPhoto(reset ? undefined : (lastId ?? undefined));
        if (reset) {
            setPhotos(result.photos as PendingPhoto[]);
        } else {
            setPhotos(prev => [...prev, ...(result.photos as PendingPhoto[])]);
        }
        setLastId(result.lastId);
        setHasMore(result.hasMore);
        setLoading(false)
    }, [lastId]);

    useEffect(() => {
        loadPhotos(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleApprove = async (photo: PendingPhoto) => {
        const approvedPhoto = await ApprovePhoto(photo.id)
        if (approvedPhoto.success) {
            setSelectedPhoto(null)
            setPhotos(prev => prev.map(p => p.id === photo.id ? { ...p, status: 'published' as const } : p));
        }
        else {
            alert("Approval failed. Check console")
        }
    };

    const bulkAction = async () => {
        const pendingPhotos = photos.filter((p) => p.status === 'pending');
        if (pendingPhotos.length === 0) return;

        setBulkApproving(true);
        try {
            const ids = pendingPhotos.map(p => p.id);
            // Firestore batch writes have a limit of 500 docs
            // Split into chunks if needed
            for (let i = 0; i < ids.length; i += 500) {
                const chunk = ids.slice(i, i + 500);
                const result = await BulkApprovePhotos(chunk);
                if (result.success) {
                    setPhotos(prev => prev.map(p =>
                        chunk.includes(p.id) ? { ...p, status: 'published' as const } : p
                    ));
                }
            }
        } catch (error) {
            alert("Bulk approval failed. Check console.");
        } finally {
            setBulkApproving(false);
        }
    };

    const deletePhoto = async (photo: PendingPhoto) => {
        const result = await DeletePhoto(photo.id, photo.cloudyId);

        if (result.success) {
            const updatedList = photos.filter((p) => p.id !== photo.id);
            setPhotos(updatedList);

            setSelectedPhoto(null);
        } else {
            alert("Failed to delete the photo from the database.");
        }
    };

    const filtered = filter === 'all' ? photos : photos.filter((p) => p.status === filter);
    const pendingCount = photos.filter((p) => p.status === 'pending').length;
    const approvedCount = photos.filter((p) => p.status === 'published').length;

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            {/* Top Bar */}
            <div className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="size-7 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-sm">bolt</span>
                            </div>
                            <span className="font-extrabold text-sm text-slate-800 dark:text-white">Vihaan 26</span>
                        </Link>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Admin Panel</span>
                    </div>
                    <button onClick={() => loadPhotos(true)} className="text-sm text-slate-500 hover:text-primary flex items-center gap-1 transition-colors">
                        <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>refresh</span>
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all font-medium"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Sign Out
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    <div className="glass-card rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{photos.length}{hasMore ? '+' : ''}</p>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">No. of Loaded Images</p>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center border-yellow-500/20">
                        <p className="text-2xl font-black text-yellow-500">{pendingCount}</p>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">No. of Pending Images</p>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center border-green-500/20">
                        <p className="text-2xl font-black text-green-500">{approvedCount}</p>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">No. of Approved Images</p>
                    </div>
                </div>

                {/* Filter bar + Bulk Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex gap-2">
                        {(['pending', 'published', 'all'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === f
                                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(157,54,247,0.3)]'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-primary'
                                    }`}
                            >
                                {f} {f === 'pending' && pendingCount > 0 && `(${pendingCount})`}
                            </button>
                        ))}
                    </div>
                    {pendingCount > 0 && filter === 'pending' && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => bulkAction()}
                                disabled={bulkApproving}
                                className="px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-bold hover:bg-green-500/20 transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                                {bulkApproving ? (
                                    <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Approving...</>
                                ) : (
                                    <><span className="material-symbols-outlined text-sm">done_all</span> Approve All</>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Photo Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700 mb-4 block">photo_library</span>
                        <p className="text-slate-500 font-bold">No {filter === 'all' ? '' : filter} photos</p>
                        <p className="text-sm text-slate-400 mt-1">Photos uploaded by users will appear here for review.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {filtered.map((photo) => (
                            <div
                                key={photo.id}
                                onClick={() => setSelectedPhoto(photo)}
                                className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer ring-1 ring-black/5 dark:ring-white/5 hover:ring-primary/50 transition-all hover:-translate-y-0.5"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={photo.dataUrl} alt={photo.fileName} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-2 left-2">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${photo.status === 'pending' ? 'bg-yellow-500/90 text-black' :
                                        photo.status === 'published' ? 'bg-green-500/90 text-white' :
                                            'bg-red-500/90 text-white'
                                        }`}>
                                        {photo.status}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-[10px] font-bold truncate">{photo.category}</p>
                                    <p className="text-white/70 text-[9px]">{photo.uploaderName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {hasMore && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => loadPhotos(false)}
                            disabled={loading}
                            className="px-8 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
                        >
                            {loading ? (
                                <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Loading...</>
                            ) : (
                                <><span className="material-symbols-outlined text-sm">expand_more</span> Load More Photos</>
                            )}
                        </button>
                    </div>
                )}
            </main>

            {/* ───── Photo Detail Modal ───── */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <div
                        className="relative bg-white dark:bg-[#1a1020] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className="aspect-video bg-slate-100 dark:bg-black">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={selectedPhoto.dataUrl} alt={selectedPhoto.fileName} className="w-full h-full object-contain" />
                        </div>

                        {/* Info */}
                        <div className="p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedPhoto.category}</h3>
                                    <p className="text-sm text-slate-500">by {selectedPhoto.uploaderName} • {new Date(selectedPhoto.timestamp).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${selectedPhoto.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                    selectedPhoto.status === 'published' ? 'bg-green-500/10 text-green-500' :
                                        'bg-red-500/10 text-red-500'
                                    }`}>
                                    {selectedPhoto.status}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                {selectedPhoto.status !== 'published' && (
                                    <button
                                        onClick={() => handleApprove(selectedPhoto)}
                                        className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <span className="material-symbols-outlined text-lg">check</span> Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => deletePhoto(selectedPhoto)}
                                    className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-500 hover:text-red-500 font-bold text-sm transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

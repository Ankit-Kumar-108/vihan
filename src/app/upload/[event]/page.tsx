'use client';
import React, { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const eventMeta: Record<string, { icon: string; color: string }> = {
    dance: { icon: 'settings_accessibility', color: 'from-blue-500 to-indigo-600' },
    music: { icon: 'music_note', color: 'from-pink-500 to-rose-600' },
    race: { icon: 'directions_run', color: 'from-orange-500 to-red-600' },
    debate: { icon: 'record_voice_over', color: 'from-yellow-500 to-amber-600' },
    badminton: { icon: 'sports_tennis', color: 'from-cyan-500 to-teal-600' },
    cricket: { icon: 'sports_cricket', color: 'from-green-500 to-emerald-600' },
    'fashion-show': { icon: 'checkroom', color: 'from-fuchsia-500 to-pink-600' },
    hackathon: { icon: 'terminal', color: 'from-violet-500 to-purple-600' },
    art: { icon: 'palette', color: 'from-amber-500 to-yellow-600' },
    poetry: { icon: 'edit_note', color: 'from-rose-500 to-pink-600' },
    drama: { icon: 'theater_comedy', color: 'from-indigo-500 to-blue-600' },
    quiz: { icon: 'quiz', color: 'from-teal-500 to-cyan-600' },
};

export default function UploadPage() {
    const params = useParams();
    const eventSlug = (params.event as string) || '';
    const eventName = eventSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const meta = eventMeta[eventSlug] || { icon: 'image', color: 'from-primary to-secondary-accent' };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [name, setName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;
        const imageFiles = Array.from(newFiles).filter((f) => f.type.startsWith('image/'));
        setFiles((prev) => [...prev, ...imageFiles]);
    };

    const removeFile = (idx: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) return;
        // Frontend-only: show success state
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-500 text-4xl">check_circle</span>
                    </div>
                    <h1 className="text-3xl font-black mb-3 text-slate-900 dark:text-white">Photos Uploaded!</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">
                        Thank you{name ? `, ${name}` : ''}! Your {files.length} photo{files.length > 1 ? 's' : ''} for{' '}
                        <strong className="text-primary">{eventName}</strong> have been submitted successfully.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setFiles([]);
                                setName('');
                            }}
                            className="py-3 px-6 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                        >
                            Upload More Photos
                        </button>
                        <Link
                            href="/"
                            className="py-3 px-6 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen register-page">
            {/* Top Bar */}
            <div className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10">
                <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="size-7 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-sm">bolt</span>
                        </div>
                        <span className="font-bold text-sm text-slate-800 dark:text-white">VIHAN 26</span>
                    </Link>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Photo Upload</span>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 py-10">
                {/* Event Badge */}
                <div className="text-center mb-8">
                    <div className={`inline-flex h-16 w-16 rounded-2xl bg-linear-to-br ${meta.color} items-center justify-center shadow-lg mb-4`}>
                        <span className="material-symbols-outlined text-white text-3xl">{meta.icon}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
                        Upload Photos
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        for <strong className="text-primary">{eventName}</strong> event
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Your Name (optional)</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">person</span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
                                placeholder="Enter your name"
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Dropzone */}
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            handleFiles(e.dataTransfer.files);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${dragOver
                            ? 'border-primary bg-primary/5 scale-[1.01]'
                            : 'border-slate-200 dark:border-white/10 hover:border-primary/40'
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFiles(e.target.files)}
                        />
                        <div className="h-14 w-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-bold mb-1">
                            Tap to select or drag & drop
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                            PNG, JPG, WEBP up to 10MB each
                        </p>
                    </div>

                    {/* Preview */}
                    {files.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                {files.length} photo{files.length > 1 ? 's' : ''} selected
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {files.map((file, idx) => (
                                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-100 dark:bg-white/5">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(idx);
                                            }}
                                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-white text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={files.length === 0}
                        className="w-full py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_25px_rgba(157,54,247,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Upload {files.length > 0 ? `${files.length} Photo${files.length > 1 ? 's' : ''}` : 'Photos'}
                    </button>
                </form>
            </main>
        </div>
    );
}

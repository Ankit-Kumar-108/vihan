'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Nav from '../components/nav/nav';
import Footer from '../components/footer/footer';
import { useSettings } from '@/hooks/useSettings';

const categories = [
    { name: 'Dance', icon: 'settings_accessibility', color: 'from-blue-500 to-indigo-600' },
    { name: 'Singing', icon: 'music_note', color: 'from-pink-500 to-rose-600' },
    // { name: 'Race', icon: 'directions_run', color: 'from-orange-500 to-red-600' },
    { name: 'Technical', icon: 'developer_mode_tv', color: 'from-yellow-500 to-amber-600' },
    // { name: 'Badminton', icon: 'sports_tennis', color: 'from-cyan-500 to-teal-600' },
    { name: 'Sports', icon: 'sports_cricket', color: 'from-green-500 to-emerald-600' },
    { name: 'Fashion', icon: 'checkroom', color: 'from-fuchsia-500 to-pink-600' },
    // { name: 'Hackathon', icon: 'terminal', color: 'from-violet-500 to-purple-600' },
    // { name: 'Art', icon: 'palette', color: 'from-amber-500 to-yellow-600' },
    // { name: 'Poetry', icon: 'edit_note', color: 'from-rose-500 to-pink-600' },
    // { name: 'Drama', icon: 'theater_comedy', color: 'from-indigo-500 to-blue-600' },
    // { name: 'Quiz', icon: 'quiz', color: 'from-teal-500 to-cyan-600' },
];

// Cloudinary direct upload config (not secrets — safe for client)
const CLOUDINARY_CLOUD_NAME = 'danc85c3y';
const CLOUDINARY_UPLOAD_PRESET = 'vihanEventUpload';

export default function UploadPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [name, setName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const { settings, loaded: settingsLoaded } = useSettings();
    const uploadEnabled = settings.uploadEnabled;

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        const all = Array.from(newFiles).filter(f => f.type.startsWith('image/'));
        const valid = all.filter(f => f.size <= MAX_SIZE);
        const rejected = all.filter(f => f.size > MAX_SIZE);

        if (rejected.length > 0) {
            alert(`${rejected.length} file(s) exceed the 10MB limit and were skipped:\n${rejected.map(f => `• ${f.name}`).join('\n')}`);
        }

        setFiles(prev => [...prev, ...valid]);
    };

    const removeFile = (idx: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory || files.length === 0 || isUploading) return;

        setIsUploading(true);

        try {
            // Step 1: Pre-check — ask the server how many uploads this IP has left
            const checkRes = await fetch('/api/upload');
            const { remaining, limit } = await checkRes.json();

            if (remaining <= 0) {
                alert(`Upload limit reached. You can only submit ${limit} photos total.`);
                return;
            }

            // Only upload as many files as the remaining quota allows
            const filesToUpload = files.slice(0, remaining);
            if (filesToUpload.length < files.length) {
                alert(`You can only upload ${remaining} more photo(s). Uploading the first ${remaining}.`);
            }

            for (let i = 0; i < filesToUpload.length; i++) {
                const file = filesToUpload[i];
                setUploadProgress({ current: i + 1, total: filesToUpload.length });
                // Step 2: Upload directly to Cloudinary from the browser
                const cloudFormData = new FormData();
                cloudFormData.append('file', file);
                cloudFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                cloudFormData.append('public_id', `${selectedCategory}_${Date.now()}_${file.name.split('.')[0]}`);

                const cloudRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: cloudFormData }
                );

                if (!cloudRes.ok) {
                    const err = await cloudRes.json();
                    throw new Error(err?.error?.message || 'Cloudinary upload failed');
                }

                const cloudData = await cloudRes.json();

                // Step 3: Send only metadata to your API (tiny JSON, no file)
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        url: cloudData.secure_url,
                        cloudyId: cloudData.public_id,
                        category: selectedCategory,
                        uploaderName: name,
                        fileName: file.name,
                    }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to save upload metadata');
                }
            }
            setSubmitted(true);
        } catch (error: any) {
            console.error("Upload failed:", error);
            alert(error.message ?? "Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };


    if (!settingsLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined animate-spin text-primary text-3xl">sync</span>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col items-center justify-center px-4 register-page">
                <div className="text-center max-w-md animate-fade-in">
                    <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-400 text-5xl">check_circle</span>
                    </div>
                    <h1 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">Submitted for Review!</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-2 text-lg">
                        {files.length} photo{files.length > 1 ? 's' : ''} uploaded to
                        <strong className="text-primary"> {selectedCategory}</strong>
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm mb-8">
                        Your photos will appear on the gallery once approved by the admin.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setFiles([]);
                                setName('');
                                setSelectedCategory(null);
                                setStep(1);
                            }}
                            className="py-3.5 px-6 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(157,54,247,0.3)]"
                        >
                            Upload More Photos
                        </button>
                        <Link
                            href="/"
                            className="py-3.5 px-6 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-center"
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
            <Nav />
            {!uploadEnabled ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20">
                    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-400/20 bg-background-light/80 p-8 shadow-2xl backdrop-blur-md dark:border-slate-100/10 dark:bg-background-dark/80">

                        {/* Decorative background glow */}
                        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative">
                            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Uploads are currently paused for <br />
                                <span className="bg-linear-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                                    {new Date().getFullYear()}
                                </span>
                            </h2>

                            <button className="ml-auto mt-2 block text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                                Contact Admin →
                            </button>
                        </div>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/"
                                className="flex-1 rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
                            >
                                Back Home
                            </Link>
                            <Link
                                href="/gallery"
                                className="flex-1 rounded-xl border border-slate-200 bg-white/50 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                To Gallery
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="sticky ">
                        <div className="max-w-3xl mx-auto flex items-center justify-between h-16 ml-1/2">
                            <Link href="/" className="flex items-center gap-2">
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <div className={`h-2.5 w-2.5 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-slate-600'} transition-colors`} />
                                    <div className={`h-0.5 w-6 ${step >= 2 ? 'bg-primary' : 'bg-slate-700'} rounded-full transition-colors`} />
                                    <div className={`h-2.5 w-2.5 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-600'} transition-colors`} />
                                </div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:block">
                                    Step {step} of 2
                                </span>
                            </div>
                        </div>
                    </div>

                    <main className="max-w-3xl mx-auto px-4 py-10">
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <div className="text-center mb-10">
                                    <div className="h-16 w-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-3xl">category</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                        Select Event Category
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        Which event are your photos from?
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.name}
                                            onClick={() => {
                                                setSelectedCategory(cat.name);
                                                setStep(2);
                                            }}
                                            className={`group relative rounded-2xl p-5 text-left border transition-all duration-200 active:scale-95 ${selectedCategory === cat.name
                                                ? 'border-primary/60 bg-primary/5 ring-2 ring-primary/20'
                                                : 'border-slate-200 dark:border-white/8 hover:border-primary/30 bg-white/50 dark:bg-white/3 hover:bg-primary/5'
                                                }`}
                                        >
                                            <div className={`h-11 w-11 rounded-xl bg-linear-to-br ${cat.color} flex items-center justify-center shadow-md mb-3`}>
                                                <span className="material-symbols-outlined text-white text-xl">{cat.icon}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{cat.name}</h4>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && selectedCategory && (
                            <div className="animate-fade-in">
                                <div className="text-center mb-10">
                                    <button
                                        onClick={() => !isUploading && setStep(1)}
                                        className="inline-flex items-center gap-1 text-sm text-primary font-bold mb-5 hover:gap-2 transition-all disabled:opacity-50"
                                        disabled={isUploading}
                                    >
                                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                                        Change Category
                                    </button>

                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className={`h-10 w-10 rounded-xl bg-linear-to-br ${categories.find(c => c.name === selectedCategory)?.color} flex items-center justify-center shadow-md`}>
                                            <span className="material-symbols-outlined text-white text-xl">
                                                {categories.find(c => c.name === selectedCategory)?.icon}
                                            </span>
                                        </div>
                                        <span className="text-lg font-bold text-slate-800 dark:text-white">{selectedCategory}</span>
                                    </div>

                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                        Upload Your Photos
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        Select multiple photos to submit for approval
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2 flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-2">Your Name</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                                            <input
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isUploading}
                                                className="w-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white disabled:opacity-50"
                                                placeholder="Enter your name"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        onDragOver={(e) => { e.preventDefault(); !isUploading && setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={(e) => { e.preventDefault(); setDragOver(false); !isUploading && handleFiles(e.dataTransfer.files); }}
                                        onClick={() => !isUploading && fileInputRef.current?.click()}
                                        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${dragOver
                                            ? 'border-primary bg-primary/5 scale-[1.01]'
                                            : 'border-slate-200 dark:border-white/10 hover:border-primary/40 hover:bg-primary/3'
                                            }`}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            disabled={isUploading}
                                            onChange={(e) => handleFiles(e.target.files)}
                                        />
                                        <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-4xl">
                                                {isUploading ? 'sync' : 'cloud_upload'}
                                            </span>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 font-bold text-lg mb-1">
                                            {isUploading ? 'Uploading in progress...' : 'Tap to select photos'}
                                        </p>
                                        <p className="text-sm text-slate-400 dark:text-slate-500">
                                            or drag & drop • PNG, JPG, WEBP • up to 10MB each
                                        </p>
                                    </div>

                                    {files.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    {files.length} photo{files.length > 1 ? 's' : ''} selected
                                                </p>
                                                {!isUploading && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setFiles([])}
                                                        className="text-xs text-red-400 hover:text-red-300 font-bold"
                                                    >
                                                        Clear All
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                                                {files.map((file, idx) => (
                                                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-100 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/5">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={file.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                                                        {!isUploading && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                                                className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <span className="material-symbols-outlined text-white text-sm">close</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
                                        <span className="material-symbols-outlined text-amber-500 text-lg mt-0.5">info</span>
                                        <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
                                            All photos go through admin review before appearing on the gallery.
                                            Please upload appropriate content only.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={files.length === 0 || isUploading || !name}
                                        className="w-full py-4 rounded-full bg-linear-to-r from-primary to-secondary-accent text-white font-bold text-lg shadow-[0_0_30px_rgba(157,54,247,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(238,43,140,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                                    >
                                        {isUploading && (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {isUploading
                                            ? `Uploading ${uploadProgress.current} of ${uploadProgress.total}...`
                                            : `Submit ${files.length} Photo${files.length > 1 ? 's' : ''} for Review`
                                        }
                                    </button>
                                </form>
                            </div>
                        )}
                    </main>
                </>
            )}
            <Footer />
        </div>
    );

}
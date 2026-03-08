'use client';
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function QRUploadSection() {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const uploadUrl = `${baseUrl}/upload`;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder with the same dimensions so the layout doesn't jump
        return <div style={{ width: 200, height: 200 }} />;
    }

    return (
        <section id="share-photos" className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto ">
            <div className="relative rounded-[2rem] overflow-hidden bg-white dark:bg-transparent shadow-[0px_15px_10px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0px_15px_10px_-3px_rgba(0,0,0,0.2)] trnasition-all duration-200 hover:-translate-y-2.5">
                {/* Gradient background */}
                <div className="absolute inset-0 dark:bg-linear-to-br dark:from-primary/20 dark:via-background-dark dark:to-secondary-accent/20" />
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute top-0 right-0 w-80 h-80 dark:bg-primary/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-80 h-80 dark:bg-secondary-accent/15 rounded-full blur-[100px]" />

                <div className="relative p-8 md:p-16">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left — Text Content */}
                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/20 border-slate-400/30 dark:bg-white/5 border dark:border-white/10 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-secondary-accent text-sm">photo_camera</span>
                                <span className="text-xs font-bold text-secondary-accent tracking-wide uppercase">Community Gallery</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white leading-tight">
                                Captured a moment?{' '}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary-accent to-primary">
                                    Share it!
                                </span>
                            </h2>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Scan the QR code to upload your best event photos. Pick a category, select your pictures,
                                and once approved they&apos;ll appear in the official Vihaan 2k26 gallery.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">cloud_upload</span>
                                    <span>Upload multiple photos</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">category</span>
                                    <span>Choose event category</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">verified</span>
                                    <span>Admin approved</span>
                                </div>
                            </div>
                        </div>

                        {/* Right — QR Code */}
                        <div className="shrink-0">
                            <div className="relative group">
                                {/* Glow Ring */}
                                <div className="absolute -inset-4 bg-linear-to-r from-secondary-accent via-primary to-secondary-accent rounded-[2rem] opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500" />

                                <Link href={"/upload"}>
                                <div className="relative glass-card rounded-3xl p-8 text-center border-white/10">
                                    <div className="bg-white rounded-2xl p-5 mb-5 inline-block shadow-lg">
                                        <QRCodeSVG
                                            value={uploadUrl}
                                            size={200}
                                            bgColor="#ffffff"
                                            fgColor="#1a1a2e"
                                            level="H"
                                            includeMargin={false}
                                        />
                                    </div>
                                    <p className="dark:text-white font-bold text-black text-sm mb-1">Scan with your camera</p>
                                   <p className="text-slate-500 text-xs">or visit  <span className="text-primary font-semibold">/upload</span></p>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

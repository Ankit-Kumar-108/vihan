'use client';
import React from 'react';

const stats = [
    { icon: 'group', value: '1,000+', label: 'Attendees' },
    { icon: 'festival', value: '35+', label: 'Events' },
    { icon: 'today', value: '3', label: 'Epic Days' },
    { icon: 'account_balance', value: '5+', label: 'Colleges' },
];

export default function About() {
    return (
        <section id="about" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left — Text */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <span className="material-symbols-outlined text-primary text-sm">info</span>
                        <span className="text-xs font-bold text-primary tracking-wide uppercase">About The Fest</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        Where Talent Meets{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary-accent">
                            Opportunity
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                        VIHAN 2k26 is the annual cultural and technical festival organized by
                        <strong className="text-purple-500 dark:text-purple-400"> RADHARAMAN GROUP OF INSTITUTES</strong>.
                        From electrifying pro-nights to adrenaline-pumping sports, from intellectual debates to creative
                        art showcases — Vihaan is the ultimate celebration of youth, innovation, and energy.
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        Over three thrilling days, students from 4+ colleges come together to compete, collaborate,
                        and create memories that last a lifetime.
                    </p>
                </div>

                {/* Right — Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="group glass-card rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="h-14 w-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-[0_0_25px_rgba(157,54,247,0.4)] transition-all duration-300">
                                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-white transition-colors">
                                    {stat.icon}
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

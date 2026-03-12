'use client';
import React from 'react';
import Link from 'next/link';

const events = [
    { name: 'Music', icon: 'music_note', desc: 'Solo & Team performances', gradient: 'from-pink-600/80 via-rose-500/70 to-orange-400/80', tag: 'Cultural' },
    { name: 'Dance', icon: 'settings_accessibility', desc: 'Classical, Western & Hip-Hop', gradient: 'from-blue-600/80 via-indigo-500/70 to-violet-400/80', tag: 'Cultural' },
    { name: 'Debate', icon: 'record_voice_over', desc: 'English & Hindi debate', gradient: 'from-yellow-500/80 via-amber-500/70 to-orange-500/80', tag: 'Literary' },
    { name: 'Cricket', icon: 'sports_cricket', desc: 'T10 tournament', gradient: 'from-emerald-600/80 via-green-500/70 to-teal-400/80', tag: 'Sports' },
    { name: 'Badminton', icon: 'sports_tennis', desc: 'Singles & Doubles', gradient: 'from-cyan-600/80 via-cyan-500/70 to-teal-400/80', tag: 'Sports' },
    { name: 'Race', icon: 'directions_run', desc: '100m, 200m & Relay', gradient: 'from-orange-600/80 via-red-500/70 to-rose-400/80', tag: 'Sports' },
    { name: 'Hackathon', icon: 'terminal', desc: '24-hour coding marathon', gradient: 'from-violet-600/80 via-purple-500/70 to-fuchsia-400', tag: 'Tech' },
    { name: 'Fashion Show', icon: 'checkroom', desc: 'Vogue Runway challenge', gradient: 'from-fuchsia-600/80 via-pink-500/70 to-rose-400/80', tag: 'Cultural' },
    { name: 'Art', icon: 'palette', desc: 'Painting & Sketching', gradient: 'from-amber-500/80 via-yellow-500/70 to-lime-400', tag: 'Cultural' },
    { name: 'Poetry', icon: 'edit_note', desc: 'Slam & open mic poetry', gradient: 'from-rose-600/80 via-pink-500 to-fuchsia-400/80', tag: 'Literary' },
    { name: 'Drama', icon: 'theater_comedy', desc: 'Skit & Nukkad Natak', gradient: 'from-indigo-600/80 via-blue-500 to-cyan-400/80', tag: 'Cultural' },
    { name: 'Quiz', icon: 'quiz', desc: 'General & Technical quiz', gradient: 'from-teal-600/80 via-emerald-500 to-green-400/80', tag: 'Literary' },
];

export default function EventsShowcase() {
    return (
        <section id="all-events" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-accent/10 border border-secondary-accent/20 mb-4">
                    <span className="material-symbols-outlined text-secondary-accent text-sm">star</span>
                    <span className="text-xs font-bold text-secondary-accent tracking-wide uppercase">All Events</span>
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

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {events.map((event) => (
                    <div
                        key={event.name}
                        className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${event.gradient} p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]`}
                    >
                        {/* Decorative circles */}
                        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/15 group-hover:scale-160 transition-transform duration-500" />
                        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/15 group-hover:scale-180 transition-transform duration-700" />
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 group-hover:bg-white/20 transition-all duration-500" />

                        {/* Tag */}
                        <span className="relative text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-4">
                            {event.tag}
                        </span>

                        {/* Event Name */}
                        <h3 className="relative text-2xl font-black text-white uppercase tracking-widest mb-2">
                            {event.name}
                        </h3>

                        {/* Description */}
                        <p className="relative text-sm text-white/70 mb-6">
                            {event.desc}
                        </p>

                        {/* Details Link */}
                        <Link
                            href={`/events/${event.name}`}
                            className="relative text-white/50 hover:text-white font-medium mb-6 transition-all text-sm"
                        >
                            Details →
                        </Link>

                        {/* Register Button */}
                        <Link
                            href={`/register?event=${encodeURIComponent(event.name)}`}
                            className="relative w-full bg-white/30 hover:bg-white/40 backdrop-blur-md text-white font-bold py-3.5 px-8 rounded-full transition-all active:scale-95 tracking-wide text-sm text-center"
                        >
                            Register
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

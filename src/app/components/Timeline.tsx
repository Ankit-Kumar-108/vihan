'use client';

import Link from "next/link";

const schedule = [
    {
        title: 'Sports',
        desc: 'Where Sweat meets Success',
        theme: 'Victory',
        events: [
            { link:'/register' ,title: 'Tug of War', icon: 'sports_gymnastics' },
            { link:'/register' ,title: 'Badminton', icon: 'sports_tennis' },
            { link:'/register' ,title: 'Carrom', icon: 'casino' },
            { link:'/register' ,title: 'Chess', icon: 'extension' },
            { link:'/register' ,title: 'Arm Wrestling', icon: 'fitness_center' },
            { link:'/register' ,title: 'Kho Kho', icon: 'directions_run' },
            { link:'/register' ,title: 'Kabaddi', icon: 'sports_martial_arts' },
            { link:'/register' ,title: 'Treasure Hunt', icon: 'map' },
            { link:'/register' ,title: 'Slow Bike Race', icon: 'two_wheeler' },
            { link:'/register' ,title: 'Shot Put', icon: 'sports_baseball' },
            { link:'/register' ,title: 'Sports Parade', icon: 'celebration' },
            { link:'/register' ,title: 'Lemon Spoon Race', icon: 'restaurant' },
            { link:'/register' ,title: 'Volleyball', icon: 'sports_volleyball' },
            { link:'/register' ,title: 'Race (100M/ 400M)', icon: 'sprint' },
            { link:'/register' ,title: 'Gully Cricket', icon: 'sports_cricket' },
        ],
        accent: 'from-orange-500 to-rose-600', // Fiery, aggressive
    },
    {
        title: 'Technical',
        desc: 'Unleashing the Future',
        theme: 'Blaze',
        events: [
            { link:'/register' ,title: 'Technical Presentation', icon: 'co_present' },
            { link:'/register' ,title: 'Painting', icon: 'palette' },
            { link:'/register' ,title: 'Reels', icon: 'smart_display' },
            { link:'/register' ,title: 'Extempore', icon: 'mic_external_on' },
            { link:'/register' ,title: 'Debate', icon: 'forum' },
            { link:'/register' ,title: 'Model Presentaion', icon: 'architecture' },
            { link:'/register' ,title: 'Photography/ College', icon: 'photo_camera' },
            { link:'/register' ,title: 'LAN Gaming', icon: 'sports_esports' },
            { link:'/register' ,title: 'Poster Making', icon: 'brush' },
            { link:'/register' ,title: 'Quiz (General & Technical', icon: 'quiz' },
        ],
        accent: 'from-blue-600 to-cyan-500', // Electric Cyber Blue
    },
    {
        title: 'Cultural',
        desc: 'Celebrating the melting Pot',
        theme: 'Ignition',
        events: [
            { link:'/register' ,title: 'Singing (Solo And Duet)', icon: 'mic' },
            { link:'/register' ,title: 'Mimicry', icon: 'record_voice_over' },
            { link:'/register' ,title: 'Skit', icon: 'theater_comedy' },
            { link:'/register' ,title: 'Dance (Solo And Group)', icon: 'music_note' },
            { link:'/register' ,title: 'Fashion Show', icon: 'styler' },
            { link:'/register' ,title: 'Poetry Competation (Self Composed)', icon: 'edit_note' },
        ],
        accent: 'from-violet-600 to-fuchsia-600', // Deep Royal Violet to Neon Pink
    },
    {
        title: 'Art Villa',
        desc: 'Your story, our canvas',
        theme: 'Soul',
        events: [
            { link:'/register' ,title: 'Nail Painting', icon: 'back_hand' },
            { link:'/register' ,title: 'Face Painting', icon: 'face_retouching_natural' },
            { link:'/register' ,title: 'Mehandi', icon: 'draw' },
            { link:'/register' ,title: 'Rangoli', icon: 'filter_vintage' },
        ],
        accent: 'from-emerald-500 to-teal-600', // Creative, smooth emerald green
    },
];

export default function Timeline() {
    return (
        <section id="schedule" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
                    <span className="text-xs font-bold text-primary tracking-wide uppercase">Festival Schedule</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
                    Categories of{' '}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary-accent">
                        Non-Stop Action
                    </span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Plan your VIHAN experience — here&apos;s what&apos;s happening each title.
                </p>
            </div>

            {/* Timeline Cards */}
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
                {schedule.map((title) => (
                    <div key={title.title} className="glass-card rounded-2xl overflow-hidden hover:border-primary/70 transition-all duration-300 group break-inside-avoid mb-6">
                        {/* title Header */}
                        <div className={`bg-linear-to-r ${title.accent} p-6`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-white">{title.title}</h3>
                                    <p className="text-white/70 text-sm font-medium">{title.desc}</p>
                                </div>
                                <span className="text-white/80 text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                    {title.theme}
                                </span>
                            </div>
                        </div>

                        {/* Events List */}
                        <div className="p-5 space-y-0 h-auto">
                            {title.events.map((event, idx) => (
                                <Link
                                    key={idx}
                                    href={event.link}
                                    className="flex items-center gap-3 py-3 border-b border-slate-200 dark:border-white/20 hover:border-primary dark:hover:border-primary last:border-0"
                                >
                                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-lg">{event.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{event.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

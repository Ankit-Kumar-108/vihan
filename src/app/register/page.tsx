'use client';
import Nav from '../components/nav/nav';
import Footer from '../components/footer/footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSettings } from '@/hooks/useSettings';
const subEventsMap: Record<string, string[]> = {
    "Sports": ["Tug of War", "Badminton", "Carrom", "Chess", "Arm Wrestling", "Kho Kho", "Kabaddi", "Treasure Hunt", "Slow Bike Race", "Shot Put", "Sports Parade", "Lemon Spoon Race", "Volleyball", "Race (100M/ 400M)", "Gully Cricket"],
    "Technical": ["Technical Presentation", "Painting", "Reels", "Extempore", "Debate", "Model Presentaion", "Photography/ College", "LAN Gaming", "Poster Making", "Quiz (General & Technical)"],
    "Cultural": ["Singing (Solo And Duet)", "Mimicry", "Skit", "Dance (Solo And Group)", "Fashion Show", "Poetry Competation (Self Composed)"],
    "Art Villa": ["Nail Painting", "Face Painting", "Mehandi", "Rangoli"]
};

export default function RegisterPage() {
    const { settings, loaded: settingsLoaded } = useSettings();
    const isToggle = !settings.registrationEnabled;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        enrollment: '',
        phone: '',
        department: '',
        event: '',
        subEvent: '',
    });
    const [teamMembers, setTeamMembers] = useState([{ name: '', enrollment: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
                setFormData({ name: '', email: '', enrollment: '', phone: '', department: '', event: '', subEvent: '' });
                setTeamMembers([{ name: '', enrollment: '' }]);
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    event: formData.subEvent ? `${formData.event} / ${formData.subEvent}` : formData.event,
                    teamMembers: teamMembers.filter(m => m.name.trim() !== '' || m.enrollment.trim() !== ''),
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Network Issue');
            }
            if (!formData.event || !formData.subEvent) {
                throw new Error('Please select both a category and a specific event');
            }
            setIsSuccess(true);
        } catch (error) {
            setError('Failed to register. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    {/* Success Overlay */ }
    const successOverlay = isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">

            <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-14 max-w-md w-[90%] text-center shadow-[0_0_60px_rgba(157,54,247,0.2)] animate-[scaleIn_0.4s_ease-out]">
                {/* Animated checkmark circle */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.4)] animate-[bounceIn_0.5s_ease-out]">
                    <svg className="w-12 h-12 text-white animate-[drawCheck_0.5s_ease-out_0.3s_both]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-3xl font-black mb-3 bg-linear-to-r from-white via-primary to-secondary-accent bg-clip-text text-transparent">
                    Registration Successful!
                </h2>
                <p className="text-slate-300 mb-2 text-lg">Welcome<span className="font-bold text-white">{formData.name}</span>!</p>
                <p className="text-slate-400 text-sm mb-8">You&apos;re registered for <span className="font-semibold text-primary">{formData.event}</span></p>

                {/* Countdown progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-primary to-secondary-accent rounded-full animate-[shrink_5s_linear_forwards]" />
                </div>
                <p className="text-slate-500 text-xs mt-3">Auto-closing in a moment...</p>
            </div>
        </div>
    );


    if (!settingsLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined animate-spin text-primary text-3xl">sync</span>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display register-page">
            {successOverlay}
            {/* Header Section */}
            <Nav />
            <main className="pt-32 pb-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <h2 className="h-20  text-3xl sm:text-5xl  font-black mb-7 bg-linear-to-r from-slate-900 via-primary to-secondary-accent dark:from-white dark:via-primary dark:to-secondary-accent bg-clip-text text-transparent">
                            VIHAN 2026 Registration
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto ">
                            Ignite your passion and showcase your talent. Join the biggest cultural extravaganza of the year.
                        </p>
                    </div>
                    {/* Form Container */}
                    <div className="glass-card rounded-lg p-8 md:p-12 shadow-2xl border-white/5 bg-white/5">
                        <form className="space-y-10" onSubmit={handleSubmit}>
                            {/* Step 1: Personal Details Section */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                                    <h3 className="text-2xl font-bold">Personal Details</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-100 ml-1">Full Name</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-300 group-focus-within:text-primary">person</span>
                                            <input
                                                className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
                                                placeholder="Enter Name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-100 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-300 group-focus-within:text-primary">mail</span>
                                            <input
                                                className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
                                                placeholder="your@gmail.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-100 ml-1">Enrollment Number</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-300 group-focus-within:text-primary">badge</span>
                                            <input
                                                className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
                                                placeholder="Enter Your Enrollemnt"
                                                type="text"
                                                value={formData.enrollment}
                                                onChange={(e) => setFormData({ ...formData, enrollment: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-100 ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-300 group-focus-within:text-primary">badge</span>
                                            <input
                                                className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
                                                placeholder="Enter Contact Details"
                                                type="text"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-100 ml-1">Department</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-300 group-focus-within:text-primary">account_tree</span>
                                            <select
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                required
                                                className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-400 appearance-none">
                                                <option className='bg-slate-100 dark:bg-background-dark' value="" disabled >Select Department</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Computer Science Engineering (REC)">Computer Science Engineering (REC)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Mechanical Engineering (REC)">Mechanical Engineering (REC)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Civil Engineering (REC)">Civil Engineering (REC)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Electrical Engineering (REC)">Electrical Engineering (REC)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Computer Science Engineering (RITS)">Computer Science Engineering (RITS)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Mechanical Engineering (RITS)">Mechanical Engineering (RITS)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Civil Engineering (RITS)">Civil Engineering (RITS)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Electrical Engineering (RITS)">Electrical Engineering (RITS)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="BAHMS (RAMCRH)">BAHMS (RAMCRH)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Nursing (RIN)">Nursing (RIN)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Pharmacy (RCP)">Pharmacy (RCP)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Pharmacy (RIPS)">Pharmacy (RIPS)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="Diploma (REC)">Diploma (REC)</option>
                                                <option className='bg-slate-100 dark:bg-background-dark' value="MBA (REC)">MBA (REC)</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Event Selection */}
                            <div className="space-y-8 ">
                                <div className="flex items-center gap-3 border-l-4 border-secondary-accent pl-4">
                                    <h3 className="text-2xl font-bold">Select Your Event</h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div
                                        onClick={() => setFormData({ ...formData, event: "Cultural", subEvent: "" })}

                                        className={`bg-background-light overflow-hidden dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all ${formData.event === "Cultural" ? `ring-2 ring-primary border border-primary bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20` : ``}`}>
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary transition-colors duration-400 ${formData.event === "Cultural" ? `bg-primary` : `bg-primary/20`}`}>
                                            <span className={`material-symbols-outlined group-hover:text-white ${formData.event === "Cultural" ? `text-white` : `text-primary`}`}>theater_comedy</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Cultural</h4>
                                        <p className="text-[10px] text-slate-400">Dance/Music/Drama</p>
                                    </div>

                                    <div
                                        onClick={() => setFormData({ ...formData, event: "Technical", subEvent: "" })}
                                        className={`bg-background-light overflow-hidden dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all ${formData.event === "Technical" ? `ring-2 ring-primary border border-primary bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20` : ``}`}>
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors duration-400 ${formData.event === "Technical" ? `bg-blue-500` : `bg-blue-500/20`}`}>
                                            <span className={`material-symbols-outlined group-hover:text-white ${formData.event === "Technical" ? `text-white` : `text-blue-500`}`}>terminal</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Technical</h4>
                                        <p className="text-[10px] text-slate-400">Coding/Gaming/Presentations</p>
                                    </div>

                                    <div
                                        onClick={() => setFormData({ ...formData, event: "Sports", subEvent: "" })}
                                        className={`bg-background-light dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all ${formData.event === "Sports" ? `ring-2 ring-primary border border-primary bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20` : ``}`}>
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-500 transition-colors duration-400 ${formData.event === "Sports" ? `bg-purple-500` : `bg-purple-500/20`}`}>
                                            <span className={`material-symbols-outlined group-hover:text-white ${formData.event === "Sports" ? `text-white` : `text-purple-500`}`}>emoji_events</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Sports</h4>
                                        <p className="text-[10px] text-slate-400">Indoor/Outdoor/Athletics</p>
                                    </div>

                                    <div
                                        onClick={() => setFormData({ ...formData, event: "Art Villa", subEvent: "" })}
                                        className={`bg-background-light dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all ${formData.event === "Art Villa" ? `ring-2 ring-primary border border-primary bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20` : ``}`}>
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-500 transition-colors duration-400 ${formData.event === "Art Villa" ? `bg-yellow-500` : `bg-yellow-500/20`}`}>
                                            <span className={`material-symbols-outlined group-hover:text-white ${formData.event === "Art Villa" ? `text-white` : `text-yellow-500`}`}>palette</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Art Villa</h4>
                                        <p className="text-[10px] text-slate-400">Painting/Mehandi/Rangoli</p>
                                    </div>
                                </div>

                                {/* Sub-Event Dropdown */}
                                {formData.event && (
                                    <div className="mt-6 animate-[fadeIn_0.3s_ease-out]">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-100 ml-1">
                                            Choose Specific Event
                                        </label>
                                        <select
                                            value={formData.subEvent}
                                            onChange={(e) => setFormData({ ...formData, subEvent: e.target.value })}
                                            required
                                            className="w-full mt-2 bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-4 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-gray-400 appearance-none"
                                        >
                                            <option className='bg-slate-100 dark:bg-background-dark' disabled value="">Select Sub-Event...</option>
                                            {subEventsMap[formData.event]?.map((sub) => (
                                                <option key={sub} className='bg-slate-100 dark:bg-background-dark' value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Step 3: Team Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 border-l-4 border-secondary-accent pl-4">
                                        <h3 className="text-2xl font-bold">Add Team Members</h3>
                                    </div>
                                    <button className="text-primary flex items-center gap-1 font-bold text-sm"
                                        onClick={() => setTeamMembers([...teamMembers, { name: '', enrollment: '' }])}
                                        type="button">
                                        <span className="material-symbols-outlined text-sm">add_circle</span> Add Member
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Team Member Row */}
                                    {teamMembers.map((member, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-background-light dark:bg-background-dark border border-slate-300 dark:border-white/15">
                                            <div className="flex-1 grid md:grid-cols-2 gap-4">
                                                <input
                                                    className="bg-transparent border-b border-slate-200 dark:border-white/20 py-2 focus:border-primary focus:ring-0 outline-none text-md transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400"
                                                    placeholder="Member Name"
                                                    type="text"
                                                    value={member.name}
                                                    onChange={(e) => { const updated = [...teamMembers]; updated[index].name = e.target.value; setTeamMembers(updated) }}
                                                />
                                                <input
                                                    className="bg-transparent border-b border-slate-200 dark:border-white/20 py-2 focus:border-primary focus:ring-0 outline-none text-md transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400"
                                                    placeholder="Member Enrollment Number"
                                                    type="text"
                                                    value={member.enrollment}
                                                    onChange={(e) => { const updated = [...teamMembers]; updated[index].enrollment = e.target.value; setTeamMembers(updated) }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors" type="button">
                                                <span className="material-symbols-outlined text-red-500/50">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Area */}
                            <div className="pt-10 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-200 dark:border-white/10">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <span>All fields are mandatory for individual events.</span>
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <button
                                        disabled={isToggle}
                                        className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white px-12 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(157,54,247,0.3)] transition-all transform hover:-translate-y-1" type="submit">
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {isToggle && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20">
                        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-400/20 bg-background-light/80 p-8 shadow-2xl backdrop-blur-md dark:border-slate-100/10 dark:bg-background-dark/80">

                            {/* Decorative background glow */}
                            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-yellow-500/10 blur-3xl" />

                            <div className="relative">
                                <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Registration has closed for <br />
                                    <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                        {new Date().getFullYear()}
                                    </span>
                                </h2>

                                <button className="ml-auto mt-2 block text-xs font-medium text-slate-500 hover:text-yellow-600 dark:text-slate-400 dark:hover:text-yellow-400 transition-colors">
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
                )}
            </main>
            <Footer />
        </div>
    );
}

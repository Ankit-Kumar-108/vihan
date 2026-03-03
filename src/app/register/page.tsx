'use client';
import Nav from '../components/nav/nav';
import Footer from '../components/footer/footer';

export default function RegisterPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display register-page">
            {/* Header Section */}
            <Nav />
            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <h2 className="h-20  text-3xl sm:text-5xl  font-black mb-7 bg-linear-to-r from-slate-900 via-primary to-secondary-accent dark:from-white dark:via-primary dark:to-secondary-accent bg-clip-text text-transparent">
                            Vihaan 2026 Registration
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto ">
                            Ignite your passion and showcase your talent. Join the biggest cultural extravaganza of the year.
                        </p>
                    </div>
                    {/* Form Container */}
                    <div className="glass-card rounded-lg p-8 md:p-12 shadow-2xl border-white/5 bg-white/5">
                        <form className="space-y-10">
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
                                                name='name'
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
                                                name='email'
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
                                                name='enrollment'
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
                                                name='contact'
                                            />
    
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600 dark:text-slate-100 ml-1">Department</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-300 group-focus-within:text-primary">account_tree</span>
                                            <select className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-400 appearance-none">
                                                <option>Select Department</option>
                                                <option>Computer Science Engineering (REC)</option>
                                                <option>Mechanical Engineering (REC)</option>
                                                <option>Civil Engineering (REC)</option>
                                                <option>Electrical Engineering (REC)</option>
                                                <option>Computer Science Engineering (RITS)</option>
                                                <option>Mechanical Engineering (RITS)</option>
                                                <option>Civil Engineering (RITS)</option>
                                                <option>Electrical Engineering (RITS)</option>
                                                <option>BAHMS (RAMCRH)</option>
                                                <option>Nursing (RIN)</option>
                                                <option>Pharmacy (RCP)</option>
                                                <option>Pharmacy (RIPS)</option>
                                                <option>Diploma (REC)</option>
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
                                    <div className="bg-background-light dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary transition-colors duration-400">
                                            <span className="material-symbols-outlined text-primary group-hover:text-white">music_note</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Music</h4>
                                        <p className="text-[10px] text-slate-400">Solo/Band</p>
                                    </div>

                                    <div className="bg-background-light dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors duration-400">
                                            <span className="material-symbols-outlined text-blue-500 group-hover:text-white">settings_accessibility</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Dance</h4>
                                        <p className="text-[10px] text-slate-400">Classical/Pop</p>
                                    </div>

                                    <div className="bg-background-light dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3 group-hover:bg-purple-500 transition-colors duration-400">
                                            <span className="material-symbols-outlined text-purple-500 group-hover:text-white">sports_basketball</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Sports</h4>
                                        <p className="text-[10px] text-slate-400">Indoor/Outdoor</p>
                                    </div>

                                    <div className="bg-background-light dark:bg-background-dark p-4 rounded-2xl border border-slate-300 dark:border-white/15 cursor-pointer group active:scale-95 hover:bg-linear-to-br from-primary/30 via-primary/20 to-secondary-accent/20 duration-400 transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-3 group-hover:bg-yellow-500 transition-colors duration-400">
                                            <span className="material-symbols-outlined text-yellow-500 group-hover:text-white">record_voice_over</span>
                                        </div>
                                        <h4 className="font-bold text-sm">Debate</h4>
                                        <p className="text-[10px] text-slate-400">English/Hindi</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Team Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 border-l-4 border-secondary-accent pl-4">
                                        <h3 className="text-2xl font-bold">Add Team Members</h3>
                                    </div>
                                    <button className="text-primary flex items-center gap-1 font-bold text-sm hover:underline" type="button">
                                        <span className="material-symbols-outlined text-sm">add_circle</span> Add Member
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Team Member Row */}
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-background-light dark:bg-background-dark border border-slate-300 dark:border-white/15">
                                        <div className="flex-1 grid md:grid-cols-2 gap-4">
                                            <input
                                                className="bg-transparent border-b border-slate-200 dark:border-white/20 py-2 focus:border-primary focus:ring-0 outline-none text-md transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400"
                                                placeholder="Member Name"
                                                type="text"
                                            />
                                            <input
                                                className="bg-transparent border-b border-slate-200 dark:border-white/20 py-2 focus:border-primary focus:ring-0 outline-none text-md transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400"
                                                placeholder="Member Enrollment Number"
                                                type="text"
                                            />
                                        </div>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors" type="button">
                                            <span className="material-symbols-outlined text-red-500/50">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Area */}
                            <div className="pt-10 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-200 dark:border-white/10">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <span>All fields are mandatory for individual events.</span>
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white px-12 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(157,54,247,0.3)] transition-all transform hover:-translate-y-1" type="submit">
                                        SUBMIT
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

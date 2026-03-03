'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch — render nothing until client-side
    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="h-10 w-10" />;

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 hover:cursor-pointer dark:bg-white/10 dark:hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-300 group"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span className="material-symbols-outlined text-xl text-slate-800 dark:text-yellow-300 transition-transform duration-300 group-hover:rotate-45">
                {isDark ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
}

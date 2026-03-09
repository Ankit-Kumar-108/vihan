'use client';
import { useState, useEffect } from 'react';

interface SiteSettings {
    registrationEnabled: boolean;
    uploadEnabled: boolean;
    uploadLimitPerUser: number;
}

const defaults: SiteSettings = {
    registrationEnabled: true,
    uploadEnabled: true,
    uploadLimitPerUser: 4,
};

export function useSettings() {
    const [settings, setSettings] = useState<SiteSettings>(defaults);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                setSettings({ ...defaults, ...data });
                setLoaded(true);
            })
            .catch(() => setLoaded(true));
    }, []);

    const updateSetting = async (key: keyof SiteSettings, value: any) => {
        const prev = { ...settings };
        setSettings(s => ({ ...s, [key]: value }));
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [key]: value }),
            });
            if (!res.ok) throw new Error('Failed to save');
        } catch {
            setSettings(prev); // revert on failure
            alert('Failed to update setting. Please try again.');
        }
    };

    return { settings, loaded, updateSetting };
}

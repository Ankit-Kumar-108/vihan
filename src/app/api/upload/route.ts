import { db } from '@/lib/server-configs';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route"



// Helper to get client IP from Vercel headers
async function getClientIp(): Promise<string> {
    const h = await headers();
    return h.get('x-forwarded-for')?.split(',')[0]?.trim()
        || h.get('x-real-ip')
        || 'unknown';
}

// GET — pre-check if this IP can still upload
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL || session?.user?.email === process.env.ADMIN_EMAIL_2;

        const settingsDoc = await db.collection('config').doc('siteSettings').get();
        const settings = settingsDoc.data();

        if (!isAdmin && settings?.uploadEnabled !== true) {
            return NextResponse.json({ error: "Uploads are currently Disabled", enabled: false }, { status: 403 })
        }

        const UPLOAD_LIMIT = isAdmin ? 999 : (settings?.uploadLimitPerUser ?? 4)

        const ip = await getClientIp();
        const existing = await db.collection('submissions')
            .where('uploaderIp', '==', ip)
            .get();

        const remaining = Math.max(0, UPLOAD_LIMIT - existing.size);
        return NextResponse.json({ remaining, limit: UPLOAD_LIMIT, enabled: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST — save metadata after direct Cloudinary upload
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL || session?.user?.email === process.env.ADMIN_EMAIL_2;
        const settingsDoc = await db.collection('config').doc('siteSettings').get();
        const settings = settingsDoc.data();

        if (!isAdmin && settings?.uploadEnabled !== true) {
            return NextResponse.json({ error: "Uploads are currently Disabled", enabled: false }, { status: 403 })
        }

        const UPLOAD_LIMIT = isAdmin ? 999 : (settings?.uploadLimitPerUser ?? 4)
        const { url, cloudyId, category, uploaderName, fileName, eventName } = await req.json();

        if (!url || !cloudyId) {
            return NextResponse.json({ error: "Missing upload data" }, { status: 400 });
        }

        const ip = await getClientIp();

        // Check upload limit by IP
        const existing = await db.collection('submissions')
            .where('uploaderIp', '==', ip)
            .get();

        if (existing.size >= UPLOAD_LIMIT) {
            return NextResponse.json(
                { error: `Upload limit reached. You can only submit ${UPLOAD_LIMIT} photos.` },
                { status: 429 }
            );
        }

        await db.collection('submissions').add({
            cloudyId,
            url,
            category,
            uploaderName,
            fileName,
            uploaderIp: ip,
            eventName: `VIHAN ${new Date().getFullYear()}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, cloudyId, url });

    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
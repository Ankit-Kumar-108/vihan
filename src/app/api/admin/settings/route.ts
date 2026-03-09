import {db} from "@/lib/server-configs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const SETTINGS_DOC = db.collection("config").doc("siteSettings")

export async function GET(){
    try {
        const doc = await SETTINGS_DOC.get()
        const data = doc.data()
        return NextResponse.json({
            registrstionEnabled: data?.registrstionEnabled?? true,
            uploadEnabled: data?.uploadEnbled?? true,
            uploadLimitPerUser: data?.uploadLimitPerUser?? 4
        })
    } catch (error:any) {
        console.error("Error fetching settings:", error)
        return NextResponse.json({error: "Failed to fetch settings"}, {status: 500})
    }
}

export async function POST(req: Request){
    try {
        const session = await getServerSession(authOptions)
        if(session?.user?.email !== process.env.ADMIN_EMAIL){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
        const body = await req.json()
        const updates:any = {}
        if(typeof body.registrstionEnabled ==='boolean'){
            updates.registrstionEnabled = body.registrstionEnabled
        }
        if(typeof body.uploadEnabled ==='boolean'){
            updates.uploadEnabled = body.uploadEnabled
        }
        if(typeof body.uploadLimitPerUser ==='number'){
            updates.uploadLimitPerUser = body.uploadLimitPerUser
        }
        await SETTINGS_DOC.update(updates, {merge: true})
        return NextResponse.json({success: true, ...updates})
    } catch (error:any) {
        console.error("Error updating settings:", error)
        return NextResponse.json({error: "Failed to update settings"}, {status: 500})
    }
}
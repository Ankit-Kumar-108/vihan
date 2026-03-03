import { NextResponse, NextRequest } from "next/server";
import { appendToSheet } from "@/lib/sheet";


export async function POST(req: NextRequest) {
    try {
        const { name, email, enrollment, phone, department, event, teamMembers } = await req.json();

        if (!name || !email || !enrollment || !phone || !department || !event || !teamMembers) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await appendToSheet({ name, email, enrollment, phone, department, event, teamMembers });

        // await sendConfirmationEmail(name, email, enrollment, phone, department, event, teamMembers);

        return NextResponse.json({ message: "Registration successful" }, { status: 200 });
    } catch (error: any) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Failed to register" }, { status: 500 });
    }
}

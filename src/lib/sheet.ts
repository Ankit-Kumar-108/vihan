import { google } from "googleapis";



export async function appendToSheet(data: { name: string, email: string, enrollment: string, phone: string, department: string, event: string, teamMembers: { name: string; enrollment: string }[] }) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const TeamStr = data.teamMembers.map((member) => `${member.name} (${member.enrollment})`).join(', ');

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[
                data.name,
                data.email,
                data.enrollment,
                data.phone,
                data.department,
                data.event,
                TeamStr || "N/A",
                new Date().toLocaleString('en', { timeZone: 'Asia/Kolkata' }),
            ]]
        }
    });
}
"use server"
import { db } from "./server-configs"
import { revalidatePath } from "next/cache"

interface winners {
    category: string,
    winnerName: string,
    imageUrl: string,
}
export async function winnersofVihan(data: winners) {
    try {
        await db.collection("winnersOfVihan").doc(data.category).set({
            ...data,
            createdAt: new Date().toISOString(),
        })
        revalidatePath("/")
        return { success: true }
    } catch (error: any) {
        console.log("error uploading winners", error)
        return { success: false, error: error.message }
    }

}
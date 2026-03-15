"use server"
import { db } from "./server-configs"
import { revalidatePath } from "next/cache"

export async function deleteWinner(category: string) {
    try {
        await db.collection("winnersOfVihan").doc(category).delete();
        revalidatePath("/")
        return { success: true }
    } catch (error: any) {
        console.log("error deleting winner", error)
        return { success: false, error: error.message }
    }
}

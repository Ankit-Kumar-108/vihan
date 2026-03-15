"use server"
import { db } from "./server-configs"

export async function getWinners() {
    try {
        const snapshot = await db.collection("winnersOfVihan").get();
        const winners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return winners;
    } catch (error) {
        console.error("Error fetching winners:", error);
        return [];
    }
}

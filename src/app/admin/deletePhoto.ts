"use server"
import { db, cloudinary } from "@/lib/server-configs"
import { revalidatePath } from "next/cache"

export default async function DeletePhoto(id: string, cloudyId: string) {
  try {

    const cloudinaryRes = await cloudinary.uploader.destroy(cloudyId)

    if (cloudinaryRes.result !== 'ok') {
      console.warn(`Cloudinary image not deleted (may be orphaned): ${cloudyId}`, cloudinaryRes)
    }

    await db.collection('submissions').doc(id).delete()

    revalidatePath("/admin")

    return { success: true }

  } catch (error) {

    console.error("Error Deleting Image", error)

    return { success: false, error: "error deleting photo" }

  }
}
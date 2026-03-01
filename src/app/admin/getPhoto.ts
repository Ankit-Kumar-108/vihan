"use server"
import { db } from "@/lib/server-configs"

export default async function GetPhoto() {
  try {
    const data = await db.collection('submissions').orderBy('createdAt', 'desc').get()

    const photos = data.docs.map((doc) => {
      const docData = doc.data()
      const driveId = docData.driveId

      return {
        id: doc.id,
        ...docData,
        // Smart URL patterns for Google Drive
        dataUrl: `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`, // Increased size for gallery
        fullResImg: `https://drive.google.com/uc?export=view&id=${driveId}`,
        timestamp: docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt, 
      }
    })

    return JSON.parse(JSON.stringify(photos)); // Ensures data is serializable for Client Components
  } catch (error) {
    console.error("Error fetching photos", error)
    return []
  }
}
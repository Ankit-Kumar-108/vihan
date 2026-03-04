"use server"
import { db } from "@/lib/server-configs"

const PAGE_SIZE = 50;

export default async function GetPhoto(lastDocId?: string) {
  try {
    let query = db.collection('submissions')
      .orderBy('createdAt', 'desc')
      .limit(PAGE_SIZE);

    if (lastDocId) {
      const lastDoc = await db.collection('submissions').doc(lastDocId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const data = await query.get()

    const photos = data.docs.map((doc) => {
      const docData = doc.data()
      const originalUrl = docData.url

      return {
        id: doc.id,
        ...docData,
        //500px, auto-optimized thumbnail
        dataUrl: originalUrl.replace('/upload/', '/upload/f_auto,q_auto,w_500,c_limit/'),

        // FULL RES: Use the original URL (but still add f_auto/q_auto for speed)
        fullResImg: originalUrl.replace('/upload/', '/upload/f_auto,q_auto/'),

        timestamp: docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt,
      }
    })

    const lastId = data.docs.length > 0 ? data.docs[data.docs.length - 1].id : null;
    const hasMore = data.docs.length === PAGE_SIZE;

    return {
      photos: JSON.parse(JSON.stringify(photos)),
      lastId,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching photos", error)
    return { photos: [], lastId: null, hasMore: false }
  }
}
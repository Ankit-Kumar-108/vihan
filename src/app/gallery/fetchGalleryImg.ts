"use server"
import { db } from "@/lib/server-configs";

export async function FetchGalleryImg(categoryName: string, lastDocId?: string) {
  try {
    let query = db.collection('submissions')
      .where('category', '==', categoryName)
      .where('status', '==', 'published')
      .orderBy('createdAt', 'desc')
      .limit(8);

    if (lastDocId) {
      const lastDoc = await db.collection('submissions').doc(lastDocId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();

    const photos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      thumbnailUrl: (doc.data().url as string).replace('/upload/', '/upload/f_auto,q_auto/'),
    }));

    return {
      photos: JSON.parse(JSON.stringify(photos)),
      lastId: snapshot.docs[snapshot.docs.length - 1]?.id || null
    };
  } catch (error) {
    console.error("Error fetching more:", error);
    return { photos: [], lastId: null };
  }
}
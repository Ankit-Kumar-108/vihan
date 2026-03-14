"use server"
import { v2 as cloudinary } from "cloudinary"

export async function deletePoster(publicId: string) {
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        await cloudinary.uploader.destroy(publicId);
        return { success: true };
    } catch (error) {
        console.error("Error deleting poster from Cloudinary:", error);
        return { success: false };
    }
}

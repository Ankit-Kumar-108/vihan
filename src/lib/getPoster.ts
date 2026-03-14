"use server";
import { v2 as cloudinary } from 'cloudinary';

// This function can only run on the server because it uses your Cloudinary API Secret.
export async function getPostersFromCloudinary() {
  try {
    // Make sure cloudinary is configured with the secret!
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'vihan_posters', 
      max_results: 50, 
    });


    const posters = result.resources.map((file: any) => 
    ({
      url: file.secure_url,
      publicId: file.public_id,
    })
    )
    
    return posters;
  } catch (error) {
    console.error("Error fetching posters from Cloudinary:", error);
    return [];
  }
}

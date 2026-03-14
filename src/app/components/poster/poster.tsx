"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import { getPostersFromCloudinary } from '@/lib/getPoster';
import { deletePoster } from '@/lib/deletePoster';

interface Poster {
  url: string;
  publicId: string;
}

export default function PosterUpload() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // 1. Fetch existing posters on load
  const loadPosters = async () => {
    setLoading(true);
    const data = await getPostersFromCloudinary();
    setPosters(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosters();
  }, []);

  // 2. Handle deletion
  const handleDelete = async (publicId: string) => {
    if (!confirm("Are you sure you want to delete this poster? It will be removed from the homepage instantly.")) return;
    
    setIsDeleting(publicId);
    const result = await deletePoster(publicId);
    
    if (result.success) {
      // Remove it from the screen immediately
      setPosters(prev => prev.filter(p => p.publicId !== publicId));
    } else {
      alert("Failed to delete poster. Please try again.");
    }
    setIsDeleting(null);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-bold text-lg text-white">Manage Event Posters</h3>
          <p className="text-sm text-slate-400">Posters uploaded here will automatically appear on the homepage.</p>
        </div>
        
        {/* Upload Widget */}
        <CldUploadWidget 
          uploadPreset="vihan_posters"
          options={{ folder: 'vihan_posters' }}
          onSuccess={(result: any) => {
            console.log("Uploaded Image URL:", result.info.secure_url);
            // Refresh the list so the new image shows up immediately!
            loadPosters();
          }}
        >
          {({ open }) => (
            <button 
              onClick={() => open()} 
              className="bg-primary hover:bg-primary/80 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">upload</span>
              Upload New Poster
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* Grid of existing posters */}
      {loading ? (
        <p className="text-slate-500 animate-pulse text-sm">Loading existing posters...</p>
      ) : posters.length === 0 ? (
        <div className="text-center py-10 bg-black/20 rounded-xl border border-white/5">
          <p className="text-slate-500 font-medium">No posters uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {posters.map((poster) => (
            <div key={poster.publicId} className="group relative aspect-3/4 rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 hover:ring-primary/50 transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster.url} alt="Event Poster" className="w-full h-full object-cover object-top" />
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 backdrop-blur-[2px]">
                <button
                  onClick={() => handleDelete(poster.publicId)}
                  disabled={isDeleting === poster.publicId}
                  className="bg-red-500/90 hover:bg-red-500 text-white p-2 text-sm rounded-full transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <span className={`material-symbols-outlined ${isDeleting === poster.publicId ? 'animate-spin' : ''}`}>
                    {isDeleting === poster.publicId ? 'sync' : 'delete'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

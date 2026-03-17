"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useState, useRef, useEffect } from 'react';
import { winnersofVihan } from '@/lib/uploadWinners';
import { getWinners } from '@/lib/getWinners';
import { deleteWinner } from '@/lib/deleteWinner';

const WINNER_CATEGORIES = [
  "Gully Cricket", "Tug Of War", "Badminton", "Carrom", "Chess", "Arm Wrestling", "Kho Kho", "Kabbadi", "Treasure Hunt", "Slow Bike Race", "Shot Put", "Sports Parade", "Lemon Spoon Race", "Volleyball", "Race (100M)", "Race(200M)", "Technical Presentation", "Painting", "Reels", "Extempore", "Debate", "Model Presentation", "Photography", "LAN Gaming", "Poster Making", "Quiz (General)", "Quiz (Technical)", "Nail Painting", "Face Painting", "Mehndi", "Rangoli", "Singing(Solo)", "Singing(Duet)", "Dance(Solo)", "Dance(Duet)", "Mimicry", "Skit", "Fashion Show", "Poetry (Self Composed)",
];

export default function UploadWinner() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryRef = useRef("");
  const [winnerName, setWinnerName] = useState("");
  const winnerNameRef = useRef("");
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [existingWinners, setExistingWinners] = useState<any[]>([]);
  const [loadingWinners, setLoadingWinners] = useState(true);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

  const fetchWinners = async () => {
    setLoadingWinners(true);
    const data = await getWinners();
    setExistingWinners(data);
    setLoadingWinners(false);
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  const handleUploadSuccess = async (result: any) => {
    if (!result.info || typeof result.info === "string") return;

    setIsSaving(true);
    setSuccess(false);

    try {
      // It's good practice to trim inputs before sending to DB
      const response = await winnersofVihan({
        category: categoryRef.current,
        winnerName: winnerNameRef.current.trim(),
        imageUrl: result.info.secure_url
      });

      if (response.success) {
        setSuccess(true);
        setWinnerName("");
        fetchWinners(); // Refresh the list after uploading
      } else {
        alert(response.error || "Failed to save to database!");
      }
    } catch (error) {
      alert("A critical error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 glass-card rounded-2xl w-full h-full">
      <div>
        <h3 className="font-bold text-lg text-white">Upload Winner</h3>
        <p className="text-sm text-slate-400">Announce the winner for a specific category.</p>
      </div>

      {/* Input Group: Disable while saving to prevent data mismatch */}
      <fieldset disabled={isSaving} className="flex flex-col gap-4 contents">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              categoryRef.current = e.target.value;
              setSuccess(false);
            }}
            className="bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white outline-none w-full disabled:opacity-50"
          >
            <option disabled value="">Select Category</option>
            {WINNER_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Winner Name(s)</label>
          <input
            type="text"
            placeholder="Enter Winner Name"
            value={winnerName}
            onChange={(e) => {
              setWinnerName(e.target.value);
              winnerNameRef.current = e.target.value;
              if (success) setSuccess(false);
            }}
            className="bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white outline-none w-full placeholder:text-slate-600 focus:border-primary/50 transition-colors disabled:opacity-50"
          />
        </div>
      </fieldset>

      <CldUploadWidget
        uploadPreset="vihan_winners"
        options={{
          folder: 'vihan_winners',
          clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
          maxFiles: 1, // Ensure they only upload one image at a time
        }}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => {
              if (!winnerName.trim()) {
                alert("Please enter the winner's name before uploading!");
                return;
              }
              open();
            }}
            disabled={isSaving}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-800 disabled:cursor-not-allowed text-white px-4 py-3 mt-2 rounded-xl font-bold w-full transition-all flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <span className="animate-pulse">Saving to Database...</span>
            ) : (
              <>Upload Photo & Announce</>
            )}
          </button>
        )}
      </CldUploadWidget>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-xl flex items-center gap-2 text-sm font-bold animate-in fade-in zoom-in duration-300">
          <span className="material-symbols-outlined text-base">check_circle</span>
          Upload Successfull!
        </div>
      )}

      {/* ─── Existing Winners List ─── */}
      <div className="border-t border-white/10 pt-4 mt-2">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Current Winners</h4>
        {loadingWinners ? (
          <p className="text-xs text-slate-500 animate-pulse">Loading winners...</p>
        ) : existingWinners.length === 0 ? (
          <p className="text-xs text-slate-500">No winners announced yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-80 overflow-y-auto">
            {existingWinners.map((w: any) => (
              <div key={w.id} className="relative w-47 h-59 rounded-2xl overflow-hidden group cursor-pointer">
                <img src={w.imageUrl} alt={w.category} className="w-full h-full object-cover" />
                {/* Name & Category overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-1 bg-black/30 backdrop-blur-[1px]">
                  <p className="text-xs font-bold text-white truncate mb-2">{w.winnerName}</p>
                  <p className="text-[10px] text-purple-400 font-semibold truncate mb-2">{w.category}</p>
                </div>
                {/* Delete button on hover */}
                <button
                  onClick={async () => {
                    if (!confirm(`Delete winner for "${w.category}"?`)) return;
                    setDeletingCategory(w.category);
                    const res = await deleteWinner(w.category);
                    setDeletingCategory(null);
                    if (res.success) {
                      setExistingWinners(prev => prev.filter(item => item.id !== w.id));
                    } else {
                      alert("Failed to delete winner.");
                    }
                  }}
                  disabled={deletingCategory === w.category}
                  className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg disabled:opacity-100"
                >
                  {deletingCategory === w.category ? (
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-sm">delete</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
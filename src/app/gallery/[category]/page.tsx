import Link from 'next/link'
import Nav from '../../components/nav/nav'
import Footer from '../../components/footer/footer'
import { FetchGalleryImgFullRes } from '../fetchGalleryImg'
import CategoryGalleryClient from './CategoryGalleryClient'

interface Params {
    category: string;
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const initialData = await FetchGalleryImgFullRes(decodedCategory);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/gallery"
                        className="flex items-center gap-1 text-primary font-bold text-sm hover:gap-2 transition-all"
                    >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to Gallery
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {decodedCategory} <span className="text-primary">Gallery</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Browse all {decodedCategory.toLowerCase()} photos from Vihaan 2026
                    </p>
                </div>

                {/* Masonry gallery with client interactivity */}
                <CategoryGalleryClient
                    category={decodedCategory}
                    initialPhotos={initialData.photos}
                    initialLastId={initialData.lastId}
                />
            </main>
            <Footer />
        </div>
    )
}

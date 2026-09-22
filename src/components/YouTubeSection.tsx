import { Play } from 'lucide-react';

export function YouTubeSection() {
  return (
    <section className="relative w-full py-16 bg-white z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Explore Our Learning on <span className="text-primary-600">YouTube</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Watch real classes, tutorials, and student success stories.
          </p>
        </div>

        {/* Thumbnail and Link */}
        <div className="relative max-w-4xl mx-auto rounded-[12px] overflow-hidden shadow-2xl group cursor-pointer">
          <a href="https://youtube.com/@nictcomputerinstitutewgl2517" target="_blank" rel="noopener noreferrer" className="block relative aspect-video">
            
            {/* Thumbnail Image */}
            <img 
              src="/youtube_thumbnail.png" 
              alt="NICT Computer Institute YouTube Channel" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 md:ml-2" fill="currentColor" />
              </div>
            </div>
            
          </a>
        </div>
        
        {/* Badge */}
        <div className="mt-6">
          <a href="https://youtube.com/@nictcomputerinstitutewgl2517" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-primary-100 transition-colors shadow-sm">
            <Play className="w-4 h-4" fill="currentColor" />
            Subscribe to stay updated
          </a>
        </div>

      </div>
    </section>
  );
}

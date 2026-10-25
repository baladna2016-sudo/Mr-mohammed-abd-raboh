'use client';

export default function Footer() {
  return (
    <footer className="py-6 bg-slate-900 border-t border-white/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-300 order-1">
            <span>صُنع بـ</span>
            <span className="text-red-500 animate-pulse" aria-label="محبة">❤</span>
            <span>في مصر</span>
            <span className="text-lg leading-none" aria-label="علم مصر">🇪🇬</span>
            <span className="w-px h-4 bg-white/15 mx-1 hidden sm:block" />
            <span className="text-slate-500">© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 order-2">
            <span>تصميم الموقع بواسطة</span>
            <a
              href="https://grandwave-web.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold tracking-widest text-white hover:text-blue-400 transition-colors flex items-center"
            >
              GRANDWAVEWEB
              <sup className="text-xs ml-0.5 -top-1 relative font-normal">TM</sup>
              <span className="text-blue-500">.</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

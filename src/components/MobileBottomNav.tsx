import React from 'react';
import { Home, BookOpen, Search, Sparkles, User, GraduationCap, LayoutDashboard, HardDriveDownload } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: string;
  onNavigateView: (view: string) => void;
  onOpenGenerator: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  onNavigateView,
  onOpenGenerator,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-xl z-50 lg:hidden px-2 py-1.5 print:hidden">
      <div className="flex items-center justify-around text-[10px] font-bold">
        
        <button
          onClick={() => onNavigateView('landing')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl ${
            activeView === 'landing' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onNavigateView('library')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl ${
            activeView === 'library' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Library</span>
        </button>

        <button
          onClick={onOpenGenerator}
          className="flex flex-col items-center gap-0.5 p-2 bg-emerald-700 text-white rounded-2xl shadow-md -mt-4 border-2 border-white"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="text-[9px] font-black uppercase">AI Studio</span>
        </button>

        <button
          onClick={() => onNavigateView('search')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl ${
            activeView === 'search' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => onNavigateView('downloads')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl ${
            activeView === 'downloads' ? 'text-emerald-700 font-extrabold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <HardDriveDownload className="w-5 h-5" />
          <span>Offline</span>
        </button>

      </div>
    </div>
  );
};

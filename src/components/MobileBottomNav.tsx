import React from 'react';
import { Home, BookOpen, Search, Sparkles, HardDriveDownload, UserCheck } from 'lucide-react';

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
  const NAV_ITEMS = [
    { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'library', label: 'Library', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'studio', label: 'Studio', icon: <Sparkles className="w-5 h-5" />, isSpecial: true },
    { id: 'search', label: 'Search', icon: <Search className="w-5 h-5" /> },
    { id: 'downloads', label: 'Offline', icon: <HardDriveDownload className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl md:hidden px-3 py-1.5 print:hidden pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigateView('studio')}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl shadow-lg -mt-5 border-2 border-white transition-all transform active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 font-black scale-105'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
                title="AI Book Studio Generator"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span className="text-[9px] font-black uppercase tracking-tight mt-0.5 hidden xs:block">Studio</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigateView(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-700 font-black bg-emerald-50 scale-105'
                  : 'text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-black text-emerald-800' : 'font-semibold'} hidden xs:block`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};


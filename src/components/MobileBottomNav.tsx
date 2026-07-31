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
}) => {
  const NAV_ITEMS = [
    { id: 'library', label: 'Book Store', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'search', label: 'Search', icon: <Search className="w-5 h-5" /> },
    { id: 'downloads', label: 'Downloads', icon: <HardDriveDownload className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl md:hidden px-3 py-1.5 print:hidden pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;

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


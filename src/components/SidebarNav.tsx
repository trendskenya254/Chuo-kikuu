import React from 'react';
import { LayoutDashboard, BookOpen, Layers, GraduationCap, Calendar, FileText, Award, HardDriveDownload, Bookmark, Clock, UserCheck, ShieldCheck, Settings, Sparkles } from 'lucide-react';

interface SidebarNavProps {
  activeView: string;
  onNavigateView: (view: string) => void;
  onOpenGenerator: () => void;
  onOpenBranding: () => void;
  savedBooksCount: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeView,
  onNavigateView,
  onOpenGenerator,
  onOpenBranding,
  savedBooksCount,
}) => {
  const NAV_ITEMS = [
    { id: 'landing', label: 'Landing Portal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'library', label: 'Library Home', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'grades', label: 'Grade Portal', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'subject', label: 'Subject Hub', icon: <Layers className="w-4 h-4" /> },
    { id: 'search', label: 'Smart Search', icon: <FileText className="w-4 h-4" /> },
    { id: 'downloads', label: 'Offline Downloads', icon: <HardDriveDownload className="w-4 h-4" />, badge: savedBooksCount },
    { id: 'teacher', label: 'Teacher Dashboard', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin Dashboard', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block space-y-6 print:hidden">
      
      {/* AI Generator CTA Banner */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-4 rounded-2xl border border-emerald-700 shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-400/30">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-white">AI Book Studio</h4>
            <p className="text-[10px] text-teal-100">Create KICD Book Instantly</p>
          </div>
        </div>

        <button
          onClick={onOpenGenerator}
          className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Material</span>
        </button>
      </div>

      {/* Main Navigation Menu */}
      <nav className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs space-y-1 text-xs">
        <div className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider">
          Platform Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigateView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition cursor-pointer ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-2 border-t border-slate-100 mt-2">
          <button
            onClick={onOpenBranding}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>School Branding Settings</span>
          </button>
        </div>
      </nav>

      {/* Internal Brain Status Card */}
      <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl border border-slate-800 text-[11px] space-y-1.5">
        <div className="flex items-center justify-between font-bold text-white">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Internal Brain
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
        </div>
        <p className="text-slate-400 text-[10px]">
          Continuously optimizing educational documents & master copies.
        </p>
      </div>

    </aside>
  );
};

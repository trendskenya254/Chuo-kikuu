import React from 'react';
import { ShieldCheck, Server, Database, Cpu, Users, BookOpen, HardDrive, AlertTriangle, Activity, Settings, FileCheck, Rocket, Package, Zap } from 'lucide-react';
import { CBCFullBook } from '../types';

interface AdminDashboardViewProps {
  books: CBCFullBook[];
  offlineCount: number;
  onOpenPackager?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  books,
  offlineCount,
  onOpenPackager,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-rose-400/30">
            System Administration & Control Tower
          </span>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> All Services Operational
          </span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Internal Education Brain Control Dashboard
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          System health oversight, AI generation queues, national school indexing, user management, and storage telemetry.
        </p>
      </div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex justify-between text-slate-500 font-bold">
            <span>Total System Books</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">12,540</div>
          <span className="text-[10px] text-emerald-600 font-bold">KICD Verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex justify-between text-slate-500 font-bold">
            <span>IndexedDB Offline Books</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{offlineCount}</div>
          <span className="text-[10px] text-blue-600 font-bold">Locally Cached</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex justify-between text-slate-500 font-bold">
            <span>Registered Schools</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">1,420</div>
          <span className="text-[10px] text-purple-600 font-bold">National Primary & Secondary</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex justify-between text-slate-500 font-bold">
            <span>AI Generation Pipeline</span>
            <Cpu className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">Gemini 2.5 Active</div>
          <span className="text-[10px] text-slate-500 font-bold">Latency: 1.2s</span>
        </div>
      </div>

      {/* Management Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* AI Queue & Telemetry */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Cpu className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-extrabold text-slate-900">AI Generation Engine Telemetry</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">LLM Engine:</span>
              <span className="font-black text-slate-800">Google Gemini 2.5 Flash</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Structured Output Schema:</span>
              <span className="font-bold text-emerald-700">Strict JSON (KICD Compliant)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Formatting Engine:</span>
              <span className="font-bold text-blue-700">A4 Printable HTML Canvas</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-semibold">Quality Inspection Status:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <FileCheck className="w-4 h-4" /> 100% Passed
              </span>
            </div>
          </div>
        </div>

        {/* System Settings & Storage Overview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HardDrive className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-extrabold text-slate-900">Storage & Platform Configuration</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Offline Database:</span>
              <span className="font-bold text-slate-800">HTML5 IndexedDB v1</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Print Engine:</span>
              <span className="font-bold text-slate-800">Standard CSS @media print</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Export Formats:</span>
              <span className="font-bold text-slate-800">A4 PDF, Markdown, Clean Print</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-semibold">Master Copy Sync:</span>
              <span className="font-bold text-emerald-600">Auto-saved to IndexedDB</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

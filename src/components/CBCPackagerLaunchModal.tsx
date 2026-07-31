import React, { useState } from 'react';
import {
  Rocket,
  Package,
  Layers,
  Zap,
  CheckCircle2,
  X,
  CreditCard,
  DollarSign,
  BookOpen,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  CBCBookPackager,
  ELIBLaunchManifest,
  CBCPackagedBookEntry,
  convertPackagedEntryToFullBook,
} from '../lib/cbcBookPackager';
import { CBCFullBook } from '../types';
import { saveBooksToOfflineStorage } from '../lib/idb';

interface CBCPackagerLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBooksImported: (books: CBCFullBook[]) => void;
}

export const CBCPackagerLaunchModal: React.FC<CBCPackagerLaunchModalProps> = ({
  isOpen,
  onClose,
  onBooksImported,
}) => {
  const [manifest, setManifest] = useState<ELIBLaunchManifest | null>(null);
  const [isPackaging, setIsPackaging] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  if (!isOpen) return null;

  const handleRunPackager = async () => {
    setIsPackaging(true);
    setImportSuccess(null);
    try {
      // Execute the packager
      const packager = new CBCBookPackager();
      const resultManifest = packager.package_and_launch();
      setManifest(resultManifest);
    } catch (err) {
      console.error('Packaging error:', err);
    } finally {
      setIsPackaging(false);
    }
  };

  const handleImportAllToLibrary = async () => {
    if (!manifest || !manifest.catalog) return;
    setIsImporting(true);
    try {
      const fullBooks = manifest.catalog.map(convertPackagedEntryToFullBook);
      await saveBooksToOfflineStorage(fullBooks);
      onBooksImported(fullBooks);
      setImportSuccess(
        `Successfully launched & imported all ${fullBooks.length} CBC materials into the ELIB Bookstore & IndexedDB Storage!`
      );
    } catch (err) {
      console.error('Import error:', err);
    } finally {
      setIsImporting(false);
    }
  };

  const filteredCatalog = manifest?.catalog.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      entry.book_id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      entry.subject.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory =
      activeCategoryFilter === 'All' || entry.category === activeCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md font-black text-xl">
              <Rocket className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Curriculum Architect
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-amber-500/30">
                  ELIB Engine v2.6
                </span>
              </div>
              <h2 className="text-xl font-black text-white">
                Automated CBC Curriculum Book Packager & Marketplace Launch
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Engine Banner */}
          {!manifest && (
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                <Package className="w-8 h-8" />
              </div>
              <div className="max-w-2xl mx-auto space-y-2">
                <h3 className="text-2xl font-black">
                  Programmatically Package & Launch All CBC Materials
                </h3>
                <p className="text-sm text-slate-300">
                  Automated curriculum packager structures all CBC learning materials across Pre-Primary, Lower Primary, Upper Primary, Junior School, and Senior School Pathways into the ELIB digital bookstore catalog with M-Pesa integration.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRunPackager}
                  disabled={isPackaging}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl transition flex items-center justify-center gap-3 mx-auto cursor-pointer"
                >
                  {isPackaging ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Packaging & Compiling Catalog...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
                      <span>Execute CBC Book Packager & Generate Manifest</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Launch Manifest Summary View */}
          {manifest && (
            <div className="space-y-6">
              
              {/* Manifest Metadata Header Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-emerald-800 font-bold uppercase tracking-wider text-[10px] block">
                    Total Materials Packaged
                  </span>
                  <div className="text-2xl font-black text-emerald-950 flex items-center gap-2">
                    <Package className="w-6 h-6 text-emerald-600" />
                    <span>{manifest.total_books_packaged}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    All 5 Tiers & Pathways
                  </span>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-1">
                  <span className="text-blue-800 font-bold uppercase tracking-wider text-[10px] block">
                    Target Platform
                  </span>
                  <div className="text-base font-black text-blue-950 flex items-center gap-1.5">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <span>{manifest.platform}</span>
                  </div>
                  <span className="text-[10px] text-blue-700 font-semibold">
                    {manifest.target_market}
                  </span>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-1">
                  <span className="text-purple-800 font-bold uppercase tracking-wider text-[10px] block">
                    Payment Gateway
                  </span>
                  <div className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span className="line-clamp-1">M-Pesa STK Push / Till</span>
                  </div>
                  <span className="text-[10px] text-purple-700 font-semibold">
                    Publisher 70% / Platform 30%
                  </span>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1">
                  <span className="text-amber-800 font-bold uppercase tracking-wider text-[10px] block">
                    Curriculum Standard
                  </span>
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>KICD Aligned CBC</span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-semibold">
                    100% Quality Verified
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-sm text-white">
                    Marketplace Launch Execution
                  </h4>
                  <p className="text-xs text-slate-300">
                    Import all {manifest.total_books_packaged} packaged CBC learning materials into active library state and IndexedDB storage.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunPackager}
                    disabled={isPackaging}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isPackaging ? 'animate-spin' : ''}`} />
                    <span>Re-pack Catalog</span>
                  </button>
                  <button
                    onClick={handleImportAllToLibrary}
                    disabled={isImporting}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    {isImporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Launching & Seeding Materials...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                        <span>⚡ Launch & Seed All {manifest.total_books_packaged} Materials</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Success Notification */}
              {importSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>{importSuccess}</span>
                </div>
              )}

              {/* Catalog Search & Category Filter Controls */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <span>Packaged Catalog Browser</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {filteredCatalog?.length || 0} Items
                    </span>
                  </h4>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search ELIB ID or subject..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    'All',
                    'Pre-Primary',
                    'Lower Primary',
                    'Upper Primary',
                    'Junior School',
                    'Senior School',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-xl font-extrabold text-xs transition cursor-pointer ${
                        activeCategoryFilter === cat
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Catalog Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="p-3">ELIB ID</th>
                        <th className="p-3">Title & Format</th>
                        <th className="p-3">Tier / Grade</th>
                        <th className="p-3">Subject</th>
                        <th className="p-3">Retail Price</th>
                        <th className="p-3">Royalty Split</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {filteredCatalog && filteredCatalog.length > 0 ? (
                        filteredCatalog.map((item) => (
                          <tr key={item.book_id} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                              {item.book_id}
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-slate-900 block">{item.title}</span>
                              <span className="text-[10px] text-slate-500">{item.resource_type}</span>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-100 text-slate-800 border border-slate-200">
                                {item.tier_level}
                              </span>
                            </td>
                            <td className="p-3 font-semibold text-slate-700">{item.subject}</td>
                            <td className="p-3 font-black text-emerald-800 whitespace-nowrap">
                              {item.pricing.currency} {item.pricing.amount.toFixed(2)}
                            </td>
                            <td className="p-3 text-[10px] font-bold text-slate-600 whitespace-nowrap">
                              Pub: {item.commission_structure.publisher_share} / Plat: {item.commission_structure.platform_share}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 w-fit">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                Ready
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-slate-500 font-semibold">
                            No materials found matching search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500 font-medium">
            Kenya Competency-Based Curriculum Digital Packager • KICD Framework
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black transition cursor-pointer"
          >
            Close Engine
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link2, Video, BookOpen, FileText, Plus, ExternalLink, Trash2, Sparkles, Bookmark, Palette, CheckCircle2 } from 'lucide-react';
import { CBCFullBook, ExternalResource } from '../types';

interface ExternalResourcesViewProps {
  book: CBCFullBook;
  onUpdateResources?: (resources: ExternalResource[]) => void;
}

export const ExternalResourcesView: React.FC<ExternalResourcesViewProps> = ({
  book,
  onUpdateResources,
}) => {
  const [resources, setResources] = useState<ExternalResource[]>(book.externalResources || [
    {
      id: 'res-default-1',
      title: 'KICD Primary CBC Syllabus Portal',
      type: 'link',
      url: 'https://kicd.ac.ke/curriculum-materials',
      note: 'Official Kenya Institute of Curriculum Development national curriculum framework.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'res-default-2',
      title: 'Practical Experiment Video Guide',
      type: 'video',
      url: 'https://youtube.com/results?search_query=cbc+grade+4+science+experiments',
      note: 'Demonstration video for hands-on classroom activities.',
      createdAt: new Date().toISOString()
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'link' | 'note' | 'video' | 'book'>('link');
  const [newUrl, setNewUrl] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRes: ExternalResource = {
      id: 'res-' + Date.now(),
      title: newTitle.trim(),
      type: newType,
      url: newUrl.trim() || undefined,
      note: newNote.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    const updated = [newRes, ...resources];
    setResources(updated);
    if (onUpdateResources) onUpdateResources(updated);

    // Reset form
    setNewTitle('');
    setNewUrl('');
    setNewNote('');
    setIsAdding(false);
  };

  const handleDeleteResource = (id: string) => {
    const updated = resources.filter((r) => r.id !== id);
    setResources(updated);
    if (onUpdateResources) onUpdateResources(updated);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-rose-600" />;
      case 'book':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'note':
        return <FileText className="w-4 h-4 text-amber-600" />;
      default:
        return <Link2 className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 print:space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-blue-500/30">
              Teaching Aids & Reference Library
            </span>
            <span className="text-xs text-slate-400 font-semibold">{book.grade} • {book.subject}</span>
          </div>
          <h2 className="text-xl font-black text-white">
            External Links, Reference Notes & Illustration Prompts
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Digital resources, supplementary video guides, teacher citation notes, and student drawing activity templates
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition cursor-pointer print:hidden shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Attach New Reference'}</span>
        </button>
      </div>

      {/* Add New Resource Modal / Form */}
      {isAdding && (
        <form onSubmit={handleAddResource} className="bg-slate-50 p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4 print:hidden">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
            Attach External Reference Link or Teacher Note
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Resource Title *</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. KICD Video Demonstration for Soil Erosion"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Resource Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="link">Web Link / Article</option>
                <option value="video">Video Demonstration</option>
                <option value="book">Reference Textbook</option>
                <option value="note">Teacher Key Note</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL / Web Link (Optional)</label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description / Notes (Optional)</label>
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Key takeaway or instructional tip for learners..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
            >
              Save Resource Link
            </button>
          </div>
        </form>
      )}

      {/* Attached Resources Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-blue-600" />
          <span>Attached Digital Links & Reference Notes ({resources.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 relative group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
                    {getIcon(res.type)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                      {res.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {res.type}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteResource(res.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition print:hidden cursor-pointer"
                  title="Remove resource"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {res.note && (
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                  {res.note}
                </p>
              )}

              {res.url && (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline pt-1"
                >
                  <span>Open Resource Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Playful Student Page Design & Drawing Activity Illustration Sheet */}
      <div className="bg-amber-50/60 p-6 rounded-2xl border-2 border-dashed border-amber-300 space-y-5">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-950 uppercase">
                🎨 Playful Student Drawing & Observation Illustration Sheet
              </h3>
              <p className="text-xs text-amber-800">
                Interactive artwork box for learners to sketch observations, draw practical equipment, or record field notes
              </p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300">
            Student Revision Drawing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Drawing Canvas 1 */}
          <div className="bg-white p-5 rounded-xl border-2 border-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-xs text-slate-900">
                Drawing Box 1: Practical Observation Diagram
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Use Pencil & Crayons</span>
            </div>
            <div className="h-44 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 text-center p-4">
              <Palette className="w-8 h-8 mb-2 text-slate-300" />
              <p className="text-xs font-bold text-slate-500">
                Draw & label your observed experiment setup for "{book.strand}"
              </p>
              <span className="text-[10px] text-slate-400 mt-1">
                (Include arrows identifying key tools and plant components)
              </span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium">
              <strong>Learner Note:</strong> Write 2 sentences describing what your diagram illustrates.
            </div>
          </div>

          {/* Drawing Canvas 2 */}
          <div className="bg-white p-5 rounded-xl border-2 border-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-xs text-slate-900">
                Drawing Box 2: Home-Based Project Flowchart
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Step-by-step Sketch</span>
            </div>
            <div className="h-44 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 text-center p-4">
              <Sparkles className="w-8 h-8 mb-2 text-slate-300" />
              <p className="text-xs font-bold text-slate-500">
                Illustrate how your project is applied at home or in the community
              </p>
              <span className="text-[10px] text-slate-400 mt-1">
                (Community Service Learning evidence sketch)
              </span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium">
              <strong>Parent/Guardian Verification:</strong> Signed by parent after completing home task.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

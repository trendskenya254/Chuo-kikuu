import React, { useState } from 'react';
import { Sparkles, RotateCw, BookOpen, CheckCircle2 } from 'lucide-react';
import { CBCFullBook } from '../types';

interface FlashcardsViewProps {
  book: CBCFullBook;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ book }) => {
  const chapter = book.chapters[0];
  const flashcards = chapter?.flashcards || [];

  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Revision & Memory
            </span>
            <span className="text-xs text-slate-400 font-semibold">{book.grade} • {book.subject}</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Printable Learner Flashcards & Key Terms
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Click cards to flip between Concept Term and CBC Definition
          </p>
        </div>
      </div>

      {/* Grid of Flashcards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card, idx) => {
          const isFlipped = flipped[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleFlip(idx)}
              className={`p-6 min-h-[160px] rounded-2xl border-2 transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                isFlipped
                  ? 'bg-emerald-900 text-white border-emerald-600'
                  : 'bg-white hover:border-emerald-500 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold opacity-75">
                <span>Card {idx + 1} of {flashcards.length}</span>
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3 h-3" />
                  {isFlipped ? 'Answer Side' : 'Question Side'}
                </span>
              </div>

              <div className="my-auto py-2 text-center">
                <p className={`font-black tracking-tight ${isFlipped ? 'text-lg text-emerald-200' : 'text-xl text-slate-900'}`}>
                  {isFlipped ? card.back : card.front}
                </p>
              </div>

              <div className="text-[10px] text-center opacity-60 font-medium uppercase tracking-wider">
                Click to Flip Card
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

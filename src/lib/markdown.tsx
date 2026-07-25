import React from 'react';

export function RenderMarkdown({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (key: string) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="list-disc list-inside my-3 space-y-1.5 text-slate-700 leading-relaxed pl-2">
          {currentList.map((item, i) => (
            <li key={i} className="text-sm md:text-base">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (text: string) => {
    // Bold formatting **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      flushList(`${index}`);
      elements.push(
        <h3 key={`h3-${index}`} className="text-lg font-bold text-slate-900 mt-5 mb-2 flex items-center gap-2">
          {formatInline(trimmed.replace('### ', ''))}
        </h3>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList(`${index}`);
      elements.push(
        <h2 key={`h2-${index}`} className="text-xl font-extrabold text-slate-900 mt-6 mb-3 border-b border-slate-200 pb-1">
          {formatInline(trimmed.replace('## ', ''))}
        </h2>
      );
    } else if (trimmed.startsWith('# ')) {
      flushList(`${index}`);
      elements.push(
        <h1 key={`h1-${index}`} className="text-2xl font-black text-slate-900 mt-7 mb-4">
          {formatInline(trimmed.replace('# ', ''))}
        </h1>
      );
    } else if (trimmed.startsWith('> ')) {
      flushList(`${index}`);
      elements.push(
        <blockquote key={`quote-${index}`} className="my-4 p-4 rounded-xl bg-emerald-50 border-l-4 border-emerald-600 text-emerald-950 text-sm md:text-base italic font-medium shadow-xs">
          {formatInline(trimmed.replace('> ', ''))}
        </blockquote>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      const cleanItem = trimmed.replace(/^[-*]\s+|\d+\.\s+/, '');
      currentList.push(cleanItem);
    } else if (trimmed.length > 0) {
      flushList(`${index}`);
      elements.push(
        <p key={`p-${index}`} className="my-2 text-slate-700 leading-relaxed text-sm md:text-base">
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  flushList('end');

  return <div className="space-y-1">{elements}</div>;
}

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Lock,
  Smartphone,
  Download,
  Printer,
  FileCode,
  Sparkles,
  BookOpen,
  UserCheck,
  GraduationCap,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { CBCFullBook } from '../types';
import { BookScope, downloadBookAsRichHTML } from '../utils/htmlExporter';
import { downloadBookAsMarkdown } from '../utils/markdownExporter';

interface DownloadPackageModalProps {
  book: CBCFullBook;
  isOpen: boolean;
  onClose: () => void;
  onPrintScope?: (scope: BookScope) => void;
}

export const DownloadPackageModal: React.FC<DownloadPackageModalProps> = ({
  book,
  isOpen,
  onClose,
  onPrintScope,
}) => {
  const [selectedScope, setSelectedScope] = useState<BookScope>('full');
  const [mpesaPhone, setMpesaPhone] = useState('0712345678');
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txReceipt, setTxReceipt] = useState('');

  const storagePayKey = `cbc_paid_book_${book.id}`;

  useEffect(() => {
    if (isOpen) {
      const isPaid = localStorage.getItem(storagePayKey);
      if (isPaid) {
        setPaymentSuccess(true);
        setTxReceipt(isPaid);
      }
    }
  }, [isOpen, book.id, storagePayKey]);

  if (!isOpen) return null;

  const handlePesaPalGatewayPayment = async () => {
    setIsProcessingPay(true);
    try {
      const res = await fetch('/api/pesapal/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          amount: 49,
          email: 'customer@cbc.ac.ke',
          phone: mpesaPhone || '0712345678',
          firstName: 'CBC',
          lastName: 'Learner',
        }),
      });

      const data = await res.json();
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert(data.error || 'Failed to initiate PesaPal checkout');
        setIsProcessingPay(false);
      }
    } catch (err: any) {
      console.error('PesaPal Submit Order Error:', err);
      alert('Error connecting to PesaPal server. Please try again.');
      setIsProcessingPay(false);
    }
  };

  const handleMpesaPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaPhone || mpesaPhone.length < 9) return;

    setIsProcessingPay(true);

    setTimeout(() => {
      const receiptCode = `MPESA-49-RJL${Math.floor(100000 + Math.random() * 900000)}`;
      localStorage.setItem(storagePayKey, receiptCode);
      setTxReceipt(receiptCode);
      setPaymentSuccess(true);
      setIsProcessingPay(false);
    }, 1800);
  };

  const handleDownloadHTML = () => {
    downloadBookAsRichHTML(book, selectedScope);
  };

  const handleDownloadMarkdown = () => {
    downloadBookAsMarkdown(book);
  };

  const handleTriggerPrint = () => {
    if (onPrintScope) {
      onPrintScope(selectedScope);
    } else {
      window.print();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-slate-900" /> KES 49 Full Package Access
            </span>
            <span className="text-xs text-indigo-200 font-bold">KICD CBC Aligned</span>
          </div>

          <h2 className="text-2xl font-black text-white leading-tight">
            Target Book Scope & Edition Selection
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Choose whether to download the complete 49 KES package or individual component editions.
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Scope Selection Cards */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Select Target Book Scope & Edition
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: Full Book */}
              <button
                type="button"
                aria-pressed={selectedScope === 'full'}
                aria-label="Select Full Book Scope"
                onClick={() => setSelectedScope('full')}
                className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer relative space-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  selectedScope === 'full'
                    ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5 uppercase">
                    <BookOpen className="w-4 h-4 text-emerald-700" /> Full Book
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    KES 49 Package
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Cover + Teacher + Student + Rubrics
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Complete 6-section coursebook with lesson plans, textbook content, worksheets, flashcards & rubrics.
                </p>
              </button>

              {/* Option 2: Teacher Edition */}
              <button
                type="button"
                aria-pressed={selectedScope === 'teacher'}
                aria-label="Select Teacher Edition Scope"
                onClick={() => setSelectedScope('teacher')}
                className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer space-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  selectedScope === 'teacher'
                    ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-900 flex items-center gap-1.5 uppercase">
                    <UserCheck className="w-4 h-4 text-blue-700" /> Teacher Edition
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-300">
                    Schemes & Plans
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Schemes & Detailed Lesson Plans
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Curriculum matrix, timetabled 40-minute lesson plans, KIQs, and differentiated support.
                </p>
              </button>

              {/* Option 3: Student Edition */}
              <button
                type="button"
                aria-pressed={selectedScope === 'student'}
                aria-label="Select Student Edition Scope"
                onClick={() => setSelectedScope('student')}
                className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer space-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  selectedScope === 'student'
                    ? 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-900 flex items-center gap-1.5 uppercase">
                    <GraduationCap className="w-4 h-4 text-indigo-700" /> Student Edition
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-300">
                    Textbook + Tasks
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Textbook + Practical Tasks
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  In-depth explanatory readings, key vocabulary definitions, group practicals & CSL tasks.
                </p>
              </button>

              {/* Option 4: School Assessment */}
              <button
                type="button"
                aria-pressed={selectedScope === 'assessment'}
                aria-label="Select School Assessment Scope"
                onClick={() => setSelectedScope('assessment')}
                className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer space-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  selectedScope === 'assessment'
                    ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 flex items-center gap-1.5 uppercase">
                    <Award className="w-4 h-4 text-amber-700" /> School Assessment
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    Worksheets & Rubrics
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Worksheets & CBC Rubrics
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Formative CAT worksheets, master comprehension quiz, answer keys, and 4-tier rubrics.
                </p>
              </button>

            </div>
          </div>

          {/* M-Pesa & PesaPal 49 KES Package Payment Section */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-black text-white">Full Package Download Activation</h4>
                  <p className="text-[11px] text-slate-300">Whole Package Access Fee: <strong className="text-amber-400">49 KES</strong></p>
                </div>
              </div>

              {paymentSuccess ? (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> KES 49 Paid
                </span>
              ) : (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  PesaPal Verified
                </span>
              )}
            </div>

            {paymentSuccess ? (
              <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <span>Payment Transaction Confirmed</span>
                  <span className="font-mono text-emerald-200">{txReceipt}</span>
                </div>
                <p className="text-[11px] text-emerald-200">
                  You have unlocked full download and export privileges for this CBC coursebook package!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    placeholder="e.g. 0712345678"
                    required
                    className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 font-mono font-bold"
                  />

                  <button
                    type="button"
                    onClick={handlePesaPalGatewayPayment}
                    disabled={isProcessingPay}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Pay KES 49 via PesaPal Gateway</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Accepts M-Pesa, Airtel Money, Visa & Mastercard</span>
                  <button
                    type="button"
                    onClick={handleMpesaPayment}
                    className="text-amber-400 hover:underline font-bold cursor-pointer"
                  >
                    Simulate Quick M-Pesa STK Push
                  </button>
                </div>
              </div>
            )}
          </div>


          {/* Download & Export Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Button 1: Download Rich HTML (Identical UI Layout) */}
              <button
                onClick={handleDownloadHTML}
                className="p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs shadow-md transition cursor-pointer flex flex-col items-center gap-1 text-center"
              >
                <Download className="w-5 h-5 text-amber-300" />
                <span className="font-extrabold">Download Web Page (.html)</span>
                <span className="text-[10px] font-normal text-blue-200">
                  Exact UI styling with cards & badges
                </span>
              </button>

              {/* Button 2: Direct PDF Print */}
              <button
                onClick={handleTriggerPrint}
                className="p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs shadow-md transition cursor-pointer flex flex-col items-center gap-1 text-center"
              >
                <Printer className="w-5 h-5 text-blue-400" />
                <span className="font-extrabold">Print / Direct PDF</span>
                <span className="text-[10px] font-normal text-slate-300">
                  Page break formatted document
                </span>
              </button>

              {/* Button 3: Markdown (.md) */}
              <button
                onClick={handleDownloadMarkdown}
                className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-2xl font-bold text-xs transition cursor-pointer flex flex-col items-center gap-1 text-center"
              >
                <FileCode className="w-5 h-5 text-slate-700" />
                <span className="font-extrabold">Export Markdown (.md)</span>
                <span className="text-[10px] font-normal text-slate-500">
                  Raw editable text file
                </span>
              </button>

            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Active Scope: <strong className="text-slate-900 uppercase font-bold">{selectedScope} Edition</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

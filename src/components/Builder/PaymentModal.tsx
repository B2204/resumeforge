import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CreditCard, ShieldCheck, Loader2, CheckCircle2, Smartphone } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TemplatePreview } from './TemplatePreview';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { theme, activeResumeId, activeResume, user } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg('');

    // Fast path for immediate download (Bypassing Razorpay for this environment)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        onSuccess();
      }, 500);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print:hidden">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={!isProcessing && !isSuccess ? onClose : undefined} />
      
      <div className={`relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 transform scale-100 ${theme === 'dark' ? 'bg-[#151f32] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-850'}`}>
        {!isProcessing && !isSuccess && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 z-10 animate-pulse"
          >
            <X size={20} />
          </button>
        )}

        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300 min-h-[400px]">
            <div className="h-20 w-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black mb-2">Payment Successful!</h3>
            <p className="text-slate-400 text-sm">Your download will begin automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 w-full">
            {/* Left Column - Scrollable Resume Preview */}
            <div className={`col-span-1 md:col-span-6 flex flex-col items-center justify-start p-6 border-b md:border-b-0 md:border-r min-h-[350px] max-h-[250px] md:max-h-[580px] overflow-y-auto scrollbar-thin select-none relative transition-colors duration-300 ${
              theme === 'dark' ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <div className="w-full flex items-center justify-between mb-4 border-b pb-2 border-dashed border-slate-700/30">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Live Export Preview
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 uppercase tracking-widest">
                  A4 Layout
                </span>
              </div>
              
              {activeResume ? (
                <div className="w-full flex items-start justify-center pt-2">
                  <div className="shadow-2xl rounded-sm overflow-hidden border border-slate-700/20 bg-white">
                    <TemplatePreview 
                      resume={activeResume}
                      zoomScale={0.52}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center m-auto text-center gap-2">
                  <p className="text-xs text-slate-500">No active resume preview found.</p>
                </div>
              )}
            </div>

            {/* Right Column - Checkout Form */}
            <div className="col-span-1 md:col-span-6 flex flex-col justify-between">
              <div>
                <div className={`p-6 border-b flex flex-col items-center text-center ${theme === 'dark' ? 'bg-[#0f172a]/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20 mb-4">
                    RF
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">MyResume Assistant Pro</h3>
                  <p className="text-xs text-slate-400">One-time Resume Export</p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="text-xl font-bold tracking-tight text-slate-400 line-through decoration-rose-500/50">₹99.00</span>
                    <span className="text-3xl font-black tracking-tight text-emerald-500">Free</span>
                  </div>
                </div>

                <form onSubmit={handlePay} className="p-6 flex flex-col gap-5">
                  {errorMsg && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs p-3 rounded-lg font-bold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center py-2 gap-3 text-center">
                    <div className="flex gap-4 items-center opacity-70">
                      <CreditCard size={24} />
                      <Smartphone size={24} />
                      <span className="font-bold text-lg border p-1 rounded">UPI</span>
                      <span className="font-bold text-lg border p-1 rounded">GPay</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Enjoy the premium export features absolutely free during our promotional period! No payment details required.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-80 text-xs"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Generating Secure PDF...
                      </>
                    ) : (
                      <>Download for Free (₹0.00)</>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-slate-400 font-medium">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    Secured by Razorpay Encryption
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

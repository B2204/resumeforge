import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, MessageSquareQuote } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const { theme, addReview } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    
    addReview(rating, reviewText);
    setIsSubmitted(true);
    
    setTimeout(() => {
      onClose();
      // Reset for future
      setTimeout(() => {
        setIsSubmitted(false);
        setRating(5);
        setReviewText('');
      }, 500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={!isSubmitted ? onClose : undefined} />
      
      <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 transform scale-100 ${theme === 'dark' ? 'bg-[#151f32] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-850'}`}>
        {!isSubmitted && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 z-10"
          >
            <X size={20} />
          </button>
        )}

        {isSubmitted ? (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
            <div className="h-20 w-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <Star size={40} className="text-emerald-500 fill-emerald-500" />
            </div>
            <h3 className="text-3xl font-black mb-3">Thank You!</h3>
            <p className="text-slate-400 font-bold text-sm">Your review has been published to the homepage.</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-16 w-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/30">
                <MessageSquareQuote size={28} className="text-white" />
              </div>
              <h3 className="font-black text-3xl mb-2 tracking-tight">How was your experience?</h3>
              <p className="text-slate-400 text-sm font-bold">Your feedback helps us improve the platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Star Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star 
                      size={40} 
                      className={`transition-colors ${star <= (hoverRating || rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                    />
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you loved about creating your resume..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className={`w-full bg-transparent border rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${theme === 'dark' ? 'bg-[#0f172a]/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-2xl mt-2 shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

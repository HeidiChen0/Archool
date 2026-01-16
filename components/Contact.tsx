import React, { useState } from 'react';
import { ArrowLeft, Users, MessageSquare } from 'lucide-react';

interface ContactProps {
    onBack?: () => void;
    onDonate?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack, onDonate }) => {
  const [comment, setComment] = useState('');

  const handlePostComment = () => {
    if (comment.trim()) {
      alert("Comment sent to the void! (Or at least it would be if we had a database)");
      setComment('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* The Giant Winking Emoji in the background - Sharpness improved by reducing container blur */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-60 z-0">
         <span className="text-[350px] md:text-[650px] leading-none transform animate-float">😉</span>
      </div>

      {/* Reduced backdrop-blur from xl to sm to make the emoji background less blurry */}
      <div className="relative z-10 w-full max-w-4xl bg-[#FFFBEB]/50 backdrop-blur-sm rounded-3xl p-8 md:p-16 border border-[#F8CBA6]/30 shadow-2xl text-center">
        <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 tracking-tighter leading-tight">
                Ho we just met thee, and this be crazy
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-medium opacity-80">
                Please don't hack us, we no have money
            </p>
            <p className="text-slate-500 text-xs mt-4 font-semibold uppercase tracking-widest">
                Some things will break here, it happens daily
            </p>
        </div>

        <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                But here's our gmail
            </h2>
            <div className="inline-block bg-white/90 px-4 md:px-10 py-4 rounded-2xl border border-[#F8CBA6] shadow-md transform -rotate-1 hover:rotate-0 transition-transform">
                <p className="text-base sm:text-xl md:text-3xl lg:text-4xl font-black text-slate-900 whitespace-nowrap tracking-tight">
                    archool.not.alcohol@gmail.com
                </p>
            </div>
            <div className="space-y-4">
                <p className="text-2xl md:text-4xl font-black text-slate-700 tracking-tighter opacity-70 italic">
                    So mail us maybe
                </p>
                
                <div className="pt-4">
                    <p className="text-xl md:text-2xl font-black text-slate-700 tracking-tighter opacity-70 italic mb-4">
                        or just comment here
                    </p>
                    <div className="max-w-md mx-auto group">
                        <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Type something funny or helpful..."
                            className="w-full p-4 rounded-2xl border-2 border-[#F8CBA6] bg-white/90 focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none min-h-[120px] shadow-inner text-slate-800 transition-all text-sm md:text-base"
                        />
                        <button 
                            onClick={handlePostComment}
                            className="mt-3 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all transform hover:scale-105 shadow-md text-sm uppercase tracking-widest flex items-center mx-auto"
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Buttons - Matching Archool aesthetic */}
        <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
            <button 
                onClick={onBack}
                className="flex items-center px-6 py-2 bg-white text-slate-700 border border-[#F8CBA6] font-bold rounded-lg text-sm hover:bg-[#F8CBA6] transition-colors uppercase tracking-widest shadow-sm"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
            </button>

            <button 
                onClick={onDonate}
                className="flex items-center bg-[#F8CBA6] text-slate-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-[#E5B895] transition-all transform hover:scale-105 shadow-lg group"
            >
                <Users className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                PWEASE DONATE
            </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
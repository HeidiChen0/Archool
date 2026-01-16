import React from 'react';
import { ArrowLeft, Users, Heart } from 'lucide-react';

interface AboutProps {
    onBack?: () => void;
    onDonate?: () => void;
}

const About: React.FC<AboutProps> = ({ onBack, onDonate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative min-h-[80vh] flex flex-col items-center justify-center">
      {/* The Giant Heart Emoji in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-80 z-0">
         <span className="text-[300px] md:text-[500px] leading-none transform translate-y-[-20px]">❤️</span>
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-[#FFFBEB]/60 backdrop-blur-md rounded-3xl p-8 md:p-16 border border-[#F8CBA6]/30 shadow-2xl">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
                ABOUT USSSSSSSSSSSSSSS
            </h1>
            <p className="text-slate-600 text-sm italic font-medium">Please don't hack us, we no have money</p>
        </div>

        <div className="space-y-12 max-w-2xl">
            <section>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
                    WHO R WE????????
                </h2>
                <p className="text-xl md:text-2xl text-slate-800 font-medium">
                    We are high school students struggling with school.
                </p>
            </section>

            <section>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
                    WHY WE DOIN DIS??????
                </h2>
                <p className="text-xl md:text-2xl text-slate-800 font-medium">
                    To make a student-centered community.
                </p>
            </section>

            <section>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
                    WHO IS DIS MADE FOR???????
                </h2>
                <div className="flex flex-wrap gap-2 text-3xl md:text-4xl">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <span key={i} className="transform hover:scale-125 transition-transform cursor-default">🫵</span>
                    ))}
                </div>
            </section>
        </div>

        {/* Footer Buttons - Styled to match Archool theme */}
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

export default About;
import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Star, Zap, Gem, Trophy, Heart, Coffee, ShieldAlert, GraduationCap, Coins } from 'lucide-react';

interface DonationProps {
  onBack: () => void;
}

const Donation: React.FC<DonationProps> = ({ onBack }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const tiers = [
    { id: 1, name: 'FRIEND', amount: 5, icon: Coffee, color: 'bg-yellow-400', textColor: 'text-yellow-900', description: 'Buy us a coffee' },
    { id: 2, name: 'ADVOCATE', amount: 15, icon: Star, color: 'bg-[#FFE7CC]', textColor: 'text-slate-900', description: 'Support the mission' },
    { id: 3, name: 'CHAMPION', amount: 50, icon: Trophy, color: 'bg-[#FFE7CC]', textColor: 'text-slate-900', description: 'Fuel our growth' },
    { id: 4, name: 'ANGEL', amount: 100, icon: Gem, color: 'bg-[#FFE7CC]', textColor: 'text-slate-900', description: 'Angel Investor status' },
  ];

  const handleDonate = (amount: number | string) => {
    alert(`🎉 THANK YOU SO MUCH! You just contributed $${amount} to Archool! Your support keeps this project alive and independent. You are a legend! 🌈✨`);
  };

  const floatingTags = [
    'support us please',
    "don't get us sued",
    'pay for my college tuition',
    'go fund me',
    'become an angel investor'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-400 via-green-400 via-blue-400 to-purple-500 p-4 md:p-8 overflow-hidden relative">
      {/* Animated Rainbow Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-400 via-yellow-300 via-green-300 via-blue-300 to-purple-400 opacity-30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={onBack}
          className="bg-white/90 text-slate-900 px-6 py-2 rounded-2xl font-black uppercase tracking-widest shadow-xl border-b-4 border-r-4 border-slate-300 hover:translate-y-1 hover:border-b-2 hover:border-r-2 transition-all flex items-center mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          GO BACK
        </button>

        <div className="text-center mb-12">
          <div className="inline-block bg-white p-4 rounded-3xl shadow-2xl border-b-8 border-r-8 border-slate-200 transform rotate-1 mb-6">
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 via-green-600 via-blue-600 to-purple-600 uppercase tracking-tighter">
              SUPPORT ARCHOOL!!
            </h1>
          </div>
          <p className="text-white text-2xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase italic">
            "every startup needs someone like you" - Founder of Archool
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`cursor-pointer group relative p-6 rounded-3xl shadow-2xl transition-all border-b-8 border-r-8 border-slate-300 hover:scale-105 active:scale-95 ${tier.color} ${selectedTier === tier.id ? 'scale-105 border-b-4 border-r-4 -translate-y-1' : ''}`}
            >
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-2xl shadow-lg transform rotate-12 border border-slate-100">
                <tier.icon className={`w-8 h-8 ${tier.textColor}`} />
              </div>
              <h3 className={`text-2xl font-black ${tier.textColor} mb-1 uppercase tracking-tighter`}>{tier.name}</h3>
              <div className={`text-4xl font-black ${tier.textColor} mb-4`}>${tier.amount}</div>
              <div className="bg-black/5 rounded-xl py-2 px-4 mb-6 min-h-[50px] flex items-center justify-center">
                <span className={`text-[10px] text-center font-black ${tier.textColor} uppercase tracking-widest leading-tight`}>{tier.description}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDonate(tier.amount); }}
                className="w-full bg-white/90 text-slate-900 py-3 rounded-2xl font-black uppercase tracking-widest shadow-md border-b-4 border-slate-200 group-hover:bg-white group-active:translate-y-1 group-active:border-b-0 transition-all"
              >
                GIVE!!
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-2xl border-b-[12px] border-r-[12px] border-slate-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">
                CUSTOM SUPPORT???
              </h2>
              <p className="text-slate-600 text-lg font-bold mb-6">
                Donate to us so we don't have to sleep on the park bench!
              </p>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-400">$</span>
                <input 
                  type="number" 
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="100"
                  className="w-full bg-slate-100 pl-16 pr-8 py-6 rounded-3xl border-4 border-slate-200 text-4xl font-black text-slate-900 focus:border-yellow-400 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                />
              </div>
            </div>
            <div className="flex-shrink-0">
              <button 
                onClick={() => handleDonate(customAmount || '0')}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-12 rounded-[60px] font-black text-4xl uppercase tracking-tighter shadow-2xl border-b-[16px] border-orange-700 hover:translate-y-2 hover:border-b-[8px] transition-all transform hover:rotate-3 active:scale-90"
              >
                <div className="flex flex-col items-center">
                  <span className="animate-spin-slow inline-block">
                    <Sparkles className="w-12 h-12 mb-2" />
                  </span>
                  DONATE!!
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4 flex-wrap pb-12">
          {floatingTags.map((tag, idx) => (
            <div 
              key={idx} 
              className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border-2 border-white/30 text-white font-black uppercase tracking-widest text-sm animate-bounce" 
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Donation;
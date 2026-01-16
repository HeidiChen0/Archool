import React, { useState } from 'react';
import { ArrowLeft, Award, Star, UserCircle, MessageSquare, ShieldCheck, Sparkles, Send, Gift, CheckCircle2, Mail, Hash } from 'lucide-react';

interface AmbassadorApplyProps {
  schoolName: string;
  onCancel: () => void;
}

const AmbassadorApply: React.FC<AmbassadorApplyProps> = ({ schoolName, onCancel }) => {
  const [formData, setFormData] = useState({
    reason: '',
    improvement: '',
    email: '',
    socialHandle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted! Our team will review your student profile and get back to you within 48 hours. Stay tuned!");
    onCancel();
  };

  const handleSaveProgress = () => {
    alert("Progress saved locally! (Simulated)");
    // In a real app, this would persist to localStorage or a draft endpoint
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button 
        onClick={onCancel} 
        className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to School Profile
      </button>

      <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#F8CBA6] relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Award className="w-48 h-48 text-slate-900 rotate-12" />
        </div>

        <div className="relative z-10">
            <div className="flex items-center mb-8">
                <div className="bg-[#F8CBA6] p-4 rounded-2xl mr-5 shadow-lg">
                    <Star className="w-8 h-8 text-slate-900 animate-pulse" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                        Become an Ambassador
                    </h1>
                    <p className="text-slate-700 font-bold bg-white/50 px-3 py-1 rounded-lg inline-block mt-1">
                        Represent {schoolName}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* What you'll do */}
                <div className="bg-[#FFFBEB] p-6 rounded-2xl border-2 border-[#F8CBA6] border-dashed">
                    <h3 className="font-black text-slate-900 uppercase text-sm mb-4 flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-2 text-slate-700" /> What you'll do
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600 font-bold uppercase tracking-tight">
                        <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-[#F8CBA6] flex-shrink-0 mt-0.5" /> 
                            <span>Verify school details</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-[#F8CBA6] flex-shrink-0 mt-0.5" /> 
                            <span>Give us yearly updates on changes</span>
                        </li>
                    </ul>
                </div>

                {/* What you'll receive */}
                <div className="bg-[#FFFBEB] p-6 rounded-2xl border-2 border-slate-900/10">
                    <h3 className="font-black text-slate-900 uppercase text-sm mb-4 flex items-center">
                        <Gift className="w-4 h-4 mr-2 text-slate-700" /> What you'll receive
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600 font-bold uppercase tracking-tight">
                        <li className="flex items-start">
                            <Sparkles className="w-4 h-4 mr-2 text-[#F8CBA6] flex-shrink-0 mt-0.5" /> 
                            <span>A personalized certificate</span>
                        </li>
                        <li className="flex items-start">
                            <Sparkles className="w-4 h-4 mr-2 text-[#F8CBA6] flex-shrink-0 mt-0.5" /> 
                            <span>A special title added to your account</span>
                        </li>
                    </ul>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                        Why do you want to be an ambassador?
                    </label>
                    <div className="relative">
                        <UserCircle className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <textarea 
                            placeholder="Tell us about your involvement in school life and why you're a good fit..."
                            required
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold min-h-[140px] transition-all placeholder:font-normal placeholder:text-slate-400"
                            value={formData.reason}
                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                        What's one thing you'd improve about {schoolName}?
                    </label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <textarea 
                            placeholder="Help us understand the real student perspective..."
                            required
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold min-h-[120px] transition-all placeholder:font-normal placeholder:text-slate-400"
                            value={formData.improvement}
                            onChange={(e) => setFormData({...formData, improvement: e.target.value})}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                            Your Personal Gmail
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="email" 
                                placeholder="alex@gmail.com"
                                required
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all placeholder:font-normal placeholder:text-slate-400"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                            Discord or Slack
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="username#0000"
                                required
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all placeholder:font-normal placeholder:text-slate-400"
                                value={formData.socialHandle}
                                onChange={(e) => setFormData({...formData, socialHandle: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t-2 border-[#F8CBA6]/30 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                        type="button" 
                        onClick={handleSaveProgress} 
                        className="flex-1 bg-white text-slate-700 border-2 border-[#F8CBA6] font-black py-4 rounded-2xl hover:bg-[#FFFBEB] transition-colors uppercase tracking-widest text-sm shadow-sm"
                    >
                        Save Progress
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 bg-[#F8CBA6] text-slate-900 border-2 border-slate-900/10 font-black py-4 rounded-2xl hover:bg-[#E5B895] transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center group"
                    >
                        Send Application 
                        <Star className="w-4 h-4 ml-2 group-hover:rotate-45 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
      </div>
      
      <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest px-4 opacity-70">
        By applying, you agree to represent Archool fairly and verify your student status.
      </p>
    </div>
  );
};

export default AmbassadorApply;
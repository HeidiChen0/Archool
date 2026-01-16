import React from 'react';
import { Mail, MessageCircle, Hash, Send, User } from 'lucide-react';

const AdminApply: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#F8CBA6]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Apply to be Admin</h1>
                <p className="text-slate-600 font-bold text-sm mt-2">Help us keep Archool clean and safe.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Application sent! (Simulated)"); onCancel(); }}>
                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                        Why do you want to be an admin? 
                        <span className="block text-[10px] text-slate-400 normal-case italic">(don't write too much I don't want to read a lot of stuff)</span>
                    </label>
                    <textarea 
                        className="w-full p-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold min-h-[120px] transition-all"
                        placeholder="Keep it short and sweet..."
                        required
                    ></textarea>
                </div>
                
                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Personal Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="email" 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all" 
                            placeholder="your.real.email@gmail.com"
                            required 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">
                        Discord or Slack account 
                        <span className="block text-[10px] text-slate-400 normal-case italic">(for group chat purposes)</span>
                    </label>
                    <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all" 
                            placeholder="username#0000"
                            required 
                        />
                    </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="flex-1 bg-white text-slate-700 border-2 border-[#F8CBA6] font-black py-4 rounded-2xl hover:bg-[#FFFBEB] transition-colors uppercase tracking-widest text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center group"
                    >
                        Submit App
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AdminApply;

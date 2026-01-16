import React, { useState } from 'react';
import { User } from '../types';
import { Camera, Save, Shield, Mail, Lock, Edit3, GraduationCap } from 'lucide-react';

interface UserProfileProps {
  user: User;
  onUpdate: (updatedUser: Partial<User>) => void;
  onNavigate: (page: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate, onNavigate }) => {
  const [name, setName] = useState(user.name);
  const [verificationEmail, setVerificationEmail] = useState(user.verificationEmail || '');
  const [graduationYear, setGraduationYear] = useState(user.graduationYear?.toString() || '');
  const [isChangingYear, setIsChangingYear] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ 
      name, 
      verificationEmail, 
      graduationYear: graduationYear ? parseInt(graduationYear) : undefined 
    });
    alert('Profile updated!');
    setIsChangingYear(false);
  };

  const handleStartVerification = () => {
    onNavigate('verify-identity');
  };

  const years = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 5 + i);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-sm border-4 border-[#F8CBA6]">
        <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Your Account</h1>

        <form onSubmit={handleSave} className="space-y-8">
            <div className="flex items-center space-x-6 mb-10">
                <div className="relative">
                    <img src={user.avatarUrl || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md" />
                    <button type="button" className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-700 shadow-lg transition-all">
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-none mb-1">{user.name}</h2>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{user.role}</p>
                    {user.verified && (
                        <span className="inline-flex items-center mt-3 bg-[#ECF9FF] text-blue-700 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border-2 border-blue-100">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified Student
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Display Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        className="w-full p-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all" 
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Verification Gmail</label>
                    <div className="flex gap-3">
                        <div className="relative flex-grow">
                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors text-slate-300`} />
                            <input 
                                type="email" 
                                value={verificationEmail} 
                                readOnly
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none font-bold transition-all bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed`} 
                                placeholder="school.email@example.edu"
                            />
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        </div>
                        <button 
                            type="button"
                            onClick={handleStartVerification}
                            className={`px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border-2 flex items-center justify-center gap-2 bg-white border-[#F8CBA6] text-slate-700 hover:bg-[#FFFBEB]`}
                        >
                            <Edit3 className="w-4 h-4" />
                            Change
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3 ml-1">
                        This email is linked to your verified status. Click change to restart verification.
                    </p>
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Graduation Year</label>
                    <div className="flex gap-3">
                        <div className="relative flex-grow">
                            <GraduationCap className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isChangingYear ? 'text-[#F8CBA6]' : 'text-slate-300'}`} />
                            {isChangingYear ? (
                                <select 
                                    value={graduationYear}
                                    onChange={(e) => setGraduationYear(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all appearance-none"
                                >
                                    <option value="" disabled>Select Year</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            ) : (
                                <>
                                    <input 
                                        type="text" 
                                        value={graduationYear || 'Not Set'} 
                                        readOnly
                                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none font-bold transition-all bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed`} 
                                    />
                                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                </>
                            )}
                        </div>
                        <button 
                            type="button"
                            onClick={() => setIsChangingYear(!isChangingYear)}
                            className={`px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border-2 flex items-center justify-center gap-2 ${isChangingYear ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-[#F8CBA6] text-slate-700 hover:bg-[#FFFBEB]'}`}
                        >
                            {isChangingYear ? 'Cancel' : (
                                <>
                                    <Edit3 className="w-4 h-4" />
                                    Change
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t-2 border-[#F8CBA6]/30">
                <button 
                    type="submit" 
                    className="flex items-center justify-center w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm group"
                >
                    <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Save Changes
                </button>
            </div>
        </form>

        <div className="mt-10 bg-[#FFFBEB] p-6 rounded-3xl border-2 border-[#F8CBA6] border-dashed flex flex-col sm:flex-row justify-between items-center gap-4">
             <div>
                 <h3 className="font-black text-slate-900 uppercase tracking-tight">Admin Application</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Help moderate the Archool community</p>
             </div>
             <button 
                onClick={() => onNavigate('admin-apply')}
                className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm"
             >
                 Apply Now
             </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
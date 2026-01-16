import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Mail, Key, Send, CheckCircle, Lock, Smartphone, Users, User, GraduationCap, Briefcase, AlertTriangle, XCircle } from 'lucide-react';

interface VerifyIdentityProps {
  schoolName: string;
  onCancel: () => void;
  onSuccess: () => void;
}

type Role = 'student' | 'staff' | 'parent';

const VerifyIdentity: React.FC<VerifyIdentityProps> = ({ schoolName, onCancel, onSuccess }) => {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [emails, setEmails] = useState<{ [key in Role]?: string }>({});
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'roles' | 'email' | 'code'>('roles');
  const [isSending, setIsSending] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);

  const toggleRole = (role: Role) => {
    setShowRoleWarning(false);
    setSelectedRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for conflicting roles: Student + (Staff or Parent)
    const hasStudent = selectedRoles.includes('student');
    const hasConflictingRole = selectedRoles.includes('staff') || selectedRoles.includes('parent');

    if (hasStudent && hasConflictingRole) {
      setShowRoleWarning(true);
      return;
    }

    if (selectedRoles.length > 0) {
      setStep('email');
    } else {
      alert("Please select at least one role to continue.");
    }
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSending(false);
      setStep('code');
      alert(`Verification code(s) sent to the provided address(es).`);
    }, 1500);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '123456' || code.length === 6) {
      alert("Identity Verified! You now have access to verified features.");
      onSuccess();
    } else {
      alert("Invalid code. Please check your email and try again.");
    }
  };

  const handleEmailChange = (role: Role, value: string) => {
    setEmails(prev => ({ ...prev, [role]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onCancel} 
            className="flex items-center text-slate-600 hover:text-slate-900 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to previous page
          </button>
          
          <button 
            onClick={onCancel} 
            className="flex items-center bg-white text-rose-500 border-2 border-rose-100 px-4 py-1.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm"
          >
            <XCircle className="w-4 h-4 mr-1.5" />
            Nevermind
          </button>
      </div>

      <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#F8CBA6] relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Lock className="w-48 h-48 text-slate-900 rotate-12" />
        </div>

        <div className="relative z-10">
            <div className="flex items-center mb-10">
                <div className="bg-blue-600 p-4 rounded-2xl mr-5 shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                        Verify Identity
                    </h1>
                    <p className="text-slate-700 font-bold bg-white/50 px-3 py-1 rounded-lg inline-block mt-1">
                        {schoolName}
                    </p>
                </div>
            </div>

            {step === 'roles' && (
                <div className="animate-pop-in">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Step 1: Select Your Role</h2>
                        <p className="text-slate-600 font-medium">
                            Choose one or more roles that represent your connection to this school.
                        </p>
                    </div>

                    <form onSubmit={handleRoleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: 'student', label: 'Student', icon: GraduationCap },
                                { id: 'staff', label: 'Staff Member', icon: Briefcase },
                                { id: 'parent', label: 'Parent / Guardian', icon: Users }
                            ].map((role) => {
                                const Icon = role.icon;
                                const isSelected = selectedRoles.includes(role.id as Role);
                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => toggleRole(role.id as Role)}
                                        className={`flex items-center p-6 rounded-2xl border-4 transition-all text-left group ${
                                            isSelected 
                                            ? 'bg-white border-blue-600 shadow-lg translate-x-1' 
                                            : 'bg-[#FFFBEB] border-[#F8CBA6] hover:border-slate-400'
                                        }`}
                                    >
                                        <div className={`p-3 rounded-xl mr-5 transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-[#FFE7CC] text-slate-500'}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-grow">
                                            <span className={`block text-lg font-black uppercase tracking-tight ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>
                                                {role.label}
                                            </span>
                                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest opacity-60">
                                                {isSelected ? 'Selected' : 'Click to select'}
                                            </span>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-[#F8CBA6]'}`}>
                                            {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {showRoleWarning && (
                          <div className="bg-rose-100 border-2 border-rose-400 p-4 rounded-2xl animate-pop-in flex items-center">
                            <AlertTriangle className="w-6 h-6 text-rose-600 mr-3 flex-shrink-0" />
                            <p className="text-rose-900 font-black uppercase tracking-tighter text-lg">
                              Are you sure???????
                            </p>
                          </div>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center group"
                        >
                            Continue to Email Verification
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            )}

            {step === 'email' && (
                <div className="animate-pop-in">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Step 2: Verification Details</h2>
                        <p className="text-slate-600 font-medium">
                            Please provide the required email addresses to verify your selected identities.
                        </p>
                    </div>

                    <form onSubmit={handleSendCode} className="space-y-8">
                        {selectedRoles.includes('student') && (
                            <div className="space-y-3">
                                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                                    Student Verification
                                </label>
                                <p className="text-sm font-bold text-blue-600 bg-blue-50 p-3 rounded-xl border border-blue-100">
                                    "Please use your school issued gmail address to be verified"
                                </p>
                                <div className="relative">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="email" 
                                        placeholder="student@school.edu"
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold"
                                        value={emails['student'] || ''}
                                        onChange={(e) => handleEmailChange('student', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedRoles.includes('staff') && (
                            <div className="space-y-3">
                                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                                    Staff Verification
                                </label>
                                <p className="text-sm font-bold text-blue-600 bg-blue-50 p-3 rounded-xl border border-blue-100">
                                    "Please use your school issued staff gmail address to be verified"
                                </p>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="email" 
                                        placeholder="staff.name@school.edu"
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold"
                                        value={emails['staff'] || ''}
                                        onChange={(e) => handleEmailChange('staff', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedRoles.includes('parent') && (
                            <div className="space-y-3">
                                <label className="block text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                                    Parent Verification
                                </label>
                                <p className="text-sm font-bold text-blue-600 bg-blue-50 p-3 rounded-xl border border-blue-100">
                                    "Please use your child's gmail address to be verified"
                                </p>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="email" 
                                        placeholder="child@school.edu"
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold"
                                        value={emails['parent'] || ''}
                                        onChange={(e) => handleEmailChange('parent', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                            <button 
                                type="button" 
                                onClick={() => setStep('roles')} 
                                className="flex-1 bg-white text-slate-700 border-2 border-[#F8CBA6] font-black py-4 rounded-2xl hover:bg-[#FFFBEB] transition-colors uppercase tracking-widest text-sm"
                            >
                                Back to Roles
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSending}
                                className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center group disabled:opacity-50"
                            >
                                {isSending ? 'Sending Code...' : 'Send Codes'}
                                {!isSending && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {step === 'code' && (
                <div className="animate-pop-in">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Step 3: Verification Code</h2>
                        <p className="text-slate-600 font-medium">
                            Enter the 6-digit code we sent to your provided email address(es).
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">
                                6-Digit Code
                            </label>
                            <div className="relative">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="000000"
                                    required
                                    maxLength={6}
                                    pattern="\d{6}"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-blue-400 bg-[#FFFBEB] focus:ring-4 focus:ring-blue-400/30 outline-none font-black text-2xl tracking-[0.5em] transition-all placeholder:font-normal placeholder:text-slate-400 placeholder:tracking-normal"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button 
                                type="button" 
                                onClick={() => setStep('email')} 
                                className="flex-1 bg-white text-slate-700 border-2 border-[#F8CBA6] font-black py-4 rounded-2xl hover:bg-[#FFFBEB] transition-colors uppercase tracking-widest text-sm"
                            >
                                Change Details
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center group"
                            >
                                Verify Identity
                                <CheckCircle className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Didn't receive the code? <button type="button" className="text-blue-600 hover:underline">Resend</button>
                        </p>
                    </form>
                </div>
            )}

            <div className="mt-12 pt-8 border-t-2 border-[#F8CBA6]/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                    <Smartphone className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                    <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase">Secure Verification</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Encryption ensures your school email is never shared with third parties.</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                    <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase">Instant Credibility</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Verified badges let others know your reviews are from a real student.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest px-4 opacity-70 leading-relaxed">
        Verification helps Archool maintain a trustworthy community for all students.
      </p>
    </div>
  );
};

export default VerifyIdentity;

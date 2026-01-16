import React, { useState } from 'react';
import { ArrowLeft, School as SchoolIcon, MapPin, CheckSquare, Image as ImageIcon, Info, Camera, UserCircle, ShieldCheck, Mail, Check, X, ShieldAlert } from 'lucide-react';

interface AddSchoolFormProps {
    onCancel: () => void;
    onNavigate: (page: string) => void;
}

const AddSchoolForm: React.FC<AddSchoolFormProps> = ({ onCancel, onNavigate }) => {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hasSchoolGmail, setHasSchoolGmail] = useState<boolean | null>(null);

  const programs = ['IB', 'AP', 'A-Levels', 'GCSE'];

  const toggleProgram = (program: string) => {
    setSelectedPrograms(prev => 
      prev.includes(program) 
        ? prev.filter(p => p !== program) 
        : [...prev, program]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
        <button 
            onClick={onCancel} 
            className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
        >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        <div className="bg-[#FFE7CC] rounded-3xl p-8 md:p-12 shadow-sm border-4 border-[#F8CBA6]">
            <div className="flex items-center mb-8">
                <div className="bg-[#F8CBA6] p-4 rounded-2xl mr-5">
                    <SchoolIcon className="w-8 h-8 text-slate-900" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Add a School</h1>
                    <p className="text-slate-600 font-medium">Help students find their next home by adding a verified school.</p>
                </div>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('School submitted for moderation!'); onCancel(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Full School Name</label>
                        <div className="relative">
                            <SchoolIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="e.g. International School of Seattle"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all placeholder:font-normal placeholder:text-slate-400" 
                                required 
                            />
                        </div>
                    </div>
                     <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Full Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Street, City, Zip, Country"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-bold transition-all placeholder:font-normal placeholder:text-slate-400" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">School Photo</label>
                    <div className="relative group">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`w-full min-h-[200px] border-4 border-dashed border-[#F8CBA6] rounded-2xl bg-[#FFFBEB] flex flex-col items-center justify-center p-6 transition-all ${!imagePreview && 'group-hover:bg-[#FFE7CC]'}`}>
                            {imagePreview ? (
                                <div className="relative w-full h-48">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl pointer-events-none">
                                        <Camera className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon className="w-12 h-12 text-[#F8CBA6] mb-3" />
                                    <p className="text-slate-700 font-black uppercase text-sm mb-1 tracking-wider">Click to upload photo</p>
                                    <p className="text-slate-500 text-xs text-center flex items-center">
                                        <Info className="w-3 h-3 mr-1" />
                                        Please provide a photo of the <strong>outside</strong> of the school or an <strong>identifiable</strong> landmark.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Programs Checkboxes */}
                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">Programs Offered</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {programs.map(program => (
                            <button
                                key={program}
                                type="button"
                                onClick={() => toggleProgram(program)}
                                className={`flex items-center justify-center space-x-2 p-4 rounded-2xl border-2 transition-all font-black text-sm uppercase tracking-tighter ${
                                    selectedPrograms.includes(program)
                                    ? 'bg-[#F8CBA6] border-[#F8CBA6] text-slate-900 shadow-md'
                                    : 'bg-white border-[#F8CBA6] text-slate-400 hover:border-slate-400'
                                }`}
                            >
                                <CheckSquare className={`w-4 h-4 ${selectedPrograms.includes(program) ? 'text-slate-900' : 'text-slate-200'}`} />
                                <span>{program}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Verification Method - Updated to Yes/No Choice */}
                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">Verification Method</label>
                    <div className="bg-[#FFFBEB] p-6 rounded-2xl border-2 border-[#F8CBA6] shadow-sm">
                        <div className="flex items-center mb-4">
                            <Mail className="w-5 h-5 mr-3 text-slate-400" />
                            <span className="text-sm font-bold text-slate-800">Does the school use school-issued Gmail addresses for students/staff?</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setHasSchoolGmail(true)}
                                className={`flex items-center justify-center space-x-2 py-4 rounded-xl border-2 font-black uppercase tracking-widest text-sm transition-all ${
                                    hasSchoolGmail === true
                                    ? 'bg-[#F8CBA6] border-[#F8CBA6] text-slate-900 shadow-md'
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-[#F8CBA6]'
                                }`}
                            >
                                <Check className={`w-4 h-4 ${hasSchoolGmail === true ? 'text-slate-900' : 'text-slate-200'}`} />
                                <span>Yes</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setHasSchoolGmail(false)}
                                className={`flex items-center justify-center space-x-2 py-4 rounded-xl border-2 font-black uppercase tracking-widest text-sm transition-all ${
                                    hasSchoolGmail === false
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-[#F8CBA6]'
                                }`}
                            >
                                <X className={`w-4 h-4 ${hasSchoolGmail === false ? 'text-white' : 'text-slate-200'}`} />
                                <span>No</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2 ml-1">Short Description</label>
                    <textarea 
                        placeholder="Tell us what makes this school unique (clubs, facilities, culture)..."
                        className="w-full p-4 rounded-2xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none font-medium min-h-[120px] transition-all placeholder:text-slate-400"
                    ></textarea>
                </div>

                {/* Optional Leadership Section */}
                <div className="bg-[#FFFBEB] p-6 rounded-3xl border-2 border-[#F8CBA6] border-dashed space-y-6">
                    <div className="flex items-center space-x-2 text-slate-800">
                        <ShieldCheck className="w-5 h-5" />
                        <h3 className="font-black uppercase tracking-widest text-sm">School Leadership (Optional)</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Principal Name</label>
                            <div className="relative">
                                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#F8CBA6]/50 bg-white focus:ring-4 focus:ring-[#F8CBA6]/20 outline-none font-bold transition-all placeholder:font-normal" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Vice Principal Name</label>
                            <div className="relative">
                                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#F8CBA6]/50 bg-white focus:ring-4 focus:ring-[#F8CBA6]/20 outline-none font-bold transition-all placeholder:font-normal" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional Admin Application Section */}
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-900 border-dashed space-y-4">
                    <div className="flex items-center space-x-2 text-slate-900">
                        <ShieldAlert className="w-5 h-5" />
                        <h3 className="font-black uppercase tracking-widest text-sm">Help Manage this School (Optional)</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight max-w-sm">
                            Do you want to become an admin for this school? You can help moderate reviews and keep details up to date.
                        </p>
                        <button 
                            type="button"
                            onClick={() => onNavigate('admin-apply')}
                            className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-md"
                        >
                            Apply to be Admin
                        </button>
                    </div>
                </div>
                
                 <div className="pt-6 border-t-2 border-[#F8CBA6]/30 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="flex-1 bg-white text-slate-700 border-2 border-[#F8CBA6] font-black py-4 rounded-2xl hover:bg-[#F8CBA6] transition-colors uppercase tracking-widest text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={hasSchoolGmail === null}
                        className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit School
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AddSchoolForm;

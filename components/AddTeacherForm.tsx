import React, { useState } from 'react';
import { Teacher } from '../types';
import { UserPlus, ArrowLeft, School as SchoolIcon } from 'lucide-react';
import { MOCK_SCHOOLS } from '../constants';

interface AddTeacherFormProps {
    schoolId: string;
    onCancel: () => void;
    onSubmit: (teacher: Teacher) => void;
}

const AddTeacherForm: React.FC<AddTeacherFormProps> = ({ schoolId, onCancel, onSubmit }) => {
    const [honorific, setHonorific] = useState('Mr.');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [department, setDepartment] = useState('');
    const [currentSchoolId, setCurrentSchoolId] = useState(schoolId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && subject && department && currentSchoolId) {
            const fullName = `${honorific} ${name.trim()}`;
            const newTeacher: Teacher = {
                id: `t-new-${Date.now()}`,
                schoolId: currentSchoolId,
                name: fullName,
                subject: subject.trim(),
                department: department.trim(),
                ratings: {
                    difficulty: 0,
                    friendliness: 0,
                    homework: 0,
                    pacing: 0,
                    overall: 0
                }
            };
            onSubmit(newTeacher);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <button 
                onClick={onCancel} 
                className="flex items-center text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to School
            </button>

            <div className="bg-[#FFE7CC] rounded-2xl p-8 shadow-sm border border-[#F8CBA6]">
                <div className="flex items-center mb-6">
                    <div className="bg-[#F8CBA6] p-3 rounded-xl mr-4">
                        <UserPlus className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Add Missing Teacher</h1>
                        <p className="text-slate-500 text-sm">Help others by adding a teacher we missed.</p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* School Selection Dropdown */}
                    <div>
                        <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center">
                            <SchoolIcon className="w-4 h-4 mr-2" />
                            Target School
                        </label>
                        <select 
                            value={currentSchoolId}
                            onChange={(e) => setCurrentSchoolId(e.target.value)}
                            className="w-full p-4 rounded-xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none transition-all font-bold"
                            required
                        >
                            <option value="" disabled>Select a School</option>
                            {MOCK_SCHOOLS.map(school => (
                                <option key={school.id} value={school.id}>
                                    {school.name} ({school.location})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">How to address</label>
                            <select 
                                value={honorific}
                                onChange={(e) => setHonorific(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none transition-all font-medium"
                                required
                            >
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                                <option value="Dr.">Dr.</option>
                                <option value="Mx.">Mx.</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Teacher's Last Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Anderson"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none transition-all placeholder-slate-400 font-medium" 
                                required 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Primary Subject</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Physics HL"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none transition-all placeholder-slate-400 font-medium" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Department</label>
                            <select 
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-[#F8CBA6] bg-[#FFFBEB] focus:ring-4 focus:ring-[#F8CBA6]/30 outline-none transition-all font-medium"
                                required
                            >
                                <option value="" disabled>Select Department</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="English">English</option>
                                <option value="Languages">Languages</option>
                                <option value="Arts">Arts</option>
                                <option value="PE">Physical Education</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#F8CBA6]/30">
                        <p className="text-xs text-slate-500 mb-6 italic">
                            Note: Teachers added will be visible to the community. Once added, students can start leaving verified reviews.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                type="button" 
                                onClick={onCancel} 
                                className="flex-1 bg-white text-slate-700 font-bold py-4 rounded-xl border-2 border-[#F8CBA6] hover:bg-[#FFFBEB] transition-colors uppercase tracking-widest text-sm"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 bg-[#F8CBA6] text-slate-900 font-black py-4 rounded-xl hover:bg-[#E5B895] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg uppercase tracking-widest text-sm"
                            >
                                Add Teacher
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeacherForm;
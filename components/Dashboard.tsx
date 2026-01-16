import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { School, Teacher } from '../types';

interface DashboardProps {
  school: School;
  teachers: Teacher[];
}

const Dashboard: React.FC<DashboardProps> = ({ school, teachers }) => {
  // Mock data for trends
  const trendData = [
    { month: 'Jan', rating: 3.8 },
    { month: 'Feb', rating: 3.9 },
    { month: 'Mar', rating: 4.1 },
    { month: 'Apr', rating: 4.0 },
    { month: 'May', rating: 4.3 },
    { month: 'Jun', rating: 4.4 },
  ];

  const deptData = [
      { name: 'Math', score: 4.2 },
      { name: 'Science', score: 4.5 },
      { name: 'History', score: 3.8 },
      { name: 'English', score: 4.1 },
      { name: 'Arts', score: 4.7 },
  ];

  return (
    <div className="space-y-6">
        <div className="bg-[#FFE7CC] p-6 rounded-xl shadow-sm border border-[#F8CBA6]">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">School Analytics Dashboard</h2>
            <p className="text-slate-500">Overview for <span className="font-semibold text-slate-800">{school.name}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFE7CC] p-6 rounded-xl shadow-sm border border-[#F8CBA6]">
                <h3 className="text-sm font-medium text-slate-500 uppercase mb-4">Overall Satisfaction</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">{school.ratings.overall} <span className="text-lg text-slate-400 font-normal">/ 5.0</span></div>
                <div className="text-sm text-green-600 font-medium flex items-center">
                    ↑ 12% vs last month
                </div>
            </div>
            <div className="bg-[#FFE7CC] p-6 rounded-xl shadow-sm border border-[#F8CBA6]">
                <h3 className="text-sm font-medium text-slate-500 uppercase mb-4">Total Reviews</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">1,248</div>
                <div className="text-sm text-slate-400">
                    Active students
                </div>
            </div>
            <div className="bg-[#FFE7CC] p-6 rounded-xl shadow-sm border border-[#F8CBA6]">
                <h3 className="text-sm font-medium text-slate-500 uppercase mb-4">Teacher Engagement</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">89%</div>
                <div className="text-sm text-slate-400">
                    Response rate
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#FFE7CC] p-6 rounded-xl shadow-sm border border-[#F8CBA6] h-80">
                <h3 className="font-bold text-slate-900 mb-6">Student Satisfaction Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8CBA6" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <YAxis hide domain={[0, 5]} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#FFFBEB' }} 
                        />
                        <Line type="monotone" dataKey="rating" stroke="#1e293b" strokeWidth={3} dot={{r: 4, fill: '#1e293b'}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-[#FFE7CC] p-6 rounded-xl shadow-sm border border-[#F8CBA6] h-80">
                <h3 className="font-bold text-slate-900 mb-6">Department Performance</h3>
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deptData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F8CBA6" />
                        <XAxis type="number" domain={[0, 5]} hide />
                        <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#FFFBEB' }} />
                        <Bar dataKey="score" fill="#1e293b" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
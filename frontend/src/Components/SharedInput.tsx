import React from 'react';

export const SharedInput = ({ label, value, onChange, type = "text" }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wide">{label}</label>
    <input 
      type={type} 
      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#0D9488] focus:bg-white outline-none font-semibold text-slate-700 transition-all" 
      value={value || ''} 
      onChange={e => onChange(e.target.value)} 
    />
  </div>
);

export const SharedSelect = ({ label, value, options, onChange }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wide">{label}</label>
    <select 
      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#0D9488] focus:bg-white outline-none font-semibold text-slate-700 transition-all appearance-none" 
      value={value || ''} 
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Choose an option...</option>
      {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);
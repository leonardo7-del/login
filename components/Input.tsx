
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-300 ml-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 
            ${icon ? 'pl-10' : ''}
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 
            transition-all duration-200 placeholder:text-slate-500
            ${error ? 'border-red-500 ring-red-500/20' : ''}
          `}
        />
      </div>
      {error && <span className="text-xs text-red-400 ml-1">{error}</span>}
    </div>
  );
};

export default Input;

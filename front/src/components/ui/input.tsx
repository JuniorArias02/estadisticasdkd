import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
  error?: string;
  icono?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ etiqueta, error, icono, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {etiqueta && (
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {etiqueta}
          </label>
        )}
        <div className="relative flex items-center">
          {icono && (
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              {icono}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-sm px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500 ${
              icono ? 'pl-10' : ''
            } ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-rose-400 mt-0.5 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

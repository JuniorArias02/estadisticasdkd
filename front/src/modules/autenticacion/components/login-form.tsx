import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { esquemaLogin, type FormularioLoginValues } from '../validations/autenticacion.validation';

interface LoginFormProps {
  cargando: boolean;
  error: string | null;
  onLogin: (data: FormularioLoginValues) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ cargando, error, onLogin }) => {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioLoginValues>({
    resolver: zodResolver(esquemaLogin),
    defaultValues: {
      correo: '',
      contrasena: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4 w-full">
      {/* Global Error Banner */}
      {error && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Correo Institucional */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#44403C]">
          Correo
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3.5 h-4 w-4 text-[#A8A29E] pointer-events-none" />
          <input
            type="email"
            placeholder="usuario@dkd.com"
            className={`w-full rounded-xl bg-white border border-[#E7E5E4] text-[#1C1917] text-xs px-3.5 py-3 pl-10 transition-colors focus:outline-none focus:border-[#C05628] focus:ring-1 focus:ring-[#C05628] placeholder:text-[#A8A29E] ${
              errors.correo ? 'border-rose-500 focus:border-rose-500' : ''
            }`}
            {...register('correo')}
          />
        </div>
        {errors.correo && (
          <span className="text-[11px] text-rose-500 font-medium">{errors.correo.message}</span>
        )}
      </div>

      {/* Contraseña */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#44403C]">
          Contraseña
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute left-3.5 h-4 w-4 text-[#A8A29E] pointer-events-none" />
          <input
            type={mostrarContrasena ? 'text' : 'password'}
            placeholder="Ingresa tu contraseña"
            className={`w-full rounded-xl bg-white border border-[#E7E5E4] text-[#1C1917] text-xs px-3.5 py-3 pl-10 pr-10 transition-colors focus:outline-none focus:border-[#C05628] focus:ring-1 focus:ring-[#C05628] placeholder:text-[#A8A29E] ${
              errors.contrasena ? 'border-rose-500 focus:border-rose-500' : ''
            }`}
            {...register('contrasena')}
          />
          <button
            type="button"
            onClick={() => setMostrarContrasena(!mostrarContrasena)}
            className="absolute right-3.5 text-[#A8A29E] hover:text-[#44403C] transition-colors"
            tabIndex={-1}
          >
            {mostrarContrasena ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.contrasena && (
          <span className="text-[11px] text-rose-500 font-medium">{errors.contrasena.message}</span>
        )}
      </div>

      {/* Recordarme y Olvidaste tu contraseña */}
      <div className="flex items-center justify-between text-xs text-[#78716C] mt-1">
        <label className="flex items-center gap-2 cursor-pointer hover:text-[#44403C]">
          <input
            type="checkbox"
            className="rounded border-[#D6D3D1] text-[#C05628] focus:ring-[#C05628] h-3.5 w-3.5 accent-[#C05628]"
          />
          Recordarme
        </label>
        <a href="#" className="font-semibold text-[#C05628] hover:underline transition-all">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Botón de Submit */}
      <button
        type="submit"
        disabled={cargando}
        className="w-full mt-3 py-3 px-4 bg-[#C05628] hover:bg-[#A84920] active:scale-[0.99] text-white font-medium text-xs rounded-xl shadow-md shadow-[#C05628]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {cargando ? (
          <span>Cargando...</span>
        ) : (
          <>
            <span>Iniciar Sesion</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

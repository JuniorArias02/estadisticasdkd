import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Lock, User, Mail, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePerfil, useActualizarPerfil, useCambiarClavePerfil } from '../hooks/use-usuarios';

export const PerfilPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: perfil, isLoading } = usePerfil();
  const { mutate: actualizarPerfil, isPending: actualizando } = useActualizarPerfil();
  const { mutate: cambiarClave, isPending: cambiandoClave } = useCambiarClavePerfil();

  const [formData, setFormData] = useState({ nombre: '', apellido: '' });
  const [claveData, setClaveData] = useState({ nuevaContrasena: '', confirmarContrasena: '' });

  useEffect(() => {
    if (perfil) {
      setFormData({ nombre: perfil.nombre || '', apellido: perfil.apellido || '' });
    }
  }, [perfil]);

  const handleGuardarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    actualizarPerfil(formData, {
      onSuccess: () => alert('Perfil actualizado correctamente'),
      onError: () => alert('Error al actualizar el perfil')
    });
  };

  const handleCambiarClave = (e: React.FormEvent) => {
    e.preventDefault();
    if (claveData.nuevaContrasena !== claveData.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (claveData.nuevaContrasena.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    cambiarClave({ nuevaContrasena: claveData.nuevaContrasena }, {
      onSuccess: () => {
        alert('Contraseña actualizada correctamente');
        setClaveData({ nuevaContrasena: '', confirmarContrasena: '' });
      },
      onError: () => alert('Error al cambiar la contraseña')
    });
  };

  if (isLoading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="flex flex-col gap-6" style={{ backgroundColor: '#FAF9F8', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex flex-col gap-2 shrink-0 mb-2">
        <button 
          onClick={() => navigate('/configuracion')}
          className="flex items-center gap-1.5 text-sm font-medium w-fit transition-colors hover:opacity-80 mb-2"
          style={{ color: '#A65932' }}
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Configuración
        </button>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#262626' }}>Mi Perfil</h1>
        <p className="text-sm" style={{ color: '#737373' }}>Administra tu información personal y seguridad.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Información Personal */}
        <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[#EAEAEA] pb-4">
            <div className="w-10 h-10 rounded-lg bg-[#F6EFEA] flex items-center justify-center">
              <User className="w-5 h-5 text-[#A65932]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#262626]">Información Personal</h3>
              <p className="text-sm text-[#737373]">Actualiza tus datos básicos</p>
            </div>
          </div>

          <form onSubmit={handleGuardarPerfil} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#737373]">Nombre</label>
              <input 
                type="text" 
                required
                value={formData.nombre} 
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-[#EAEAEA] focus:border-[#A65932]" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#737373]">Apellido</label>
              <input 
                type="text" 
                required
                value={formData.apellido} 
                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-[#EAEAEA] focus:border-[#A65932]" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#737373]">Correo (Solo lectura)</label>
              <div className="flex items-center gap-2 w-full px-3 py-2 border rounded-md text-sm border-[#EAEAEA] bg-gray-50 text-gray-500">
                <Mail className="w-4 h-4" /> {perfil?.correo}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#737373]">Roles</label>
              <div className="flex gap-2 flex-wrap">
                {perfil?.roles?.map(r => (
                  <span key={r.id} className="px-2 py-1 rounded-md text-xs font-medium bg-[#E6F2ED] text-[#2D7A5D]">
                    {r.nombre}
                  </span>
                ))}
                {(!perfil?.roles || perfil.roles.length === 0) && (
                  <span className="text-sm text-[#737373]">No tienes roles asignados</span>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={actualizando}
                className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors bg-[#A65932] text-white hover:bg-[#944D2A] disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {actualizando ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>

        {/* Seguridad */}
        <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-6 h-fit">
          <div className="flex items-center gap-3 border-b border-[#EAEAEA] pb-4">
            <div className="w-10 h-10 rounded-lg bg-[#FDF4E6] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#A06A22]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#262626]">Seguridad</h3>
              <p className="text-sm text-[#737373]">Cambia tu contraseña de acceso</p>
            </div>
          </div>

          <form onSubmit={handleCambiarClave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#737373]">Nueva Contraseña</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={claveData.nuevaContrasena} 
                onChange={(e) => setClaveData({...claveData, nuevaContrasena: e.target.value})}
                className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-[#EAEAEA] focus:border-[#A65932]" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#737373]">Confirmar Contraseña</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={claveData.confirmarContrasena} 
                onChange={(e) => setClaveData({...claveData, confirmarContrasena: e.target.value})}
                className="w-full px-3 py-2 border rounded-md text-sm outline-none transition-colors border-[#EAEAEA] focus:border-[#A65932]" 
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={cambiandoClave}
                className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors bg-[#FDF4E6] text-[#A06A22] hover:bg-[#F6EFEA] disabled:opacity-50"
              >
                <Lock className="w-4 h-4" /> {cambiandoClave ? 'Actualizando...' : 'Cambiar Contraseña'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

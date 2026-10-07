import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Search, Edit2, Trash2, Shield, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  useUsuarios, 
  useCrearUsuario, 
  useActualizarUsuario, 
  useEliminarUsuario, 
  useCambiarClaveUsuario 
} from '../hooks/use-usuarios';
import type { Usuario } from '../types/usuarios.types';

export const UsuariosPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: usuarios, isLoading } = useUsuarios();
  const { mutate: crearUsuario } = useCrearUsuario();
  const { mutate: actualizarUsuario } = useActualizarUsuario();
  const { mutate: eliminarUsuario } = useEliminarUsuario();
  const { mutate: cambiarClave } = useCambiarClaveUsuario();

  const [search, setSearch] = useState('');
  
  // States for modals
  const [showCrear, setShowCrear] = useState(false);
  const [showEditar, setShowEditar] = useState<Usuario | null>(null);
  const [showClave, setShowClave] = useState<Usuario | null>(null);

  // Form states
  const [crearData, setCrearData] = useState({ nombre: '', apellido: '', correo: '', contrasena: '' });
  const [editarData, setEditarData] = useState({ nombre: '', apellido: '', correo: '', activo: true });
  const [claveData, setClaveData] = useState({ nuevaContrasena: '' });

  const filtrados = usuarios?.filter(u => 
    u.nombre.toLowerCase().includes(search.toLowerCase()) || 
    u.apellido.toLowerCase().includes(search.toLowerCase()) || 
    u.correo.toLowerCase().includes(search.toLowerCase())
  );

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    crearUsuario(crearData, {
      onSuccess: () => {
        alert('Usuario creado');
        setShowCrear(false);
        setCrearData({ nombre: '', apellido: '', correo: '', contrasena: '' });
      },
      onError: () => alert('Error al crear usuario')
    });
  };

  const handleEditar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditar) return;
    actualizarUsuario({ id: showEditar.id, data: editarData }, {
      onSuccess: () => {
        alert('Usuario actualizado');
        setShowEditar(null);
      },
      onError: () => alert('Error al actualizar')
    });
  };

  const handleCambiarClave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showClave) return;
    cambiarClave({ id: showClave.id, data: claveData }, {
      onSuccess: () => {
        alert('Clave cambiada exitosamente');
        setShowClave(null);
        setClaveData({ nuevaContrasena: '' });
      },
      onError: () => alert('Error al cambiar la clave')
    });
  };

  const handleEliminar = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      eliminarUsuario(id, {
        onSuccess: () => alert('Usuario eliminado'),
        onError: () => alert('Error al eliminar')
      });
    }
  };

  const openEditar = (u: Usuario) => {
    setEditarData({ nombre: u.nombre, apellido: u.apellido, correo: u.correo, activo: u.activo });
    setShowEditar(u);
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#262626' }}>Administración de Usuarios</h1>
            <p className="text-sm" style={{ color: '#737373' }}>Gestiona los accesos y perfiles de los colaboradores.</p>
          </div>
          <button 
            onClick={() => setShowCrear(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors bg-[#A65932] text-white hover:bg-[#944D2A]"
          >
            <UserPlus className="w-4 h-4" /> Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <div className="flex items-center gap-2 px-3 py-2 border rounded-md border-[#EAEAEA] w-full max-w-md">
          <Search className="w-4 h-4 text-[#737373]" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o correo..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#FAF9F8] text-[#737373] border-b border-[#EAEAEA]">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Nombre Completo</th>
                <th className="px-4 py-3 font-medium">Correo</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Roles</th>
                <th className="px-4 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] text-[#262626]">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-4">Cargando...</td></tr>
              ) : filtrados?.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF9F8]">
                  <td className="px-4 py-3 text-[#737373]">#{u.id}</td>
                  <td className="px-4 py-3 font-medium">{u.nombre} {u.apellido}</td>
                  <td className="px-4 py-3 text-[#737373]">{u.correo}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${u.activo ? 'bg-[#E6F2ED] text-[#2D7A5D]' : 'bg-[#FBEAE9] text-[#B33A3A]'}`}>
                      {u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {u.roles?.map(r => (
                        <span key={r.id} className="px-2 py-0.5 bg-[#F6EFEA] text-[#A65932] text-xs rounded border border-[#A65932]/20">
                          {r.nombre}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setShowClave(u); setClaveData({ nuevaContrasena: '' }); }} className="p-1.5 text-[#A06A22] hover:bg-[#FDF4E6] rounded" title="Cambiar Contraseña">
                        <Key className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEditar(u)} className="p-1.5 text-[#262626] hover:bg-[#EAEAEA] rounded" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEliminar(u.id)} className="p-1.5 text-[#B33A3A] hover:bg-[#FBEAE9] rounded" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados?.length === 0 && (
                <tr><td colSpan={6} className="text-center py-4 text-[#737373]">No hay usuarios.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear */}
      {showCrear && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#262626]">Crear Nuevo Usuario</h2>
            <form onSubmit={handleCrear} className="flex flex-col gap-4">
              <input required placeholder="Nombre" value={crearData.nombre} onChange={e => setCrearData({...crearData, nombre: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <input required placeholder="Apellido" value={crearData.apellido} onChange={e => setCrearData({...crearData, apellido: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <input required type="email" placeholder="Correo" value={crearData.correo} onChange={e => setCrearData({...crearData, correo: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <input required type="password" minLength={6} placeholder="Contraseña (min. 6 chars)" value={crearData.contrasena} onChange={e => setCrearData({...crearData, contrasena: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowCrear(false)} className="px-4 py-2 text-sm text-[#737373] hover:bg-[#FAF9F8] rounded-md">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm bg-[#A65932] text-white rounded-md hover:bg-[#944D2A]">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditar && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#262626]">Editar Usuario: {showEditar.nombre}</h2>
            <form onSubmit={handleEditar} className="flex flex-col gap-4">
              <input required placeholder="Nombre" value={editarData.nombre} onChange={e => setEditarData({...editarData, nombre: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <input required placeholder="Apellido" value={editarData.apellido} onChange={e => setEditarData({...editarData, apellido: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <input required type="email" placeholder="Correo" value={editarData.correo} onChange={e => setEditarData({...editarData, correo: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <label className="flex items-center gap-2 text-sm text-[#262626] cursor-pointer">
                <input type="checkbox" checked={editarData.activo} onChange={e => setEditarData({...editarData, activo: e.target.checked})} className="accent-[#A65932]" />
                Usuario Activo
              </label>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowEditar(null)} className="px-4 py-2 text-sm text-[#737373] hover:bg-[#FAF9F8] rounded-md">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm bg-[#A65932] text-white rounded-md hover:bg-[#944D2A]">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Cambiar Clave (Admin) */}
      {showClave && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#262626]">Cambiar Clave: {showClave.nombre}</h2>
            <form onSubmit={handleCambiarClave} className="flex flex-col gap-4">
              <input required type="password" minLength={6} placeholder="Nueva Contraseña (min. 6 chars)" value={claveData.nuevaContrasena} onChange={e => setClaveData({ nuevaContrasena: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none border-[#EAEAEA] focus:border-[#A65932]" />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowClave(null)} className="px-4 py-2 text-sm text-[#737373] hover:bg-[#FAF9F8] rounded-md">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm bg-[#A06A22] text-white rounded-md hover:bg-[#85581D]">Actualizar Clave</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatboxUsers } from '../hooks/use-chatbox-users';
import { usePeticionesAbiertasCantidad } from '../hooks/use-peticiones-abiertas-cantidad';
import { MessageSquare, ArrowLeft } from 'lucide-react';

export const ChatboxUsersPage: React.FC = () => {
  const { rolId } = useParams();
  const { data: usuarios, isLoading, isError } = useChatboxUsers(rolId);
  const { data: activas } = usePeticionesAbiertasCantidad();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full" style={{ backgroundColor: '#FAF9F8', minHeight: '100%' }}>
      <button 
        onClick={() => navigate('/chat-box')}
        className="flex items-center gap-2 text-sm font-medium w-fit transition-colors hover:opacity-80"
        style={{ color: '#A65932' }}
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Roles
      </button>

      {/* Banner */}
      <div 
        className="p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #EAEAEA',
          borderRadius: '12px'
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span 
              className="px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
              style={{ 
                backgroundColor: '#F6EFEA', 
                color: '#A65932',
                border: '1px solid rgba(166, 89, 50, 0.2)'
              }}
            >
              Chat Box
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: '#262626' }}>
            Usuarios del Rol
          </h1>
          <p className="text-sm max-w-2xl leading-relaxed" style={{ color: '#737373' }}>
            Selecciona un usuario para visualizar sus métricas, casos y desempeño.
          </p>
        </div>
        <div className="hidden md:flex p-4 rounded-full" style={{ backgroundColor: '#F6EFEA' }}>
          <MessageSquare className="w-10 h-10" style={{ color: '#A65932' }} />
        </div>
      </div>

      <div 
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #EAEAEA',
          borderRadius: '12px',
          overflowX: 'auto'
        }}
      >
        {isLoading && <div className="p-6 text-sm" style={{ color: '#737373' }}>Cargando usuarios...</div>}
        {isError && <div className="p-6 text-sm" style={{ color: '#B33A3A' }}>Error al cargar usuarios. Asegúrese de que el backend de chatbox esté en línea.</div>}
        
        {usuarios && (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead style={{ backgroundColor: '#FAF9F8', color: '#737373', borderBottom: '1px solid #EAEAEA' }}>
              <tr>
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Rol</th>
                <th className="px-6 py-4 font-medium text-center">Casos Activos</th>
                <th className="px-6 py-4 font-medium text-center">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#EAEAEA', color: '#262626' }}>
              {usuarios.map(usuario => {
                const casosAbiertos = activas?.find(a => a.Nombre === usuario.name)?.cantidad || 0;
                return (
                  <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold">{usuario.name}</td>
                    <td className="px-6 py-4 text-gray-500">{usuario.email}</td>
                    <td className="px-6 py-4">{usuario.rolName}</td>
                    <td className="px-6 py-4 text-center">
                      {casosAbiertos > 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shadow-sm" style={{ backgroundColor: '#A65932', color: '#FFF' }}>
                          {casosAbiertos}
                        </span>
                      ) : (
                        <span className="text-gray-400 font-medium">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: usuario.state === 'A' ? '#E6F2ED' : '#FDF4E6', 
                          color: usuario.state === 'A' ? '#2D7A5D' : '#A06A22'
                        }}
                      >
                        {usuario.state === 'A' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/chat-box/usuario/${usuario.id}/peticiones`, { state: { userName: usuario.name, breadcrumbPadre: 'Chat Box', breadcrumbActual: `Peticiones ${usuario.name}` } })}
                          className="text-xs font-medium px-3 py-1.5 rounded transition-colors"
                          style={{ color: '#FFFFFF', backgroundColor: '#A65932', border: '1px solid #944D2A' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#944D2A'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A65932'}
                        >
                          Ver peticiones activas
                        </button>
                        <button
                          onClick={() => navigate(`/chat-box/usuario/${usuario.id}`, { state: { userName: usuario.name, breadcrumbPadre: 'Chat Box', breadcrumbActual: `Métricas ${usuario.name}` } })}
                          className="text-xs font-medium px-3 py-1.5 rounded transition-colors"
                          style={{ color: '#A65932', border: '1px solid rgba(166, 89, 50, 0.2)' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6EFEA'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Ver métricas
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

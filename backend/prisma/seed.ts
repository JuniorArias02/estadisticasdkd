import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  // 1. Permiso 'admin'
  let permisoAdmin = await prisma.permiso.findFirst({
    where: { nombre: 'admin' },
  });

  if (!permisoAdmin) {
    permisoAdmin = await prisma.permiso.create({
      data: {
        nombre: 'admin',
        descripcion: 'Permiso de administración general del sistema',
        modulo: 'sistema',
        accion: 'admin',
        activo: true,
      },
    });
  } else {
    permisoAdmin = await prisma.permiso.update({
      where: { id: permisoAdmin.id },
      data: {
        descripcion: 'Permiso de administración general del sistema',
        modulo: 'sistema',
        accion: 'admin',
        activo: true,
      },
    });
  }
  console.log(`✅ Permiso configurado: ${permisoAdmin.nombre} (ID: ${permisoAdmin.id})`);

  // 2. Rol 'administrador'
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: 'administrador' },
    update: {
      descripcion: 'Rol Administrador del sistema',
      activo: true,
    },
    create: {
      nombre: 'administrador',
      descripcion: 'Rol Administrador del sistema',
      activo: true,
    },
  });
  console.log(`✅ Rol configurado: ${rolAdmin.nombre} (ID: ${rolAdmin.id})`);

  // 3. Relación Rol - Permiso
  await prisma.rolPermiso.upsert({
    where: {
      rol_id_permiso_id: {
        rol_id: rolAdmin.id,
        permiso_id: permisoAdmin.id,
      },
    },
    update: {},
    create: {
      rol_id: rolAdmin.id,
      permiso_id: permisoAdmin.id,
    },
  });
  console.log(`✅ Permiso '${permisoAdmin.nombre}' asignado al rol '${rolAdmin.nombre}'`);

  // 4. Usuario Admin (admin@dkd / Admin123**)
  const contrasenaEncriptada = await bcrypt.hash('Admin123**', 10);
  const usuarioAdmin = await prisma.usuario.upsert({
    where: { correo: 'admin@dkd' },
    update: {
      nombre: 'Admin',
      apellido: 'Sistema',
      contrasena: contrasenaEncriptada,
      activo: true,
    },
    create: {
      correo: 'admin@dkd',
      nombre: 'Admin',
      apellido: 'Sistema',
      contrasena: contrasenaEncriptada,
      activo: true,
    },
  });
  console.log(`✅ Usuario configurado: ${usuarioAdmin.correo} (ID: ${usuarioAdmin.id})`);

  // 5. Relación Usuario - Rol
  await prisma.usuarioRol.upsert({
    where: {
      usuario_id_rol_id: {
        usuario_id: usuarioAdmin.id,
        rol_id: rolAdmin.id,
      },
    },
    update: {},
    create: {
      usuario_id: usuarioAdmin.id,
      rol_id: rolAdmin.id,
    },
  });
  console.log(`✅ Rol '${rolAdmin.nombre}' asignado al usuario '${usuarioAdmin.correo}'`);

  console.log('🚀 Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

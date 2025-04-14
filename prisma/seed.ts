si.import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create default users with hashed passwords
  const password = await hash('12345.Abcd', 10);

  // Create master user
  await prisma.user.upsert({
    where: { email: 'master@app.com' },
    update: {},
    create: {
      email: 'master@app.com',
      name: 'master',
      password,
      role: Role.MASTER,
    },
  });

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@app.com' },
    update: {},
    create: {
      email: 'admin@app.com',
      name: 'admin',
      password,
      role: Role.ADMIN,
    },
  });

  // Create editor user
  await prisma.user.upsert({
    where: { email: 'editor@app.com' },
    update: {},
    create: {
      email: 'editor@app.com',
      name: 'editor',
      password,
      role: Role.EDITOR,
    },
  });

  // Create collaborator user
  await prisma.user.upsert({
    where: { email: 'collaborator@app.com' },
    update: {},
    create: {
      email: 'collaborator@app.com',
      name: 'collaborator',
      password,
      role: Role.COLLABORATOR,
    },
  });

  // Create global config if it doesn't exist
  await prisma.globalConfig.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      siteName: 'Neurowitch',
      siteUrl: 'http://localhost:3000',
    },
  });

  // Obtener los usuarios creados
  const master = await prisma.user.findUnique({ where: { email: 'master@app.com' } });
  const admin = await prisma.user.findUnique({ where: { email: 'admin@app.com' } });
  const editor = await prisma.user.findUnique({ where: { email: 'editor@app.com' } });
  const collaborator = await prisma.user.findUnique({ where: { email: 'collaborator@app.com' } });

  // Insertar logs administrativos iniciales
  await prisma.adminAction.createMany({
    data: [
      {
        userId: admin?.id || "",
        action: "Inicio de sesión",
        module: "auth",
        details: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // hace 2 horas
      },
      {
        userId: master?.id || "",
        action: "Actualizó configuración",
        module: "config",
        details: "Cambió el nombre del sitio",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // hace 3 horas
      },
      {
        userId: admin?.id || "",
        action: "Exportó logs",
        module: "stats",
        details: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // hace 5 horas
      },
      {
        userId: editor?.id || "",
        action: "Editó página",
        module: "pages",
        details: "Página: /acerca",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // hace 6 horas
      },
      {
        userId: admin?.id || "",
        action: "Reinició estadísticas",
        module: "stats",
        details: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // hace 8 horas
      },
      {
        userId: collaborator?.id || "",
        action: "Creó publicación",
        module: "blog",
        details: "Título: Primer post",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // hace 12 horas
      },
      {
        userId: admin?.id || "",
        action: "Eliminó usuario",
        module: "users",
        details: "Usuario: test@app.com",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15), // hace 15 horas
      },
      {
        userId: master?.id || "",
        action: "Agregó usuario",
        module: "users",
        details: "Usuario: nuevo@app.com",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18), // hace 18 horas
      },
      {
        userId: editor?.id || "",
        action: "Editó proyecto",
        module: "portfolio",
        details: "Proyecto: Proyecto1",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20), // hace 20 horas
      },
      {
        userId: admin?.id || "",
        action: "Cerró sesión",
        module: "auth",
        details: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // hace 24 horas
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

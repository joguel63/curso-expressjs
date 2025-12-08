require("dotenv").config();
const { prisma, disconnect } = require("../src/utils/prisma");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "María García",
    email: "maria.garcia@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Luis Hernández",
    email: "luis.hernandez@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Laura López",
    email: "laura.lopez@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Miguel Sánchez",
    email: "miguel.sanchez@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Carmen Díaz",
    email: "carmen.diaz@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Pedro Ramírez",
    email: "pedro.ramirez@example.com",
    password: "password123",
    role: "USER",
  },
  {
    name: "Isabel Torres",
    email: "isabel.torres@example.com",
    password: "password123",
    role: "USER",
  },
];

async function main() {
  const mode = process.argv[2];
  console.log("🌱 Iniciando seeder...");

  // Limpiar la tabla antes de insertar (opcional)
  await prisma.user.deleteMany();
  console.log("✓ Tabla users limpiada");

  // Insertar usuarios
  if (mode !== "clean") {
    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
      console.log(`✓ Usuario creado: ${user.name}`);
    }

    console.log(`\n🎉 Seeder completado! ${users.length} usuarios creados.`);
  }
}

main()
  .catch((e) => {
    console.error("❌ Error en el seeder:", e);
    process.exit(1);
  })
  .finally(async () => {
    await disconnect();
  });

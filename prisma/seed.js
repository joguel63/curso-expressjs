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

// Bloques de tiempo disponibles (horarios de 9am a 6pm, cada hora)
const timeBlocks = [];
const today = new Date();
today.setHours(9, 0, 0, 0);

for (let i = 0; i < 9; i++) {
  const startTime = new Date(today);
  startTime.setHours(9 + i);
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + 1);
  
  timeBlocks.push({
    startTime,
    endTime,
  });
}

async function main() {
  const mode = process.argv[2];
  console.log("🌱 Iniciando seeder...");

  // Limpiar las tablas en orden correcto (por dependencias)
  await prisma.appointment.deleteMany();
  console.log("✓ Tabla appointments limpiada");
  await prisma.timeBlock.deleteMany();
  console.log("✓ Tabla timeBlocks limpiada");
  await prisma.user.deleteMany();
  console.log("✓ Tabla users limpiada");

  // Insertar datos si no es modo clean
  if (mode !== "clean") {
    // Insertar usuarios
    const createdUsers = [];
    for (const user of users) {
      const createdUser = await prisma.user.create({
        data: user,
      });
      createdUsers.push(createdUser);
      console.log(`✓ Usuario creado: ${user.name}`);
    }

    // Insertar bloques de tiempo
    const createdTimeBlocks = [];
    for (const timeBlock of timeBlocks) {
      const createdTimeBlock = await prisma.timeBlock.create({
        data: timeBlock,
      });
      createdTimeBlocks.push(createdTimeBlock);
      console.log(`✓ Bloque de tiempo creado: ${timeBlock.startTime.toLocaleTimeString()} - ${timeBlock.endTime.toLocaleTimeString()}`);
    }

    // Insertar algunas citas de ejemplo
    const appointments = [
      {
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Mañana
        userId: createdUsers[1].id, // Juan Pérez
        timeBlockId: createdTimeBlocks[0].id, // 9am-10am
      },
      {
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Mañana
        userId: createdUsers[2].id, // María García
        timeBlockId: createdTimeBlocks[2].id, // 11am-12pm
      },
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Pasado mañana
        userId: createdUsers[3].id, // Carlos Rodríguez
        timeBlockId: createdTimeBlocks[4].id, // 1pm-2pm
      },
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Pasado mañana
        userId: createdUsers[4].id, // Ana Martínez
        timeBlockId: createdTimeBlocks[6].id, // 3pm-4pm
      },
      {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // En 3 días
        userId: createdUsers[5].id, // Luis Hernández
        timeBlockId: createdTimeBlocks[1].id, // 10am-11am
      },
    ];

    for (const appointment of appointments) {
      await prisma.appointment.create({
        data: appointment,
      });
      console.log(`✓ Cita creada para usuario ${appointment.userId}`);
    }

    console.log(`\n🎉 Seeder completado!`);
    console.log(`   - ${createdUsers.length} usuarios creados`);
    console.log(`   - ${createdTimeBlocks.length} bloques de tiempo creados`);
    console.log(`   - ${appointments.length} citas creadas`);
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

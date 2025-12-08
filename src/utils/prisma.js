require("dotenv").config();
const { PrismaClient } = require("../../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// Crear una única instancia de Pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Crear el adaptador de PostgreSQL
const adapter = new PrismaPg(pool);

// Crear una única instancia de PrismaClient
const prisma = new PrismaClient({ adapter });

// Variable para controlar si ya se cerró la conexión
let isShuttingDown = false;

// Función para cerrar las conexiones de forma segura
const disconnect = async () => {
  if (!isShuttingDown) {
    isShuttingDown = true;
    await prisma.$disconnect();
    await pool.end();
  }
};

// Exportar prisma, pool y la función de desconexión
module.exports = { prisma, pool, disconnect };

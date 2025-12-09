# Usar Node.js LTS como base
FROM node:22-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json yarn.lock* package-lock.json* ./

# Copiar el schema de Prisma y configuración antes de instalar
COPY prisma ./prisma
COPY prisma.config.ts ./

# Instalar dependencias sin ejecutar postinstall
RUN npm install --ignore-scripts

# Generar el cliente de Prisma con una URL temporal
RUN DATABASE_URL="postgresql://temp:temp@temp:5432/temp" npx prisma generate

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

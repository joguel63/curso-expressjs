# Usar Node.js LTS como base
FROM node:22-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json yarn.lock* package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el schema de Prisma y configuración
COPY prisma ./prisma
COPY prisma.config.ts ./

# Generar el cliente de Prisma
RUN npx prisma generate

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

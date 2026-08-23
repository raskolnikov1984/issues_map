FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Instala TODAS las dependencias (incluye nest CLI y devDependencies)
RUN npm ci

# Copia el código inicial
COPY . .

EXPOSE 3000

# Arranca directamente en modo desarrollo con watch mode
CMD ["npm", "run", "start:dev"]

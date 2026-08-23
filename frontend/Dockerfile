FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

# Vite dev server accesible desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host"]

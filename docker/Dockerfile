FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app


COPY . ./

# Instalar dependencias (se usa caché si no hay cambios)
RUN npm install
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]

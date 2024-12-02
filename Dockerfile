# Utiliza la imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build --configuration production

# Define la variable de entorno para el backend
ENV BACK_URL=${BACK_URL}

# Expone el puerto
EXPOSE 4200

# Comando de inicio
CMD ["npx", "http-server", "dist/chatzure"]

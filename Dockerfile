# Usar una versión más reciente de Node.js
FROM node:20

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (usando caché de Docker si no hay cambios en los archivos package)
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Asegurarse de que el archivo de entorno de producción existe
RUN ls /src/app/environments/

# Construir la aplicación Angular en modo producción
RUN npm run build --configuration=production

# Exponer el puerto en el que Angular estará corriendo
EXPOSE 4200

# Instalar http-server globalmente para servir archivos estáticos
RUN npm install -g http-server

# Iniciar el servidor para servir los archivos estáticos desde el directorio de distribución
CMD ["http-server", "dist/"]

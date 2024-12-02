# Usa una versión más reciente de Node.js
FROM node:20

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (usando caché de Docker si no hay cambios en los archivos package)
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build --configuration=production

# Exponer el puerto en el que Angular estará corriendo
EXPOSE 4200

# Iniciar un servidor para servir los archivos estáticos (por ejemplo, usando http-server o similar)
RUN npm install -g http-server
CMD ["http-server", "dist/"]

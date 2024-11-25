# Usa una versión más reciente de Node.js
FROM node:18

# Crear y establecer el directorio de trabajo
RUN mkdir -p /app
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json /app

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . /app

# Construir la aplicación Angular
RUN npm run build --prod

# Exponer el puerto en el que Angular estará corriendo
EXPOSE 4200

# Iniciar la aplicación Angular
ENTRYPOINT ["npm", "start"]

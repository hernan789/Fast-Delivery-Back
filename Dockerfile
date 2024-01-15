# Utiliza una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en la carpeta del proyecto
WORKDIR /fast-delivery-back

# Copia los archivos de configuración del proyecto
COPY package.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Compila y construye la aplicación (ajusta según tus necesidades específicas)
RUN npm install

# Expone el puerto 3001 para acceder a la aplicación
EXPOSE 3001

# Comando por defecto para iniciar la aplicación (ajusta según tus necesidades específicas)
CMD ["npm", "start"]
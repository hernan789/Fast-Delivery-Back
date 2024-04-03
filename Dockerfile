# Utilizamos una imagen de Node.js más ligera (Alpine)
FROM node:alpine

# Establecemos el directorio de trabajo
WORKDIR /fast-delivery-back

# Copiamos los archivos relacionados con el paquete
COPY package*.json ./

# Instalamos las dependencias de producción (omitiendo las devDependencies)
RUN npm install --production

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Exponemos el puerto en el que la aplicación corre
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]


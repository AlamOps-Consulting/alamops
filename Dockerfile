FROM node:20.18-alpine3.21 AS build
ENV TZ=Europe/Madrid
ENV COMPOSE_HTTP_TIMEOUT=200
WORKDIR /app

COPY . .
# Instalar Rollup globalmente (si realmente es necesario)
RUN npm install -g rollup  

# Instalar dependencias con compatibilidad para peer dependencies
RUN npm install --legacy-peer-deps  


# Construir la aplicación

RUN ["npm", "run", "build"]


# Usar una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar el build de React a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx personalizada (si es necesario)
 COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
FROM node:20-alpine

# Instala Docker y Docker Compose
RUN apk add --no-cache \
	docker \
	docker-cli \
	bash \
	curl \
	git \
	sudo \
	openrc
RUN openrc boot
RUN rc-update add docker default

# Instala pnpm
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /usr/src/app
COPY . .

# Instala las dependencias de la aplicación
RUN pnpm install
RUN pnpm config set store-dir ~/.pnpm-store

# Expone el puerto
EXPOSE 3000

# Inicia el daemon de Docker en segundo plano y luego tu aplicación
CMD ["sh", "-c", "dockerd & pnpm start:dev"]
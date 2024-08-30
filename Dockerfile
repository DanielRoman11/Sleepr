FROM node:20

RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY . .

RUN pnpm i
RUN pnpm config set store-dir ~/.pnpm-store
COPY . .

EXPOSE 3000

CMD ["pnpm", "start:dev"]
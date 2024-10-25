# //* DEVELOPMENT INSTANCE
FROM node:alpine AS development

WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm build

# //* PRODUCTION INSTANCE
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm i --prod

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/app/auth/main" ]

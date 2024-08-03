FROM node:20.14.0-alpine AS install
WORKDIR /src
RUN npm i -g pnpm@9.2.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM install AS build
COPY . .
RUN pnpm build

FROM build AS run
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

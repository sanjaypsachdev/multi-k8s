FROM node:12.5.0-alpine
WORKDIR /app
COPY './package.json' './'
RUN yarn install
COPY . .
CMD ["yarn", "start"]
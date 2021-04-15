FROM node:12-alpine

RUN mkdir -p /usr/app && chown -R node:node /usr/app

WORKDIR /usr/app

COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN yarn dev:server

EXPOSE 3334

CMD ["npm", "run", "dev:server"]

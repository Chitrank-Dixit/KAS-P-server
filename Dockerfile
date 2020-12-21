FROM node:14.9.0-alpine
ENV NODE_ENV production
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
USER node
RUN npm install
RUN npm cache clean --force
COPY --chown=node:node . .
EXPOSE 8000
CMD ["npm", "start"]
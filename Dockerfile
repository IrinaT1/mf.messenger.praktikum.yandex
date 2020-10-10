FROM node:13 

COPY . . 

RUN npm ci  && npm run build

EXPOSE 4000

CMD ["node", "server.js"] 

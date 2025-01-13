FROM node
WORKDIR /app/bank/backend
COPY package*.json .
COPY . .
RUN npm install
RUN npm install -g nodemon 
EXPOSE 3003
CMD ["npm","start"]
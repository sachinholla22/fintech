FROM node
WORKDIR /app/bank/backend
COPY package*.json .
COPY . .
RUN npm install
EXPOSE 3003
CMD ["npm","start"]
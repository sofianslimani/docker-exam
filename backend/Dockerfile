FROM node
WORKDIR /app
COPY . .
RUN npm install
ENV port=3001
CMD ["node", "index.js"]
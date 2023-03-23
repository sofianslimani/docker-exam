FROM node

WORKDIR /app
COPY . .
RUN npm install
ENV port=3000
CMD ["node", "index.js"]
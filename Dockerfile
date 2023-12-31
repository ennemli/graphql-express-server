FROM node:latest
WORKDIR /app
COPY . ./
RUN npm install
CMD ["npm","run","start"]
ENV PORT=3000
ENV URI=mongodb://localhost:27017/

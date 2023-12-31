FROM node:latest
WORKDIR /app
COPY . ./
RUN npm install
CMD ["npm","run","start"]
ENV PORT=3000

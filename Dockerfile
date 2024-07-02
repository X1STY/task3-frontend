#build stage
FROM node:18-alpine AS build
WORKDIR /app
ARG VITE_BASE_WS_URL
ARG VITE_BASE_API_URL
ARG VITE_BASE_IMAGE_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL
ENV VITE_BASE_WS_URL=$VITE_BASE_WS_URL
ENV VITE_BASE_IMAGE_URL=$VITE_BASE_IMAGE_URL
COPY package.json yarn.lock ./
RUN yarn
COPY . /app
RUN yarn build

# serve stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

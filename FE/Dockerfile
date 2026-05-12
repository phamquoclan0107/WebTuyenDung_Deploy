FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile
ARG VITE_API_BASE_URL=https://chuyenkhoamat.com.vn
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

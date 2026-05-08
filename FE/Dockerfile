# ============================================================
#  Stage 1 — Build React/Vite
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Cache node_modules layer
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# FIX: domain khớp với nginx config trên VPS (shopquanao.work)
ARG VITE_API_BASE_URL=https://shopquanao.work
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY . .
RUN npm run build

# ============================================================
#  Stage 2 — Serve bằng nginx nhẹ
# ============================================================
FROM nginx:1.27-alpine

# Xoá config mặc định
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config cho SPA (handle react-router)
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

# Copy static files từ builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

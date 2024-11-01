FROM node:23-alpine AS builder

ARG VITE_LOCATION_API_URL
ENV VITE_LOCATION_API_URL=$VITE_LOCATION_API_URL

WORKDIR /location-dashboard-react-vite

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx

COPY --from=builder /location-dashboard-react-vite/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /location-dashboard-react-vite/dist /usr/share/nginx/html
COPY --from=builder /location-dashboard-react-vite/node_modules/leaflet/dist/images /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
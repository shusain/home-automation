# Base stage
FROM node:18 AS base
WORKDIR /usr/src/app/shared-models
COPY ./shared-models /usr/src/app/shared-models
RUN npm install
RUN npm run build

# Frontend build stage
FROM base AS frontend-build
WORKDIR /usr/src/app/frontend
COPY ./home-automation-frontend/package*.json ./
RUN npm install
COPY ./home-automation-frontend ./
RUN npm run build

# Backend build stage (optional)
FROM base AS backend-build
WORKDIR /usr/src/app/backend
COPY ./home-automation-backend/package*.json ./
RUN npm install
COPY ./home-automation-backend ./

# Frontend serve stage
FROM nginx:alpine AS frontend-serve
COPY --from=frontend-build /usr/src/app/frontend/dist/home-automation-frontend /usr/share/nginx/html
COPY home-automation-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443

# Backend run stage
FROM node:18 AS backend-serve
WORKDIR /usr/src/app/backend
COPY --from=backend-build /usr/src/app/shared-models /usr/src/app/shared-models
COPY --from=backend-build /usr/src/app/backend /usr/src/app/backend
CMD ["npm", "start"]
EXPOSE 3000

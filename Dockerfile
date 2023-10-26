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

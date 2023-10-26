# Base.Dockerfile
FROM node:14 AS base
WORKDIR /usr/src/app
COPY ./shared-models /usr/src/app/shared-models

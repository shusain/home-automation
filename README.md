# Home Automation Project

This project is a home automation system built with Node.js (Express) for the backend, Angular for the frontend, and shared TypeScript models.

## Project Structure

The project is divided into three main directories:

- `home-automation-backend`: Contains the Express backend server
- `home-automation-frontend`: Contains the Angular frontend application
- `shared-models`: Contains shared TypeScript models used by both the frontend and backend

### home-automation-backend

The backend server is built using Express and follows a modular structure. It includes the following directories and files:

- `dist`: The compiled JavaScript code from the TypeScript source files
- `src`: The source code for the backend application
- `swagger`: Contains the generated Swagger documentation and OpenAPI specification
- `types`: Contains custom type definition files
- `ormconfig.json`: Configuration file for TypeORM
- `tsconfig.json`: Configuration file for TypeScript
- `tsoa.json`: Configuration file for TSOA (TypeScript OpenAPI)
- `docker-compose.yaml`: Configuration file for Docker Compose to set up the PostgreSQL database

### home-automation-frontend

The frontend application is built using Angular and follows the Angular project structure. It includes the following directories and files:

- `src`: The source code for the frontend application
- `angular.json`: Configuration file for Angular CLI
- `tsconfig.json`: Configuration file for TypeScript
- `tsconfig.app.json`: TypeScript configuration specific to the app
- `tsconfig.spec.json`: TypeScript configuration specific to testing

### shared-models

The shared-models directory contains TypeScript models used by both the frontend and backend. It includes the following directories and files:

- `dist`: The compiled JavaScript code from the TypeScript source files
- `src`: The source code for the shared models
- `tsconfig.json`: Configuration file for TypeScript

## Setup and Running the Project

Before running the project, ensure you have Node.js, npm, and Docker installed.

1. Start the PostgreSQL database using Docker Compose:

```bash
cd home-automation-backend
docker-compose up -d
```

1. Install the dependencies for the backend, frontend, and shared-models:

```bash
npm install

cd ../home-automation-frontend
npm install

cd ../shared-models
npm install
```

1. Build the shared-models package:

```bash
cd shared-models
npm run build
```

1. Run the backend server:

```bash
cd ../home-automation-backend
npm run dev
```

1. Run the frontend application:

```bash
cd ../home-automation-frontend
npm start
```

The backend server will be running on port 3000 and the frontend application on port 4200. You can now access the frontend application at http://localhost:4200/.

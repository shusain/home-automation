import express from "express";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger/swagger.json";
import cors from 'cors';


// Creates connection to DB with ts-orm, see ormconfig.json for the connection details
// also see src/entities for the models of objects stored in the DB
createConnection()
    .then(async (connection) => {
        const app = express();
        const server = createServer(app);
        const io = new SocketIoServer(server);

        // Add middleware, routes, and WebSocket event listeners
        app.use(bodyParser.json());
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(cors({ origin: 'http://localhost' }));
        app.use(cors({ origin: 'http://workhorse.shauncore.com:8080' }));
        app.use(cors({ origin: 'http://ubuntu-workhorse.local:8080/' }));
        
        // Add routes
        AppRoutes.forEach((route: any) => {
            (app as any)[route.method](
                route.path,
                (req: Request, res: Response, next: Function) => {
                    route.action(req, res).catch((err: any) => next(err));
                }
            );
        });

        app.listen(3000, () => {
            console.log("Server started on port 3000!");
        });


        // Create web socket connection
        io.on("connection", (socket) => {
            console.log("A user connected");

            // Handle WebSocket events, such as subscribing to updates or sending real-time data

            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
        });
    })
    .catch((error) => console.log("TypeORM connection error: ", error));


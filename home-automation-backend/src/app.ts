import express from "express";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { Request, Response } from "express";
// Import other routes

const app = express();
const server = createServer(app);
const io = new SocketIoServer(server);

// Add middleware, routes, and WebSocket event listeners
createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());

    AppRoutes.forEach((route) => {
      (app as any)[route.method](
        route.path,
        (req: Request, res: Response, next: Function) => {
          route.action(req, res).catch((err:any) => next(err));
        }
      );
    });

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
// Add other routes


// Create web socket connection
io.on("connection", (socket) => {
    console.log("A user connected");
  
    // Handle WebSocket events, such as subscribing to updates or sending real-time data
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
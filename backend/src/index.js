import dotenv from "dotenv";
import app from "./app.js"
import databaseConfig from "./config/db.config.js";
import http from "http";
import { initSocket } from "./config/socketIo.config.js";

dotenv.config({
    path: "./.env"
});

databaseConfig();

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT;

server.listen(PORT, console.log(`Server Running on PORT: ${PORT}`))


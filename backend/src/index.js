import dotenv from "dotenv";
import app from "./app.js"
import databaseConfig from "./config/db.config.js";
import http from "http";
import { initSocket } from "./config/socketIo.config.js";
import cors from "cors"

dotenv.config({
    path: "./.env"
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

databaseConfig();

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT;

server.listen(PORT, console.log(`Server Running on PORT: ${PORT}`))


import dotenv from "dotenv";
import app from "./app.js"
import databaseConfig from "./config/db.config.js";

dotenv.config({
    path:"./.env"
});

databaseConfig();

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server Running on PORT: ${PORT}`))


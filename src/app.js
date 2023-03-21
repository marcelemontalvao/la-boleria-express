import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cakesRouter from "./routes/cakesRoutes.js";
import clientsRouter from "./routes/clientsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use([cakesRouter, clientsRouter])

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})
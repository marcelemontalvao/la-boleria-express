import db from "../configs/db.js";
import { internalServerError } from "../middlewares/middlewares.js";

async function createClient(req, res) {
    const { name, address, phone } = req.body;

    const client = [ name, address, phone ];

    const clientSQL = `
        INSERT INTO 
            clients (name, address, phone) 
        VALUES 
            ($1, $2, $3) 
    `

    try {
        await db.query(clientSQL, client)
        return res.sendStatus(201)
    } catch (error) {
        internalServerError(error, res)
    }
}

export default createClient;
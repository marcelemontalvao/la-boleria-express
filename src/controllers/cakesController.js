import db from "../configs/db.js";
import { internalServerError } from "../middlewares/middlewares.js";

async function createCake(req, res) {
    const { name, price, description, image } = req.body;

    const cake = [ name, price, image, description ];

    const cakeSQL = `
        INSERT INTO 
            cakes (name, price, image, description) 
        VALUES 
            ($1, $2, $3, $4) 
            `

    try {
        await db.query(cakeSQL, cake)
        return res.sendStatus(201)
    } catch (error) {
        internalServerError(error, res)
    }
}

export default createCake;
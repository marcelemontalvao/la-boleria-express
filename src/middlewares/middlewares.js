import db from "../configs/db.js";
import cakeSchema from "../schema/cakesSchemas.js";
import clientSchema from "../schema/clientsSchemas.js";
import orderSchema from "../schema/ordersSchema.js";

function internalServerError(error, res) {
    console.log(error.message);

    return res.status(500).json({
        message: "Internal Server Error",
    });
}

async function validateCake(req, res, next) {
    const { error } = cakeSchema.validate(req.body);
    const { name } = req.body;
    const existingCakeSQL = ` 
        SELECT 
            id 
        FROM 
            cakes
        WHERE   
            name=$1
    `;

    const existingCake = await db.query(existingCakeSQL, [ name ]);
    
    if(existingCake.rowCount > 0) {
        return res.status(409).send('Já existe um bolo com esse nome.');
    }

    if(error) {
        const isImageError = error.details.some((detail) => detail.path[0] === 'image');
        
        if(isImageError) {
            return res.status(422).send(error);
        } else {
            return res.status(400).send(error);
        }
    }

    return next();
}


async function validateClient(req, res, next) {
    const { error } = clientSchema.validate(req.body);
   
    if(error) {
        return res.status(400).send(error);
    }

    return next();
}


async function validateOrder(req, res, next) {
    const { error } = orderSchema.validate(req.body);
    const { clientId, cakeId } = req.body;
   
    const existingClientSQL = ` 
        SELECT 
            id 
        FROM 
            clients
        WHERE 
            id=$1
    `;

    const existingClient = await db.query(existingClientSQL, [ clientId ]);

    const existingCakeSQL = ` 
        SELECT 
            id 
        FROM 
            cakes
        WHERE 
            id=$1
    `;

    const existingCake = await db.query(existingCakeSQL, [ cakeId ]);

    if(existingClient.rowCount === 0) {
        return res.status(404).send('Não existe um cliente com esse id.');
    }

    if(existingCake.rowCount === 0) {
        return res.status(404).send('Não existe um bolo com esse id.');
    }

    if(error) {
        console.log(error);
        return res.status(400).send(error);
    }

    return next();
}

export { internalServerError, validateCake, validateClient, validateOrder };

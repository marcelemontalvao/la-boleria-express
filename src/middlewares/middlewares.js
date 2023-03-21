import db from "../configs/db.js";
import cakeSchema from "../schema/cakesSchemas.js";

function internalServerError(error, res) {
    console.log(error.message)
    return res.status(500).json({
        message: "Internal Server Error"
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
    `

    const existingCake = await db.query(existingCakeSQL, [ name ])
    
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

export { internalServerError, validateCake }
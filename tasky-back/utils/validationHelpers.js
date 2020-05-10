const validateData = (validationFunction, sourceName) => {
    return async (req, res, next) => {
        console.log(`Validating ${sourceName} data from client... `);
        const { error } = await validationFunction(req[sourceName]);
        if (error) {
            console.log(`${sourceName} package is not valid!`);
            return res.status(400).send({
                err: error.details[0].message
            });
        }
        else{
            console.log(`${sourceName} package validated!`);
            next();
        }
    }
}

const validateBody = (validationFunction) => validateData(validationFunction, "body");
const validateQuery = (validationFunction) => validateData(validationFunction, "query");
const validateParams = (validationFunction) => validateData(validationFunction, "params"); //TODO: Solve printing in console with proper capitalization

module.exports = {validateBody, validateQuery, validateParams};



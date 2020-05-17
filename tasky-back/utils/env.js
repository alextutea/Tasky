const dotenv = require("dotenv");
dotenv.config();

var environment_variables = {};

const defaults = {
    PORT: 3000,
    JWT_SIGN: '124aww12423ad24124awdrtaeNADAIUASNFI@$h1247asd',
    MONGO_ROOT_USER: 'root',
    MONGO_ROOT_PASSWORD: 'ASDqwe123',
    MONGO_ROOT_DB: 'root-db',
    MONGO_PROD_USER: 'tasky_prod_api',
    MONGO_PROD_PASSWORD: 'ASDqwe123',
    MONGO_PROD_DB: 'tasky_prod_db',
    MONGO_DEV_USER: 'tasky_dev_api',
    MONGO_DEV_PASSWORD: 'ASDqwe123',
    MONGO_DEV_DB: 'tasky_dev_db',
    MONGO_TEST_USER: 'tasky_test_api',
    MONGO_TEST_PASSWORD: 'ASDqwe123',
    MONGO_TEST_DB: 'tasky_test_db'
}

for(key in process.env){
    environment_variables[key] = process.env[key];
}

for(key in defaults){
    environment_variables[key] = environment_variables[key] || defaults[key];
}

module.exports = environment_variables
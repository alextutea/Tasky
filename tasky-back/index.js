

const env = require("./utils/env.js");
const mongoose = require('mongoose');

const port = env.PORT;
const mongoUser = env.MONGO_DEV_USER;
const mongoPassword = env.MONGO_DEV_PASSWORD;
const mongoDbName = env.MONGO_DEV_DB;
const app = require("./app.js");

mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@mongo-node:27017/${mongoDbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.listen(port, () => console.log(`Server listening to port ${port}!`));
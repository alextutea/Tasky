const env = require("../../utils/env.js")
const mongoUser = env.MONGO_TEST_USER;
const mongoPassword = env.MONGO_TEST_PASSWORD;
const mongoDbName = env.MONGO_TEST_DB
const mongoose = require("mongoose");


async function setupTestDB(){
    await mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@mongo-node:27017/${mongoDbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) 
}
  
async function removeAllCollections(){
    const collections = Object.keys(mongoose.connection.collections);
    for(const collectionName of collections){
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
}

async function dropAllCollections(){
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections){
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop()
        }
        catch(error){
            console.log(error.message);
        }
    }
}

module.exports = {setupTestDB, removeAllCollections, dropAllCollections}
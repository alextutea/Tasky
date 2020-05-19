const {setupTestDB, removeAllCollections, dropAllCollections} = require("./../utils/testDbUtils.js");
const mongoose = require("mongoose");
const app = require("../../app.js");
var server;

const setupTestServer = (port) => {
    beforeAll(async () => {
        server = app.listen(port);
        await setupTestDB();
    })
    
    afterEach(async () => {
        await removeAllCollections();
    })
    
    afterAll(async () => {
        await dropAllCollections();
        await mongoose.connection.close();
        await server.close();
    })
}

module.exports = setupTestServer;

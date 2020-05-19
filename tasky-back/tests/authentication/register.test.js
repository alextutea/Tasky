const env = require("../../utils/env.js");
const port = env.PORT;
const setupTestServer = require("../utils/setupTestServer.js");
const axios = require('axios');
const User = require("../../users/model/user.js");


describe('Register', () => {

    setupTestServer(port);
    
    it('Should add a valid user to the database', async () => {
        const email = "test-user1@email.com";
        const password = "ASDqwe123";
        const username = "test-user1";
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username});
        const user = await User.findOne({email: email});
        expect(user.username).toBe(username);
        expect(user.email).toBe(email);
        expect(user.level).toBeTruthy();
    })
    
    it('Should respond back to the client with the proper status and data after adding a valid user', async () => {
        const email = "test-user1@email.com";
        const password = "ASDqwe123";
        const username = "test-user1";
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
            response => {
                expect(response.data.username).toBe(username);
                expect(response.data.email).toBe(email);
                expect(response.data.id).toBeTruthy();
                expect(response.data.level).toBeTruthy();
                expect(response.status).toBe(200);
            },
            reason => {
                throw new Error('Server rejected a valid message');
            }
        )
    })
})
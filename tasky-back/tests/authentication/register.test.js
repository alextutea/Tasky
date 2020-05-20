const env = require("../../utils/env.js");
const port = env.PORT;
const setupTestServer = require("../utils/setupTestServer.js");
const axios = require('axios');
const User = require("../../users/model/user.js");
const {validUsers, invalidUsers} = require("../utils/mockInputData/user.js")


describe('Register', () => {

    setupTestServer(port);
    
    it('Should add a valid user to the database', async () => {
        const {email, password, username} = validUsers[0];
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username});
        const user = await User.findOne({email: email});
        expect(user.username).toBe(username);
        expect(user.email).toBe(email);
        expect(user.level).toBeTruthy();
    })
    
    it('Should respond back to the client with the proper status and data after adding a valid user', async () => {
        const {email, password, username} = validUsers[0];
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

    it('Should not register a user when there is another user with the same email', async () => {
        const email = validUsers[0].email
        const password1 = validUsers[0].password
        const password2 = validUsers[1].password
        const username1 = validUsers[0].username
        const username2 = validUsers[1].username

        await axios.post(`http://tasky-back:${port}/auth/register`, {email: email, password: password1, username: username1}).then(
            response => {
                expect(response.data.username).toBe(username1);
                expect(response.data.email).toBe(email);
                expect(response.data.id).toBeTruthy();
                expect(response.data.level).toBeTruthy();
                expect(response.status).toBe(200);
            },
            reason => {
                throw new Error('Server rejected a valid message');
            }
        )
        var user = await User.findOne({username: username1});
        expect(user).toBeTruthy();
        expect(user.username).toBe(username1);
        expect(user.email).toBe(email);
        expect(user.level).toBeTruthy();
        await axios.post(`http://tasky-back:${port}/auth/register`, {email: email, password: password2, username: username2}).then(
            response => {
                throw new Error('Server accepted an invalid message')
            },
            reason => {
                console.log(reason.data);
                expect(reason.response.data.err).toBeTruthy();
                expect(reason.response.status).toBe(400);
            }
        )
        user = await User.findOne({username: username2});
        expect(user).toBeFalsy();
    })

    it('Should not register a user with no email provided', async () => {
        const {email, password, username} = invalidUsers.noEmail[0];
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
            response => {
                throw new Error('Server accepted an invalid message')
            },
            reason => {
                console.log(reason.data);
                expect(reason.response.data.err).toBeTruthy();
                expect(reason.response.status).toBe(400);
            }
        )
        const user = await User.findOne({email: email});
        expect(user).toBeFalsy();
    })

    it('Should not register a user with bad email format provided', async () => {
        const {email, password, username} = invalidUsers.badEmail[0];
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
            response => {
                throw new Error('Server accepted an invalid message')
            },
            reason => {
                console.log(reason.data);
                expect(reason.response.data.err).toBeTruthy();
                expect(reason.response.status).toBe(400);
            }
        )
        const user = await User.findOne({email: email});
        expect(user).toBeFalsy();
    })

    it('Should not register a user with no password provided', async () => {
        const {email, password, username} = invalidUsers.noPassword[0];
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
            response => {
                throw new Error('Server accepted an invalid message')
            },
            reason => {
                console.log(reason.data);
                expect(reason.response.data.err).toBeTruthy();
                expect(reason.response.status).toBe(400);
            }
        )
        const user = await User.findOne({email: email});
        expect(user).toBeFalsy();
    })

    it('Should not register a user with short password provided', async () => {
        const {email, password, username} = invalidUsers.shortPassword[0];
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
            response => {
                throw new Error('Server accepted an invalid message')
            },
            reason => {
                console.log(reason.data);
                expect(reason.response.data.err).toBeTruthy();
                expect(reason.response.status).toBe(400);
            }
        )
        const user = await User.findOne({email: email});
        expect(user).toBeFalsy();
    })

    it('Should not register a user with no username provided', async () => {
        const {email, password, username} = invalidUsers.noUsername[0];
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
            response => {
                throw new Error('Server accepted an invalid message')
            },
            reason => {
                console.log(reason.data);
                expect(reason.response.data.err).toBeTruthy();
                expect(reason.response.status).toBe(400);
            }
        )
        const user = await User.findOne({email: email});
        expect(user).toBeFalsy();
    })

    it('Should not register a user with short username provided', async () => {
        const {email, password, username} = invalidUsers.shortUsername[0];
        await axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
            response => {
                throw new Error('Server accepted an invalid message')
            },
            reason => {
                console.log(reason.data);
                expect(reason.response.data.err).toBeTruthy();
                expect(reason.response.status).toBe(400);
            }
        )
        const user = await User.findOne({email: email});
        expect(user).toBeFalsy();
    })

})
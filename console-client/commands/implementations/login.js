const axios = require('axios');
const Command = require("../Command.js");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.TARGET_PORT || 4000;
const {validateArgCount} = require("../utils/argsValidator.js")

const loginCommand = new Command("login", (args) => {
    return new Promise(
        async (resolve, reject) => {
            var validArgs = false;
            await validateArgCount(args, 2).then(
                response => {
                    validArgs = true;
                },
                reason => {
                    return reject(reason);
                }
            )
            if(!validArgs){
                return;
            }
            var email = args[1];
            var password = args[2];
            var receivedResponse = null;
            var receivedReason = null;
            var receivedToken = null;
            await axios.post(`http://tasky-back:${port}/auth/login`, {email, password}).then(
                response => {
                    console.log("Successfully logged in. Got the token!");
                    receivedToken = response.data.authorization;
                    receivedUsername = response.data.username;
                    receivedResponse = response;
                },
                reason => {
                    console.log("Failed to log in. Token not received");
                    receivedReason = reason;
                }
            )
            if(!receivedToken) {
                return reject(receivedReason);
            }
            receivedResponse.updatedCookies = {
                token: receivedToken,
                username: receivedUsername
            }
            resolve(receivedResponse);
        }
    )
});

module.exports = loginCommand;
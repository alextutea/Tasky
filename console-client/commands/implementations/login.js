const Command = require("../Command.js");
const port = process.env.TARGET_PORT || 4000;

const loginCommand = new Command("login", (args) => {
    var email = args[1];
    var password = args[2];
    return new Promise(
        async (resolve, reject) => {
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
                response = {
                    apiResponse: receivedReason
                }
                reject(response)
                return;
            }
            response = {
                apiResponse: receivedResponse,
                updatedCookies: {
                    token: receivedToken,
                    username: receivedUsername
                }
            }
            resolve(response);
        }
    )
});

module.exports = loginCommand;
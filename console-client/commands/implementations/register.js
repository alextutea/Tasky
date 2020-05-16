const axios = require('axios');
const Command = require("../Command.js");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.TARGET_PORT || 4000;
const {validateArgCount} = require("../utils/argsValidator.js")


const registerCommand = new Command("register", (args) => {
    return new Promise(
        async (resolve, reject) => {
            var validArgs = false;
            await validateArgCount(args, 3).then(
                response => {
                    validArgs=true;
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
            var username = args[3];
            axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
                response => {
                    console.log("Successfully registered!");
                    resolve(response);
                },
                reason => {
                    console.log("Failed to register!");
                    reject(reason);
                }
            )
        }
    )
});

module.exports = registerCommand;
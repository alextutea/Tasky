const axios = require('axios');
const readline = require('readline');
const dotenv = require("dotenv");
dotenv.config();

var cachedToken = null;
var cachedUsername = null;
var port = 3000

var headers = {
    'Content-Type': 'application/json',
    'Authorization': cachedToken
};

main();

async function main(){
    var exit = false;
    while(!exit){
        var username = cachedUsername || "guest";
        var answer = await question(`(${username}): `);
        const args = answer.split(' ');
        const command = args[0]
        if(command==="exit"){
            exit = true;
        }
        else {
            await CommandManager.execute(command, args).then(
                response => {
                    for(cookie in response.updatedCookies){
                        permaCookies[cookie] = response.updatedCookies[cookie]
                    }
                    console.log(response.data);
                },
                reason => {
                    console.log(reason.data);
                }
            )
            if(command==="register"){
                await register(args[1], args[2], args[3]).then(
                    response => {
                        console.log(response.data);
                    },
                    reason => {
                        console.log(reason.data);
                    }

                );
            }
            if(command==="login"){
                await login(args[1], args[2]).then(
                    response => {
                        console.log(response.data);
                    },
                    reason => {
                        console.log(reason.data);
                    }

                );
            }
            if(command==="connection-test"){
                await test().then(
                    response => {
                        console.log(response.data);
                    },
                    reason => {
                        console.log(reason.data);
                    }

                );
            }
            if(command==="user-token-test"){
                await userTokenTest().then(
                    response => {
                        console.log(response.data);
                    },
                    reason => {
                        console.log(reason.data);
                    }

                );
            }
            if(command==="get-all-users"){
                await getUsers().then(
                    response => {
                        console.log(response.data);
                    },
                    reason => {
                        console.log(reason.data);
                    }
                )
            }
        }
    }
}

function getUsers(){
    return new Promise(
        (resolve, reject) => {
            axios.get(`http://tasky-back:${port}/users/`, {headers: headers}).then(
                response => {
                    console.log("Successfully retrieved user data!");
                    resolve(response);
                },
                reason => {
                    console.log("Failed to retrieve user data!");
                    reject(reason);
                }
            )
        }
    )
}

function setAuthToken(token){
    return new Promise(
        (resolve, reject) => {
            cachedToken = token;
            headers = {
                'Content-Type': 'application/json',
                'Authorization': cachedToken
            };
            resolve();
        }
    )
}

function setActiveUsername(username){
    return new Promise(
        (resolve, reject) => {
            cachedUsername = username;
            resolve();
        }
    )
}

function question(q){
    var response;
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    rl.setPrompt(q);
    rl.prompt();
    return new Promise((resolve, reject) => {

        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
        });

        rl.on('close', () => {
            resolve(response);
        });

    });
}

function register(email, password, username){
    return new Promise(
        async (resolve, reject) => {
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
}

function test(){
    return new Promise(
        async (resolve, reject) => {
            axios.get(`http://tasky-back:${port}/`).then(
                response => {
                    resolve(response);
                },
                reason => {
                    reject(reason);
                }
            )
        }
    )
}

function userTokenTest(){
    return new Promise(
        async (resolve, reject) => {
            axios.post(`http://tasky-back:${port}/auth/sayHello`, {}, {headers: headers}).then(
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
}

function login(email, password){
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
                reject(receivedReason);
                return;
            }
            await setAuthToken(receivedToken);
            await setActiveUsername(receivedUsername);
            resolve(receivedResponse);
        }
    )
}

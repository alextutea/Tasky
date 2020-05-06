const axios = require('axios');
const readline = require('readline');

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
            if(command==="register"){
                await register(args[1], args[2], args[3]);
            }
            if(command==="login"){
                await login(args[1], args[2]);
            }
            if(command==="connection-test"){
                await test();
            }
            if(command==="user-token-test"){
                await userTokenTest();
            }
        }
    }
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
            axios.post(`http://tasky-back:${port}/user/register`, {email, password, username}).then(
                response => {
                    console.log("Successfully registered!");
                    resolve();
                },
                reason => {
                    console.log("Failed to register!");
                    reject();
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
                    console.log("Successfully registered!");
                    console.log(response.data);
                    resolve();
                },
                reason => {
                    console.log("Failed to register!");
                    console.log(reason);
                    reject();
                }
            )
        }
    )
}

function userTokenTest(){
    return new Promise(
        async (resolve, reject) => {
            axios.post(`http://tasky-back:${port}/user/sayHello`, {}, {headers: headers}).then(
                response => {
                    console.log("Successfully registered!");
                    console.log(response.data);
                    resolve();
                },
                reason => {
                    console.log("Failed to register!");
                    console.log(reason);
                    reject();
                }
            )
        }
    )
}

function login(email, password){
    return new Promise(
        async (resolve, reject) => {
            receivedToken = null;
            await axios.post(`http://tasky-back:${port}/user/login`, {email, password}).then(
                response => {
                    console.log("Successfully logged in. Got the token!");
                    receivedToken = response.data.authorization;
                    receivedUsername = response.data.username;
                },
                reject => {
                    console.log("Failed to log in. Token not received");
                    console.log(reject);
                }
            )
            if(!receivedToken) {
                reject();
                return;
            }
            await setAuthToken(receivedToken);
            await setActiveUsername(receivedUsername);
            resolve();
        }
    )
}

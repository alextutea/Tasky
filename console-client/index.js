const dotenv = require("dotenv");
const CommandManager = require("./commands/CommandManager.js");
const ClientSession = require("./sessions/ClientSession.js");
dotenv.config();

var port = 3000

var headers = {
    'Content-Type': 'application/json',
    'Authorization': cachedToken
};
main();

async function main(){
    const clientSession = new ClientSession(port, new CommandManager());
    clientSession.start().then(
        response => {
            console.log("Session successfully ended!")
        },
        reason => {
            console.log(reason);
            console.log("Session ended forcefully.");
        }
    )
}

// function getUsers(){
//     return new Promise(
//         (resolve, reject) => {
//             axios.get(`http://tasky-back:${port}/users/`, {headers: headers}).then(
//                 response => {
//                     console.log("Successfully retrieved user data!");
//                     resolve(response);
//                 },
//                 reason => {
//                     console.log("Failed to retrieve user data!");
//                     reject(reason);
//                 }
//             )
//         }
//     )
// }

// function setAuthToken(token){
//     return new Promise(
//         (resolve, reject) => {
//             cachedToken = token;
//             headers = {
//                 'Content-Type': 'application/json',
//                 'Authorization': cachedToken
//             };
//             resolve();
//         }
//     )
// }

// function setActiveUsername(username){
//     return new Promise(
//         (resolve, reject) => {
//             cachedUsername = username;
//             resolve();
//         }
//     )
// }



// function register(email, password, username){
//     return new Promise(
//         async (resolve, reject) => {
//             axios.post(`http://tasky-back:${port}/auth/register`, {email, password, username}).then(
//                 response => {
//                     console.log("Successfully registered!");
//                     resolve(response);
//                 },
//                 reason => {
//                     console.log("Failed to register!");
//                     reject(reason);
//                 }
//             )
//         }
//     )
// }

// function test(){
//     return new Promise(
//         async (resolve, reject) => {
//             axios.get(`http://tasky-back:${port}/`).then(
//                 response => {
//                     resolve(response);
//                 },
//                 reason => {
//                     reject(reason);
//                 }
//             )
//         }
//     )
// }

// function userTokenTest(){
//     return new Promise(
//         async (resolve, reject) => {
//             axios.post(`http://tasky-back:${port}/auth/sayHello`, {}, {headers: headers}).then(
//                 response => {
//                     console.log("Successfully registered!");
//                     resolve(response);
//                 },
//                 reason => {
//                     console.log("Failed to register!");
//                     reject(reason);
//                 }
//             )
//         }
//     )
// }

// function login(email, password){
//     return new Promise(
//         async (resolve, reject) => {
//             var receivedResponse = null;
//             var receivedReason = null;
//             var receivedToken = null;
//             await axios.post(`http://tasky-back:${port}/auth/login`, {email, password}).then(
//                 response => {
//                     console.log("Successfully logged in. Got the token!");
//                     receivedToken = response.data.authorization;
//                     receivedUsername = response.data.username;
//                     receivedResponse = response;
//                 },
//                 reason => {
//                     console.log("Failed to log in. Token not received");
//                     receivedReason = reason;
//                 }
//             )
//             if(!receivedToken) {
//                 reject(receivedReason);
//                 return;
//             }
//             await setAuthToken(receivedToken);
//             await setActiveUsername(receivedUsername);
//             resolve(receivedResponse);
//         }
//     )
// }

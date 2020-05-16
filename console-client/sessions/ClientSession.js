const readline = require('readline');

class ClientSession{
    constructor(targetPort, commandManager){
        this.cookies = {};
        this.port = targetPort;
        this.commandManager = commandManager;
    }

    start(){
        return new Promise(
            async (resolve, reject) => {
                try{
                    var exit = false;
                    while(!exit){
                        var username = this.cookies.username || "guest";
                        var answer = await question(`(${username}): `);
                        const args = answer.split(' ');
                        const command = args[0]
                        if(command==="exit"){
                            exit = true;
                        }
                        else {
                            await this.commandManager.execute(command, args).then(
                                response => {
                                    if(response.updatedCookies){
                                        for(var cookie in response.updatedCookies){
                                            this.cookies[cookie] = response.updatedCookies[cookie]
                                        }
                                    }
                                    console.log(response.data);
                                },
                                reason => {
                                    console.log(reason);
                                    if(!reason.data){
                                        reason = reason.response;
                                    }
                                    console.log(reason.data);
                                }
                            ) 
                        }
                    }
                    return resolve()
                }
                catch(error){
                    return reject(error);
                }
            }
        )
    }
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

module.exports = ClientSession
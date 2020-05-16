class CommandManager {
    constructor(){
        var commands = [];
        var normalizedPath = require("path").join(__dirname, "implementations");

        require("fs").readdirSync(normalizedPath).forEach((file) => {
            commands.push(require("./implementations/" + file));
        });
        this.commands = commands;
        this.commandDictionary = {};
        for(var command of commands){
            this.commandDictionary[command.identifier] = command;
        }
    }

    execute(commandIdentifier, args){
        var commandFound = this.commandDictionary[commandIdentifier];
        if(commandFound){
            return commandFound.method(args);
        }
        else {
            return new Promise(
                (resolve, reject) => {
                    reject({data:{err:`There is no command called ${commandIdentifier}`}})
                }
            )
        }
    }
}

module.exports = CommandManager
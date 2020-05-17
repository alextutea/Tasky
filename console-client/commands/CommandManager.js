class CommandManager {
    constructor(){
        var commands = [];
        var normalizedPath = require("path").join(__dirname, "implementations");

        require("fs").readdirSync(normalizedPath).forEach((file) => {
            commands.push(require("./implementations/" + file));
        });
        this._commands = commands;
        this._commandDictionary = {};
        for(var command of commands){
            this._commandDictionary[command.identifier] = command;
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

    get commandDictionary(){
        return this._commandDictionary;
    }
}

module.exports = CommandManager
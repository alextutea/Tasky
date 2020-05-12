class CommandManager {
    constructor(commands){
        this.commands = commands;
        this.commandDictionary = {};
        for(command in commands){
            this.commandDictionary[command.identifier] = command;
        }
    }

    execute(commandIdentifier, args){
        return commandDictionary[commandIdentifier].method(args);
    }
}

module.exports = CommandManager
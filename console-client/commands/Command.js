class Command {
    constructor(identifier, method){
        this._identifier = identifier;
        this._method = method;
    }

    get identifier(){
        return this._identifier;
    }

    set identifier(identifier){
        this._identifier = identifier;
    }

    get method(){
        return this._method;
    }

    set method(method){
        this._method = method
    }
}

module.exports = Command
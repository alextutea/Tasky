var bcrypt = require('bcryptjs');
const User = require("../../../users/model/user.js");

const {addUser} = require("../../../users/controller/utils/crud.js")

const register = async (req, res) => {
    const {email, password, username} = req.body;
    console.log("Trying to register user...");
    var emailExists = await User.findOne({'email': email});
    if(emailExists){
        console.log("Bad client input: Email already exists.");
        return res.status(400).send("This email is already associated with an account.");
    } 
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    addUser(username, email, hashedPassword).then(
        response => {
            res.status(200).send(response);
            console.log("Successfully registered new user:");
            console.log(response);
        },
        reject => {
            res.status(400).send(reject);
            console.log("DB_Error: The database failed to add a new user.");
            console.log(reject);
        }
    );
}

module.exports = register
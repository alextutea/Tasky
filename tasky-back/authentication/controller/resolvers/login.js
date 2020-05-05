var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSignature} = require("../middleware/jwtVerification.js");
const User = require("../../../users/model/user.js");

const login = async (req, res) => {
    console.log("Trying to log user in...");
    const {email, password} = req.body;

    const userFound = await User.findOne({'email': email});
    const validPassword = await bcrypt.compare(password, userFound.password);

    if(!userFound || !validPassword){
        console.log("Bad client input: Bad credentials!");
        if(!userFound){
            console.log("Bad email");
        }
        if(!validPassword){
            console.log("Bad password");
        }
        return res.status(400).send("This combination of email and password does not exist!");
    }
    // Create and assign a JSON Web Token (string should be replaced by .env variable)
    const token = jwt.sign({_id: userFound._id}, jwtSignature);
    // res.set('authorization', `${token}`).send();  // Normal way to send in header
    
    // send as JSON and get it from front-end
    res.status(201).json({
        authorization: token
    }).send();

    console.log("Succsessfully logged in user:");
    console.log(userFound);
}

module.exports = login
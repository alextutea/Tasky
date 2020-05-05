const User = require("../../../users/model/user.js");

const sayHello = async (req, res) => {
    const {authUserId} = req.body;
    const userFound = await User.findOne({'_id': authUserId});
    console.log(userFound.username + ": Hello!");
    return res.status(200).send({
        message: userFound.username + " says hi!"
    });
}

module.exports = sayHello

//used as a sanity check for the authentication system
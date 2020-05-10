const User = require("../../model/user.js")

const getUsers = async (req, res) => {
    const {id, username, email, level} = req.query;
    var criteria = {
        id: id,
        username: username,
        email: email,
        level: level
    }
    for(criterion of Object.keys(criteria)){
        if(!criteria[criterion]){
            delete criteria[criterion]
        }
    }
    const usersFound = await User.find(criteria);
    res.status(200).send(usersFound);
}

module.exports = getUsers
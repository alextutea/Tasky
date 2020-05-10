const User = require("../../model/user.js");

const addUser = (username, email, password) => {
    return new Promise(
        async (resolve, reject) => {
            var newUser = new User({
                username: username,
                email: email,
                password: password,
                level: "U"
            });
            try {
                await newUser.save();
                resolve({
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    level: newUser.level
                });
            } catch(err){
                reject({
                    err: err
                });
            }
        }
    );
}

module.exports = {addUser}
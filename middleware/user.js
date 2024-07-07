const { User } = require('../database')

function UserMiddleWare(req, res, next) {

    const UserName = req.headers.username;
    const Password = req.headers.password;

    User.findOne({

        UserName: UserName,
        Password: Password
    }).then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                message: "User not found"
            })
        }
    })


}

module.exports = UserMiddleWare;
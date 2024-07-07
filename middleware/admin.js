const { Admin } = require('../database')

function AdminMiddleWare(req, res, next) {

    const UserName = req.headers.username;
    const Password = req.headers.password;

    Admin.findOne({

        UserName: UserName,
        Password: Password
    }).then(function(value) {
        if (value) {
            next();
        } else {
            res.status(403).json({
                message: "admin not found"
            })
        }
    })


}

module.exports = AdminMiddleWare;
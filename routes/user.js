const { Router } = require("Router");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    }).then(function() {
        res.json({
            message: "user created sucessfully"
        })
    })

})

router.get('/courses', async(req, res) => {
    const allcourses = await Course.find({});
    res.json({
        courses: allcourses
    })
})

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.body.username;
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "purchase complete"
    })
})


router.get('/purchased', userMiddleware, async(req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    })

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })

})
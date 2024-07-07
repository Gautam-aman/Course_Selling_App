const express = require('express')
const { Admin, Course } = require('../database')
const AdminMiddleWare = require('./middleware/admin')
const router = express.Router();

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({
        username,
        password
    }).then(function(value) {
        if (value) {
            res.json({

                message: "Admin already exist"
            })
        } else {
            Admin.create({
                username,
                password
            }).then(function() {
                res.json({
                    message: "Admin created successfully"
                })
            })
        }


    })

})

router.post('/courses', AdminMiddleWare, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        price
    })

    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id
    })
})

router.get('/courses', AdminMiddleWare, async(req, res) => {
    const allcourses = await Course.find({});
    res.json({
        courses: allcourses
    })

})

module.exports = router;
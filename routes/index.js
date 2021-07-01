// whole-script strict mode syntax
"use strict";

// load modules
const express = require("express");

// create router instance
const router = express.Router();

// import models
const {User, Course} = require("../models");

// import middleware
const {asyncHandler} = require("../middleware/async-handler");
const {authenticateUser} = require("../middleware/auth-user");


/* USER ROUTES */

// An "/api/users" GET route that will return all properties and values for 
// the currently authenticated User along with a 200 HTTP status code.
router.get("/users", authenticateUser, asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            emailAddress: req.currentUser.emailAddress
        },
        attributes: {
            exclude: [
                "password",
                "createdAt", 
                "updatedAt"
            ],
        },
    });

    res
        .status(200)
        .json(user);
}));

// An "/api/users" POST route that will create a new user, 
// set the Location header to "/", and return a 201 HTTP status code and no content.
router.post("/users", asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res
            .status(201)
            .location("/")
            .end();

    } catch (error) {
        console.log("Error: ", error.name);

        if (error.name === "SequelizeValidationError" || 
            error.name === "SequelizeUniqueConstraintError") {
                const errors = error.errors.map(err => err.message);
                res.status(400).json({errors});
        } else {
            throw error;
        }
    }
}));


/* COURSES ROUTES */

// An "/api/courses" GET route that will return all courses including the
// User associated with each course and a 200 HTTP status code.
router.get("/courses", asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ],
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: {
                    exclude: [
                        "password",
                        "createdAt", 
                        "updatedAt"
                    ],
                },
            },
        ]
    });

    res.status(200).json(courses.map(course => course.get({plain: true})))
}));

// An "/api/courses/:id" GET route that will return the corresponding course
// including the User associated with that course and a 200 HTTP status code.
router.get("/courses/:id", asyncHandler(async (req, res) => {
    const courses = await Course.findOne({
        where: {
            id: req.params.id,
        },
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ],
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: {
                    exclude: [
                        "password",
                        "createdAt", 
                        "updatedAt"
                    ],
                },
            }
        ],
    });

    res.status(200).json(courses);
}));

// An "/api/courses" POST route that will create a new course, set the Location header
// to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post("/courses", authenticateUser, asyncHandler(async (req, res) => {
    try {
        await Course.create(req.body);
        const courses = await Course.findAll();
        res
            .status(201)
            .location(`/api/courses/${courses.length}`)
            .end();

    } catch (error) {
        console.log("Error: ", error.name);

        if (error.name === "SequelizeValidationError" || 
            error.name === "SequelizeUniqueConstraintError") {
                const errors = error.errors.map(err => err.message);
                res.status(400).json({errors});
        } else {
            throw error;
        }
    }
}));

// An "/api/courses/:id" PUT route that will update the corresponding course
// and return a 204 HTTP status code and no content.
router.put("/courses/:id", authenticateUser, asyncHandler(async (req, res) => {
    let course;
    try {
        course = await Course.findByPk(req.params.id);

        if (course) {

            if (course.userId === req.currentUser.id) {
                await course.update(req.body);
                res
                    .status(204)
                    .end();

            } else {
                res
                    .status(403)
                    .json({Error: "Access to the requested resource is forbidden"});
            }
            
        } else {
            res
                .status(400)
                .json({error: "Course not found"});
        }

    } catch (error) {
        console.log("Error: ", error.name);

        if (error.name === "SequelizeValidationError" || 
            error.name === "SequelizeUniqueConstraintError") {
                const errors = error.errors.map(err => err.message);
                res.status(400).json({errors});
        } else {
            throw error;
        }
    }
}));

// An "/api/courses/:id" DELETE route that will delete the corresponding course
// and return a 204 HTTP status code and no content.
router.delete("/courses/:id", authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {

        if (course.userId === req.currentUser.id) {
            await course.destroy();
            res
                .status(204)
                .end();

        } else {
            res
                .status(403)
                .json({Error: "Access to the requested resource is forbidden"});
        }
        
    } else {
        res
            .status(400)
            .json({error: "Course not found"});
    }
}));

module.exports = router;
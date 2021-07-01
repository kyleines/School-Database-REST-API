// Whole-script strict mode syntax
"use strict";

// load modules
const auth = require("basic-auth");
const bcrypt = require("bcrypt");

// import User model
const {User} = require("../models");

exports.authenticateUser = async (req, res, next) => {

    let errorMessage;

    const creds = auth(req);

    if (creds) {
        const user = await User.findOne({
            where: {
                emailAddress: creds.name,
            },
        });

        if (user) {
            const authenticated = bcrypt.compareSync(creds.pass, user.password);

            if (authenticated) {
                req.currentUser = user;

            } else {
                errorMessage = "Authentication failed";
            }

        } else {
            errorMessage = "User not found";
        }

    } else {
        errorMessage = "Missing auth header";
    }

    if (errorMessage) {
        res.status(401).json({message: "Access Denied"});
    } else {
        next();
    }
}
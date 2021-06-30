// Whole-script strict mode syntax
"use strict";

// load module
const Sequelize = require("sequelize");

// Creates User model
module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init();
    return User;
}
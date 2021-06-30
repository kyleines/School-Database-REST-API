// Whole-script strict mode syntax
"use strict";

// load module
const Sequelize = require("sequelize");

// Creates Course model
module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init();
}
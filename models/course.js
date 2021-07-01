// Whole-script strict mode syntax
"use strict";

// load module
const Sequelize = require("sequelize");

// Creates Course model
module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A title is required",
                },
                notEmpty: {
                    msg: "Please provide a title",
                },
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A description is required",
                },
                notEmpty: {
                    msg: "Please provide a description",
                },
            },
        },
        estimatedTime: {
            type: Sequelize.STRING, 
        },
        materialsNeeded: {
            type: Sequelize.STRING, 
        },
    }, 
    {
        sequelize
    });

    // Add one-to-one association to User model
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: "user",
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            },
        });
    }

    return Course;
}
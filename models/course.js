// Whole-script strict mode syntax
"use strict";

// load module
const {Model, DataTypes} = require("sequelize");

// Creates Course model
module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
        title: {
            type: DataTypes.STRING,
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
            type: DataTypes.TEXT,
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
            type: DataTypes.STRING, 
        },
        materialsNeeded: {
            type: DataTypes.STRING, 
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
// Whole-script strict mode syntax
"use strict";

// load module
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

// Creates User model
module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A first name is required",
                },
                notEmpty: {
                    msg: "Please provide a first name",
                },
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A last name is required",
                },
                notEmpty: {
                    msg: "Please provide a last name",
                },
            },
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: "The email address you provided already exists",
            },
            validate: {
                notNull: {
                    msg: "An email address is required",
                },
                isEmail: {
                    msg: "Please provide a valid email address",
                },
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("password", bcrypt.hashSync(value, 10));
            },
            validate: {
                notNull: {
                    msg: "A password is required",
                },
                notEmpty: {
                    msg: "Please provide a password",
                },
                len: {
                    args: [7, 14],
                    msg: "Your password must be between 7 and 14 characters in length",
                },
            },
        },
    }, 
    {
        sequelize
    });

    // Add one-to-many association to Course model
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            },
        });
    }

    return User;
}
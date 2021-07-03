// Whole-script strict mode syntax
"use strict";

// load module
const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");

// Creates User model
module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
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
            },
        },
    }, 
    {
        sequelize
    });

    // Add one-to-many association to Course model
    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: "user",
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            },
        });
    }

    return User;
}
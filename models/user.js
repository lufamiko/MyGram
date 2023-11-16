'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../utils/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Comment, { foreignKey: 'UserId' });
      User.hasMany(models.SocialMedia, { foreignKey: 'UserId' });
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Full name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        name: "email",
        msg: "Email already exists"
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be valid',
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "username",
        msg: "Username already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Profile image cannot be empty"
        },
        isUrl: {
          args: true,
          msg: "Profile image url must be valid"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Age cannot be empty"
        },
        isInt: {
          args: true,
          msg: "Age must be an integer or Number"
        }
      }
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone number cannot be empty"
        },
        isInt: {
          args: true,
          msg: "Phone number must be an integer or Number"
        }
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    }
  });
  return User;
};
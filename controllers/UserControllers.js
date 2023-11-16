const { User } = require('../models')
const {
    generateToken
} = require("../utils/jwt")

const {
    comparePassword
} = require("../utils/bcrypt")
class UserController {
    static async register(req, res) {
        try {
            const {
                email,
                full_name,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            } = req.body
            const data = await User.create({
                email,
                full_name,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            })
            res.status(201).json({
                "users": {
                    email: data.email,
                    full_name: data.full_name,
                    username: data.username,
                    profile_image_url: data.profile_image_url,
                    age: data.age,
                    phone_number: data.phone_number
                }
            })
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors[0].message
                })
            }
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body

            // find di database
            const data = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!data) {
                return res.status(404).json({ message: 'User not found' })
            }
            //compare password
            const isvalid = comparePassword(password, data.password)
            if (!isvalid) {
                throw {
                    code: 401,
                    message: "Incorrect Password!"
                }
            }
            //generate token
            const token = generateToken({
                id: data.id,
                email: data.email,
                username: data.username
            })

            res.status(200).json({
                token
            })
        } catch (error) {
            res.status(error.code || 500).json(error)
        }
    }
    static async updateUser(req, res) {
        try {
            const { userid } = req.params
            const { email, full_name, username, password, profile_image_url, age, phone_number } = req.body
            const userData = req.UserData
            if (User.id !== userData.id) {
                throw {
                    code: 403,
                    message: "Forbidden"
                }
            }
            const data = await User.update({
                email,
                full_name,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            }, {
                where: {
                    id: userid
                },
                returning: true
            }
            )
            res.status(200).json({
                "users": {
                    email: data[1][0].email,
                    full_name: data[1][0].full_name,
                    username: data[1][0].username,
                    profile_image_url: data[1][0].profile_image_url,
                    age: data[1][0].age,
                    phone_number: data[1][0].phone_number
                }
            })
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async deleteUserById(req, res) {
        try {
            const { userid } = req.params
            const data = await User.destroy({
                where: {
                    id: userid
                }
            })
            res.status(200).json({ message: "Your account has been successfully deleted" })
        } catch (error) {
            res.status(error.code || 500).json(error)
        }
    }

}
module.exports = UserController
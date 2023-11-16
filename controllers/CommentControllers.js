const { Comment, Photo, User } = require('../models')

class CommentControllers {

    static async addComment(req, res) {
        try {
            const userData = req.UserData
            const { comment, PhotoId } = req.body;
            const data = await Comment.create({
                comment,
                UserId: userData.id,
                PhotoId
            })
            res.status(201).json({
                data
            })
            console.log(data)

        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors[0].message
                })
            }
            res.status(error.code || 500).json({ message: error.message })
        }
    }

    static async getComment(req, res) {
        try {
            const userData = req.UserData
            if (Comment.UserId != userData.id) {
                throw {
                    code: 403,
                    message: "Forbidden"
                }
            }
            const comments = await Comment.findAll({
                include: [
                    {
                        model: Photo,
                        attributes: ['id', 'title', 'caption', 'poster_image_url']
                    },
                    {
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url', 'phone_number']
                    }
                ]
            });
            res.status(200).json({
                comments
            })
        } catch (error) {
            res.status(error.code || 500).json(error)
        }
    }
    static async updateComment(req, res) {
        try {
            const { commentId } = req.params
            const { comment } = req.body
            const userData = req.UserData
            if (Comment.UserId != userData.id) {
                throw {
                    code: 403,
                    message: "Forbidden"
                }
            }
            const data = await Comment.update({
                comment
            },
                {
                    where: {
                        id: commentId
                    },
                    returning: true
                })
            res.status(200).json({
                "Comments": {
                    id: data[1][0].id,
                    comment: data[1][0].comment,
                    UserId: data[1][0].UserId,
                    PhotoId: data[1][0].PhotoId,
                    createdAt: data[1][0].createdAt,
                    updatedAt: data[1][0].updatedAt

                }
            })

        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async deleteComment(req, res) {
        try {
            const { commentId } = req.params
            const userData = req.UserData
            if (Comment.UserId != userData.id) {
                throw {
                    code: 403,
                    message: "Forbidden"
                }
            }
            const data = await Comment.destroy({
                where: {
                    id: commentId
                }
            })
            res.status(200).json({
                message: "Yours comment has been successfully deleted"
            })
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }

}

module.exports = CommentControllers
const { Photo, User, Comment } = require('../models')
class PhotoControllers {
    static async addPhoto(req, res) {
        try {
            const {
                poster_image_url,
                title,
                caption
            } = req.body
            const userData = req.UserData
            const data = await Photo.create({
                poster_image_url,
                title,
                caption,
                UserId: userData.id
            })
            res.status(201).json({
                id: data.id,
                poster_image_url: data.poster_image_url,
                title: data.title,
                caption: data.caption,
                UserId: data.UserId
            })
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors[0].message
                })
            }
            res.status(error.code || 500).json(error)
        }

    }
    static async getPhoto(req, res) {
        try {
            const data = await Photo.findAll({
                include: [
                    {
                        model: Comment,
                        attributes: ['comment'],
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url']
                    }
                ],

            });
            if (!data) {
                throw {
                    code: 404,
                    message: "Photo not found!"
                }
            }
            res.status(200).json({
                "photos": data
            })
            console.log(JSON.stringify(data, null, 2));
        } catch (error) {
            res.status(error.code || 500).json(error)
        }
    }

    static async updatePhoto(req, res) {
        try {
            const { photoId } = req.params;
            const userData = req.UserData
            const { title, caption, poster_image_url } = req.body;
            if (Photo.UserId !== userData.id) {
                throw {
                    code: 403,
                    message: "Forbidden"
                }
            }
            const data = await Photo.update({
                title,
                caption,
                poster_image_url
            }, {
                where: {
                    id: photoId,
                    UserId: userData.id
                },
                returning: true
            })
            if (!data[0]) {
                throw {
                    code: 404,
                    message: "Data not found!"
                }
            }

            res.status(201).json({
                "photo":
                {
                    id: data[1][0].id,
                    title: data[1][0].title,
                    caption: data[1][0].caption,
                    poster_image_url: data[1][0].poster_image_url,
                    UserId: data[1][0].UserId,
                    createdAt: data[1][0].createdAt,
                    updatedAt: data[1][0].updatedAt
                }

            })
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async deletePhoto(req, res) {
        try {
            const { photoId } = req.params
            const userData = req.UserData
            if (Photo.UserId !== userData.id) {
                throw {
                    code: 403,
                    message: "Forbidden"
                }
            }
            const data = await Photo.destroy({
                where: {
                    id: photoId,
                    UserId: userData.id
                }
            })
            if (!data) {
                throw {
                    code: 404,
                    message: "Data not found!"
                }
            }
            res.status(200).json({ message: "Your photo has been successfully deleted" })
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }

}
module.exports = PhotoControllers
const {
    SocialMedia,
    User
} = require('../models')
class SocialMediaControllers {
    static async addSocialMedia(req, res) {
        try {
            const { name, social_media_url } = req.body
            const userData = req.UserData
            const data = await SocialMedia.create({
                name,
                social_media_url,
                UserId: userData.id
            })
            res.status(201).json({ "social_media": data })
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors[0].message
                })
            }
            res.status(error.code || 500).json({ message: error.message })
        }
    }

    static async getSocialMedia(req, res) {
        try {
            const data = await SocialMedia.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url']
                    }
                ]
            })
            res.status(200).json({ "social_media": data })
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async updateSocialMedia(req, res) {
        try {
            const { socialMediaId } = req.params
            const { name, social_media_url } = req.body
            const data = await SocialMedia.update({
                name,
                social_media_url
            },
                {
                    where: {
                        id: socialMediaId
                    },
                    returning: true
                })
            res.status(200).json({
                "social_media": {
                    id: data[1][0].id,
                    name: data[1][0].name,
                    social_media_url: data[1][0].social_media_url,
                    UserId: data[1][0].UserId,
                    createdAt: data[1][0].createdAt,
                    updatedAt: data[1][0].updatedAt
                }
            })
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async deleteSocialMedia(req, res) {
        try {
            const { socialMediaId } = req.params
            const data = await SocialMedia.destroy({
                where: {
                    id: socialMediaId
                }
            })
            res.status(200).json({
                message: "Your social media has been successfully deleted"
            })
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
}

module.exports = SocialMediaControllers
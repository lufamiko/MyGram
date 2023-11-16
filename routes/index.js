const router = require("express").Router()

const userRoutes = require("./UserRoutes")
const photoRoutes = require("./PhotoRoutes")
const commentRoutes = require("./CommentsRoutes")
const socialMediaRoutes = require("./SocialMediaRoutes")
const { authentication } = require("../middleware/auth")

router.use("/photos", authentication, photoRoutes)
router.use("/users", userRoutes)
router.use("/comments", authentication, commentRoutes)
router.use("/socialmedias", authentication, socialMediaRoutes)

module.exports = router;
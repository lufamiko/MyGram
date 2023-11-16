const router = require("express").Router()
const SocialMediaControllers = require("../controllers/SocialMediaControllers")

router.post("/", SocialMediaControllers.addSocialMedia)
router.get("/", SocialMediaControllers.getSocialMedia)
router.put("/:socialMediaId", SocialMediaControllers.updateSocialMedia)
router.delete("/:socialMediaId", SocialMediaControllers.deleteSocialMedia)


module.exports = router
const router = require('express').Router();
const PhotoController = require('../controllers/PhotoControllers')

router.post('/', PhotoController.addPhoto)
router.get('/', PhotoController.getPhoto)
router.put('/:photoId', PhotoController.updatePhoto)
router.delete('/:photoId', PhotoController.deletePhoto)


module.exports = router
const router = require('express').Router();
const UserController = require("../controllers/UserControllers")

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.put('/:userid', UserController.updateUser)
router.delete('/:userid', UserController.deleteUserById)


module.exports = router
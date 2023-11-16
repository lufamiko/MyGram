const router = require('express').Router();
const CommentControllers = require('../controllers/CommentControllers')

router.post('/', CommentControllers.addComment)
router.get('/', CommentControllers.getComment)
router.put('/:commentId', CommentControllers.updateComment)
router.delete('/:commentId', CommentControllers.deleteComment)


module.exports = router
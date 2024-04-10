const router = require('express').Router()
const userController = require('./userController')
const postController = require('./postController')
const authorCommentController = require('./authorController')

router.use('/users', userController)
router.use('/posts', postController)
router.use('/authors', authorCommentController)


module.exports =  router
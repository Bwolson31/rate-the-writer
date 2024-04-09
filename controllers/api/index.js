const router = require('express').Router()
const userController = require('./userController')
const postController = require('./postController')

router.use('/users', userController)
router.use('/posts', postController)


module.exports =  router
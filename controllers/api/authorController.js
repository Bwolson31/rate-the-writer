// Import necessary modules and models
const { AuthorComment } = require('../../models');
const router = require('express').Router()

router.post('/', async (req, res) => {
    try {
        const newAuthorComment = await AuthorComment.create({
            ...req.body,
            user_id: req.session.user_id 
        })
      
        res.json(newAuthorComment)

        
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports =  router
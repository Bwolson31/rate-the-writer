// Import necessary modules and models
const { Post, Comment, AuthorComment } = require('../../models');


// Controller function to create a new comment for a post
const createComment = async (req, res) => {
    try {
        // Extract post ID and comment content from the request body
        const { postId } = req.params;
        const { content } = req.body;

        // Find the post by ID in the database
        const post = await Post.findByPk(postId);

        // If the post doesn't exist, return a 404 error
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create a new comment instance using the Comment model
        const newComment = await Comment.create({
            postId,
            content
        });

        // Send a success response with the newly created comment
        res.status(201).json(newComment);
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Controller function to delete a comment
const deleteComment = async (req, res) => {
    try {
        // Extract comment ID from the request parameters
        const { commentId } = req.params;

        // Find the comment by ID in the database
        const comment = await Comment.findByPk(commentId);

        // If the comment doesn't exist, return a 404 error
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Delete the comment from the database
        await comment.destroy();


    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    createComment,
    deleteComment
};

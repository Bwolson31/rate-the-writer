// Import necessary modules and models
const { Post } = require('../models');

// Controller function to create a new post
const createPost = async (req, res) => {
    try {
        // Extract title and content from request body
        const { title, content } = req.body;

        // Create a new post instance using the Post model
        const newPost = await Post.create({
            title,
            content
        });

        // Send a success response with the newly created post
        res.status(201).json(newPost);
    } catch (error) {
        // If an error occurs during post creation, log it and send an error response
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to delete a post
const deletePost = async (req, res) => {
    try {
        // Extract post ID from request parameters
        const { id } = req.params;

        // Find the post by ID in the database
        const post = await Post.findByPk(id);

        // If the post doesn't exist, return a 404 error
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete the post from the database
        await post.destroy();

        // Send a success response with status code 204 (No Content)
        res.status(204).end();
    } catch (error) {
        // If an error occurs during post deletion, log it and send an error response
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the controller functions
module.exports = {
    createPost,
    deletePost
};

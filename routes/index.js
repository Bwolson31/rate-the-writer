const express = require('express');
const router = express.Router();

// Import individual route files
const authRoutes = require('./authRoutes');
// Possibly add more route imports here 

router.get('/', (req, res) => {
    res.send('Welcome to the Book Forum!'); 
  });
  
// Use individual route files
router.use('/auth', authRoutes);
// Possibly add more route usage here 



module.exports = router;

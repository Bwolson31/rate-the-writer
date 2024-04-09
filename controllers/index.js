const router = require('express').Router()
const api = require('./api')
const homeRoutes = require('./homeController')

router.use('/api', api)
router.use('/', homeRoutes)

router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

module.exports =  router
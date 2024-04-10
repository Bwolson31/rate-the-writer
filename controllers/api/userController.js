const { User } = require('../../models');
const router = require('express').Router()

router.post('/login', async (req, res) => {
  try {
    console.log('anything');
    const userData = await User.findOne({ where: { username: req.body.username } });
console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
console.log(req.body);
    const validPassword = await userData.checkPassword(req.body.password);
console.log('valid password');
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log('this is here');
    res.status(400).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    console.log('anything');
    const userData = await User.create(req.body);
    console.log('userData', userData)
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;

const { User } = require('../../models');
const router = require('express').Router()

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
 
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
    res.status(400).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error('Validation errors:', err);

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

router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      
      res.json({ user: newUser, message: 'You are now signed up and logged in!' });
    }); 

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Password must be at least 8 characters long." });
    } else {
      return res.status(500).send('Internal Server Error');
    }
  }

  router.post('/signup', async (req, res) => {
    console.log("Signup attempt:", req.body);
    try {
      const newUser = await User.create(req.body);
      console.log("New user created:", newUser);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

module.exports = router;

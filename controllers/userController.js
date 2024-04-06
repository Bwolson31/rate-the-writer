const { User } = require('../models');

const usecontroller = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      
      if (!user) {
        res.status(400).json({ message: 'Incorrect username or password' });
        return;
      }
      
      const goodpass = user.checkPassword(password);
      
      if (!goodpass) {
        res.status(400).json({ message: 'Incorrect username or password' });
        return;
      }
      
      res.json({ user: user, message: 'Login successful' });
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = usecontroller;

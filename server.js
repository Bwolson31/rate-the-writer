const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const { engine } = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes'); 
(session.Store);


const app = express();

const PORT = process.env.PORT || 3001;


const sess = {
  secret: 'SjLYkJALxRfvJJzhJihhFkGuOOHscjZC',
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.engine('handlebars', engine({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');
app.use('/users', indexRoutes);

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/auth', authRoutes);

app.use(routes);
// app.get('/', (req, res) => {
//  res.render('homepage');
// });


// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
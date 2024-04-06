const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')
const userroute = require('./routes/authRoutes');
(session.Store);


const app = express();

const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'hash here?',
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


app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.use('/users', userroute);

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
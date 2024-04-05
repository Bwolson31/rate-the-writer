const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = requre('connect-session-sequelize')
(session.Store);


const app = express();

const PORT = process.env.PORT || 3001;

const sess = {
  // TODO: logic for sess
}

// TODO: logic for handlebars


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
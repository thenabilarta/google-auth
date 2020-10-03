const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
// passport dan cookie untuk bikin cookie
const passport = require('passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
require('./models/User');
require('./services/passport');

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB Database'))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// Passport suruh bikin cookie
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

// require('./routes/authRoutes')(app)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});

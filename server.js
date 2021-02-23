require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const pgSession = require('connect-pg-simple')(session);
const app = express();
const { db } = require('./db/db');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.disable('x-powered-by');

app.use(
  session({
    store: new pgSession({
      pgPromise: db
    }),
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: true
    } //TODO Secure cookies
  })
);

app.use(express.json());
app.use('/api/update', require('./routes/update'));
app.use('/api/load', require('./routes/load'));
app.use('/api/check-off', require('./routes/check-off'));
app.use('/api/delete', require('./routes/delete'));
app.use('/api/auth', require('./routes/auth'));

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

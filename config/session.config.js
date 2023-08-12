const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientPromise } = require('../database/index');
const { app } = require('../app');

app.use(
  session({
    secret: process.env.MONGO_CONNECT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // session 14 days
    },
    store: MongoStore.create({
      clientPromise: clientPromise.then((m) => m.connection.getClient()),
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
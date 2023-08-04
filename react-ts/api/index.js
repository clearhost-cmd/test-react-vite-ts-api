const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const AuthenticationRouter = require('./routers/Authentication.js');
const UpmindRouter = require('./routers/providers/Upmind.js');

const { errorHandler } = require('./utils/errorHandler.js');

const app = express();

app.use(
   /*
    * Session Middleware
    */
   session({
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
         secure: true,
         domain: 'dev.podpress.io',
         sameSite: 'strict'
      }
   }),

   /*
    * Ratelimit Middleware(Very strict)
    */
   rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10
   })
);

const corsOptions = {
   origin: 'https://dev.podpress.io'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

// Routers
app.use('/api/auth', AuthenticationRouter);
app.use('/api/upmind', UpmindRouter);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;

const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const reactive = require('feathers-reactive');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const auth = require('@feathersjs/authentication');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const rethinkdb = require('./rethinkdb');

///////////// AUTH /////////////
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const memory = require('feathers-memory')

////////////////////////////////

/////////// SERVICES ///////////
const users = require('./services/users/users.service.js')

// Rethink
const rethink = require('rethinkdbdash');
const service = require('feathers-rethinkdb');

// Connect to a local RethinkDB server.
const r = rethink({
  db: 'feathers'
});

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio())
  .configure(auth({ secret: 'supersecret'}))
  .configure(local())
  .configure(jwt())
  .use('/users', memory())

app.configure(users)

// app.use('authentication', service({
  //   Model: r,
  //   name: 'authentication',
  //   paginate: {
    //     default: 10,
    //     max: 50
    //   }
    // }));
    
    // app.service('authentication').init()
    
app.service('users').hooks({
  after: local.hooks.protect('password')
});
    
app.service('authentication').hooks({
  before: {
    create: [
      // You can chain multiple strategies
      auth.hooks.authenticate(['jwt', 'local'])
   ],
   remove: [
     auth.hooks.authenticate('jwt')
    ]
  }
});

app.service('users').hooks({
  before: {
    find: [
   auth.hooks.authenticate('jwt')
  ],
  create: [
   local.hooks.hashPassword({ passwordField: 'password' })
  ]
 }
});

app.use('messages', service({
    Model: r,
    name: 'messages',
    paginate: {
      default: 10,
      max: 50
    }
  }));

app.configure(rethinkdb);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

app.service('messages').init()

module.exports = app;

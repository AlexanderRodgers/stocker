const feathers = require('@feathersjs/feathers');
const authentication = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');

  app.configure(authentication(settings));
  app.configure(local());
  
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(['local', 'jwt'])
      ]
    }
  });
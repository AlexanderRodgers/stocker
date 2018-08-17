// Initializes the `users` service on path `/users`
const createService = require('feathers-rethinkdb');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const r = require('rethinkdbdash')({
    db: 'feathers'
  });
  const paginate = app.get('paginate');

  const options = {
    Model: r,
    name: 'users',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);
};
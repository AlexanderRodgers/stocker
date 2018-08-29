const users = require('./users/users.service.js');
const mailer = require('./mailer/mailer.service.js');
const profiles = require('./profiles/profiles.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(mailer);
  app.configure(profiles);
};

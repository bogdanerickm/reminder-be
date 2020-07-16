const reminders = require('./reminders/reminders.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(reminders);
};

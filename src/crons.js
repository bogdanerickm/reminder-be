// Cron Job
const cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//     console.log('running a task every minute');
// });

const emailCron = cron.schedule('* * * * *', () =>  {
    console.log('stoped task');
  }, {
    scheduled: false
  });

// Finish Cron Job
module.exports = emailCron;
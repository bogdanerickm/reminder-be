// Cron Job
const cron = require('node-cron');
const createModel = require('./models/reminders.model');
const mongoose = require('./mongoose');
const remindersModel = require('./models/reminders.model');

const sendMail = () => {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '****@gmail.com',
      pass: 'pass'
    }
  });
  const mailOptions = {
    from: 'bogdan.utn@gmail.com',
    to: 'bogdanerickm@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


const getR = async (app) => {
  const remi = await app.service('reminders').find({
    query: {
      $limit: 10,
      $sort: {
        createdAt: -1
      }
    }
  });
  console.log('remi', remi)
}

const emailCron = (app) => cron.schedule('* * * * * ', () => getR(app), {
    scheduled: true
});

module.exports = emailCron;
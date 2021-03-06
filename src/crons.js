// Cron Job
const cron = require('node-cron');
const createModel = require('./models/reminders.model');
const mongoose = require('./mongoose');
const remindersModel = require('./models/reminders.model');
const moment = require('moment');
const fetch = require("node-fetch");

const sendMail = (reminder) => {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  console.log('reminder', reminder);
  const mailOptions = {
    from: 'bogdan.utn@gmail.com',
    to: reminder.emailTo,
    subject: reminder.subject,
    text: reminder.body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendTelegramNotif = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

const getR = async (app) => {
  const remi = await app.service('reminders')
    .find(
      {
        query: {
          notified: false,
          selectedDateTime: { $lte: moment(), $gte: moment().subtract(2, 'minutes') },
        }
      });
  remi.data ? remi.data.forEach(x => {
    x.notifyByEmail? sendMail(x): '';
    x.notifyByTelegram? sendTelegramNotif(getUrl(x.body)) : '';
    x.notified = true;
    app.service('reminders').update(x._id, x);
  }) : true;
  console.log('reminders', remi);
}

const getUrl = (textToSend) => {
  // return encodeURI(`https://api.telegram.org/bot1397248480:AAG9_GCHmRdLZ9Uw4bzsn0sp-V3V1yXUKeA/sendMessage?chat_id=232550554&parse_mode=Markdown&text=${textToSend}`);
  return encodeURI(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&parse_mode=Markdown&text=${textToSend}`);
}

const emailCron = (app) => cron.schedule('* * * * * ', () => getR(app), {
  scheduled: true
});

module.exports = emailCron;
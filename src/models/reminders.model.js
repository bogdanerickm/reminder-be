// reminders-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const reminders = new Schema({
    body: { type: String, required: true },
    emailTo: { type: String, required: true },
    name: { type: String, required: true },
    notified: { type: Boolean, required: true, default: false },
    notifyByEmail: { type: Boolean, required: true },
    notifyByTelegram: { type: Boolean, required: true },
    subject: { type: String, required: true },
    selectedDateTime: { type: Date, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('reminders', reminders);
};

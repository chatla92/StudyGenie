const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: { type: String, required: true },
  fullname: String,
  geo: {
    city: String,
    country: String,
  },
  searchActivity: [
    {
      "tag" : String,
      "count" : Number
    }
  ],
  activity: {
    login: [Date],
    seen: [{
      date: Date,
      notes: [Number],
      tags: [{
        "tag": String,
        "count": Number
      }]
    }]
  },
  groups: [String],
  createDateTime: Date,
  modDateTime: Date,
});

export default mongoose.model('User', userSchema);
// module.exports.User = mongoose.model('User', userSchema)

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: { type: String, required: true },
  fullname: String,
  geo: {
  	                    city: String,
  	                    country: String,
  },
  groups: [String],
  createDateTime: Date,
  modDateTime: Date,
});

export default mongoose.model('User', userSchema);
// module.exports.User = mongoose.model('User', userSchema)
